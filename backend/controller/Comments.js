import { Comments } from "../model/comments.model.js"

export const postComments = async(req,res)=>{
    const {postId, authorId, comment} = req.body
    if(!postId || !authorId || !comment) return res.status(400).json({message: "postId userID required"})

     const result = await Comments.create({
        postId,
        authorId,
        comment
     })

     console.log("comments added", result);
     
     res.status(201).json({result})
}