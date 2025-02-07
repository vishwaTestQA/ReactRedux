import React, { useState } from 'react'
import {useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAllUsers } from '../Users/usersSlice';
import DeletePost from './DeletePost';
import { useUpdatePostMutation, selectPostById } from './postSlice';


export const EditPost = () => {

  const {postId} = useParams();
  const navigate = useNavigate();

  const [updatePost, {isLoading}] = useUpdatePostMutation();

  const users = useSelector(selectAllUsers);
  const getNameOfUser = users.flat().find(user => user.id === Number(postId))
  const getPost = useSelector(state => selectPostById(state, postId))



  const [title, setTitle] = useState(getPost?.title);
  const [content, setContent] = useState(getPost?.body);
  const [author, setAuthor] = useState(getNameOfUser?.name);

   const onContentChanged = (e) => setContent(e.target.value);
   const onTitleChanged = (e)=> setTitle(e.target.value);
   const onAuthorChanged = (e)=> setAuthor(e.target.value);

  const canSave = [title, author, content].every(Boolean) && !isLoading;

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(canSave){
      try {
    
        //postId is the uniqueId of the post, userId is the id of user, multiple post can have same userId because posted by that user
        await updatePost({title, body: content, userId: author, id: Number(postId)}).unwrap();
        navigate(`/post/${postId}`, {replace:true});
      } catch (error) {
        console.log(error.message)
      }
      // }finally{
      //   setRequestStatus('idle')
      // }
    }
  }

  const userOptions = users.flat().map(user => (
    <option key={user.id}
      value={user.id}>
      {user.name}
    </option>
  ))

  return (
     <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>
        Title</label>
        <input type="text"
               id='title'
               value={title}
               onChange={onTitleChanged}  
                 />

<label htmlFor='author'>
        Author</label>
        <select
                id='author'
                value={author}
                onChange={onAuthorChanged}>
                <option value={author}>{author}</option>  
                {userOptions}
        </select>


<label htmlFor='content'>
        Content</label>
        <textarea type="text"
               id='content'
               value={content}
               onChange={onContentChanged}  
                 />
              <button>submit</button>
              <DeletePost postId={postId}/>
      </form>
      {/* <PostList2/> */}
     </div>
  )
}
