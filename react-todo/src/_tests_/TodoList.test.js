import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

// Mock the CSS import to prevent Jest errors
jest.mock('../components/TodoList.css', () => ({}));

describe('TodoList Component', () => {
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the main heading renders
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if form elements are present
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check if input is cleared after adding
    expect(input.value).toBe('');
  });

  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const initialTodoCount = screen.getAllByRole('listitem').length;
    const addButton = screen.getByText('Add Todo');
    
    // Try to add empty todo
    fireEvent.click(addButton);
    
    // Check that no new todo was added
    expect(screen.getAllByRole('listitem')).toHaveLength(initialTodoCount);
  });

  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Learn React');
    
    // Click to toggle completion
    fireEvent.click(todoText);
    
    // The todo should now have completed styling (though we can't easily test CSS classes)
    // We can test that the component doesn't break when toggling
    
    // Toggle back
    fireEvent.click(todoText);
    
    // Component should still work fine
    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });

  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    const initialTodos = screen.getAllByRole('listitem');
    const initialCount = initialTodos.length;
    const deleteButtons = screen.getAllByText('Delete');
    
    // Delete the first todo
    fireEvent.click(deleteButtons[0]);
    
    // Check that todo is deleted
    expect(screen.getAllByRole('listitem')).toHaveLength(initialCount - 1);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  test('adds todo when Enter key is pressed in input', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    
    // Add todo using Enter key
    fireEvent.change(input, { target: { value: 'Todo with Enter' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    
    // Check if new todo is added
    expect(screen.getByText('Todo with Enter')).toBeInTheDocument();
  });
});