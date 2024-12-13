import React, { useEffect, useState } from "react";
import "../styles/Home.css"; // Reuse the styles from Home
import Header from "../components/Header";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("/orders?status=in_cart");
        if (!response.ok) {
          console.error("Failed to fetch cart items:", response.statusText);
          setError("Failed to load cart items. Please try again.");
          return;
        }

        const cartData = await response.json();

        // Fetch images for cart items
        const cartItemsWithImages = await Promise.all(
          cartData.map(async (item) => {
            if (item.imageID) {
              try {
                console.log(`Fetching image for item ${item._id} with imageID: ${item.imageID}`);
                const imageResponse = await fetch(`/images/${item.imageID}`);
                if (imageResponse.ok) {
                  const imageData = await imageResponse.json();
                  console.log(`Image fetched for item ${item._id}:`, imageData);
                  item.imageUrl = imageData.image; // Add the image URL to the cart item
                } else {
                  console.error(
                    `Failed to fetch image for cart item ${item._id}:`,
                    imageResponse.statusText
                  );
                }
              } catch (error) {
                console.error(
                  `Error fetching image for cart item ${item._id}:`,
                  error
                );
              }
            } else {
              console.warn(`No imageID for cart item ${item._id}`);
            }
            return item;
          })
        );

        setCartItems(cartItemsWithImages);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to load cart items. Please try again.");
      }
    };

    fetchCartItems();
  }, []);

  // Handle removing an item from the cart
  const handleRemove = (orderID) => {
    fetch(`/orders/${orderID}/remove`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        setCartItems(cartItems.filter((item) => item._id !== orderID));
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        setError("Failed to remove item. Please try again.");
      });
  };

  // Handle checkout
  const handleCheckout = () => {
    fetch("/orders/checkout", { method: "PUT" })
      .then((response) => response.json())
      .then(() => {
        alert("Checkout successful!");
        setCartItems([]); // Clear the cart
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        setError("Failed to process checkout. Please try again.");
      });
  };

  // Calculate the total price of the cart
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
          {error && <p className="error-message">{error}</p>}
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item-card">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/150"}
                  alt={item.productName || "Product"}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.productName}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Cart is empty.</p>
          )}
        </div>

        {/* Top Right: Check Out Section */}
        {cartItems.length > 0 && (
          <div className="checkout-section">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button onClick={handleCheckout} className="checkout-button">
              Check Out
            </button>
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