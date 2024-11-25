import Order from "../models/order.js";
import User from "../models/user.js";
import Car from "../models/car.js";

export const addNewOrder = async (req, res) => {
    try {
        const { user } = await User.findById(req.user.id).select('-password');
        const { car, shippingAddress } = req.body;
        const order = new Order({ user: user.id, car: car.id, shippingAddress, totalPrice });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json("An error occurred while processing your request");
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json("An error occurred while processing your request");
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json("Order not found");
        }
    } catch (error) {
        res.status(500).json("An error occurred while processing your request");
    }
};

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            const { car, shippingAddress } = req.body;
            const { totalPrice } = car.price;
            order.car = car;
            order.shippingAddress = shippingAddress;
            order.totalPrice = totalPrice;
            await order.save();
            res.json(order);
        } else {
            res.status(404).json("Order not found");
        }
    } catch (error) {
        res.status(500).json("An error occurred while processing your request");
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.remove();
            res.status(204).send();
        } else {
            res.status(404).json("Order not found");
        }
    } catch (error) {
        res.status(500).json("An error occurred while processing your request");
    }
};