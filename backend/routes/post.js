import express from 'express';
import { deletePost, getPosts, getPostsByLimit, post, updatePost } from '../controller/post.js';
import { addReactions } from '../controller/reactions.js';
import { updateProfilePic } from '../controller/updateProfile.js';
import { postComments } from '../controller/Comments.js';
import { checkAuth } from '../middleware/checkAuth.js';

const postRouter = express.Router();
postRouter.post('/',checkAuth, post)
postRouter.get('/', checkAuth, getPostsByLimit)
postRouter.patch('/:postId', updatePost)
postRouter.delete('/:postId', deletePost)

postRouter.post('/addReactions', addReactions)
postRouter.post('/profilePicture', updateProfilePic)

postRouter.post('/comments', postComments)

// postRouter.post('/')

export default postRouter