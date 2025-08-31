import express from "express";
import { addReactions } from "../controller/reactions.js";

const reactionRouter = express.Router()

reactionRouter.post('/', addReactions)

export default reactionRouter