const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    // from the login page, the user
    // owner is assigned to a user upon creat
    name: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    stockQuantity: { type: Number, required: false },
    inCart: { type: Boolean, default: false },
    orders: { type: Boolean, default: false },
    // false ON "ORDER"
    quantity: { type: Number, required: false },
    status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
    total_price: { type: Number, required: false },
    imageID: {type: String, required: false},

}, { timestamps: true });

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// product is also cart

