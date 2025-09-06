import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../api/auth/authSlice';
import { Link } from 'react-router-dom';
import PostListDB from '../dbPosts/PostListDB';
import AllPostDB from '../dbPosts/AllPostDB';

export const HomePage = () => {
    // console.log(check);
  const user123 = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const roles = useSelector(state => state.auth.roles);

  useEffect(() => {
    console.log("User in HomePage: ", user123);
    console.log("Token in HomePage: ", token); 
    console.log("Roles in HomePage: ", roles);
  },[])


  return (
    <div>
      {/* <Link to='/users'>Users</Link> */}
       <AllPostDB/>
      {/* <Link to='/users'>AllPosts</Link> */}
    </div>
  )
}

