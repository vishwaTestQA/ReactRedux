import { useEffect, useRef, useState } from "react";
import { generatePath, Link, matchPath, useLocation, useNavigate, useParams } from "react-router-dom";
// import '../../../src/App.css'

const ReactionComments = ({ reactions }) => {

  //Just to check the userId before rendering the component unnecessrly
 const location = useLocation();
 const userId = location.pathname.split('/')[1];
 

  const emojis = {
    like: '👍🏻',
    dislike: '👎🏻',
    love: '❤️',
    laugh: '😂',
    sad: '😢',
    angry: '😡'
  }

  const countType = reactions.reduce((re, { type, authors}) => {
    re[type] = (re[type] || 0) + 1;
    // re[authors[0]._id] = authors.map(obj => obj._id)
    return re;
  }, {})

 console.log('count type', countType);

  //Object.fromEntries again convert the result array from Object.entries to an object
  const sortedReactBasedOnCount = Object.fromEntries(Object.entries(countType).sort(([, a], [, b]) => b - a))

  //calculate the total reaction to show the numbers above the Like buttom
  const totalReactCount = Object.entries(countType).reduce((acc, [k, v]) => acc + v, 0)

  const [reactCount, setReactCount] = useState(false)
  const handleReact = (e) => {
    if (e.target === e.currentTarget) {   //works for stops bubbling
      // e.bubbles = false;
      // console.log("eeeeee", e.bubbles);
      setReactCount(!reactCount)
    }
    // e.stopPropagation();                          //doesnt works  
    // e.nativeEvent.stopImmediatePropagation();
  }

  const [showusers, setShowUsers] = useState(true)
  const [index, setIndex] = useState(0)

  const showUsersReacted = (k, i) => {
    setShowUsers(k)
    setIndex(i)
    console.log(i)
  }

  console.log("sorted", sortedReactBasedOnCount)
  return (
    <div role="button" onClick={handleReact}>
    {
        Object.entries(sortedReactBasedOnCount).map(([k, v]) => <span onClick={handleReact}>{emojis[k]}</span>)
      }
      <span onClick={handleReact} style={{marginLeft:"10px"}}>{totalReactCount > 0 ? totalReactCount: null}</span>
      {reactCount === true ?
        <div className={'reaction-modal'}>
          <div className={'reaction-group'} style={{ display: "flex", flexDirection: "row", width: "100px" }}>
            {
              //countType has all reactions with its count in obj {like:2, laugh:1}
              Object.entries(sortedReactBasedOnCount).map(([k, v], i) =>

                //top header for reactions
                <div key={i} 
                     onMouseOver={() => showUsersReacted(k, i)} 
                     className={`${index === i}` ? "active" : "inActive"}>
                  <div style={{ marginRight: "20px" }}>
                    <span>{emojis[k]}</span>
                    <span>{v}</span>
                  </div>
                  <div>
                    {i == index && reactions.map(r => r.type === showusers
                      // ? <div><Link to={`users/${r.authors[0]._id}`}>{r.authors[0].username}</Link></div>
                      // ? <div><Link to={`users`} state={{userId: `${r.authors[0]._id}`}}>{r.authors[0].username}</Link></div>
                      // ? <div><Link to={`/user/`} state={{userId:`${r.authors[0]._id}`}}>{r.authors[0].username}</Link></div>
                      ? <div>
                           {userId !== r.authors[0]._id ? <Link to={`/users/${r.authors[0]._id}`}>{r.authors[0].username}</Link>: null}
                        </div>
                      // ?<div onClick={()=> setAuthorId(r.authors[0]._id)}>{r.authors[0].username}</div>
                      : null
// {/* <div onClick={() => handleLink(r.authors[0]._id)}>{r.authors[0].username}</div> */}
                      // <Link onClick={() => handleLink(r.authors[0]._id)} to={ref}>{r.authors[0].username}</Link>
                    )}
                  </div>
                  {/* {authorId ? <UserPageDB userId ={authorId}></UserPageDB> : null} */}
                </div>
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