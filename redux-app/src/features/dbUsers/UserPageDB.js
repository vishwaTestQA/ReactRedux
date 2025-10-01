import { selectAllUsers, selectUserById, selectUserEntities, selectUsersIds, useGetUserByIdQuery } from './usersSliceDB'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { selectPostById, selectPostsByAuthor, useGetPostsByUserIdQuery } from '../dbPosts/postSliceDB';
import ReactionsDB from '../dbPosts/ReactionsDB';
import ReactionComments from '../dbPosts/ReactionComments';
import PostListDB from '../dbPosts/PostListDB';
import defaultImage from '../dbPosts/empty.jpeg'

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



    // even this is not required because some selectors are provided by feault in rtk using that we can fetch all posts of specific user
    // const {data} = useGetPostsByUserIdQuery(userId)




    // const {_} = useGetUserByIdQuery(userId)
    // console.log("data", data.entities);

    //This wiont work because it fetches the post by its id and not the posts by userid
    // all the post is stored in RTK cache with ids as its post ids
    // const posts = useSelector(state => selectPostById(state, ("68b4042be31f063c4b12e022")));
    // console.log("data", posts);
const userPosts = useSelector(state => selectPostsByAuthor(state, userId))
const user = useSelector(state => selectUserById(state, userId))
const entitites = useSelector(state => selectUserEntities(state))
console.log("entities", entitites)
console.log("userPost", userPosts)   //it will fetch all the posts of that user, each post is different 
console.log("user...", user);
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
    {/* <div>{userPosts?.authors[0]?.username}</div> */}
    <div>Profile</div>
    <div>Username: {user.username}</div>
    <img style={{width:'150px', height:'150px'}} src={user.profilePicture?.url || defaultImage}></img>
    <div><PostListDB post={userPosts}/></div>
    </div>
  )
}

export default UserPageDB