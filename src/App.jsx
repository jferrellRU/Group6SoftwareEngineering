import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import AddProduct from './pages/AddProduct'
import ProductDetails from './pages/ProductDetails';
import EditProduct from './pages/EditProduct';
import Search from './pages/Search';
import OrdersHistory from './pages/OrdersHistory';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set Home as the default route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/product-details" element={<ProductDetails />} />"
        <Route path="/edit-product" element={<EditProduct />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/orders-history" element={<OrdersHistory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

      </Routes>
    </Router>
  );
};

export default App;