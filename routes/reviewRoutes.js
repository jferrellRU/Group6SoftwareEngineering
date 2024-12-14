const express = require('express');
const router = express.Router();
const reviewHandler = require('../handlers/reviewHandler');

router.get('/', reviewHandler.getAllReviews);
router.get('/product/:productId', reviewHandler.getReviewsByProductId);
router.get('/user/:userId', reviewHandler.getReviewsByUserId);
router.post('/', reviewHandler.createReview);
router.put('/:id', reviewHandler.updateReview);
router.delete('/:id', reviewHandler.deleteReview);

module.exports = router;