import { selectAllUsers, selectUserById, selectUserEntities, selectUsersIds, useGetUserByIdQuery } from './usersSliceDB'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { selectPostById, selectPostsByAuthor, useGetPostsByUserIdQuery } from '../dbPosts/postSliceDB';
import ReactionsDB from '../dbPosts/ReactionsDB';
import ReactionComments from '../dbPosts/ReactionComments';
import PostListDB from '../dbPosts/PostListDB';

const UserPageDB = () => {
    const {userId} = useParams(); //destructuring userId
    // const loc = useLocation();
    // const userId = loc.state;
    // console.log("userId", loc.state)
    // const allUser = useSelector(selectAllUsers);

    // const allIds = useSelector((state) => selectUsersIds(state, allUser))
    // console.log("allIds === ", allIds)
    // console.log("all====", allUser)
    // console.log("userID form userPage", userId)

    // // console.log("selectUserResult == ", selectUserResult());
    // const entities = useSelector(selectUserEntities)
    // console.log("entities == ", entities)   // here it displays {undefined: Array(2)} inplace of undefined we need to have ids

    // const user = useSelector((state) => selectUserById(state, userId.toString()))
    // console.log("wholeUser", user)

    // const {data}= useGetUserByIdQuery(userId)

    const {data} = useGetPostsByUserIdQuery(userId)
    // console.log("data", data.entities);

    //This wiont work because it fetches the post by its id and not the posts by userid
    // all the post is stored in RTK cache with ids as its post ids
    // const posts = useSelector(state => selectPostById(state, ("68b4042be31f063c4b12e022")));
    // console.log("data", posts);
const userPosts = useSelector(state => selectPostsByAuthor(state, userId))
console.log("userPost", userPosts)
    //  const renderPost = userPosts.map(post => (
    //     <div key={post._id} style={{marginBottom: "20px"}}>
    //         <div>{post.title}</div>
    //         <div>{post.content}</div>
    //         <ReactionsDB postId={post._id} reactions={post.reactions}/>
    //         <ReactionComments reactions={post.reactions}/>
    //     </div>
    // ))
  return (
    <div>
    {/* <div>{user.username}</div>
    <div>{JSON.stringify(user.roles)}</div>
    <div>{JSON.stringify(user._id)}</div> */}
    {/* <div>{JSON.stringify(data)}</div> */}
    {/* <div>{renderPost}</div> */}
    <div><PostListDB post={userPosts}/></div>
    </div>
  )
}

export default UserPageDB