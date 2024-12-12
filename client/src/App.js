import './App.css';

const arrayTodos = [
  { name: "Organizar Arquivos PC", status: false },
  { name: "Rezar rosário", status: false }
]

const Todos = ({ todos }) => {
  return <div className='todos'>
    {todos.map((todo) => {
      return (
        <div className='todo'>
          <p>{todo.name}</p>
        </div>
      )
    })}
  </div>
}

function App() {
  return (
    <div className="App">
      <header className='container'>
        <Todos todos={arrayTodos}></Todos>
      </header>
    </div>
  );
}

export default App;
