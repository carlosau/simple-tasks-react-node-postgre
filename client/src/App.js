import './App.css';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { useEffect, useState } from 'react';
import axios from "axios"

function App() {
  const Todos = ({ todos, onEditClick }) => {
    return (
      <div className='todos'>
        {todos.map((todo) => (
          <div className='todo' key={todo.id}>
            <button
              className='checkbox'
              style={{ backgroundColor: todo.status ? "#7290e2" : "white" }}
            ></button>
            {/* Editable Text */}
            <div
              contentEditable={todo.isEditing} // Only make the text editable if `isEditing` is true
              suppressContentEditableWarning={true} // Suppresses React warning when using `contentEditable`
              onBlur={(event) => onEditBlur(todo, event)} // Save on blur (when focus is lost)
              onKeyDown={(event) => onEditKeyDown(todo, event)} // Save on "Enter" key press
              style={{
                border: todo.isEditing ? "1px solid #ccc" : "none", // Show border when editing
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              {todo.name}
            </div>
            <button onClick={() => onEditClick(todo)}>
              <AiOutlineEdit size={17} />
            </button>
            <button onClick={() => deleteTodo(todo)}>
              <AiOutlineDelete size={17} />
            </button>
          </div>
        ))}
      </div>
    );
  };

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

  async function deleteTodo(todo) {
    await axios.delete(`http://localhost:3333/todos/${todo.id}`)
    getTodos()
  }

  async function updateTodo(todo, updatedName) {
    if (!updatedName) return; // Do not update if name is empty

    // Update the todo on the backend
    await axios.put("http://localhost:3333/todos/", {
      id: todo.id,
      name: updatedName,
    });

    // Refresh todos after successful update
    getTodos();
  }

  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [inputVisibility, setInputVisibility] = useState(false)
 // const [selectedTodo, setSelectedTodo] = useState()

  // Trigger editing on the todo item
  const onEditClick = (todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, isEditing: true } : t
      )
    );
  };

  // Save todo when user clicks out of the editable area (blur event)
  const onEditBlur = (todo, event) => {
    const updatedName = event.target.innerText.trim();
    if (updatedName !== todo.name) {
      updateTodo(todo, updatedName);
    }
    // Disable editing
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, isEditing: false } : t
      )
    );
  };

  // Save todo when user presses the "Enter" key
  const onEditKeyDown = (todo, event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the Enter key from creating a new line
      const updatedName = event.target.innerText.trim();
      if (updatedName !== todo.name) {
        updateTodo(todo, updatedName);
      }
      // Disable editing after saving
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, isEditing: false } : t
        )
      );
    }
  };

  useEffect(() => {
    getTodos()
  }, [])
 
  return (
    <div className="App">
      <header className='container'>
        <div className='header'>
          <h1>"day here"</h1>
        </div>
        <Todos todos={todos} onEditClick={onEditClick} ></Todos>
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
