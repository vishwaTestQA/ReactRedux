import React, { useEffect, useRef, useState } from 'react'
import { selectCurrentId, selectCurrentProfilePic, selectCurrentUser } from '../api/auth/authSlice'
import { useSelector } from 'react-redux'
import { useCompression } from '../../hook/useCompresion'
import emptyImage from '../dbPosts/empty.jpeg'
import { useUpdateProfilePictureMutation } from '../dbUsers/usersSliceDB'
import {Camera, Plus} from 'lucide-react'
const ProfilePage = () => {
    const userId = useSelector(selectCurrentId)
    const profilePicFromAuth = useSelector(selectCurrentProfilePic)
    const [selectedPicture, setSelectedPicture] = useState(null)
    const username = useSelector(selectCurrentUser)
    const  { compressedImage, loading, error, compressImage } = useCompression();
    const [updateProfilePicture] = useUpdateProfilePictureMutation();

    const handleProfilePic = (e) => {
        if(e.target.files[0]){
          console.log("entered")
        const file = e.target.files[0];
        if(!file) return
        compressImage(file)
        }
    }

    const updateProfile = async()=>{
   try{
          const result = await updateProfilePicture({userId, profilePicture:compressedImage}).unwrap()
          console.log(result);
          setSelectedPicture(compressedImage)
          }catch{
          setSelectedPicture('')
          }
    }

    const inputRef = useRef(null)
    const handleInputRef = () =>{
       inputRef.current.click()

    }
    useEffect(() => {
         if(compressedImage){
          updateProfile()
         }
    },[compressedImage])

  return (
    <div className='profile-main' style={{maxHeight: '100%', gap:"20px"}}>
        <p><b>username:</b> {username}</p>
        <div style={{width: '300px', height:'300px', borderRadius:"50%", position:"relative"}}>
        <img style={{width: 'auto', height:'300px', borderRadius:"50%"}} src={selectedPicture || profilePicFromAuth.url || emptyImage} alt='tom pro pic'/>
        <button style={{position:"absolute", bottom:0, left:"20px"}}
           onClick={handleInputRef}>
           <Camera size='30'>  
           </Camera>
          </button>
        <input ref={inputRef} type='file' onChange={handleProfilePic} hidden/>
        </div>
    </div>
  )
}

export default ProfilePage