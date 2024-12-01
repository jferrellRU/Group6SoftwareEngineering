const db = require('../config/db.config.js');

// Get all reviews
exports.getAllReviews = (req, res) => {
    const query = 'SELECT * FROM reviews';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Get reviews for a specific product
exports.getReviewsByProductId = (req, res) => {
    const query = 'SELECT * FROM reviews WHERE productId = ?';
    db.query(query, [req.params.productId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Get a single review by ID
exports.getReviewById = (req, res) => {
    const query = 'SELECT * FROM reviews WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(results[0]);
    });
};

// Create a new review
exports.createReview = (req, res) => {
    const { productId, reviewer, rating, comment } = req.body;
    const query = 'INSERT INTO reviews (productId, reviewer, rating, comment) VALUES (?, ?, ?, ?)';
    db.query(query, [productId, reviewer, rating, comment], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Review created', reviewId: results.insertId });
    });
};

// Update an existing review
exports.updateReview = (req, res) => {
    const { reviewer, rating, comment } = req.body;
    const query = 'UPDATE reviews SET reviewer = ?, rating = ?, comment = ? WHERE id = ?';
    db.query(query, [reviewer, rating, comment, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated' });
    });
};

// Delete a review
exports.deleteReview = (req, res) => {
    const query = 'DELETE FROM reviews WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted' });
    });
};
