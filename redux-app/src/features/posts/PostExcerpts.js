import React from 'react'
import { TimeAgo } from './TimeAgo';
// import ReactionButton from './ReactionButton';
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';
import { selectAllPosts } from './postSlice';
import { PostAuthor } from './PostAuthor';
import { useSelector } from 'react-redux';
import ReactionButton from './ReactionButton';

  const PostExcerpts = ({postId}) => {

    console.log('postID====='+ postId)
    // const postIds = useSelector(selectPostIds);
    const allPost = useSelector(selectAllPosts);

    const post = allPost.find(post => post.id === postId)

    console.log("PostExcerption ", post);

  return (
      <div>
            <p>{post?.id}</p>
            <p>{post?.title}</p>
            <p>{post?.body?.substring(0,100)}...</p>
            <p>
              <Link to = {`/post/${post?.id}`}>view post</Link>
              <DeletePost postId={post?.id}/>
              <PostAuthor key={post?.id} postId={post?.userId}/> 
              <TimeAgo timestamp={post?.date}/>
            </p>
            <ReactionButton key={post?.id} postId={post?.id}/>
    </div>
  )
}

// PostExcerpts = React.memo(PostExcerpts);  //only renders when props value changes
//here TimeAgo comp and DeletePost comp will re render everytime but thats simple comp so no an issue

export default PostExcerpts