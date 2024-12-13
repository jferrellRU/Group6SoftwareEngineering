const Order = require('../models/orderModel');

// Helper function to handle database interactions
const handleResponse = async (res, operation) => {
    try {
        const result = await operation;
        if (!result) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all orders (including canceled orders)
const getAllOrders = (req, res) => {
    handleResponse(res, Order.find());
};

// View only canceled orders
const getCanceledOrders = (req, res) => {
    handleResponse(res, Order.find({ status: 'canceled' }));
};

// Cancel an order
const cancelOrder = (req, res) => {
    handleResponse(res, Order.findByIdAndUpdate(req.params.id, { status: 'canceled' }, { new: true }));
};

// View the name of the user who placed the order
const getUserName = (req, res) => {
    handleResponse(res, Order.findById(req.params.id).select('userName'));
};

// View quantity of items in an order
const getOrderQuantity = (req, res) => {
    handleResponse(res, Order.findById(req.params.id).select('quantity'));
};

// View total price of an order
const getTotalPrice = (req, res) => {
    handleResponse(res, Order.findById(req.params.id).select('totalPrice'));
};

// View status of an order
const getOrderStatus = (req, res) => {
    handleResponse(res, Order.findById(req.params.id).select('status'));
};

module.exports = {
    getAllOrders,
    getCanceledOrders,
    cancelOrder,
    getUserName,
    getOrderQuantity,
    getTotalPrice,
    getOrderStatus,
};