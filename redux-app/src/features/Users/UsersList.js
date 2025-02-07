import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom';

export const UsersList = () => {
  const users = useSelector(selectAllUsers);
  console.log("users", users);
  
  const renderNames = users.flat().map(user => 
   <h3 key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></h3>)

  return (
    <div>
      {renderNames}
    </div>
  )
}
