import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';    
import authRouter from './routes/auth.js';
import connectDB from './config.js/dbConn.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL    
    credentials: true // This allows cookies to be sent with requests
}));

app.use('/api/auth', authRouter);    

connectDB()

const expServer = app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});







