import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ msg: 'Username is already taken' });
        }

        user = new User({ username, password, role });

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, 'secret', { expiresIn: '1h' }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const match = await user.matchPassword(password);

        if (!match) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, 'secret', { expiresIn: '1h' }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};