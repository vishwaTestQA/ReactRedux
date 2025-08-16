import React, { useEffect } from 'react'
import PostExcerpts from './PostExcerpts';
import { selectPostIds, useGetAllPostsQuery } from './postSlice';
import { useSelector } from 'react-redux';

const PostList = () => {

 const {
  // data: posts, 
  isLoading,
  isError,
  error,
  isSuccess
 } = useGetAllPostsQuery('getPosts')

  // useEffect(()=>{                 //we have provided dispatch in index.js and made 
  //   if(postStatus === 'idle'){    //data available at global level hence reload page 
                                    //  wont make                           
  //     dispatch(fetchPost())
  //   }
  // },[postStatus, dispatch])  //even with [] is working fine 


  
  const orderedPosts = useSelector(selectPostIds)
  console.log("ordered",orderedPosts)
  let content;

  if(isLoading) return <div>Loading......</div>

  //becz rtk query returns object as an error and n ot an string
  if(isError) content = <p>{error?.message || JSON.stringify(error)}</p>

  // if(isSuccess) content = orderedPosts.map(postId => <PostExcerpts key={postId} postId={postId}/>)
  if(isSuccess && orderedPosts.length > 0) {
  content = orderedPosts.map(postId => <PostExcerpts key={postId} postId={postId}/>)
} else if(isSuccess) {
  content = <p>No posts found.</p>
}


return (
<div>
{content}
</div>
)
}

export default PostList