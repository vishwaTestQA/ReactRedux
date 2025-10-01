import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../api/auth/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PostListDB from '../dbPosts/PostListDB';
import AllPostDB from '../dbPosts/AllPostDB';
import AllPostByLimitDB from '../dbPosts/AllPostByLimitDB';

export const HomePage = () => {
    // console.log(check);
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const roles = useSelector(state => state.auth.roles);

  const navigate= useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("entered")
    // console.log("User in HomePage: ", user);
    // console.log("Token in HomePage: ", token); 
    // console.log("Roles in HomePage: ", roles);
  },[])


  return (
    <div>
      {/* <Link to='/users'>Users</Link> */}
       {/* { user ? <AllPostDB/> : navigate('/login', {state: {from: location}}) } */}
       { user ? <AllPostByLimitDB/> : navigate('/login', {state: {from: location}}) }
      {/* <Link to='/users'>AllPosts</Link> */}
    </div>
  )
}

