import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeletePostMutation } from './postSliceDB';

const DeletePostDB = () => {
    const {postId} = useParams();
    console.log("postId in delete post", postId);
    
    const [deletePost] = useDeletePostMutation();
    const navigate = useNavigate();

    const handleDelete = async() =>{
        try {
           const res = await deletePost({id: postId}).unwrap()
           console.log("deleted post");
           navigate('/') 
        } catch (error) {
            console.log("error in deleteing post");
        } 
    }
  return (
     <div style={{}}>
        <button onClick={handleDelete}>Delete post</button>
        <button onClick={() => navigate('/home')}>Exit</button>
     </div>
  )
}

export default DeletePostDB