import React, { useState } from "react";

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-testid="todo-input"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
