import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PostList from './PostList';
import { useAddNewPostMutation } from './postSliceDB';

const AddPostsDB = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');

  const onContentChanged = (e) => setContent(e.target.value);
  const onTitleChanged = (e)=> setTitle(e.target.value);
  const onAuthorIdChanged = (e)=> setAuthorId(e.target.value);

  // const dispatch = useDispatch();
  const [addNewPost, {isLoading}] = useAddNewPostMutation();
  const navigate = useNavigate();

  const users = useSelector(selectAllUsers);

  const canSave = [title, authorId, content].every(Boolean) && !isLoading;

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(canSave){
      try{
          // dispatch(addNewPost({title, body: content, author})).unwrap();
        await addNewPost({title, body: content, authorId}).unwrap();
        navigate('/');
      }catch(error){
        console.log(error.message)
      }
    }
  }

  const userOptions = users.flat().map(user=>{
    return <option key={user.id} value={user.id}>{user.name}</option>
  })

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
        {/* <input type="text"
               id='author'
               value={author}
               onChange={onAuthorChanged}  
                 /> */}
            <select type="text"
               id='author'
               value={authorId}
               onChange={onAuthorIdChanged}>
                <option value=''>select username</option>
                {userOptions}
                </select>


<label htmlFor='content'>
        Content</label>
        <input type="text"
               id='content'
               value={content}
               onChange={onContentChanged}  
                 />
                 <button disabled={!canSave}>submit</button>
      </form>
     <PostList/>   
     {/* displays all the posts in the same page */}
     </div>
  )
}

export default AddPostsDB
