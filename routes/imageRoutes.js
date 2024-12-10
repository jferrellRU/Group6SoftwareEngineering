const express = require("express");
const router = express.Router();
const Image = require("../models/imageModel"); // Import your Image model

// GET: Retrieve an image by ID
router.get('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send("Image not found");
        }
        res.set("Content-Type", "image/jpeg"); // Set the appropriate content type
        res.send(image.file); // Send the image file
    } catch (err) {
        res.status(500).json({ error: "Error retrieving image: " + err.message });
    }
});

// POST: Upload an image
router.post("/", async (req, res) => {
    const { myFile, product } = req.body; // Extract fields from the request body
    if (!myFile) {
        return res.status(400).json({ message: "No file provided" });
    }
    try {
        const newImage = await Image.create({ file: myFile, product });
        await newImage.save();
        res.status(201).json({ msg: "New image uploaded!" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

module.exports = router;