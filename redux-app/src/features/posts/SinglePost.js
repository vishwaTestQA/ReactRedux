import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TimeAgo } from './TimeAgo'
import DeletePost from './DeletePost'
import { PostAuthor } from './PostAuthor'
import { useGetAllPostsQuery } from './postSlice'

export const SinglePost = () => {
  const {postId} = useParams()
  console.log("use",postId);

  const { singlePost, isLoading } = useGetAllPostsQuery('getPosts', {
    selectFromResult: ({ data, isLoading }) => ({
      singlePost: data?.entities[postId],
        isLoading
    }),
})

  // const dispatch = useDispatch();

  // useEffect(() =>{    //if we directly use this https:loc..../posts/1 then it will fetch data first and then it will show the data with specific id:1
  //   if(!singlePost){
  //      dispatch(fetchPost());
  //   }
  // },[])

  return (
    <div>
          <p>{singlePost?.id}</p>
          <p>{singlePost?.title}</p>
          <p>{singlePost?.body}</p>
          <p>
            <Link to ={`/post/edit/${Number(postId)}`}>Edit post</Link>
            <DeletePost postId={singlePost?.id}/>
            <PostAuthor key={singlePost?.id} postId={singlePost?.id}/>
            <TimeAgo timestamp={singlePost?.date}/>
          </p>
        </div>
  )
}
