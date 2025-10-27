import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTodoForm from '../components/AddTodoForm';

// Mock the CSS import
jest.mock('../components/TodoList.css', () => ({}));

describe('AddTodoForm Component', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  test('renders AddTodoForm component', () => {
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  test('calls onAddTodo when form is submitted with valid input', () => {
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(button);
    
    expect(mockOnAddTodo).toHaveBeenCalledWith('Test Todo');
    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
  });

  test('does not call onAddTodo when form is submitted with empty input', () => {
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const button = screen.getByText('Add Todo');
    
    fireEvent.click(button);
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('clears input after successful submission', () => {
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(button);
    
    expect(input.value).toBe('');
  });
});