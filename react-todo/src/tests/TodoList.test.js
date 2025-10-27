import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render Test
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Verify that the TodoList component renders correctly
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Ensure that the initial state (a few demo todos) is rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if AddTodoForm is present
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  // Test 2: Test Adding Todos
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Use fireEvent to simulate user input and form submission
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Verify that a new todo can be added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  // Test 3: Test Toggling Todos
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Learn React');
    
    // Initially should not be completed
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle to completed
    fireEvent.click(todoText);
    
    // Verify that a todo item can be toggled between completed and not completed
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back to not completed
    fireEvent.click(todoText);
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Test Deleting Todos
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    const deleteButtons = screen.getAllByText('Delete');
    const initialTodoCount = screen.getAllByRole('listitem').length;
    
    // Delete the first todo
    fireEvent.click(deleteButtons[0]);
    
    // Verify that a todo item can be deleted
    expect(screen.getAllByRole('listitem')).toHaveLength(initialTodoCount - 1);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});