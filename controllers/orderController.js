import Order from '../models/order.js';
import Car from '../models/car.js';

export const addNewOrder = async (req, res) => {
    try {
        const { car, shippingAddress } = req.body;
        
        const existingCar = await Car.findById(car);
        if (!existingCar) {
            return res.status(404).json({ message: 'Car not found' });
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
        res.status(500).send('An error occurred while processing your request');
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders 
            = Object.keys(req.query).length === 0 ? await Order.find()
                .populate('user').populate({
                    path: 'car',
                    populate: {
                        path: 'automaker',
                        model: 'Automaker'
                    }
                }).sort({ orderDate: 1 })
            : await Order.find({ status: req.query.status })
                .populate('user').populate({
                    path: 'car',
                    populate: {
                        path: 'automaker',
                        model: 'Automaker'
                    }
                }).sort({ orderDate: 1 });
        res.json(orders);
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const getAllOrdersByUser = async (req, res) => {
    try {
        const orders 
            = Object.keys(req.query).length === 0 ? await Order.find({ user: req.user.id })
                .populate('user').populate({
                    path: 'car',
                    populate: {
                        path: 'automaker',
                        model: 'Automaker'
                    }
                }).sort({ orderDate: 1 })
            : await Order.find({ user: req.user.id, status: req.query.status })
                .populate('user').populate({
                    path: 'car',
                    populate: {
                        path: 'automaker',
                        model: 'Automaker'
                    }
                }).sort({ orderDate: 1 });
        res.json(orders);
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
}

export const getOrderById = async (req, res) => {
    const userRole = req.user.role;
    const userId = req.user.id;

    try {
        const order = await Order.findById(req.params.id).populate('user').populate({
            path: 'car',
            populate: {
                path: 'automaker',
                model: 'Automaker'
            }
        });
        if (!order) {
            res.status(404).json('Order not found');
        }

        if (userRole === 'customer' && order.user.toString() !== userId) {
            return res.status(403).json('Access denied');
        }

        res.json(order);
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const setOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate({
            path: 'car',
            populate: {
                path: 'automaker',
                model: 'Automaker'
            }
        });
        if (order) {
            const { status } = req.body;
            order.status = status;
            await order.save();

            if (order.status === 'delivered') {
                const car = await Car.findById(order.car);
                if (car) {
                    car.status = 'sold';
                    await car.save();
                }
            }

            res.json(order);
        } else {
            res.status(404).json('Order not found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const updateOrderFee = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate({
            path: 'car',
            populate: {
                path: 'automaker',
                model: 'Automaker'
            }
        });
        
        if (order) {
            const { shippingFee } = req.body;
            order.shippingFee = shippingFee;
            order.totalPrice = order.car.price + shippingFee;
            await order.save();
            res.json(order);
        } else {
            res.status(404).json('Order not found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.remove();
            res.status(204).send();
        } else {
            res.status(404).json('Order not found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};