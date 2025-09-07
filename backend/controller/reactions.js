import { Reactions } from "../model/reactions.model.js"

export const addReactions = async (req, res) => {
    const {postId, userId, type} = req.body;
    console.log(postId, userId, type);
    if(type === 'remove'){
      const allReactions = await Reactions.deleteOne({postId, authorId:userId}).exec();
      console.log("returned", allReactions)
      return res.status(200).json({reactions: allReactions})
    }

    if(!postId || !userId || !type) return res.status(400).json({"message": "postId, userId, type is required for reaction"})  
    const allReactions = await Reactions.updateOne({postId, authorId:userId},
        {$set:{type}},
        {upsert:true});
    
    res.status(201).json({reactions: allReactions})
}