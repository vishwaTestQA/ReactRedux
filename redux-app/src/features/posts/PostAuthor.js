import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../Users/usersSlice';

export const PostAuthor = ({postId}) => {
  const users = useSelector(selectAllUsers);
  // console.log("hiii",users);
  const author = users.flat().find(usr=> Number(usr.id) === Number(postId));

  // const author = useSelector((state) => selectByID(state, postId));
  // console.log(postId, author);


  return (
    <span>
       by {
        author ?  author.name : "unknown author"
       } 
    </span>
  )
}
