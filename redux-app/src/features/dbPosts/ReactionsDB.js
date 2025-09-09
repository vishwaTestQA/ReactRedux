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
    <div style={{width:'100%'}}>
      <div className={'main-react'}
        style={{ display: 'inline', position: 'relative', width:'100%'}}
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
              : emoji === "remove" ? <button className='main-btn' style={{border:"none"}}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>Like</button>
              : <button className='main-btn' style={{border:"none", textAlign:'center'}}>
                <span style={{marginRight:'5px'}}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg></span>Like</button>
          }
        </button>
      </div>

      <button className='main-btn' style={{border:"none"}}>
        <span style={{marginRight:'5px'}}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="lucide lucide-message-circle-more-icon lucide-message-circle-more">
          <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>
          <path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg> </span>
          Comment
      </button>
      
      <button className='main-btn' style={{border:"none"}}>
        <span style={{marginRight:'5px'}}><svg xmlns="http://www.w3.org/2000/svg" 
        width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="lucide lucide-share2-icon lucide-share-2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg></span>
        share</button>
      {/* </div> */}
      {/* <div>{JSON.stringify(postId)}</div> */}
    </div>
  )
}

export default ReactionsDB