const express = require('express');
const router = express.Router();
const userHandler = require('../handlers/userHandler');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); // Import the auth middleware


router.get('/', userHandler.getUsers);
router.get('/:userId', userHandler.getUserById);
router.post('/', userHandler.createUser);
router.put('/:userId', userHandler.updateUser);
router.delete('/:userId', userHandler.deleteUser);
router.post('/login', userHandler.login);
router.post('/me', auth, userHandler.me);


module.exports = router;