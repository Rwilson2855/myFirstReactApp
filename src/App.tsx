import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";

function App() {
  const [todos, setTodos] = useState([
    { completed: true, id: 1, title: "who am I", owner: "John" },
    { completed: true, id: 2, title: "Teach React", owner: "Tanner" },
    { completed: false, id: 3, title: "Bug Fix React", owner: "Ryan" },
    { completed: false, id: 4, title: " Fix React", owner: "Jack" },
  ]);
  const [sortBy, setSortBy] = useState("all");
  const addTodo = (title, owner) => {
    const newTodo = {
      id: todos.length + 1,
      title,
      owner,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const uniqueOwners = [...new Set(todos.map((todo) => todo.owner))];

  const filteredIncompletedTodos =
    sortBy === "all"
      ? todos.filter((todo) => todo.completed === false)
      : todos.filter(
          (todo) => todo.owner === sortBy && todo.completed === false
        );
  const filteredCompletedTodos =
    sortBy === "all"
      ? todos.filter((todo) => todo.completed === true)
      : todos.filter(
          (todo) => todo.owner === sortBy && todo.completed === true
        );

  return (
    <div className="App">
      <TodoInput onAdd={addTodo} />
      <div style={{ padding: "20px" }}>
        <label>
          Filter by owner:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="all">All owners</option>
            {uniqueOwners.map((owner) => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        </label>
      </div>
      <TodoList
        todos={filteredIncompletedTodos}
        onRemove={removeTodo}
        title="Incomplete"
        setTodos={setTodos}
      />
      <TodoList
        todos={filteredCompletedTodos}
        onRemove={removeTodo}
        title="Complete"
        setTodos={setTodos}
      />
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

function TodoList({ todos, onRemove, title, setTodos }) {
  console.log("todo list bug fix", todos, title);
  const todoListContainerStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    height: "20vh",
    overflowY: "scroll",
  };

  return (
    <>
      <h2>{title}</h2>
      <div style={todoListContainerStyle}>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  );
}

function Todo({ todo }) {
  const todoStyle = {
    display: "flex",
    borderBottom: "1px black solid",
    padding: "50px",
    height: "10px",
  };
  return (
    <div key={todo.id} style={todoStyle}>
      <h3>{todo.title}</h3>
      <p>Owner: {todo.owner}</p>
      <Button variant="contained" onClick={() => onRemove(todo.id)}>
        Delete
      </Button>
      <Button
        onClick={() => {
          setTodos((previousState) => {
            return previousState.map((t) => {
              if (t === todo) return { ...t, completed: !t.completed };
              return t;
            });
          });
        }}
      >
        {todo.completed ? "Mark not done" : "Mark done"}
      </Button>
    </div>
  );
}
export default App;
