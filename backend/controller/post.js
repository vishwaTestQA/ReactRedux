import { Post } from "../model/post.model.js";
import { Reactions } from "../model/reactions.model.js";

export const post = async (req, res) => {
    const { title, content, authorId } = req.body;

    console.log("post a data", title, content, authorId)

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
    if(req.query.userId){
        const userId = req.query.userId;
        console.log("query", req.query.userId);
        const allPost = await Post.find({authorId: userId})
       .populate({path:'reactions', 
                  select:'type authorId', 
                  populate:{path: 'authors', select:'username'}}).exec()

    // console.log("alpost", allPost)
   return res.status(200).json({
      allPost: allPost
    })    
    }
    
    // const allPost = await Post.find()
    // const allPost = await Post.find({}).populate('reactions').exec()
    const allPost = await Post.find({})
       .populate({path:'reactions', 
                  select:'type authorId', 
                  populate:{path: 'authors', select:'username profilePicture'}}).exec()

    console.log("alpost", allPost)
    res.status(200).json({
      allPost: allPost
    })
}

export const getPostsByUser = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
}

