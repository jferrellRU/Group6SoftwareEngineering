const Review = require('../models/reviewModel'); // Import the Review model

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find(); // Fetch all reviews
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get reviews for a specific product
const getReviewsByProductId = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId }); // Fetch reviews by product ID
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get reviews for a specific user
const getReviewsByUserId = async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId }); // Fetch reviews by user ID
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new review
const createReview = async (req, res) => {
    try {
        const { userId, userName, productId, productName, rating, comment } = req.body;
        const newReview = new Review({ userId, userName, productId, productName, rating, comment }); // Create a new review
        const savedReview = await newReview.save(); // Save it to the database
        res.status(201).json({ message: 'Review created', review: savedReview });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing review
const updateReview = async (req, res) => {
    try {
        const { rating, comment} = req.body;
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { rating, comment},
            { new: true } // Return the updated document
        );
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated', review: updatedReview });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id); // Delete review by ID
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllReviews,
    getReviewsByProductId,
    getReviewsByUserId,
    createReview,
    updateReview,
    deleteReview,
};