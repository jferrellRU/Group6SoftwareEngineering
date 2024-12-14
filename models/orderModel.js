const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    productID: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, enum: [ 'none', 'in_cart', 'in_checkout', 'completed', 'canceled'], default: 'none' },
}, { timestamps: true });

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
