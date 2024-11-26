const db = require('../config/db.config.js'); // Import the database configuration

// Fetch all orders
exports.getAllOrders = (callback) => {
    const query = 'SELECT * FROM orders';
    db.query(query, callback);
};

// Fetch all canceled orders
exports.getCanceledOrders = (callback) => {
    const query = 'SELECT * FROM orders WHERE status = "canceled"';
    db.query(query, callback);
};

// Cancel an order by ID
exports.cancelOrderById = (id, callback) => {
    const query = 'UPDATE orders SET status = "canceled" WHERE id = ?';
    db.query(query, [id], callback);
};

// Fetch user name who placed the order by order ID
exports.getUserNameByOrderId = (id, callback) => {
    const query = 'SELECT user_name FROM orders WHERE id = ?';
    db.query(query, [id], callback);
};

// Fetch quantity of items in an order by order ID
exports.getQuantityByOrderId = (id, callback) => {
    const query = 'SELECT quantity FROM orders WHERE id = ?';
    db.query(query, [id], callback);
};

// Fetch total price of an order by order ID
exports.getTotalPriceByOrderId = (id, callback) => {
    const query = 'SELECT total_price FROM orders WHERE id = ?';
    db.query(query, [id], callback);
};

// Fetch status of an order by order ID
exports.getStatusByOrderId = (id, callback) => {
    const query = 'SELECT status FROM orders WHERE id = ?';
    db.query(query, [id], callback);
};
