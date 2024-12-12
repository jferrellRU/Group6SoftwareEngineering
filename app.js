const express = require('express');
const path = require('path');
const cors = require('cors');  // Import CORS middleware
require('./config/db.config');

const app = express();
app.use(cors()); 
const PORT = process.env.PORT || 8000;

// Import routes
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const imageRoutes = require('./routes/imageRoutes');

// API routes
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/reviews', reviewRoutes);
app.use('/images', imageRoutes);


// Middleware to parse JSON and static files
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files 

app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/jpgs', express.static(path.join(__dirname, 'jpgs')));
app.use('/reactPage', express.static(path.join(__dirname, 'reactPage')));


// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the product details page
app.get('/productDetails.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'productDetails.html'));
});

// Serve add Product page
app.use('/addproduct', express.static(path.join(__dirname, 'public/react')));
app.get('/addproduct', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/react/index.html'));
});
//Serve delete/edit Product page
app.get('/editProduct', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editProduct.html'));
});
// Handle 404 for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ---

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
