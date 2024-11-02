import Car from '../models/car.js';

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().populate('automaker');
        res.json(cars);
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
        const cars = await Car.find({ automaker }).populate('automaker');
        res.json(cars);
    } catch (error) {
        res.status(500).send('Server Error');
    }
}

export const getCarsByPriceRange = async (req, res) => {
    res.send('Hello World');
    // try {
    //     const minPrice = parseFloat(req.query.minPrice) || 0;
    //     const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

    //     const cars = await Car.find({
    //         price: { $gte: minPrice, $lte: maxPrice }
    //     }).populate('automaker');

    //     res.json(cars);
    // } catch (error) {
    //     res.status(500).json({
    //         error: error.message
    //     });
    // }
}

export const addNewCar = async (req, res) => {
    try {
        const { 
            automaker, model, 
            year, bodyStyle, price, 
            colour, engineType, transmission, 
            mileage, seatingCapacity 
        } = req.body;
        const car = new Car({ 
            automaker, model, 
            year, bodyStyle, price, 
            colour, engineType, transmission, 
            mileage, seatingCapacity 
        });
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const updateCar = async (req, res) => {
    try {
        const { 
            automaker, model, 
            year, bodyStyle, price, 
            colour, engineType, transmission, 
            mileage, seatingCapacity 
        } = req.body;
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            { 
                automaker, model, 
                year, bodyStyle, price, 
                colour, engineType, transmission, 
                mileage, seatingCapacity 
            },
            { new: true }
        );
        if (car) {
            res.json(car);
        } else {
            res.status(404).send('Car not found');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (car) {
            res.status(204).send();
        } else {
            res.status(404).send('Car not found');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};