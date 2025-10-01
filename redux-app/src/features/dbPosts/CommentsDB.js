import React, { useEffect, useRef, useState } from 'react'
import { selectAllPosts, useAddCommentsMutation } from './postSliceDB'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const CommentsDB = ({currentUserId, singlePost, setCommentsOpen}) => {
    console.log("singlePost", singlePost)
    const allPost = useSelector(selectAllPosts);
    const postId = singlePost.id;
    console.log("postId", postId)

    const scrollRef = useRef(null)

    const closeCommentsSection = () =>{
          setCommentsOpen(false)
    }

    useEffect(() => {
       scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    },[singlePost])

    const [comment, setComment] = useState('')

    const [addComments] = useAddCommentsMutation();

    const submitComment = async() => {
        try {
            const res = await addComments({postId: singlePost._id, authorId: currentUserId, comment})
            console.log("res of comment", res);
            setComment('')
        } catch (error) {
            console.log("error in adding comments",error.res);
        }
    }
  return (
    <div style={{position:'relative'}}>    
        <div style={{position: 'fixed', bottom:0, top:'50%',left:"5%", 
        right:"5%", zIndex:999, background: 'rgba(243, 237, 237, 1)',
        display:'flex', flexDirection:"column", justifyContent:"space-between"
    }}>  
     <div className='comments-area' style={{overflow:'auto', padding:"10px"}}>
        comments area:
        {
        singlePost.comments?.map((cmt,i,arr) => 
        <div style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
        <img style={{width:'30px', height:'30px', borderRadius:'50%', marginRight:'5px'}} src={cmt.authors[0]?.profilePicture.url}/>   
        <Link style={{marginRight:'5px'}} to={`/users/${cmt.authorId}`} onClick={()=> setCommentsOpen(false)}>{cmt.authors[0]?.username}</Link>
        <p>{cmt.comment}</p>
        {/* {i === arr.length-1 ? <div ref={scrollRef}></div> : null} */}
        </div>
        )
        }
        <div ref={scrollRef}></div>
     </div>
     <div onClick={closeCommentsSection} style={{position: 'absolute', top:0, right:0, zIndex: 999}}>X</div>
     
     <div style={{position:'absolute', bottom:0}}>
     <input  type='text' value={comment} onChange={(e) => setComment(e.target.value)}></input>
     <button onClick={submitComment}>send</button>
     </div>
    </div>
    </div>

  )
}

export default CommentsDB