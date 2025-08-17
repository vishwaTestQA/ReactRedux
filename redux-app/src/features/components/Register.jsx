import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRegisterMutation } from '../api/auth/apiAuthEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCredentials } from '../api/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const [message, setMessage] = useState(false);

    const [register, {isLoading, error}] = useRegisterMutation(); // using the register mutation from authApiSlice
   
    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        // Handle registration logic here
        // if (password !== confirmPassword) {
        //     alert("Passwords do not match");
        //     return;
        // }
    //    const resp = await axios.post('http://localhost:3500/auth/register', {
    //     username,
    //     password,
    //     confirmPassword
    //    },{ withCredentials: true }); // withCredentials is important to send cookies with the request

      const resp = await register({username, password, confirmPassword}).unwrap(); // using the register mutation from authApiSlice

       console.log("Registration successful:",resp);
       console.log("username:", resp.user.username);
       dispatch(setCredentials({
           user:  resp.user.username,
           token: resp.accessToken,
           roles: resp.user.roles // Assuming roles are part of the user object
    })) 
    if(resp.user.username) {
        setMessage('Registration successful!');
        // navigate('/home'); // Redirect to home page after successful registration
    }
}  

// useEffect(() => {
//     if (error) {
//         setMessage('Registration failed: ' + error.data.message);
//     } else if (!isLoading && !error && resp.user.username) {
//         setMessage('Registration successful!');
//         // navigate('/home'); // Redirect to home page after successful registration
//     }
// }, [error, isLoading]);

  return (
    <div>
    <form onSubmit={e => handleRegister(e)}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required value={username} 
        onChange={(e) => setUsername(e.target.value)}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        placeholder='Enter username'/>
        <label htmlFor="password">Password:</label>
        <input type="password" 
               id="password" 
               name="password" 
               required 
               value={password} 
               onChange={e => setPassword(e.target.value)}
               placeholder='enter password'/>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required 
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}/>
        <button>Register</button>
    </form>
    <Link to="/home">Home</Link>
    {message ? <p>{message}</p> : null}
    </div>
  )
}

export default Register