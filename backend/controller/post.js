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
  console.log("getting all post");
    //get post using userID, getting posts for specific user
    if(req.query.userId){
        const userId = req.query.userId;
        console.log("query", req.query.userId);
        const allPost = await Post.find({authorId: userId})
       .populate({path:'reactions', 
                  select:'type authorId', 
                  populate:{path: 'authors', select:'username'}})
                  populate({path:'authors', select:'profilePicture username'})
                  .populate({path:'comments', select:'authorId comment',
                      populate:{path: 'authors', select:'username profilePicture'}
                  })
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
                  .populate({path:'authors', select:'profilePicture username'})
                  .populate({path:'comments', select:'authorId comment',
                     populate:{path: 'authors', select:'username profilePicture'}
                  })
                  .exec()

    // console.log("alpost", allPost)
    res.status(200).json({
      allPost: allPost
    })
}

export const getPostsByUser = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
}

export const updatePost = async(req, res) =>{
    const updates = {...req.body}
    const _id = req.params.postId
    console.log('idddd', _id);
    updates.image = { url: null, public_id: null };

    if(req.body.image){
    try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        updates.image = {
            url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id
        }
        
          console.log("image data", updates.image)
     } catch (error) {
            console.log(error.message)
        }
    }
     
    try {
        const updatePost = await Post.findOneAndUpdate(
         {_id},
         {$set: updates},
         { new: true, runValidators: true }
        ).populate({path:'reactions', 
                  select:'type authorId', 
                  populate:{path: 'authors', select:'username profilePicture'}})
                  .populate({path:'authors', select:'profilePicture username'})
                  .populate({path:'comments', select:'authorId comment',
                     populate:{path: 'authors', select:'username profilePicture'}
                  })
                  .exec()
        res.json({allPost:updatePost})
    } catch (error) {
        console.log("error from update post ")
    }
}

export const deletePost = async(req, res) =>{
   const {id} = req.body
   const result = await Post.findOneAndDelete({_id:id}).exec()
   res.status(200).json({message: "Deleted succesfully"})
}

export const getPostsByLimit = async (req, res) => {
  console.log("getting all post");
    //get post using userID, getting posts for specific user
    if(req.query.userId){
        const userId = req.query.userId;
        console.log("query", req.query.userId);
        const allPost = await Post.find({authorId: userId})
       .populate({path:'reactions', 
                  select:'type authorId', 
                  populate:{path: 'authors', select:'username'}})
                  populate({path:'authors', select:'profilePicture username'})
                  .populate({path:'comments', select:'authorId comment',
                      populate:{path: 'authors', select:'username profilePicture'}
                  })
                  .exec()

    // console.log("alpost", allPost)
   return res.status(200).json({
      allPost: allPost
    })    
    }
      // const allPost = await Post.find()
    // const allPost = await Post.find({}).populate('reactions').exec()
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    console.log("post/page/limit=========",page, limit, skip);
    const totalDocs = await Post.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);

    const allPost = await Post.find({}).skip(skip).limit(limit).sort({createdAt: -1})
                 .populate({path:'reactions', 
                  select:'type authorId', 
                  populate:{path: 'authors', select:'username profilePicture'}})
                  .populate({path:'authors', select:'profilePicture username'})
                  .populate({path:'comments', select:'authorId comment',
                     populate:{path: 'authors', select:'username profilePicture'}
                  })
                  .exec()

    // console.log("alpost", allPost)
    res.status(200).json({
      allPost: allPost,
      page,
      totalPages,
      totalDocs
    })
}
