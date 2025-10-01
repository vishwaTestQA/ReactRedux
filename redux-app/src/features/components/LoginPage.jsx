import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from '../api/auth/authSlice';
import { useLoginMutation } from '../api/auth/apiAuthEndpoints';


import { store } from '../../app/store';
import { extendedApiSlicePostDB } from '../dbPosts/postSliceDB';
import { extendedApiSliceDB } from '../dbUsers/usersSliceDB';

export const LoginPage = () => {

  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'
  console.log("from", from);
  const [login, {isLoading}] = useLoginMutation();
  const [err, setErr] = useState(false);
  const  handleSubmit = async (e) => {
    e.preventDefault();
      try{
        const userData = await login({username, password}).unwrap();   //to get the token from server
              dispatch(setCredentials({
                   user:  userData.user.username,
                   token: userData.accessToken,
                   roles: userData.user.roles, // Assuming roles are part of the user object
                   id: userData.user.id,
                   profilePicture: userData.user.profilePicture
            })) 
        console.log("user logged in successfully:", userData);
        if(userData.accessToken){
        console.log("token", userData.accessToken);
        // dispatch(extendedApiSlicePostDB.endpoints.getAllPosts.initiate()); 
        dispatch(extendedApiSlicePostDB.endpoints.getAllPostsbyLimit.initiate({page:1, limit:5}));
        dispatch(extendedApiSliceDB.endpoints.getAllUsers.initiate());  
        }
        navigate(from || '/', {replace: true});  //redirect to home page
      }catch(err){
        setErr(true)
      }
  //     axios.post('https://jsonplaceholder.typicode.com/posts', {
  //       username,
  //       password
  // })

      
}


  return (
    <div>
      {err ? <div>Invalid Login!.</div> : null}
      <form onSubmit={handleSubmit}>
      <label htmlFor="username">username</label>
      <input type="text" id="username" placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
      <label htmlFor="password">password</label>  
      <input type="password" id="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
      <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  )
}
