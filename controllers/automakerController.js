import Automaker from '../models/automaker.js';
import Car from '../models/car.js';

export const getAllAutomakers = async (req, res) => {
    try {
        const automakers = await Automaker.find();
        res.json(automakers);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const getAutomakerById = async (req, res) => {
    try {
        const automaker = await Automaker.findById(req.params.id);
        if (automaker) {
            res.json(automaker);
        } else {
            res.status(404).send('Automaker not found');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const addNewAutomaker = async (req, res) => {
    try {
        const { id, name } = req.body;
        const automaker = new Automaker({ id, name });
        await automaker.save();
        res.status(201).json(automaker);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const updateAutomaker = async (req, res) => {
    try {
        const { name } = req.body;
        const automaker = await Automaker.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (automaker) {
            res.json(automaker);
        } else {
            res.status(404).send('Automaker not found');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const deleteAutomaker = async (req, res) => {
    try {
        await Car.deleteMany({ automaker: req.params.id });
        const automaker = await Automaker.findByIdAndDelete(req.params.id);
        if (automaker) {
            res.status(204).send();
        } else {
            res.status(404).send('Automaker not found');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};