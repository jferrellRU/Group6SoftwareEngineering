const http = require('http');
const url = require('url');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const PORT = process.env.PORT || 3000;

// Main server
const server = http.createServer((req, res) => {
    // Parse the incoming request URL
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.toLowerCase();

    // Pass the request and response to the appropriate routes based on the URL
    if (path.startsWith('/users')) {
        userRoutes(req, res);
    } else if (path.startsWith('/orders')) {
        orderRoutes(req, res);
    } else if (path.startsWith('/products')) {
        productRoutes(req, res);
    } else if (path.startsWith('/reviews')) {
        reviewRoutes(req, res);
    } else {
        // Default 404 response for unknown routes
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
