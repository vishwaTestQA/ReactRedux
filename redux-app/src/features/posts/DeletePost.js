import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeletePostMutation } from './postSlice';


const DeletePost = ({postId}) => {

  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();
  const handleDeletePost = () => {
     console.log(postId);
     deletePost({id: postId}).unwrap();
     navigate('/');
  }

  return (
    <button onClick={handleDeletePost}>delete post</button>
  )
}

export default DeletePost