import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Header from "../components/Header";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch items in cart from the backend
  useEffect(() => {
    fetch("/orders?status=in_cart")
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  return (
    <div>
      {/* Header Section */}
      <header>
        <Header />
      </header>

      <div className="cart-container">
        {/* Left Section: Cart Items */}
        <div className="cart-items">
          <h2>Your Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.orderID} className="cart-item-card">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.productName}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Cart is empty.</p>
          )}
        </div>

        {/* Top Right: Check Out Button */}
        {cartItems.length > 0 && (
          <div className="checkout-section">
            <button className="checkout-button">Check Out</button>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer>
        <p>&copy; 2024 Online Retail Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Cart;
