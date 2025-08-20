import express from 'express';
import { users } from '../controller/users.js';

const userRouter = express.Router();

userRouter.get('/', users)

export default userRouter