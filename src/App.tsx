import { useState } from "react";
import "./App.css";
import Button from '@mui/material/Button';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React", owner: "John" },
    { id: 2, title: "Learn React", owner: "John" },
    { id: 3, title: "Learn React", owner: "John" },
  ]);
  const [sortBy, setSortBy] = useState("all");
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

  const uniqueOwners = [...new Set(todos.map(todo => todo.owner))];

  const filteredTodos = sortBy === "all"
    ? todos
    : todos.filter(todo => todo.owner === sortBy);

  return (
    <div className="App">
      <TodoInput onAdd={addTodo} />
      <div style={{ padding: "20px"}}>
        <label>
          Filter by owner:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="all">All owners</option>
            {uniqueOwners.map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>
        </label>
      </div>
      <TodoList todos={filteredTodos} onRemove={removeTodo} />
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
      <Button onClick={handleSubmit}>Add Todo</Button>
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
          <Button onClick={() => onRemove(todo.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}

export default App;