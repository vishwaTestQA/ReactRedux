import { Reactions } from "../model/reactions.model.js"

export const addReactions = async (req, res) => {
    const {postId, userId, type} = req.body;
    console.log(postId, userId, type);
    if(!postId || !userId || !type) return res.status(400).json({"message": "postId, userId, type is required for reaction"})  
    const allReactions = await Reactions.updateOne({postId, authorId:userId},
        {$set:{type}},
        {upsert:true});
    
    res.status(201).json({reactions: allReactions})
}