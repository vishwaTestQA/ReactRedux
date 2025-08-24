import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';    
import authRouter from './routes/auth.js';
import connectDB from './config.js/dbConn.js';
import dotenv from 'dotenv';
import userRouter from './routes/users.js';
import postRouter from './routes/post.js';

// const express = require('express');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const authRouter = require('./routes/auth');
// const connectDB = require('./config.js/dbConn');
// const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3500

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL    
    credentials: true // This allows cookies to be sent with requests
}));

app.use('/auth', authRouter);    
app.use('/users', userRouter);    
app.use('/post', postRouter);        


// connectDBS()

const connectDBS = async () => {
    try { 
        await connectDB();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);   
        process.exit(1); // Exit the process with failure
    }
};
connectDBS();
console.log("accessed?  ==== ")
const expServer = app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});







