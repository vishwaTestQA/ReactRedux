import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";

//react hooks shouldnot be async
export const useCompression = () => {

   const [compressedImage, setCompressedImage] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

  //  useEffect(()=>{
  //   if(!file) return
  //   // compressImage()
  //  },[])

 const compressImage = async(file, options = {fileSize:1, maxWidthOrHeight:800})=>{
        setLoading(true)
    // Compression options
       const {fileSize, maxWidthOrHeight} = options
        const compressOptions = {
        maxSizeMB: fileSize, // Reduce to 1MB
        maxWidthOrHeight: maxWidthOrHeight, // Resize
        useWebWorker: true,
      };
  
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
  
        reader.onload = () => {
          setCompressedImage(reader.result)
          setLoading(false)
      }
      } catch (error) {
        console.error("Compression failed:", error);
        setError(error.message)
        setLoading(false)
      }
   }
   

       return {compressedImage, loading, error, compressImage};
     };
