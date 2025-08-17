import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../api/auth/authSlice';

export const HomePage = () => {
    
  const user123 = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const roles = useSelector(state => state.auth.roles);

  useEffect(() => {
    console.log("User in HomePage: ", user123);
    console.log("Token in HomePage: ", token); 
    console.log("Roles in HomePage: ", roles);
  },[])

  return (
    <div>HomePage</div>
  )
}

