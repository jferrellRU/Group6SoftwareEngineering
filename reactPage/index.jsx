import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the updated import
import AddProduct from './addproduct';

// Get the root DOM element
const rootElement = document.getElementById('root');

// Use ReactDOM.createRoot to render the application
const root = ReactDOM.createRoot(rootElement);
root.render(<AddProduct />);