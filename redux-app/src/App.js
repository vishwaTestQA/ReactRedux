import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import { Layout } from "./features/components/Layout";
import PostList from "./features/posts/PostList";
import { EditPost } from "./features/posts/EditPost";
import UserPage from "./features/Users/UserPage";
import AddPosts from "./features/posts/AddPost";
import { SinglePost } from "./features/posts/SinglePost";
import Register from "./features/components/Register";
import { HomePage } from "./features/components/HomePage";
import { useSelector } from "react-redux";
import { LoginPage } from "./features/components/LoginPage";
import RequireAuth from "./features/components/RequireAuth";
import {UserList} from './features/dbUsers/userListDB'
import UserPageDB from "./features/dbUsers/UserPageDB";
import AddPostsDB from "./features/dbPosts/AddPostsDB";
import ProfilePage from "./features/components/ProfilePage";
import  EditPostDB  from "./features/dbPosts/EditPostDB";
import DeletePostDB from "./features/dbPosts/DeletePostDB";
import AllPostByLimitDB from "./features/dbPosts/AllPostByLimitDB";
// import { LoginPage } from "./features/components/LoginPage";

function App() {
  const user = useSelector(state => state.auth.user);
  console.log("user in App: ", user);
  return (
     <Routes>
      {/* <Route index element={<LoginPage/>}/> */}
      <Route path = '/login' element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
      <Route path='/' element={<Layout/>}>
        <Route element={<RequireAuth/>}>
        <Route path='/' element={<HomePage/>}/> 
        <Route path='/bylimit' element={<AllPostByLimitDB/>}/> 
        <Route path='/profile' element={<ProfilePage/>}/> 
        <Route path="/users" element={<UserList/>}/>
        {/* <Route path="/users/:userId" element={<UserPageDB/>}/> */}
        <Route path="/users/:userId" element={<UserPageDB/>}/>


        <Route path="post">
          <Route index element={<AddPostsDB/>}/>
          {/* <Route path=":postId" element={<SinglePost/>}/> */}
          <Route path="edit/:postId" element={<EditPostDB/>}/>
          <Route path="delete/:postId" element={<DeletePostDB/>}/>
         </Route>

 <Route path='users'>
       {/* <Route index element = {<UsersList/>}/> */}
       {/* <Route path=':userId' element = {<UserPage/>}/> */}
       {/* <Route  element = {<UserPage/>}/> */}
    </Route>
         
       </Route>
         {/* <Route index element={<PostList/>}/> */}

         

       <Route path='users'>
       {/* <Route index element = {<UsersList/>}/> */}
       {/* <Route path=':userId' element = {<UserPage/>}/> */}
       {/* <Route  element = {<UserPage/>}/> */}
    </Route>

     {/* <Route path="*" element={<div>missing page - 404</div>}/> */}
     <Route path="*" element={Navigate('/')}/>

      </Route>

      
     </Routes>
  );
}

export default App;

//   Keywords/cmn/patientWebUtilities/ShadowRootHandler.groovy