import React, { useEffect, useState } from 'react'
import { selectAllPosts, selectEntities, selectPostResult, useGetAllPostsbyLimitQuery } from './postSliceDB';
import { useSelector } from 'react-redux';
import PostListDB from './PostListDB';
import { skipToken } from '@reduxjs/toolkit/query';

const AllPostByLimitDB = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [post, setPost] = useState({})
    // const {
    //         isLoading, isError, isSuccess,                                      
    //         }  = useGetAllPostsbyLimitQuery({page: currentPage, limit:5});   //here this will directly fetch the posts
    //         // from backend so ony when we post a new post or can use pool to refetch
    // const { data, isSuccess, isLoading, isError} = useGetAllPostsbyLimitQuery({page: currentPage, limit:5}, {skip: !currentPage})


    const {data, isSuccess, isLoading, isError} = useGetAllPostsbyLimitQuery( currentPage ? { page: currentPage, limit: 5 } : skipToken)
        console.log("data for page",data);  
    const allPost = useSelector((state) => selectAllPosts(state, currentPage, 5)); // it selects the posts from cache
        // const totalPages = useSelector(state => state.posts.totalPages)
        const entities = useSelector(state => selectEntities(state, currentPage, 5))
        console.log("getAllPostInLimit", allPost);
        console.log("entitikes in getPostByLimit", entities)

const nextPage = () => {
   return currentPage !== data?.totalPage ? setCurrentPage(currentPage + 1) : null
}

const previousPage = () => {
   return  currentPage >1 ? setCurrentPage(currentPage - 1) : null
}

  return (
    <>
    <div><PostListDB post={allPost[0]}/></div>
    <div>
        <button onClick={previousPage} disabled={currentPage === 1}>previous page</button>
        <button onClick={nextPage} disabled={currentPage === data?.totalPages}>next page</button>
        </div>
    </>
  )
}

export default AllPostByLimitDB