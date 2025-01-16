import { useState } from "react";

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
      : todos.filter((todo) => todo.owner === sortBy && todo.completed === false);

  const filteredCompletedTodos =
    sortBy === "all"
      ? todos.filter((todo) => todo.completed === true)
      : todos.filter((todo) => todo.owner === sortBy && todo.completed === true);

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#1a1a1a",
      color: "#e0e0e0",
      minHeight: "100vh"
    }}>
      <TodoInput onAdd={addTodo} />
      <div style={{
        padding: "20px",
        backgroundColor: "#2d2d2d",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          Filter by owner:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #404040",
              backgroundColor: "#1a1a1a",
              color: "#e0e0e0"
            }}
          >
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
  const [todoTitle, setTodoTitle] = useState("");
  const [owner, setOwnerName] = useState("");

  const handleSubmit = () => {
    if (todoTitle && owner) {
      onAdd(todoTitle, owner);
      setTodoTitle("");
      setOwnerName("");
    }
  };

  const inputStyle = {
    padding: "8px",
    margin: "0 10px",
    borderRadius: "4px",
    border: "1px solid #404040",
    backgroundColor: "#1a1a1a",
    color: "#e0e0e0"
  };

  return (
    <div style={{
      padding: "20px",
      backgroundColor: "#2d2d2d",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap"
    }}>
      <label htmlFor="user">
        User Name:
        <input
          id="user"
          onChange={(e) => setOwnerName(e.target.value)}
          value={owner}
          style={inputStyle}
        />
      </label>
      <label htmlFor="todo">
        Todo Name:
        <input
          id="todo"
          onChange={(e) => setTodoTitle(e.target.value)}
          value={todoTitle}
          style={inputStyle}
        />
      </label>
      <button
        onClick={handleSubmit}
        style={{
          padding: "8px 16px",
          backgroundColor: "#0066cc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

function TodoList({ todos, onRemove, title, setTodos }) {
  return (
    <div style={{
      marginBottom: "20px",
      backgroundColor: "#2d2d2d",
      borderRadius: "8px",
      padding: "20px"
    }}>
      <h2 style={{ margin: "0 0 20px 0" }}>{title}</h2>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxHeight: "400px",
        overflowY: "auto"
      }}>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onRemove={onRemove}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
}

function Todo({ todo, onRemove, setTodos }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "15px",
      backgroundColor: "#1a1a1a",
      borderRadius: "4px",
      gap: "15px",
      justifyContent: "space-between"
    }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 5px 0" }}>{todo.title}</h3>
        <p style={{ margin: 0, color: "#999" }}>Owner: {todo.owner}</p>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => onRemove(todo.id)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#cc3333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            setTodos((previousState) => {
              return previousState.map((t) => {
                if (t.id === todo.id) return { ...t, completed: !t.completed };
                return t;
              });
            });
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: todo.completed ? "#4d4d4d" : "#1a8f3c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {todo.completed ? "Mark not done" : "Mark done"}
        </button>
      </div>
    </div>
  );
}

export default App;
