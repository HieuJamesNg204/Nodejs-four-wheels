import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, phoneNumber, password, role } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) {
            return res.status(409).send('Username is already taken.');
        }

        user = new User({ username, phoneNumber, password, role });

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
        res.status(500).send('An error occurred while processing your request');
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
            return res.status(401).send('Invalid username or password.');
        }

        const passwordMatched = await user.matchPassword(password);

        if (!passwordMatched) {
            return res.status(401).send('Invalid username or password.');
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
        res.status(500).send('An error occurred while processing your request');
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.query;
        const user = await User.findOne({ username });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const resetUserPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const { password } = req.body;
            user.password = password;
            
            await user.save();
            res.json(user);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while processing your request');
    }
};

export const updateUserPhoneNumber = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const { phoneNumber } = req.body;
            user.phoneNumber = phoneNumber;
            await user.save();
            res.json(user);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

export const updateUserPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const { currentPassword, newPassword } = req.body;
            
            const passwordMatched = await user.matchPassword(currentPassword);

            if (!passwordMatched) {
                return res.status(403).send('Invalid current password.');
            }

            user.password = newPassword;
            await user.save();
            res.json(user);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};