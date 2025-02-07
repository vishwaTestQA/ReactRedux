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

  let content;

  if(isLoading) return <div>Loding......</div>

  if(isError) content = <p>{error}</p>

  if(isSuccess) content = orderedPosts.map(postId => <PostExcerpts key={postId} postId={postId}/>)

return (
<div>
{content}
</div>
)
}

export default PostList