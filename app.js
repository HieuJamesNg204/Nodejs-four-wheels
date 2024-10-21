import express from 'express';
import bodyParser from 'body-parser';
import carRoutes from './routes/carRoutes.js';
import automakerRoutes from './routes/automakerRoutes.js';
import connectDB from './db.js';

const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/cars', carRoutes);
app.use('/automakers', automakerRoutes);

export default app;