import React from 'react';
import './TodoList.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span
        className="todo-text"
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;