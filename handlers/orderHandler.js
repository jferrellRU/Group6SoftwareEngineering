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

const addProductAsOrder = async (req, res) => {
    const { user_name, productID, productName, quantity, total_price } = req.body;

    try {
        const newOrder = new Order({
            user_name,
            productID,
            productName,
            quantity,
            total_price,
            status: 'in_cart',
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteOrder = (req, res) => {
    handleResponse(res, Order.findByIdAndDelete(req.params.id));
};


const updateOrderStatus = async (userName, newStatus) => {
    try {
        await Order.updateMany({ user_name: userName, status: 'in_cart' }, { status: newStatus });
    }
    catch (error) {
        console.error('Error updating order status:', error);
        return Promise.reject(error);
    }
    console.log(`Updating order status for user: ${userName} to ${newStatus}`);
    return Promise.resolve(); // Replace with real database update
};

const handleCheckout = async (req, res) => {
    const userName = req.body.user_name; // Assumes user_name is sent in the request body

    if (!userName) {
        return res.status(400).send({ error: 'User name is required' });
    }

    try {
        await updateOrderStatus(userName, 'in_checkout');

        res.status(200).send({ message: 'Checkout successful!' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).send({ error: 'Failed to process checkout' });
    }
};




module.exports = {
    getAllOrders,
    getCanceledOrders,
    cancelOrder,
    getUserName,
    getOrderQuantity,
    getTotalPrice,
    getOrderStatus,
    addProductAsOrder,
    deleteOrder,
    handleCheckout
};