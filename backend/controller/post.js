import { Post } from "../model/post.model";
import { Reactions } from "../model/reactions.model";

const post = async (req, res) => {
    const { title, content, authorId, reactionType, comment } = req.body;

    if (!title || !content || !authorId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const newPost = await Post.create({
            title,
            content,
            authorId
        })

        const reactions = await Reactions.create({
            postId: newPost._id,
            authorId,
            type: reactionType,
            comment
        })
    }
}