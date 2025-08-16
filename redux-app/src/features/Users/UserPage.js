import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { selectUserById } from './usersSlice';
import { useGetPostsByUserIdQuery } from '../posts/postSlice';

const UserPage = () => {
  const {userId} = useParams();   //id
  
  // const posts = useSelector(selectAllPost);  //id, title, body

  // const postTitle = posts.map(post => {
  //   if(Number(post.userId) === Number(userId)) 
  //     return <section>
  //            <ul>
  //              <li>
  //                <h4>
  //                  <Link to={`/post/${post.id}`}>{post.title}</Link>
  //                 </h4>
  //               </li>
  //              </ul>
  //              </section>
  // })

  // const user = useSelector(state => selectUserById(state, Number(userId)));


   //here inside useSelector filer returns new array everytime when reference value got changed useSelector re renders the component eveytime 
  // const postsForUser = useSelector(state => {   //contains all posts of specifc userId
  //   const allPost = selectAllPost(state);   //id title content userId
  //   return allPost.filter(post => post.userId === Number(userId));
  // })

  //memoized slector
  // const postsForUser = useSelector(state => selectPostByUser(state, Number(userId)));

  const {
     data: postsForUser,
     isLoading,
     isSuccess,
     isError,
     error
  } = useGetPostsByUserIdQuery(userId);

  let content;
  if(isLoading) content = <p>Loading...</p>
  // if(isSuccess) content = postsForUser.map(post => {
  //     if(Number(post.userId) === Number(userId)) 
  //       return <section>
  //              <ul>
  //                <li>
  //                  <h4>
  //                    <Link to={`/post/${post.id}`}>{post.title}</Link>
  //                   </h4>
  //                 </li>
  //                </ul>
  //                </section>
  //   })

    if(isSuccess && postsForUser.length > 0) {
      const {ids, entities} = postsForUser
      content = ids.map(id=>(
        <li key={id}>
          <Link to={`/post/${id}`}>{entities[id].title}</Link>
        </li>
      ))
    }else{
      content = <p>No posts found for this user</p>
    }

    if(isError) content = <p>{error}</p>

  return (
    <div>
      {/* <h2>{user.name}</h2> */}
      {content}</div>
  )
}

export default UserPage