import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList.jsx';

describe('TodoList Component', () => {
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(button);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Learn React');
    
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todo);
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});