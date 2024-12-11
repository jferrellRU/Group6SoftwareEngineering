const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    stockQuantity: { type: Number, required: false },
    imageURL: { type: String, required: false },
    image: { type: Buffer, required: false }
}, { timestamps: true });

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;