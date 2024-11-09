import Automaker from '../models/automaker.js';
import Car from '../models/car.js';
import fs from 'fs';

export const getAllAutomakers = async (req, res) => {
    try {
        const automakers = await Automaker.find().sort({ name: 1 });
        res.json(automakers);
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const getAutomakerById = async (req, res) => {
    try {
        const automaker = await Automaker.findById(req.params.id);
        if (automaker) {
            res.json(automaker);
        } else {
            res.status(404).send('Automaker not found.');
        }
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const addNewAutomaker = async (req, res) => {
    try {
        const { id, name } = req.body;
        const automakerExists = await Automaker.findOne({ name });
        if (!automakerExists) {
            const automaker = new Automaker({ id, name });
            await automaker.save();
            res.status(201).json(automaker);
        } else {
            res.status(409).send('An automaker with this name already exists.');
        }
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const updateAutomaker = async (req, res) => {
    try {
        const { name } = req.body;
        const automakerExists = await Automaker.findOne({ name });
        if (!automakerExists) {
            const automaker = await Automaker.findByIdAndUpdate(req.params.id, { name }, { new: true });
            if (automaker) {
                res.json(automaker);
            } else {
                res.status(404).send('Automaker not found.');
            }
        } else {
            res.status(409).send('An automaker with this name already exists.');
        }
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const deleteAutomaker = async (req, res) => {
    try {
        const associatedCars = await Car.find({ automaker: req.params.id });

        associatedCars.forEach(car => {
            fs.unlinkSync(car.image);
        });
        
        await Car.deleteMany({ automaker: req.params.id });
        const automaker = await Automaker.findByIdAndDelete(req.params.id);
        if (automaker) {
            res.status(204).send();
        } else {
            res.status(404).send('Automaker not found.');
        }
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};