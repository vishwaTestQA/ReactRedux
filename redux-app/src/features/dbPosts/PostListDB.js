import React from 'react'
import { selectAllPosts, useGetAllPostsQuery } from './postSliceDB'
import { useSelector } from 'react-redux';
import ReactionsDB from './ReactionsDB';

//initially getallpost will be executed in index.js where we provided to execute from store
//  so the homepage will be updted with the posts from server
// later whatever the posts are posted from this user is updated on UI (but wont fetch until we fetch manually)
const PostListDB = () => {

    const {
        // data:post, 
        isLoading, isError, isSuccess,                                      
        }  = useGetAllPostsQuery('getAllPosts');   //here this will directly fetch the posts
        // from backend so ony when we post a new post or can use pool to refetch
    
    const allPost = useSelector(selectAllPosts); // it selects the posts from cache
    
    console.log("getAllPost", allPost);

    const renderPost = allPost.map(post => (
        <div key={post._id}>
            <div>{post.title}</div>
            <div>{post.content}</div>
            <ReactionsDB postId = {post._id} reactions={post.reactions}/>
        </div>
    ))
  return (
    // <div>{JSON.stringify(post)}</div>
    // <div>{JSON.stringify(allPost}</div>
   renderPost
  )
}

export default PostListDB