import express from 'express';
import { getUserById, users } from '../controller/users.js';

const userRouter = express.Router();

userRouter.get('/', users)
userRouter.get('/:userId', getUserById)

export default userRouter