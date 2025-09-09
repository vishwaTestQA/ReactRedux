import React, { useState } from 'react'
import { selectAllPosts, useGetAllPostsQuery } from './postSliceDB'
import { useSelector } from 'react-redux';
import ReactionsDB from './ReactionsDB';
import ReactionComments from './ReactionComments';
import { Link } from 'react-router-dom';
import { selectCurrentId } from '../api/auth/authSlice';
import emptyImage from './empty.jpeg'

//initially getallpost will be executed in index.js where we provided to execute from store
//  so the homepage will be updted with the posts from server
// later whatever the posts are posted from this user is updated on UI (but wont fetch until we fetch manually)
const PostListDB = ({ post }) => {
  const [option, setOption] = useState(false)
  const [index, setIndex] = useState(null)
  const userId = useSelector(selectCurrentId)

  const handleOption = (i) => {
    console.log(i)
    setOption(true);
    setIndex(i);
  }
  // const {
  //     // data:post, 
  //     isLoading, isError, isSuccess,                                      
  //     }  = useGetAllPostsQuery('getAllPosts');   //here this will directly fetch the posts
  //     // from backend so ony when we post a new post or can use pool to refetch

  // const allPost = useSelector(selectAllPosts); // it selects the posts from cache

  //eg: 10 post so 10 postId
  const renderPost = post.map((post) => (
    <div style={{
      marginBottom: "20px", padding: "10px",
      background: "rgb(230, 226, 226)", boxShadow: "0 0 2px 1px rgb(0, 0, 0.4)", borderRadius: "10px"
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div key={post._id} style={{ marginBottom: "20px", position: 'relative' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='imgAndProfilePic'
              style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                <img
                  src={post.authors[0]?.profilePicture?.url || emptyImage} alt={post.authors.username}
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
              </div>
              <div>{post.authors[0].username}</div>
            </div>
            {index === post._id ? <div style={{
              display: 'flex', flexDirection: 'column',
              position: 'absolute', right: 0, background: 'rgb(218, 206, 206)'
            }}>
              <Link to={`/users/${post.authorId}`}>view profile</Link>
              {userId === post.authorId ? <>
                <Link>Edit post</Link>
                <Link>delete post</Link>
              </> : null}
            </div> : <div onBlur={() => setIndex(null)} onClick={() => handleOption(post._id)}>...</div>}
          </div>

          <div>{post.title}</div>
          {post.image?.url ? <div><img style={{ width: "100%" }} src={post.image.url}></img></div> : null}
          <div>{post.content}</div>
        </div>

        <div>
          <hr />
          <ReactionComments reactions={post.reactions} />
          <ReactionsDB postId={post._id} reactions={post.reactions} />
        </div>
      </div>
    </div>
  ))
  return (
    // <div>{JSON.stringify(post)}</div>
    // <div>{JSON.stringify(allPost}</div>
    <div>{renderPost}</div>
  )
}

export default PostListDB