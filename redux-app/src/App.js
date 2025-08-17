import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./features/components/Layout";
import PostList from "./features/posts/PostList";
import { EditPost } from "./features/posts/EditPost";
import UserPage from "./features/Users/UserPage";
import { UsersList } from "./features/Users/UsersList";
import AddPosts from "./features/posts/AddPost";
import { SinglePost } from "./features/posts/SinglePost";
import Register from "./features/components/Register";
import { HomePage } from "./features/components/HomePage";
import { useSelector } from "react-redux";
import { LoginPage } from "./features/components/LoginPage";
import RequireAuth from "./features/components/RequireAuth";
// import { LoginPage } from "./features/components/LoginPage";

function App() {
  const user = useSelector(state => state.auth.user);
  console.log("user in App: ", user);
  return (
     <Routes>
      {/* <Route index element={<LoginPage/>}/> */}

      {/* <Route path='/' element={<Layout/>}> */}
        <Route path = '/login' element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route element={<RequireAuth/>}>
        <Route index element={<HomePage/>}/> 
       </Route>
         {/* <Route index element={<PostList/>}/> */}
{/* 
         <Route path="post">
          <Route index element={<AddPosts/>}/>
          <Route path=":postId" element={<SinglePost/>}/>
          <Route path="edit/:postId" element={<EditPost/>}/>
         </Route> */}

       {/* <Route path='users'>
       <Route index element = {<UsersList/>}/>
       <Route path=':userId' element = {<UserPage/>}/>
    </Route> */}

     {/* <Route path="*" element={<div>missing page - 404</div>}/> */}
     <Route path="*" element={Navigate('/')}/>

      {/* </Route> */}

      
     </Routes>
  );
}

export default App;

//   Keywords/cmn/patientWebUtilities/ShadowRootHandler.groovy