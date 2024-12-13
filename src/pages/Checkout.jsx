import React, { useState, useEffect } from 'react';
import '../styles/checkout.css';
import axios from 'axios';

const Checkout = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [alerts, setAlerts] = useState("");

  useEffect(() => {
    // Fetch orders and products on component mount
    axios.get('/orders')
      .then(response => {
        setOrders(response.data);
        calculateTotal(response.data);
      })
      .catch(error => console.error('Error fetching orders:', error));

    axios.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));

    // Fetch PayPal configuration and load SDK
    axios.get('/paypal/config')
      .then(response => {
        console.log('PayPal Config:', response.data);
        loadPayPalSdk(response.data.clientId, response.data.currency, response.data.intent)
          .then(() => {
            renderPayPalButtons(response.data.intent);
          })
          .catch(error => console.error('Error loading PayPal SDK:', error));
      })
      .catch(error => console.error('Error fetching PayPal config:', error));
  }, []);

  const calculateTotal = (orders) => {
    const total = orders
      .filter(order => order.status === 'in_cart')
      .reduce((sum, order) => sum + order.total_price, 0);
    setTotalPrice(total);
  };

  const loadPayPalSdk = (clientId, currency, intent) => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('paypal-sdk')) {
        console.log('PayPal SDK already loaded');
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&intent=${intent}`;
      script.onload = () => {
        console.log('PayPal SDK loaded successfully');
        resolve();
      };
      script.onerror = () => reject('Error loading PayPal SDK.');
      document.head.appendChild(script);
    });
  };

  const renderPayPalButtons = (intent) => {
    const container = document.getElementById('payment_options');
    if (!container) {
      console.error('PayPal button container not found');
      return;
    }

    // Clear any existing PayPal buttons to prevent multiple renders
    container.innerHTML = '';

    try {
      window.paypal.Buttons({
        onClick: () => console.log('PayPal button clicked'),
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'paypal',
        },
        createOrder: () => {
          return axios.post('/paypal/create_order', { intent })
            .then(response => response.data.id)
            .catch(error => {
              console.error('Error creating order:', error);
              throw error;
            });
        },
        onApprove: (data) => {
            return axios.post('/paypal/complete_order', { order_id: data.orderID })
              .then(response => {
                console.log('Order Details:', response.data); // Log response for debugging
                const orderDetails = response.data;
                const intentObject = intent === 'authorize' ? 'authorizations' : 'captures';
                setAlerts(`Thank you ${orderDetails.payer.name.given_name} ${orderDetails.payer.name.surname} for your payment of ${orderDetails.purchase_units[0].payments[intentObject][0].amount.value} ${orderDetails.purchase_units[0].payments[intentObject][0].amount.currency_code}!`);
              })
              .catch(error => {
                console.error('Error completing order:', error.response || error);
                setAlerts("An error occurred during payment.");
              });
          },
        onCancel: () => {
          setAlerts("Order cancelled!");
        },
        onError: (err) => {
          console.error('PayPal Error:', err);
          setAlerts("An error occurred with PayPal.");
        },
      }).render('#payment_options');
    } catch (err) {
      console.error('Error rendering PayPal buttons:', err);
    }
  };

  const handleCheckout = () => {
    const checkoutOrders = orders
      .filter(order => order.status === 'in_cart')
      .map(order => ({ ...order, status: 'pending' }));

    axios.put('/orders', { orders: checkoutOrders })
      .then(() => {
        alert('Checkout successful!');
        setOrders([]);
        setTotalPrice(0);
      })
      .catch(error => console.error('Error during checkout:', error));
  };

  return (
    <div className="checkout-container">
      <div className="orders-section">
        <h2>Your Orders</h2>
        {orders.filter(order => order.status === 'in_cart').map((order, index) => (
          <div className="order-item" key={index}>
            <h4>Order #{order._id}</h4>
            <p>Quantity: {order.quantity}</p>
            <p>Total Price: ${order.total_price}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
      <div id="payment_options"></div>
      {alerts && <div className="alerts">{alerts}</div>}
    </div>
  );
};

export default Checkout;