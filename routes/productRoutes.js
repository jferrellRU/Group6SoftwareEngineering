const url = require('url');
const productHandler = require('../handlers/productHandler');

const productRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.toLowerCase();
    const method = req.method;

    // Routing for products
    if (path === '/products' && method === 'GET') {
        // GET /products - Get all products
        productHandler.getAllProducts(req, res);
    } else if (path.match(/^\/products\/\d+$/) && method === 'GET') {
        // GET /products/:id - Get product by ID
        const productId = path.split('/')[2]; // Extract product ID from URL
        productHandler.getProductById(req, res, productId);
    } else if (path === '/products' && method === 'POST') {
        // POST /products - Create a new product
        productHandler.createProduct(req, res);
    } else if (path.match(/^\/products\/\d+$/) && method === 'PUT') {
        // PUT /products/:id - Update product by ID
        const productId = path.split('/')[2]; // Extract product ID from URL
        productHandler.updateProduct(req, res, productId);
    } else if (path.match(/^\/products\/\d+$/) && method === 'DELETE') {
        // DELETE /products/:id - Delete product by ID
        const productId = path.split('/')[2]; // Extract product ID from URL
        productHandler.deleteProduct(req, res, productId);
    } else {
        // If the route is not matched, respond with 404
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
};

module.exports = productRoutes;
