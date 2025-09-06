import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../api/auth/authSlice'
import { useAddReactionMutation } from './postSliceDB'

const ReactionsDB = ({ postId, reactions}) => {

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

    console.log(emojis.like);
    
  const clickLike = (e) => {
    if(e.target === e.currentTarget){
     setReact(false);
     setEmoji('like');
    }
   }
    const handleReact = async (e, name, count) => {
      // setEmoji(emojis[name])
      if(e.target === e.currentTarget){
      setEmoji(name)
      setReact(!react)
      }
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

    console.log("reactions", reactions[0]?.type);
    const reactPost = Object.entries(emojis)
                        .map(([name, count]) => 
                                <button key={name} 
                                         onClick={(e)=> handleReact(e, name, count)}
                                         onMouseOver={() => {console.log("mouseOverOn", name)}}>{emojis[name]}</button>)
    // reactions.map(({name, count}) => {
       
    // })<button>{ emoji ?? 'Like'}</button>


    //get the current user reaction to display on the post, 
    // if the currentUser didnt have react in his post, then it returns undefined 
    const userReact = reactions?.filter(r => r.authorId === currentUserId)

    console.log("user reaction", userReact[0]?.type);

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

       <div style={{display: 'inline', position: 'relative'}} 
                    onMouseOut={() => setReact(false)} 
                    onMouseOver={() => setReact(true)} 
                    onClick={clickLike}>
        {react ? 
             //display the list of reaction buttons if react is true
             <div style={{position: 'absolute', zIndex:10 , 
                         top:"20px", display:'flex'}}>{reactPost}</div> : null
        }

        {/* interation with the list of button to show the reaction on the post */}
        <button>
                {!emoji && userReact[0]?.type 
                        ? emojis[userReact[0]?.type] 
                        : emoji 
                        ? emojis[emoji]
                        : 'Like'
                }
        </button>
              </div>
     
       <button>comment</button>
       <button>share</button>
       {/* </div> */}
       {/* <div>{JSON.stringify(postId)}</div> */}
    </div>
  )
}

export default ReactionsDB