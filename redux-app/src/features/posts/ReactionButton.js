import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, useAddReactionMutation } from './postSlice'

const ReactionButton = ({postId}) => {
  // const reacts = useSelector(state => selectPostById(state, postId));
const [addReaction] = useAddReactionMutation();

  const allPost = useSelector(selectAllPosts);
  const post = allPost.find(post => post.id === Number(postId))
  
   const reactions={
    thumbsUp: '👍',
    wow: '😲',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
  }

const clickEmoji = (name) => {
  const newValue =  post.reactions[name]+1;
  addReaction({postId, reactions: {...post.reactions, [name]:newValue}});
}

  const reactEmoji = Object.entries(reactions).map(([name, emoji])=>{
      return <>
      <button key={name} 
              onClick={() => clickEmoji(name)}>
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