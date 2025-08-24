import { Post } from "../model/post.model.js";
import { Reactions } from "../model/reactions.model.js";

export const post = async (req, res) => {
    console.log("entered ========================")
    const { title, content, authorId } = req.body;

    console.log("=========", title, content, authorId)

    if (!title || !content || !authorId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const newPost = await Post.create({
            title,
            content,
            authorId
        })

        res.json(201).json({message: "posted successfully"})
        // const reactions = await Reactions.create({
        //     postId: newPost._id,
        //     authorId,
        //     type: reactionType,
        //     comment
        // })
    }catch(e){
        throw new Error("post error")
    }
}

export const getPosts = async (req, res) => {
    
    const allPost = await Post.find()
    res.status(200).json({
      allPost: allPost
    })
}