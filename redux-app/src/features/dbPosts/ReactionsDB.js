import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../api/auth/authSlice'
import { useAddReactionMutation } from './postSliceDB'

const ReactionsDB = ({ postId, reactions }) => {

  const [react, setReact] = useState(false)
  const [emoji, setEmoji] = useState(null)

  const currentUserId = useSelector(selectCurrentId)
  const [addReaction] = useAddReactionMutation();

  const emojis = {
    like: '👍🏻',
    dislike: '👎🏻',
    love: '❤️',
    laugh: '😂',
    sad: '😢',
    angry: '😡'
  }

  const userReacted = reactions?.filter(r => r.authorId === currentUserId)
  console.log("userreacted", userReacted);
  console.log("reactions", reactions);
  console.log("emojiiiiiiiiiiiii==========", emoji === 'remove')
  console.log("emojiiiiiiiiiiiii==========", emoji && userReacted[0]?.type)
  console.log(userReacted[0]?.authors[0]?.username, emojis[userReacted[0]?.type])

  const clickLike = (e) => {
      // console.log("reactedUser", userReacted[0]._id);
    //  console.log("target", e.target, e.currentTarget)
    // if (e.target === e.currentTarget) {
     if(e.target.classList.contains('main-react') || e.target.classList.contains('main-btn')){
      if(userReacted.length>0){
        console.log("entered")
        setEmoji("remove")
      }else{
      console.log("target===============")
      setReact(false);
      setEmoji('like');
      }
    }
  }
  const handleReact = async (e, name, count) => {
    // setEmoji(emojis[name])
    if (e.target === e.currentTarget) {
      setEmoji(name)
      setReact(!react)
    }
    //cannot use here due to useState batch run
    //  const reactionResult = await addReactions({postId, currentUserId, type: emoji}).unwrap();
    // console.log(reactionResult);
    // console.log({postId, currentUserId, type:emoji});
  }

  async function postReaction() {
    try {
      const reactionResult = await addReaction({ postId, userId: currentUserId, type: emoji }).unwrap();
      console.log("reactions", reactionResult);
    } catch (error) {
      console.log('error')
    }
    return () => { }
  }
  useEffect(() => {
    if (!emoji) return
    console.log({ postId, currentUserId, type: emoji });
    // (async ()=> {
    //     try {
    //    const reactionResult = await addReaction({postId, userId: currentUserId, type: emoji}).unwrap();
    // console.log("reactions", reactionResult);
    // } catch (error) {
    //   console.log('error')
    // }
    // })()
    postReaction();
  }, [react, emoji])

  const reactPost = Object.entries(emojis)
    .map(([name, count]) =>
      <button 
        className='react-btn'
        style={{border:'none', width:'30px'}}
        key={name}
        onClick={(e) => handleReact(e, name, count)}
        onMouseOver={() => { console.log("mouseOverOn", name) }}>{emojis[name]}</button>)
  // reactions.map(({name, count}) => {

  // })<button>{ emoji ?? 'Like'}</button>


  //get the current user reaction to display on the post, 
  // if the currentUser didnt have react in his post, then it returns undefined 
console.log("emoji at start", emoji)
  return (
    // style={{display:'flex'}}
    <div>
      <div className={'main-react'}
        style={{ display: 'inline', position: 'relative', }}
        onMouseOut={() => setReact(false)}
        onMouseOver={() => setReact(true)}
        onClick={(e) => clickLike(e)}>

             {/* display the list of reaction buttons if react is true */}
        {react 
          ? <div className='reaction-list-btn' 
          style={{
                background: 'white', 
                // boxShadow: '3px 4px 2px 1px rgba(0, 0, 0, 0.3)',
                boxShadow: '0 0 2px 1px rgba(0, 0, 0, 0.3)',
                borderRadius: "20px",
                height: "25px"
            }}>{reactPost}</div> 
          : null
        }

        {/* interation with the list of button to show the reaction on the post */}
        <button className='main-btn' style={{border:"none"}}>
          {userReacted[0]?.type
            ? emojis[userReacted[0]?.type]
            : !emoji =='Like' && !emoji== 'remove'
              ? emojis[emoji] 
              : emoji === "remove" ? 'Like'
              : 'Like'
          }
        </button>
      </div>

      <button className='main-btn' style={{border:"none"}}>comment</button>
      <button className='main-btn' style={{border:"none"}}>share</button>
      {/* </div> */}
      {/* <div>{JSON.stringify(postId)}</div> */}
    </div>
  )
}

export default ReactionsDB