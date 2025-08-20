import { Author } from "../model/author.model.js";

export const users = async (_, res) => {
    console.log("req for users.")
    const allUsers = await Author.find({}, '-password'); // Exclude password field from the response
    if (!allUsers || allUsers.length === 0) {
        return res.status(404).json({ message: 'No users found' });
    }
    console.log('all===', allUsers)
    res.status(200).json({users: allUsers});  // if we dont give key:value then in frintend 
}