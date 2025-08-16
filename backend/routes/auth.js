import express from "express";
import { loginAuth } from "../controller/loginAuth.js";
import { register } from "../controller/register.js";

const authRouter = express.Router();

authRouter.get('/', loginAuth);
authRouter.post('/register', register);

export default authRouter;