const db = require('../config/db'); // Assuming you have a db configuration file

// Get all products
exports.getAllProducts = (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Get a single product by ID
exports.getProductById = (req, res) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(results[0]);
    });
};

// Create a new product
exports.createProduct = (req, res) => {
    const { name, price, description } = req.body;
    const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
    db.query(query, [name, price, description], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Product created', productId: results.insertId });
    });
};

// Update an existing product
exports.updateProduct = (req, res) => {
    const { name, price, description } = req.body;
    const query = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
    db.query(query, [name, price, description, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated' });
    });
};

// Delete a product
exports.deleteProduct = (req, res) => {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    });
};