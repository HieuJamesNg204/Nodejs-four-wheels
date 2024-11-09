import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).send('You need to log in to proceed.');
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send('Session Expired. Please log in again to proceed');
    }
};