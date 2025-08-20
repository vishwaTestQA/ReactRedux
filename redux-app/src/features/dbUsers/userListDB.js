import React, { useState } from 'react'
import { selectAllUsers } from './usersSliceDB';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserPageDB from './UserPageDB';

export const UserList = () => {
    // console.log(check);
    const allusers = useSelector(selectAllUsers);
    // const [getAllUsers]= useGetAllUsersQuery();
    // const resp = getAllUsers().unwrap();
    // console.log("mutation ===",resp);
    // console.log("allusers", allusers);
    const [flag, setFlag] = useState(false)
    const handlePage = (e) => {
      setFlag(true)
    } 
    const renderUsers = allusers.flat().map(user =>
        <Link to={`${user._id}`}key={user._id} onClick={handlePage}>
          <h3>{user.username}</h3>
         {/* { flag ? <UserPageDB userId = {user._id}></UserPageDB> : null } */}
          </Link>
      )
  return (
    <div>{renderUsers}</div>
  )
}
