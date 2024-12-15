const express = require('express');
const fetch = require('node-fetch');
const { config } = require('dotenv');

config(); // Load environment variables from .env file

const CLIENT_ID = process.env.CLIENT_ID;
const APP_SECRET = process.env.CLIENT_SECRET;
const environment = process.env.ENVIRONMENT || 'sandbox';
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    clientId: process.env.CLIENT_ID, // Ensure this is set in your .env file
    currency: 'USD', // Replace with your desired currency
    intent: 'capture', // Replace with your desired intent (e.g., 'capture' or 'authorize')
  });
});

// Helper function to generate PayPal Access Token
function generateAccessToken() {
  const auth = `${CLIENT_ID}:${APP_SECRET}`;
  const data = 'grant_type=client_credentials';

  return fetch(`${endpoint_url}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(auth).toString('base64')}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((json) => json.access_token);
}

// Route to Test Access Token Generation
router.get('/test', async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate access token' });
  }
});

// Route to Create PayPal Order
router.post('/create_order', async (req, res) => {
  try {
    const { intent } = req.body;
    if (!intent) {
      console.error('Intent is missing from the request body');
      return res.status(400).json({ error: 'Intent is required in the request body' });
  }
    const accessToken = await generateAccessToken();

    const orderData = {
      intent: intent.toUpperCase(),
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '00.01',
          },
        },
      ],
    };

    const response = await fetch(`${endpoint_url}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    });

    const order = await response.json();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.post('/complete_order', async (req, res) => {
  try {
    const { order_id } = req.body;
    console.log('Completing order with ID:', order_id);

    const accessToken = await generateAccessToken(); // Ensure this function is working
    const response = await fetch(`${endpoint_url}/v2/checkout/orders/${order_id}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const orderDetails = await response.json();
    console.log('Order Details from PayPal:', orderDetails);

    if (response.ok) {
      res.json(orderDetails); // Send order details back to the frontend
    } else {
      console.error('Error from PayPal API:', orderDetails);
      res.status(500).json({ error: 'Error capturing order' });
    }
  } catch (err) {
    console.error('Error completing order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;