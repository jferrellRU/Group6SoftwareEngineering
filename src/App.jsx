import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import AddProduct from './pages/AddProduct';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set Home as the default route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;