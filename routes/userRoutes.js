const express = require('express');
const router = express.Router();
const userHandler = require('../handlers/userHandler');

router.get('/', userHandler.getUsers);
router.get('/:userId', userHandler.getUserById);
router.post('/', userHandler.createUser);
router.put('/:userId', userHandler.updateUser);
router.delete('/:userId', userHandler.deleteUser);

module.exports = router;