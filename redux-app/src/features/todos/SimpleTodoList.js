import React, { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const SimpleTodoList = () => {

  const [value, setValue] = useState('');
  const [input, setInput] = useState('');
  const [check, setCheck] = useState(false);
  const [obj, setObj] = useState([]);

  const onInputChanged = (e) => setInput(e.target.value)

  const onCheckboxChnaged = (index) => {
    setObj(prevState => {
      const newState = prevState.filter((_,i) => i === index)
      console.log(newState);
      // return [...prevState, newState];
    });
  }

  const onSubmitInput = (e) => {
    setObj([...obj, {value:input, completed:check}]);
  }

  const deleteTodo =(index)=>{
    setObj(prev => {
       const newState = prev.filter((_,i)=> i!==index)
       return newState;
    })
  }


  return (
    <div style={styles.form}>
      <form>  
      <input type='text' value={input} onChange={onInputChanged}/>
      <button onClick={onSubmitInput}>submit</button>
      </form>
       <div>
        {
          obj.map((todo,i) => (
            <div className='cardsTodo' style={styles.cardsTodo} key={i}>
            <label htmlFor='check'></label>
            <input type='checkbox' id='check' 
                               checked ={todo.completed} 
                               onChange={() => onCheckboxChnaged(i)}/> 
            <p>{todo.value}</p>
            <button onClick={()=>deleteTodo(i)}>
              <FontAwesomeIcon icon={faTrash}/>
            </button>
            </div>
          ))
        }
        </div>
    </div>
  )
}

const styles = {
  form:{
    display: 'flex',
    flexDirection: 'column'
  },
  cardsTodo:{
    display:"flex",
    flexDirection: "row",
    paddingRight:"50%",
    paddingLeft:"50%",
  }
}

export default TodoList