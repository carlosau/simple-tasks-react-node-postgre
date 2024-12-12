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
  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos")
    setTodos(response.data)
  }

  const [todos, setTodos] = useState([])
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
        <input className='inputName'></input>
        <button className='newTaskButton'>
          + New Task
        </button>
      </header>
    </div>
  );
}

export default App;
