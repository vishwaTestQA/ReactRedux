import { Reactions } from "../model/reactions.model.js"

export const reactions = async (req, res) => {
    const allReactions = await Reactions.find();
    
    res.status(200).json({reactions: allReactions})
}