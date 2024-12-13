const Product = require('../models/productModel'); // Import the Product model

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}, 'name price stockQuantity imageID'); // Always include _id
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        // Find product by ID and populate the related image if needed
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching product:', err.message);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        console.log('Received request body:', req.body); // Log the incoming data

        const { name, price, description, stockQuantity, imageID } = req.body;

        // Ensure all necessary fields are present
        if (!name || !price || !description || !imageID) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newProduct = new Product({ name, price, description, stockQuantity, imageID });
        const savedProduct = await newProduct.save();
        console.log('Saved product:', savedProduct); // Log the saved product

        res.status(201).json({ message: 'Product created', productId: savedProduct._id });
    } catch (err) {
        console.error('Error creating product:', err.message);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, imageID, stockQuantity } = req.body;

        // Find and update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, imageID, stockQuantity },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated', product: updatedProduct });
    } catch (err) {
        console.error('Error updating product:', err.message);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        // Find and delete the product
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found or already deleted' });
        }

        res.status(200).json({ message: `Product with ID ${req.params.id} deleted successfully` });
    } catch (err) {
        console.error('Error deleting product:', err.message);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};