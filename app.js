import express from 'express';
import bodyParser from 'body-parser';
import carRoutes from './routes/carRoutes.js';
import automakerRoutes from './routes/automakerRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './db.js';

const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/fourwheels/cars', carRoutes);
app.use('/fourwheels/automakers', automakerRoutes);
app.use('/fourwheels/auth', authRoutes);

export default app;