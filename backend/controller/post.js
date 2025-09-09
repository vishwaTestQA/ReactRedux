import cloudinary from "../config.js/cloudinary.js";
import { Post } from "../model/post.model.js";
import { Reactions } from "../model/reactions.model.js";

export const post = async (req, res) => {
    const { title, content, authorId, image } = req.body;
  
    let imageData = { url: null, public_id: null };
    console.log("post a data", title, content, authorId, image)

    if (!title || !content || !authorId) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    if(image){

        try {
         const uploadResponse = await cloudinary.uploader.upload(image);
        imageData = {
            url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id
        }
          console.log("image data", imageData)
     } catch (error) {
            console.log(error.message)
        }
    }

    try{
        const newPost = await Post.create({
            title,
            content,
            authorId,
            image:imageData
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

    //get post using userID, getting posts for specific user
    if(req.query.userId){
        const userId = req.query.userId;
        console.log("query", req.query.userId);
        const allPost = await Post.find({authorId: userId})
       .populate({path:'reactions', 
                  select:'type authorId', 
                  populate:{path: 'authors', select:'username'}})
                  populate({path:'authors', select:'profilePicture username'})
                  .exec()

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
                  populate:{path: 'authors', select:'username profilePicture'}})
                  .populate({path:'authors', select:'profilePicture username'}).exec()

    // console.log("alpost", allPost)
    res.status(200).json({
      allPost: allPost
    })
}

export const getPostsByUser = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
}

