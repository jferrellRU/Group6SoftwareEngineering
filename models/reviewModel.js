const mongoose = require('mongoose');

// Define the Review schema
const reviewSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the Users collection
        required: true 
    },
    userName: { 
        type: String, 
        required: true 
    },
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Reference to the Products collection
        required: true 
    },
    productName: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, // Ensure rating is at least 1
        max: 5  // Ensure rating is at most 5
    },
    comment: { 
        type: String, 
        default: '' // Optional field for comments
    },
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the Review model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
