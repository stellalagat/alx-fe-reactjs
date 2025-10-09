import React from 'react';

function TodoItem({ todo, toggleTodo }) {
  return (
    <li onClick={() => toggleTodo(todo.id)}>
      {todo.completed ? <s>{todo.text}</s> : todo.text}
    </li>
  );
}

export default TodoItem;
