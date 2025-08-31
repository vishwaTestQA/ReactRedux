import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../api/auth/authSlice'
import { useAddReactionMutation } from './postSliceDB'

const ReactionsDB = ({postId, reactions}) => {

    const [react, setReact] = useState(false)
    const [emoji, setEmoji] = useState(null)

    const currentUserId = useSelector(selectCurrentId)
    const [addReaction] = useAddReactionMutation();
    const handleLike = () => {
      console.log("rect");
       setReact(true)
    }
    const emojis = {
      like: '👍🏻',
      dislike: '👎🏻',
      love:'❤️',
       laugh:'😂',
       sad:'😢',
       angry:'😡'  
    }

    const handleReact = async (name, count) => {
      // setEmoji(emojis[name])
      setEmoji(name)
      setReact(!react)

      //cannot use here due to useState batch run
//  const reactionResult = await addReactions({postId, currentUserId, type: emoji}).unwrap();
      // console.log(reactionResult);
      // console.log({postId, currentUserId, type:emoji});
    }

    async function postReaction(){
        try {
          const reactionResult = await addReaction({postId, userId: currentUserId, type: emoji}).unwrap();
        console.log("reactions", reactionResult);
        } catch (error) {
          console.log('error')
        }

        return () => {}
    }
    useEffect(() => {
        if(!emoji) return
        console.log({postId, currentUserId, type:emoji});
        // (async ()=> {
        //     try {
        //    const reactionResult = await addReaction({postId, userId: currentUserId, type: emoji}).unwrap();
        // console.log("reactions", reactionResult);
        // } catch (error) {
        //   console.log('error')
        // }
        // })()
        postReaction();
    },[react, emoji])

    const reactPost = Object.entries(reactions)
                       .map(([name, count]) => 
                                <button key={name} onClick={()=> handleReact(name, count)}>{emojis[name]}</button>)
    // reactions.map(({name, count}) => {
       
    // })<button>{ emoji ?? 'Like'}</button>

    console.log(react)
  return (
    // style={{display:'flex'}}
    <div >
      {/* <div onMouseOver={handleLike} onMouseOut={() => setReact(false)}>
       {
        react ? reactPost : null
       }
       {react==false && emoji==null 
                  ? <button>Like</button> 
                  : <button>{emoji}</button>
        }
       </div> */}

       <div style={{display: 'inline', position: 'relative'}} onMouseOut={() => setReact(false)} onMouseOver={() => setReact(true)}>
        {react ? <div style={{position: 'absolute', zIndex:10}}>{reactPost}</div> : null}
        {/* <button onMouseOver={() => setReact(true)}>{emoji ? emoji : 'Like'}</button> */}
        <button >{emoji ? emojis[emoji] : 'Like'}</button>
        {/* <div> */}</div>
     
       <button>comment</button>
       <button>share</button>
       {/* </div> */}
       {/* <div>{JSON.stringify(postId)}</div> */}
    </div>
  )
}

export default ReactionsDB