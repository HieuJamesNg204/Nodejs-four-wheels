import Car from '../models/car.js';
import fs from 'fs';

export const getAllCars = async (req, res) => {
    try {
        if (Object.keys(req.query).length === 0) {
            const cars = await Car.find().populate('automaker');
            res.json(cars);
        } else {
            const minPrice = parseFloat(req.query.minPrice) || 0;
            const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

            const cars = await Car.find({
                price: { $gte: minPrice, $lte: maxPrice }
            }).populate('automaker');

            res.json(cars);
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).populate('automaker');
        if (car) {
            res.json(car);
        } else {
            res.status(404).send('Car not found');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const getCarsByAutomaker = async (req, res) => {
    try {
        const { automaker } = req.params;

        if (Object.keys(req.query).length === 0) {
            const cars = await Car.find({ automaker }).populate('automaker');
            res.json(cars);
        } else {
            const minPrice = parseFloat(req.query.minPrice) || 0;
            const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

            const cars = await Car.find({
                automaker,
                price: { $gte: minPrice, $lte: maxPrice }
            }).populate('automaker');

            res.json(cars);
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const addNewCar = async (req, res) => {
    try {
        const { 
            automaker, model, 
            year, bodyStyle, price, 
            colour, engineType, transmission, 
            mileage, seatingCapacity 
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const car = new Car({ 
            automaker, model, 
            year, bodyStyle, price, 
            colour, engineType, transmission, 
            mileage, seatingCapacity,
            image: req.file.path
        });
        
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const updateCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).send('Car not found');
        }

        const { 
            automaker, model, 
            year, bodyStyle, price, 
            colour, engineType, transmission, 
            mileage, seatingCapacity 
        } = req.body;

        let updatedCar;

        if (req.file) {
            fs.unlinkSync(car.image);
            updatedCar = await Car.findByIdAndUpdate(
                req.params.id,
                { 
                    automaker, model, 
                    year, bodyStyle, price, 
                    colour, engineType, transmission, 
                    mileage, seatingCapacity,
                    image: req.file.path
                },
                { new: true }
            );
        } else {
            updatedCar = await Car.findByIdAndUpdate(
                req.params.id,
                { 
                    automaker, model, 
                    year, bodyStyle, price, 
                    colour, engineType, transmission, 
                    mileage, seatingCapacity
                },
                { new: true }
            );
        }

        res.json(updatedCar);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (car) {
            fs.unlinkSync(car.image);
            res.status(204).send();
        } else {
            res.status(404).send('Car not found');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};