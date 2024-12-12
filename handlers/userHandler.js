const User = require('../models/userModel'); // Import the User model
const jwt = require('jsonwebtoken');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json({ message: 'Get all users', users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const user = await User.findById(userId); // Fetch the user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `Get user with ID: ${userId}`, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { name, email, password } = req.body; // Example fields
    try {
        const newUser = new User({ name, email, password }); // Create a new user instance
        const savedUser = await newUser.save(); // Save the user to the database
        res.status(201).json({ message: 'User created', user: savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updatedData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedData,
            { new: true } // Return the updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `User with ID: ${userId} updated`, user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const deletedUser = await User.findByIdAndDelete(userId); // Delete the user by ID
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `User with ID: ${userId} deleted` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
        res.send({ user, token });
    } catch (err) {
        res.status(500).send(err);
    }
};

const me = async (req, res) => {
    res.send(req.user);
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, login, me };