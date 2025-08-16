import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, useAddReactionMutation } from './postSlice'

const ReactionButton = ({postId}) => {
  // const reacts = useSelector(state => selectPostById(state, postId));
const [addReaction] = useAddReactionMutation();

  const allPost = useSelector(selectAllPosts);
  console.log("InReactionButtonComp  ", allPost, "====", postId)
  const post = allPost.find(post => post.id === postId)
  console.log("InReaction=post ", post)
  
   const reactions={
    thumbsUp: '👍',
    wow: '😲',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
  }

const clickEmoji = (name) => {
  const newValue =  post?.reactions[name]+1;
  console.log("postIdInAddReactionComp ", postId)
  addReaction({postId, reactions: {...post.reactions, [name]:newValue}});
}

  const reactEmoji = Object.entries(reactions).map(([name, emoji])=>{
      return <>
      <button key={name} 
              onClick ={() => clickEmoji(name)}>
        {emoji} {post?.reactions?.[name]}
      </button>
      {/* <span>{}</span> */}
      </>
  })

  // 

  return (
    <div>
      {reactEmoji}
    </div>
  )
}

export default ReactionButton