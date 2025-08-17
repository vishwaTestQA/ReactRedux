import express from "express";
import { register } from "../controller/register.js";
import login from "../controller/login.js";

// const express = require('express');  
// const loginAuth = require('../controller/loginAuth');
// const register = require('../controller/register');

const authRouter = express.Router();

console.log("fileExecution")
authRouter.post('/login', login);  //for testing purpose
authRouter.post('/register', register);

export default authRouter;
// module.exports = authRouter;