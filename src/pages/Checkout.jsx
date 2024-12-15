import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router hook
import '../styles/checkout.css';
import axios from 'axios';

const Checkout = () => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [alerts, setAlerts] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    
    const fetchOrdersWithImages = async () => {
      try {
        const response = await axios.get('/orders');
        console.log('Fetched Orders:', response.data);
        setOrders(response.data); // Set the orders state
        calculateTotal(response.data);
        const ordersData = response.data;

        const ordersWithImages = await Promise.all(
          ordersData.map(async (order) => {
            if (order.productID) {
              try {
                const productResponse = await axios.get(`/products/${order.productID}`);
                const productData = productResponse.data;

                if (productData.imageID) {
                  const imageResponse = await axios.get(`/images/${productData.imageID}`);
                  order.imageUrl = imageResponse.data.image;
                }
              } catch (error) {
                console.error(`Error fetching product or image for order ${order._id}:`, error);
              }
            }
            return order;
          })
        );

        setOrders(ordersWithImages);
        calculateTotal(ordersWithImages);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrdersWithImages();

    axios.get('/paypal/config')
      .then(response => {
        loadPayPalSdk(response.data.clientId, response.data.currency, response.data.intent)
          .then(() => {
            renderPayPalButtons(response.data.intent);
          })
          .catch(error => console.error('Error loading PayPal SDK:', error));
      })
      .catch(error => console.error('Error fetching PayPal config:', error));
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
        console.log('Rendering PayPal Buttons - Orders:', orders);
        renderPayPalButtons(); // Render PayPal buttons after orders are fetched
    }
  }, [orders]);

  const calculateTotal = (orders) => {
    const total = orders
      .filter(order => order.status === 'in_cart')
      .reduce((sum, order) => sum + order.total_price, 0);
    setTotalPrice(total);
  };

  const loadPayPalSdk = (clientId, currency, intent) => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('paypal-sdk')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&intent=${intent}`;
      script.onload = () => resolve();
      script.onerror = () => reject('Error loading PayPal SDK.');
      document.head.appendChild(script);
    });
  };

  const renderPayPalButtons = (intent) => {
    const container = document.getElementById('payment_options');
    if (!container) return;

    container.innerHTML = '';
    console.log('Orders State Before PayPal:', orders); 

    window.paypal.Buttons({
      onClick: () => console.log('PayPal button clicked'),
      style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'paypal',
      },
      createOrder: () => {
        const intent = 'CAPTURE'; // Define the intent locally
        console.log('Intent being sent to backend:', intent);
        return axios.post('/paypal/create_order', { intent })
          .then(response => response.data.id)
          .catch(error => {
            throw error;
          });
      },
      onApprove: () => {
        // Find all orders in the cart
        console.log('onApprove triggered'); // Basic log
        const inCartOrders = orders.filter(order => order.status === 'in_cart');
        console.log('Orders in Cart:', inCartOrders);
    
        // Update the status of each order to 'completed'
        Promise.all(
            inCartOrders.map(order =>
                axios.put(`/orders/${order._id}/complete`) // Call the backend route for each order
                .then(response => console.log('Order Updated:', response.data)) // Log each response

            )
        )
            .then(() => {
                console.log('All orders marked as completed.');
                setAlerts('Thank you for your payment! Your order has been completed successfully.');
    
                // Update the state directly to avoid refetching
                const updatedOrders = orders.map(order =>
                    order.status === 'in_cart' ? { ...order, status: 'completed' } : order
                );
                setOrders(updatedOrders);
            })
            .catch(error => {
                console.error('Error completing orders:', error);
                setAlerts('An error occurred while updating your order. Please try again.');
            });
    },
    
      onCancel: () => setAlerts("Order cancelled!"),
      onError: () => setAlerts("An error occurred with PayPal."),
    }).render('#payment_options');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="left-section">
          <button
            className="back-button"
            onClick={() => navigate('/')} // Navigate to root
          >
            Back to Home
          </button>
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
          <div id="payment_options"></div>
        </div>
        <div className="right-section">
          <div className="orders-section">
            <h2>Your Orders</h2>
            {orders.filter(order => order.status === 'in_cart').map((order, index) => (
              <div className="order-item" key={index}>
                {order.imageUrl && (
                  <img
                    src={order.imageUrl}
                    alt={`Order ${order._id}`}
                    className="order-item-image"
                  />
                )}
                <h4>Order #{order._id}</h4>
                <p>Quantity: {order.quantity}</p>
                <p>Total Price: ${order.total_price}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {alerts && <div className="alerts">{alerts}</div>}
    </div>
  );
};

export default Checkout;