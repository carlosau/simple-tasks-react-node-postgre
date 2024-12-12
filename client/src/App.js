import './App.css';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { useEffect, useState } from 'react';
import axios from "axios"

const arrayTodos = [
  { name: "Organizar Arquivos PC", status: false },
  { name: "Rezar rosário", status: false }
]

const Todos = ({ todos }) => {
  return <div className='todos'>
    {todos.map((todo) => {
      return (
        <div className='todo'>
          <button className='checkbox' style={{backgroundColor: todo.status ? "#7290e2" : "white"}}></button>
          <p>{todo.name}</p>
          <button>
            <AiOutlineEdit size={17}/>
          </button>
          <button>
            <AiOutlineDelete size={17}/>
          </button>
        </div>
      )
    })}
  </div>
}

function App() {
  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility)
  }
  
  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos")
    setTodos(response.data)
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    })
    getTodos()
    setInputVisibility(!inputVisibility)
    setInputValue('')
  }

  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [inputVisibility, setInputVisibility] = useState(false)

  useEffect(() => {
    getTodos()
  }, [])
  return (
    <div className="App">
      <header className='container'>
        <div className='header'>
          <h1>"day here"</h1>
        </div>
        <Todos todos={todos}></Todos>
        <input 
        value={inputValue}
        style={{display: inputVisibility ? "block" : "none"}}
        onChange={(event) => {
          setInputValue(event.target.value)
        }}
        className='inputName'>          
        </input>
        <button onClick={inputVisibility ? createTodo : handleWithNewButton} className='newTaskButton'>
          {inputVisibility ? "Confirm" : "+ New Task"}
        </button>
      </header>
    </div>
  );
}

export default App;
