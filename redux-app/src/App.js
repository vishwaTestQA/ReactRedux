import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./features/components/Layout";
import PostList from "./features/posts/PostList";
import { EditPost } from "./features/posts/EditPost";
import UserPage from "./features/Users/UserPage";
import { UsersList } from "./features/Users/UsersList";
import AddPosts from "./features/posts/AddPost";
import { SinglePost } from "./features/posts/SinglePost";
// import { LoginPage } from "./features/components/LoginPage";

function App() {

  return (
     <Routes>
      {/* <Route index element={<LoginPage/>}/> */}

      <Route path='/' element={<Layout/>}>

         <Route index element={<PostList/>}/>

         <Route path="post">
          <Route index element={<AddPosts/>}/>
          <Route path=":postId" element={<SinglePost/>}/>
          <Route path="edit/:postId" element={<EditPost/>}/>
          </Route>

       <Route path='users'>
       <Route index element = {<UsersList/>}/>
       <Route path=':userId' element = {<UserPage/>}/>
    </Route>

     {/* <Route path="*" element={<div>missing page - 404</div>}/> */}
     <Route path="*" element={Navigate('/')}/>

      </Route>

      
     </Routes>
  );
}

export default App;

//   Keywords/cmn/patientWebUtilities/ShadowRootHandler.groovy