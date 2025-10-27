import React, { useState } from 'react';

const TodoList = () => {
  // Initialize component state with a few todos for demonstration
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: false }
  ]);

  // Method for adding todos
  const addTodo = (text) => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
    }
  };

  // Method for toggling todos
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Method for deleting todos
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      
      {/* AddTodoForm - allows users to add new todos */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const input = e.target.elements.todoInput;
        addTodo(input.value);
        input.value = '';
      }}>
        <input
          type="text"
          name="todoInput"
          placeholder="Add a new todo..."
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Display list of todo items */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)} // Toggle completed by clicking
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button> {/* Delete individually */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;