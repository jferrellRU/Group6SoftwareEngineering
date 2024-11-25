const express = require('express');
const { getUserById, createUser } = require('../models/userModel');

const router = express.Router();

// Route to get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to create a user
router.post('/', async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        const userId = await createUser(name, email, password, address);
        res.status(201).send({ userId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
