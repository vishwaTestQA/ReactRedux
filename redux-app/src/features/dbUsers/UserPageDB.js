import { selectAllUsers, selectUserById, selectUserEntities, selectUsersIds } from './usersSliceDB'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserPageDB = () => {
    const {userId} = useParams(); //destructuring userId
    const allUser = useSelector(selectAllUsers);

    const allIds = useSelector((state) => selectUsersIds(state, allUser))
    console.log("allIds === ", allIds)
    console.log("all====", allUser)
    console.log("userID form userPage", userId)

    // console.log("selectUserResult == ", selectUserResult());
    const entities = useSelector(selectUserEntities)
    console.log("entities == ", entities)   // here it displays {undefined: Array(2)} inplace of undefined we need to have ids

    const user = useSelector((state) => selectUserById(state, userId.toString()))
    console.log("wholeUser", user)
  return (
    <div>
    <div>{user.username}</div>
    <div>{JSON.stringify(user.roles)}</div>
    <div>{JSON.stringify(user._id)}</div>
    </div>
  )
}

export default UserPageDB