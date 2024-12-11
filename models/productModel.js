const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    // from the login page, the user
    // owner is assigned to a user upon creat
    name: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    stockQuantity: { type: Number, required: false },
}, { timestamps: true });

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;