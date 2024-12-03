const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    imageURL: { type: String, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;