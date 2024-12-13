const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); // Make sure to import the Product model
const productHandler = require('../handlers/productHandler');

// Place the search route BEFORE other routes to avoid conflicts
router.get("/search", async (req, res) => {
    const { query } = req.query;
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        });
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching products" });
    }
});

router.get('/', productHandler.getAllProducts);
router.get('/:id', productHandler.getProductById);
router.post('/', productHandler.createProduct);
router.put('/:id', productHandler.updateProduct);
router.delete('/:id', productHandler.deleteProduct);

module.exports = router;