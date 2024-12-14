import React, { useEffect, useState } from "react";
import '../styles/Header.css';
import logo from '../assets/DizzyDesign.png'; // Import the image correctly

const Header = () => {
  const [authenticated, setAuthenticated] = useState(null); // Null to show loading state
  const [user, setUser] = useState(null); // To store user details

  const loggedIn = async () => {
    try {
      const response = await fetch('/users/check-auth', {
        credentials: 'include', // Include cookies if using session-based auth
      });
      const data = await response.json();
      console.log(data);

      if (data.success && data.user) {
        setAuthenticated(true);
        setUser(data.user); // Store user details if needed
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setAuthenticated(false); // Default to unauthenticated on error
    }
  };

  useEffect(() => {
    loggedIn(); // Call the named function inside useEffect
  }, []);

  if (authenticated === null) {
    return <button>Loading...</button>;
  }

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Dizzy Design Logo" />
      </div>
      <div className="subtitle">
        DISCOVER THE BEST PRODUCTS AT UNBEATABLE PRICES.
      </div>
      <nav>
        <ul>
          <li><a href="/">HOME</a></li>
          <li><a href="/cart">CART</a></li>
          <li>
            <a href={authenticated ? "/profile" : "/login"}>
              {authenticated ? "Profile" : "Login"}
            </a>
          </li>
          <li><a href="/search">SEARCH</a></li>

          {/* Conditional rendering of Pending Orders for Admin users */}
          {authenticated && user?.isAdmin && (
            <li><a href="/orders-history">Order History</a></li>
          )}
          {/* Conditional rendering of Pending Orders for Admin users */}
          {authenticated && user?.isAdmin && (
            <li><a href="/add-product">Add Inventory</a></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
