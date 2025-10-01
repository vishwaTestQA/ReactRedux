import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// import PostList from './PostList';
import { selectPostById, useAddNewPostMutation, useUpdatePostMutation } from './postSliceDB';
import { selectAllUsers } from '../dbUsers/usersSliceDB';
import { selectCurrentId, selectCurrentRoles } from '../api/auth/authSlice';
import { LucidePictureInPicture, LucidePictureInPicture2, PictureInPicture2Icon } from 'lucide-react';
import { useCompression } from '../../hook/useCompresion';

const EditPostDB = () => {
    const {postId} = useParams();
    const post = useSelector(state => selectPostById(state, postId))
    console.log("params", postId, "  ", post)
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  // const [authorId, setAuthorId] = useState('');

  const onContentChanged = (e) => setContent(e.target.value);
  const onTitleChanged = (e)=> setTitle(e.target.value);
  // const onAuthorIdChanged = (e)=> setAuthorId(e.target.value);

  // const dispatch = useDispatch();
  const [updatePost, {isLoading}] = useUpdatePostMutation();
  const navigate = useNavigate();

//   const userId = useSelector(selectCurrentId);
//   console.log("id", userId)
  const  { compressedImage, loading, error, compressImage } = useCompression();
  const inputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(false)

     const handlePic = (e) => {
         if(e.target.files[0]){
           console.log("entered")
         const file = e.target.files[0];
         if(!file) return
         //compressed image is not required here because user wants to post the image in quality
         setSelectedImage(true)
         compressImage(file)
         }
     }
 
     const handleInputRef = () =>{
        inputRef.current.click()
     }

     const [save, setSave] = useState(false);
 
     console.log("save", save)
     useEffect(() => {
         if(selectedImage){
           console.log("if")
             const res = [title, content, compressedImage].every(Boolean) && !isLoading;
             setSave(res)
             console.log("if", save)
         }else{
            console.log("else")
            const res =  [title, content].every(Boolean) && !isLoading;
             setSave(res)
            console.log("else", save)
         }
     },[title,content, compressedImage, selectedImage, save])

     console.log("loading....", loading);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(save){
      try{
        updatePost({title, content, image: compressedImage, id:postId}).unwrap();
        console.log("after adding post", {title, content, image: compressedImage})
        setSelectedImage(null)
        navigate('/');
        console.log(title, content)
      }catch(error){
        console.log(error.message)
      }
    }
  }

  return (
     <div>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column',  gap:"20px"}}>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:"5%"}}>
        <label htmlFor='title'>Title</label>
        <input type="text"
               id='title'
               value={title}
               onChange={onTitleChanged} 
               style={{width:"100%"}} 
                 />
        </div>
{/* <label htmlFor='author'>
        Author</label>
            <select type="text"
               id='author'
               value={authorId}
               onChange={onAuthorIdChanged}>
                <option value=''>select username</option>
                {userOptions}
                </select> */}
<div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:"5%"}}>
<label htmlFor='content'>Content</label>
        <textarea type="text"
           cols={20}
           rows={7}
               id='content'
               value={content}
               onChange={onContentChanged}  
                 style={{width:"100%"}}
                 />
                 </div>
                 {post.image?.url ? <img style={{width:'50px', height:"50px"}} src={post.image.url}></img> : null}
                 <div style={{width:"100%", height:"50px" ,border:"solid", borderRadius:"10px", textAlign: 'center', display:'flex', justifyContent: 'space-around', alignItems:'center'}}>
                  {/* <label htmlFor='upload'>upload image</label> */}
                  <label htmlFor='upload'>
                   upload image
                  </label>
                  <div onClick={handleInputRef}><LucidePictureInPicture2/></div>
                 </div>
                 <input ref={inputRef} type='file' onChange={handlePic} hidden></input>
                 {loading ? <div>uploading ...</div>  : null}
                 <button disabled={!save}>submit</button>
      </form>
     </div>
  )
}

export default EditPostDB
