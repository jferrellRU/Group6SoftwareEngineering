const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required:  true},
    isVerified: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
    address: { type: String, required: false },
    inCart: { type: Array, default: [] }, // this is an array that will have productID's pushed to it
    resetPasswordToken:String,
    resetPasswordExpiresAt: Date,
    verificationToken:String,
    verificationTokenExpiresAt: Date
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;