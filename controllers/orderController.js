import Order from "../models/order.js";
import Car from "../models/car.js";

export const addNewOrder = async (req, res) => {
    try {
        const { car, shippingAddress } = req.body;
        
        const existingCar = await Car.findById(car);
        if (!existingCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        const order = new Order({ 
            user: req.user.id, 
            car: car, 
            shippingAddress, 
            shippingFee: 0,
            totalPrice: existingCar.price,
            paymentMethod: 'Cash',
            orderDate: new Date()
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json("An error occurred while processing your request");
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = Object.keys(req.query).length === 0 ? await Order.find() : await Order.find({ status: req.query.status });
        res.json(orders);
    } catch (error) {
        res.status(500).json("An error occurred while processing your request");
    }
};

export const getAllOrdersByUser = async (req, res) => {
    try {
        const orders = Object.keys(req.query).length === 0 ? await Order.find({ user: req.user.id })
            : await Order.find({ user: req.user.id, status: req.query.status });
        res.json(orders);
    } catch (error) {
        res.status(500).json("An error occurred while processing your request");
    }
}

export const getOrderById = async (req, res) => {
    const userRole = req.user.role;
    const userId = req.user.id;

    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json("Order not found");
        }

        if (userRole === "customer" && order.user.toString() !== userId) {
            return res.status(403).json("Access denied");
        }

        res.json(order);
    } catch (error) {
        res.status(500).json("An error occurred while processing your request");
    }
};

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            const { status, shippingFee } = req.body;
            order.status = status;
            order.shippingFee = shippingFee;
            order.totalPrice += shippingFee;
            await order.save();

            if (order.status === "delivered") {
                await Car.findByIdAndDelete(order.car);
            }

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