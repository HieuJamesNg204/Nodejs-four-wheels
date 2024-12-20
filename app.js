import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import carRoutes from './routes/carRoutes.js';
import automakerRoutes from './routes/automakerRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './db.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

const app = express();
app.use('/uploads', express.static('uploads'));

connectDB();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,x-auth-token"
};

app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 120,
    message: 'The number of requests is becoming overwhelming, please try again after 5 minutes.'
});

app.use(limiter);

app.use(bodyParser.json());

app.use('/fourwheels/cars', carRoutes);
app.use('/fourwheels/automakers', automakerRoutes);
app.use('/fourwheels/auth', authRoutes);
app.use('/fourwheels/orders', orderRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;