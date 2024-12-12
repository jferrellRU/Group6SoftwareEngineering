const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const router = express.Router();

// Add product to cart
router.post('/add-to-cart', async (req, res) => {
    const { productId, quantity, userId } = req.body; // Assuming userId is passed from frontend
    // const userId = req.user.id; // Uncomment if user authentication is set up

    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Find an existing pending order for the user
        let order = await Order.findOne({ user_id: userId, status: 'pending' });

        if (!order) {
            // Create a new pending order if none exists
            order = new Order({
                user_id: userId,
                products: [{
                    product_id: productId,
                    quantity: quantity,
                    price: product.price,
                }],
                total_price: product.price * quantity,
                status: 'pending', // Ensure it's a pending order
            });
        } else {
            // Update existing order with new product
            const existingProduct = order.products.find(p => p.product_id.toString() === productId);

            if (existingProduct) {
                // Update the quantity of the existing product
                existingProduct.quantity += quantity;
                order.total_price += product.price * quantity;
            } else {
                // Add new product to order
                order.products.push({
                    product_id: productId,
                    quantity: quantity,
                    price: product.price,
                });
                order.total_price += product.price * quantity;
            }
        }

        // Save the order
        await order.save();
        res.status(200).json({ success: true, message: 'Product added to cart successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
