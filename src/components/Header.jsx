import React from "react";
import '../styles/Header.css';
import logo from '../assets/DizzyDesign.png'; // Import the image correctly

const Header = () => {
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
          <li><a href="cart">CART</a></li>
          <li><a href="login">LOGIN</a></li>
          <li><a href="/search">SEARCH</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;