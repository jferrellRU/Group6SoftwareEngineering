const url = require('url');
const ordersHandler = require('../handlers/ordersHandler');

const orderRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parse the URL
    const path = parsedUrl.pathname.toLowerCase(); // Normalize path to lowercase
    const method = req.method; // Get HTTP method

    // Routing for orders
    if (path === '/orders' && method === 'GET') {
        // GET /orders - View all orders
        ordersHandler.viewOrders(req, res);
    } 
    
    else if (path === '/orders/canceled' && method === 'GET') {
        // GET /orders/canceled - View canceled orders
        ordersHandler.viewCanceledOrders(req, res);
    } 

    else if (path.match(/^\/orders\/cancel\/\d+$/) && method === 'PUT') {
        // PUT /orders/cancel/:id - Cancel an order
        const orderId = path.split('/')[3]; // Extract order ID from the URL
        ordersHandler.cancelOrder(req, res, orderId);
    }
    
    /////////////////////////////////////////////////////////////////
    ///////Code below may be redundant because of the userhandler,
    ///////don't know if I should use a userHandler function instead.
    //////////////////////////////////////////////////////////////////
    else if (path.match(/^\/orders\/user\/\d+$/) && method === 'GET') {
        // GET /orders/user/:id - View the name of the user who placed the order
        const orderId = path.split('/')[3]; // Extract order ID from the URL
        ordersHandler.viewUser(req, res, orderId); // Call viewUser function
    } 

    else if (path.match(/^\/orders\/\d+\/quantity$/) && method === 'GET') {
        // GET /orders/:id/quantity - View order quantity
        const orderId = path.split('/')[2]; // Extract order ID from the URL
        ordersHandler.viewQuantity(req, res, orderId);
    } 

    else if (path.match(/^\/orders\/\d+\/total$/) && method === 'GET') {
        // GET /orders/:id/total - View order total price
        const orderId = path.split('/')[2]; // Extract order ID from the URL
        ordersHandler.viewTotalPrice(req, res, orderId);
    }

    else if (path.match(/^\/orders\/\d+\/status$/) && method === 'GET') {
        // GET /orders/:id/status - View order status
        const orderId = path.split('/')[2]; // Extract order ID from the URL
        ordersHandler.viewOrderStatus(req, res, orderId);
    } 

    else {
        // If no route matches, return 404
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
};

module.exports = orderRoutes;
