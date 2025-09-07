import {v2 as cloudinary} from "cloudinary"
import {config} from "dotenv"

config()

//Using try...catch for Cloudinary configuration is generally not necessary because cloudinary.config() does not throw synchronous errors. However, it's a good practice to check if environment variables are missing before calling cloudinary.config().

try {
  cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET 
  })
} catch (error) {
   console.log("Error in cloudinary Env variables", error.message)
}

export default cloudinary
