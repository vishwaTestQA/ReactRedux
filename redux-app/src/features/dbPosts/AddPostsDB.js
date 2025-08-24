import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import PostList from './PostList';
import { useAddNewPostMutation } from './postSliceDB';
import { selectAllUsers } from '../dbUsers/usersSliceDB';
import { selectCurrentId, selectCurrentRoles } from '../api/auth/authSlice';

const AddPostsDB = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [authorId, setAuthorId] = useState('');

  const onContentChanged = (e) => setContent(e.target.value);
  const onTitleChanged = (e)=> setTitle(e.target.value);
  // const onAuthorIdChanged = (e)=> setAuthorId(e.target.value);

  // const dispatch = useDispatch();
  const [addNewPost, {isLoading}] = useAddNewPostMutation();
  const navigate = useNavigate();

  const userId = useSelector(selectCurrentId);
  console.log("id", userId)

  const canSave = [title, userId, content].every(Boolean) && !isLoading;

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(canSave){
      try{
          // dispatch(addNewPost({title, body: content, author})).unwrap();
        addNewPost({title, content, userId}).unwrap();
        // console.log("after adding post", resp)
        navigate('/');
        console.log(title, userId, content)
      }catch(error){
        console.log(error.message)
      }
    }
  }

  // const userOptions = users.flat().map(user=>{
  //   return <option key={user.id} value={user.id}>{user.name}</option>
  // })

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

{/* <label htmlFor='author'>
        Author</label>
            <select type="text"
               id='author'
               value={authorId}
               onChange={onAuthorIdChanged}>
                <option value=''>select username</option>
                {userOptions}
                </select> */}


<label htmlFor='content'>
        Content</label>
        <input type="text"
               id='content'
               value={content}
               onChange={onContentChanged}  
                 />
                 <button disabled={!canSave}>submit</button>
      </form>
     {/* <PostList/>    */}
     {/* displays all the posts in the same page */}
     </div>
  )
}

export default AddPostsDB
