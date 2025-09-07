import cloudinary from "../config.js/cloudinary.js";
import { Author } from "../model/author.model.js";

export const updateProfilePic = async (req, res) => {
  try {
    const { profilePicFromUser } = req.body;
    console.log('pro pic', profilePicFromUser)

    if (!profilePicFromUser) {
      return res.status(400).json({ message: "profile pic is required" });
    }

    const userId = res.user._id; //while verifying the token we setting res.user = user;
    //hence the middleware (verifyJWT()) has modified the res

    console.log('prev_img', res.user.profilePic.public_id)
    if (res.user.profilePic.public_id) {
      await cloudinary.uploader.destroy(res.user.profilePic.public_id);
    }

    //upload the reponse to cloudinary (image and video repository)
    const uploadResponse = await cloudinary.uploader.upload(profilePicFromUser);
    // const uploadResponse = "";

    // console.log('uploader resp', uploadResponse) //it gives asset_id, public_id, version, width, height, format, created_at, url, asset_folder



    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   { profilePic: uploadResponse.secure_url },
    //   { new: true } 
    // ); //{new:true} will return the user object after updation

    //update with public_id
    const updatedUser = await Author.findByIdAndUpdate(
      userId,
      { profilePic: {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id 
      }},
      // {
      //   $set: {
      //     "profilePic.url": uploadResponse.secure_url,
      //     "profilePic.public_id": uploadResponse.public_id,
      //   },
      // },
      { new: true } 
    ); //{new:true} will return the user object after updation

    console.log('next_img', updatedUser.profilePic.public_id)
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in uploader", error.message);
  }
};
