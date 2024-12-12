const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isSeller: { type: Boolean, default: false },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;