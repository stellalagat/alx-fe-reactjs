import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

// Test 1: Initial render with demo todos
test('renders TodoList component with initial todos', () => {
  render(<TodoList />);
  
  // Check initial todos are displayed
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
  expect(screen.getByText('Write Tests')).toBeInTheDocument();
});

// Test 2: Adding new todos
test('adds a new todo when form is submitted', () => {
  render(<TodoList />);
  
  const input = screen.getByPlaceholderText('Add a new todo...');
  const button = screen.getByText('Add Todo');
  
  fireEvent.change(input, { target: { value: 'Test Todo' } });
  fireEvent.click(button);
  
  expect(screen.getByText('Test Todo')).toBeInTheDocument();
});

// Test 3: Toggling todo completion
test('toggles todo completion status when clicked', () => {
  render(<TodoList />);
  
  const todo = screen.getByText('Learn React');
  
  // Click to complete
  fireEvent.click(todo);
  expect(todo).toHaveStyle('text-decoration: line-through');
  
  // Click to uncomplete
  fireEvent.click(todo);
  expect(todo).not.toHaveStyle('text-decoration: line-through');
});

// Test 4: Deleting todos
test('deletes a todo when delete button is clicked', () => {
  render(<TodoList />);
  
  const deleteButtons = screen.getAllByText('Delete');
  fireEvent.click(deleteButtons[0]);
  
  expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});