import express from 'express';
import { getPosts, post } from '../controller/post.js';
import { addReactions } from '../controller/reactions.js';
import { updateProfilePic } from '../controller/updateProfile.js';

const postRouter = express.Router();
postRouter.post('/', post)
postRouter.get('/', getPosts)

postRouter.post('/addReactions', addReactions)
postRouter.post('/profilePicture', updateProfilePic)



export default postRouter