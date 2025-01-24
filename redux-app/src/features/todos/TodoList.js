import React, { useState } from 'react'
import { useGetTodosQuery, useAddTodoMutation } from '../api/apiSlice'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const TodoList = () => {

  const [newTodo, setNewTodo] = useState('');

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,       
  } = useGetTodosQuery()     //these props automatically created by redux toolkit query

  const [addTodo] = useAddTodoMutation();

  let content='';
  if(isLoading) content = <p>Loading...</p>
  if(isSuccess) content = JSON.stringify(todos)
  if(isError) content = <p>{error}</p>
  
  
return (
  <div>
    {content}
  </div>
)

//   const onSubmitInput = (e) => {
     
//   }

//   const deleteTodo =(index)=>{
//     setObj(prev => {
//        const newState = prev.filter((_,i)=> i!==index)
//        return newState;
//     })
//   }


//   return (
//     <div style={styles.form}>
//       <form>  
//       <input type='text' value={input} onChange={onInputChanged}/>
//       <button onClick={onSubmitInput}>submit</button>
//       </form>
//        <div>
//         {
//           obj.map((todo,i) => (
//             <div className='cardsTodo' style={styles.cardsTodo} key={i}>
//             <label htmlFor='check'></label>
//             <input type='checkbox' id='check' 
//                                checked ={todo.completed} 
//                                onChange={() => onCheckboxChnaged(i)}/> 
//             <p>{todo.value}</p>
//             <button onClick={()=>deleteTodo(i)}>
//               <FontAwesomeIcon icon={faTrash}/>
//             </button>
//             </div>
//           ))
//         }
//         </div>
//     </div>
//   )
// }

// const styles = {
//   form:{
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   cardsTodo:{
//     display:"flex",
//     flexDirection: "row",
//     paddingRight:"50%",
//     paddingLeft:"50%",
//   }
}

export default TodoList