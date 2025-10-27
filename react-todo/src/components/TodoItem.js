import React from 'react';
import './TodoList.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`} data-testid="todo-item">
      <span
        className="todo-text"
        onClick={() => onToggle(todo.id)}
        data-testid="todo-text"
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
        data-testid="delete-button"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;