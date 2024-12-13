const express = require("express");
const router = express.Router();
const Image = require("../models/imageModel"); // Import your Image model
const mongoose = require("mongoose");

// GET: Retrieve an image by ID
router.get("/:id", async (req, res) => {
    try {
        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid image ID" });
        }

        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }

        // Return the image in JSON format (Base64 string)
        res.json({ image: image.file }); // Assuming the 'file' field contains the Base64 string
    } catch (err) {
        console.error("Error retrieving image:", err);
        res.status(500).json({ error: "Error retrieving image: " + err.message });
    }
});

// POST: Upload an image
router.post("/", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Request body is undefined" });
    }
    const { image, product } = req.body; // Update 'myFile' to 'image'
    if (!image) {
        return res.status(400).json({ message: "No file provided" });
    }
    try {
        const newImage = await Image.create({ file: image, product });
        await newImage.save();
        res.status(201).json({ msg: "New image uploaded!", image: newImage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;