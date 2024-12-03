const db = require('../db/setup'); // Assuming you have a db connection setup

const getAllReviews = async () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Reviews';
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const getReviewsByProductId = async (productId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Reviews WHERE ProductID = ?';
        db.query(query, [productId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const getReviewsByUserId = async (userId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Reviews WHERE UserID = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const getReviewById = async (reviewId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Reviews WHERE ReviewID = ?';
        db.query(query, [reviewId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

const createReview = async (review) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Reviews (ProductID, Reviewer, Rating, Comment) VALUES (?, ?, ?, ?)';
        const { productId, reviewer, rating, comment } = review;
        db.query(query, [productId, reviewer, rating, comment], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve({ ReviewID: results.insertId, ...review });
        });
    });
};

const updateReview = async (reviewId, updatedReview) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Reviews SET Reviewer = ?, Rating = ?, Comment = ? WHERE ReviewID = ?';
        const { reviewer, rating, comment } = updatedReview;
        db.query(query, [reviewer, rating, comment, reviewId], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.affectedRows === 0) {
                return reject(new Error('Review not found'));
            }
            resolve({ ReviewID: reviewId, ...updatedReview });
        });
    });
};

const deleteReview = async (reviewId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Reviews WHERE ReviewID = ?';
        db.query(query, [reviewId], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.affectedRows === 0) {
                return reject(new Error('Review not found'));
            }
            resolve({ message: 'Review deleted successfully' });
        });
    });
};

module.exports = {
    getAllReviews,
    getReviewsByProductId,
    getReviewsByUserId,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};
