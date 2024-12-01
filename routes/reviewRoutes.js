const url = require('url');
const reviewHandler = require('../handlers/reviewHandler');

const reviewRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.toLowerCase();
    const method = req.method;

    // Routing for reviews
    if (path === '/reviews' && method === 'GET') {
        // GET /reviews - Get all reviews
        reviewHandler.getAllReviews(req, res);
    } else if (path.match(/^\/reviews\/product\/\d+$/) && method === 'GET') {
        // GET /reviews/product/:productId - Get reviews for a specific product
        const productId = path.split('/')[3]; // Extract productId from URL
        reviewHandler.getReviewsByProductId(req, res, productId);
    } else if (path.match(/^\/reviews\/\d+$/) && method === 'GET') {
        // GET /reviews/:id - Get review by ID
        const reviewId = path.split('/')[2]; // Extract reviewId from URL
        reviewHandler.getReviewById(req, res, reviewId);
    } else if (path === '/reviews' && method === 'POST') {
        // POST /reviews - Create a new review
        reviewHandler.createReview(req, res);
    } else if (path.match(/^\/reviews\/\d+$/) && method === 'PUT') {
        // PUT /reviews/:id - Update a review by ID
        const reviewId = path.split('/')[2]; // Extract reviewId from URL
        reviewHandler.updateReview(req, res, reviewId);
    } else if (path.match(/^\/reviews\/\d+$/) && method === 'DELETE') {
        // DELETE /reviews/:id - Delete a review by ID
        const reviewId = path.split('/')[2]; // Extract reviewId from URL
        reviewHandler.deleteReview(req, res, reviewId);
    } else {
        // If the route is not matched, respond with 404
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
};

module.exports = reviewRoutes;
