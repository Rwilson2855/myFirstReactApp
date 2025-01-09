import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React", owner: "John" },
    { id: 2, title: "Learn React", owner: "John" },
    { id: 3, title: "Learn React", owner: "John" },
  ]);

  const addTodo = (title, owner) => {
    const newTodo = {
      id: todos.length + 1,
      title,
      owner
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onRemove={removeTodo} />
    </div>
  );
}

function TodoInput({ onAdd }) {
  const todoInputContainerStyle = {
    padding: "20px",
  };

  const [todoTitle, setTodoTitle] = useState("");
  const [owner, setOwnerName] = useState("");

  const handleSubmit = () => {
    if (todoTitle && owner) {
      onAdd(todoTitle, owner);
      setTodoTitle("");
      setOwnerName("");
    }
  };

  return (
    <div style={todoInputContainerStyle}>
      <label htmlFor="user">
        User Name:
        <input
          id="user"
          onChange={(e) => setOwnerName(e.target.value)}
          value={owner}
        />
      </label>
      <label htmlFor="todo">
        Todo Name:
        <input
          id="todo"
          onChange={(e) => setTodoTitle(e.target.value)}
          value={todoTitle}
        />
      </label>
      <button onClick={handleSubmit}>Add Todo</button>
    </div>
  );
}

function TodoList({ todos, onRemove }) {
  const todoListContainerStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  };

  return (
    <div style={todoListContainerStyle}>
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>Owner: {todo.owner}</p>
          <button onClick={() => onRemove(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;