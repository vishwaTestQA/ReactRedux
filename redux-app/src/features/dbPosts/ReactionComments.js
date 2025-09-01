import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReactionComments = ({reactions}) => {
    // const reac = {
    //     like: 0,
    //     dislike:0,
    //     love:0,
    //     laugh:0,
    //     sad:0,
    //     angry:0
    // }

    //     const reac = {
    //     type: "like",
    //     type:"dislike",
    //     type:"love",
    //     type:"laugh",
    //     type:"",
    //     angry:0
    // }

      const emojis = {
      like: '👍🏻',
      dislike: '👎🏻',
      love:'❤️',
      laugh:'😂',
      sad:'😢',
      angry:'😡'  
    }

  const countType = reactions.reduce((re, {type}) => {
     re[type] = (re[type] || 0) + 1;
     return re;
  },{})

const obj2 = countType;

//Object.fromEntries again convert the result array from Object.entries to an object
const sortedReactBasedOnCount = Object.fromEntries(Object.entries(countType).sort(([,a],[,b]) => b-a))

const totalReactCount = Object.entries(countType).reduce((acc, [k,v]) => acc+v, 0)

console.log("total", totalReactCount);

const [reactCount, setReactCount] = useState(false)
const handleReact = (e) => {
    e.stopPropagation()
    setReactCount(!reactCount)
}

// useEffect(() => {
//     if(!reactCount) return 
// },[reactCount])

  return (
    <div role="button" onClick={handleReact}>
      {totalReactCount > 0 ? totalReactCount-1+"+" : 0}{
       Object.entries(sortedReactBasedOnCount).map(([k,v]) => emojis[k])
      }
     {reactCount ? 
          <div style={{position: "absolute", 
                        top:0, bottom:0, left:0, right:0, 
                        zIndex:999, 
                        background:"white", 
                        height:"100%", 
                        display:"flex", flexDirection: "row", alignItems:"flex-start", justifyContent: "space-between"}}>
          
          <div style={{display:"flex", flexDirection: "row", width:"100px"}}>
            {
            //countType has all reactions with its count in obj {like:2, laugh:1}
            Object.entries(countType).map(([k, v]) =>
            <>
            <div key={k} style={{marginRight:"20px"}}>{emojis[k]} {v}</div>
            <div>
                {reactions.map(r =>  r.type === k
                    ? <div><Link>{r.authors[0].username}</Link></div> 
                    : null
                )}
            </div>
            </> 
            )
            }
          </div>

          <div>
          <button onClick={handleReact}>X</button>
          </div>
          </div> 
          : null
        }

    </div>
  )
}

export default ReactionComments