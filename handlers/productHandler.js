const Product = require('../models/productModel'); // Import the Product model

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single product by ID


// Function to get a product by its ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);  // Fetch product by ID
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getProductById };



// Create a new product
const createProduct = async (req, res) => {
    try {
        console.log('Received request body:', req.body); // Log the incoming data
        const newProduct = new Product(req.body); // Create a new product
        const savedProduct = await newProduct.save(); // Save it to the database
        console.log('Saved product:', savedProduct);
        res.status(201).json({ message: 'Product created', productId: savedProduct._id });
    } catch (err) {
        console.error('Error saving product:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description },
            { new: true } // Return the updated document
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Delete product by ID
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};