import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Header from "../components/Header";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);

  // Fetch completed orders from the backend
  useEffect(() => {
    fetch("/orders")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched orders:", data);
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div>
      {/* Header Section */}
      <header>
        <Header />
      </header>

      {/* Orders Section */}
      <section id="orders">
        <h2>Your Completed Orders</h2>
        <div className="order-grid">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.orderID} className="order-card">
                <img
                  src={order.image}
                  alt={order.productName}
                  className="order-image"
                />
                <div className="order-details">
                  <h3>{order.productName}</h3>
                  <p>Price: ${order.total_price}</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Status: {order.status}</p>
                  <button
                    className="cancel-button"
                    onClick={() => handleCancel(order.orderID)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading orders...</p>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <p>&copy; 2024 Dizzy Designs. All rights reserved.</p>
      </footer>
    </div>
  );

  // Handle cancel order
  function handleCancel(orderID) {
    // Logic to cancel the order
    console.log(`Order with ID ${orderID} cancelled.`);
  }
};

export default OrdersHistory;
