import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import AddProduct from './pages/AddProduct'
import ProductDetails from './pages/ProductDetails';
import EditProduct from './pages/EditProduct';

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
      </Routes>
    </Router>
  );
};

export default App;