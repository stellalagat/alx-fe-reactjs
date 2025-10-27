import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

// Test 1: Verify initial render
test('renders TodoList with initial todos', () => {
  render(<TodoList />);
  
  // Check initial todos
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
  expect(screen.getByText('Write Tests')).toBeInTheDocument();
});

// Test 2: Test adding todos
test('adds new todo when form submitted', () => {
  render(<TodoList />);
  
  const input = screen.getByPlaceholderText('Add a new todo...');
  const button = screen.getByText('Add Todo');
  
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(button);
  
  expect(screen.getByText('New Todo')).toBeInTheDocument();
});

// Test 3: Test toggling todos
test('toggles todo completion when clicked', () => {
  render(<TodoList />);
  
  const todo = screen.getByText('Learn React');
  
  // Click to complete
  fireEvent.click(todo);
  expect(todo).toHaveStyle('text-decoration: line-through');
  
  // Click to uncomplete
  fireEvent.click(todo);
  expect(todo).not.toHaveStyle('text-decoration: line-through');
});

// Test 4: Test deleting todos
test('deletes todo when delete button clicked', () => {
  render(<TodoList />);
  
  const deleteButtons = screen.getAllByText('Delete');
  fireEvent.click(deleteButtons[0]);
  
  expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});