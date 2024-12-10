const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    file: String,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
});

module.exports = mongoose.model("Image", imageSchema);
