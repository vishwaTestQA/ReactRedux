import React from 'react'
import { selectAllUsers } from './usersSlice';
import { useSelector } from 'react-redux';

export const userList = () => {

    const allusers = useSelector(selectAllUsers);
    console.log("allusers", allusers);

    const renderUsers = allusers.flat().map(user =>
        <h3 key={user.id}>{user.name}</h3>)
  return (
    <div>{renderUsers}</div>
  )
}
