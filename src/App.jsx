import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetails';
import EditProduct from './pages/EditProduct';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/add-product" element={<AddProduct />} />
        {/* This is the wildcard route for handling 404 errors */}
        <Route path="*" element={<h1>Not Found</h1 />} />
        {/* Ensure the route accepts a dynamic product ID */}
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/edit-product" element={<EditProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
