import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import hotelsRouter from './routes/hotels.js';
import roomsRouter from './routes/rooms.js';
import usersRouter from './routes/users.js';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

const db_link = "mongodb+srv://admin:admin@cluster0.vdm0aqy.mongodb.net/?retryWrites=true&w=majority";

app.get('/', (req, res) => {
    res.send('Hey! This is ugly homepage')
})


// Connecting to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(db_link)
        console.log('Connected to mongoDB');
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log('MongoDB disconnected');
})

// middlewares:
app.use(cookieParser())
app.use(express.json());

app.use('/v1/auth', authRouter);
app.use('/v1/hotels', hotelsRouter);
app.use('/v1/rooms', roomsRouter);
app.use('/v1/users', usersRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(port, () => {
    connect();
    console.log(`App is listening on port ${port}...`);
})