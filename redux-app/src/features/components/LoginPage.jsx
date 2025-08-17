import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from '../api/auth/authSlice';
import { useLoginMutation } from '../api/auth/apiAuthEndpoints';

export const LoginPage = () => {

  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [login, {isLoading}] = useLoginMutation();
  const  handleSubmit = async (e) => {
    e.preventDefault();
      try{
        const userData = await login({username, password}).unwrap();   //to get the token from server
        // dispatch(setCredentials({...userData}))     //for state in react
        console.log("user logged in successfully:", userData);
        navigate('/home');  //redirect to home page
      }catch(err){
        console.error('Login failed:', err);
      }
  //     axios.post('https://jsonplaceholder.typicode.com/posts', {
  //       username,
  //       password
  // })

      
}


  return (
    <div>
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
