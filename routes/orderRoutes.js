const express = require('express');
const router = express.Router();
const orderHandler = require('../handlers/orderHandler');

router.get('/', orderHandler.getAllOrders);
router.get('/canceled', orderHandler.getCanceledOrders);
router.put('/:id/cancel', orderHandler.cancelOrder);
router.get('/:id/user', orderHandler.getUserName);
router.get('/:id/quantity', orderHandler.getOrderQuantity);
router.get('/:id/total-price', orderHandler.getTotalPrice);
router.get('/:id/status', orderHandler.getOrderStatus);

module.exports = router;