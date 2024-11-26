const db = require('../config/db.config.js'); // Database configuration file

// View all orders (including canceled orders)
exports.viewOrders = (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// View only canceled orders
exports.viewCanceledOrders = (req, res) => {
    const query = 'SELECT * FROM orders WHERE status = "canceled"';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Cancel an order
exports.cancelOrder = (req, res) => {
    const query = 'UPDATE orders SET status = "canceled" WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order canceled' });
    });
};

/////////////////////////////////////////////////////////////////
///////Code below may be redundant because of the userhandler,
///////don't know if I shoudl use a userHnalder function instead.
//////////////////////////////////////////////////////////////////

// View the name of the user who placed the order
exports.viewUser = (req, res) => {
    const query = 'SELECT user_name FROM orders WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(results[0]);
    });
}

// View quantity of items in an order
exports.viewQuantity = (req, res) => {
    const query = 'SELECT quantity FROM orders WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(results[0]);
    });
};

// View total price of an order
exports.viewTotalPrice = (req, res) => {
    const query = 'SELECT total_price FROM orders WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(results[0]);
    });
};

// View status of an order
exports.viewOrderStatus = (req, res) => {
    const query = 'SELECT status FROM orders WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(results[0]);
    });
};
