const express = require('express');
const router = express.Router();
const productHandler = require('../handlers/productHandler');

router.get('/', productHandler.getAllProducts);
router.get('/:id', productHandler.getProductById);
router.post('/', productHandler.createProduct);
router.put('/:id', productHandler.updateProduct);
router.delete('/:id', productHandler.deleteProduct);
router.get("/search", async (req, res) => {
    const { query } = req.query; // `query` is the search term from the front-end
    try {
      // Perform a case-insensitive search using MongoDB's $regex
      const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive regex for name
          { description: { $regex: query, $options: "i" } } // Case-insensitive regex for description
        ]
      });
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching products" });
    }
  });

module.exports = router;