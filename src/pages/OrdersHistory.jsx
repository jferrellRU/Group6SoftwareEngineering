import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Home.css";
import Header from "../components/Header";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null); // To store user data (e.g., isAdmin)
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch completed orders and check if user is an admin
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await fetch("/users/check-auth", {
          credentials: "include", // Ensure session info is included
        });
        const data = await response.json();

        if (data.success && data.user) {
          setUser(data.user);
          if (data.user.isAdmin === false) {
            // Redirect to home if not an admin
            navigate("/");
          } else {
            // Fetch orders if the user is an admin
            fetchOrders();
          }
        } else {
          // Redirect to home if not authenticated
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/"); // Redirect to home on error
      }
    };

    checkUserStatus(); // Run the function on component mount
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/orders");
      const data = await response.json();
      console.log("Fetched orders:", data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

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
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length > 0 ? (
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
            <p>No completed orders found.</p>
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
