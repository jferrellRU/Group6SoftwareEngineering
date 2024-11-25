const db = require('../db/setup'); // Assuming you have a db connection setup

const getAllProducts = async () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Products';
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const getProductById = async (productId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Products WHERE ProductID = ?';
        db.query(query, [productId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

const createProduct = async (product) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Products (Name, Description, Price, StockQuantity, ImageURL) VALUES (?, ?, ?, ?, ?)';
        const { name, description, price, stockQuantity, imageURL } = product;
        db.query(query, [name, description, price, stockQuantity, imageURL], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve({ ProductID: results.insertId, ...product });
        });
    });
};

const updateProduct = async (productId, updatedProduct) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Products SET Name = ?, Description = ?, Price = ?, StockQuantity = ?, ImageURL = ? WHERE ProductID = ?';
        const { name, description, price, stockQuantity, imageURL } = updatedProduct;
        db.query(query, [name, description, price, stockQuantity, imageURL, productId], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.affectedRows === 0) {
                return reject(new Error('Product not found'));
            }
            resolve({ ProductID: productId, ...updatedProduct });
        });
    });
};

const deleteProduct = async (productId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Products WHERE ProductID = ?';
        db.query(query, [productId], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.affectedRows === 0) {
                return reject(new Error('Product not found'));
            }
            resolve({ message: 'Product deleted successfully' });
        });
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
