import React, { useState } from 'react'
import { selectCurrentProfilePic, selectCurrentUser } from '../api/auth/authSlice'
import { useSelector } from 'react-redux'
import { useUpdateProfilePictureMutation } from '../dbPosts/postSliceDB'

const ProfilePage = () => {
    const [profilePicture, setProfilePicture] = useState(null)
    const username = useSelector(selectCurrentUser)
    const profilePic = useSelector(selectCurrentProfilePic)

    const [updateProfilePicture] = useUpdateProfilePictureMutation();
    const updateProfilePic = (e) => {
        if(e.target.file){
        const pic = e.target?.file;
        console.log(pic);
        updateProfilePic({profilePicture: pic})
        }
    }
    // useEffect(() => {

    // },[profilePicture])
  return (
    <div>
        <p>username: {username}</p>
        <p>profilePic:{profilePic}</p>
        <input type='file' onClick={updateProfilePic}/>
    </div>
  )
}

export default ProfilePage