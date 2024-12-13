const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;