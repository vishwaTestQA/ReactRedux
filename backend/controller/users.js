import { Author } from "../model/author.model.js";

export const users = async (_, res) => {
    // console.log("req for users.")
    const allUsers = await Author.find({}, '-password'); // Exclude password field from the response
    if (!allUsers || allUsers.length === 0) {
        return res.status(404).json({ message: 'No users found' });
    }
    // console.log('all===', allUsers)
    res.status(200).json({users: allUsers});  // if we dont give key:value then in frintend 
}

export const getUserById = async (req, res) => {
    const id = req.params.userId;

    console.log("userid", id);
    if(!id) return res.status(403).json({message: "Login failed"})
        try {
            const user = await Author.findOne({_id: id}).exec();
            console.log("specific user",user);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({message: "server error, fetching specific user is failed"})
}
  


}