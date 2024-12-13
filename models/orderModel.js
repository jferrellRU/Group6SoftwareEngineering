const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    productID: { type: String, required: true }, // Add this
    productName: { type: String, required: true }, // Add this
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, enum: [ 'in_cart', 'completed', 'canceled'], default: 'in_cart'},
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
