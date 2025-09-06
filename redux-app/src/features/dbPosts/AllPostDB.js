import React from 'react'
import { selectAllPosts, useGetAllPostsQuery } from './postSliceDB';
import { useSelector } from 'react-redux';
import PostListDB from './PostListDB';

const AllPostDB = () => {
    const {
            // data:post, 
            isLoading, isError, isSuccess,                                      
            }  = useGetAllPostsQuery('getAllPosts');   //here this will directly fetch the posts
            // from backend so ony when we post a new post or can use pool to refetch
        
        const allPost = useSelector(selectAllPosts); // it selects the posts from cache
        
        console.log("getAllPost", allPost);
    
  return (
    <div><PostListDB post={allPost}/></div>
  )
}

export default AllPostDB