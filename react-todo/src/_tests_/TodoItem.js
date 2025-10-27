import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

// Mock the CSS import
jest.mock('../components/TodoList.css', () => ({}));

describe('TodoItem Component', () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  const sampleTodo = {
    id: 1,
    text: 'Test Todo',
    completed: false
  };

  const completedTodo = {
    id: 2,
    text: 'Completed Todo',
    completed: true
  };

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  test('renders todo item with text', () => {
    render(
      <TodoItem 
        todo={sampleTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('calls onToggle when todo text is clicked', () => {
    render(
      <TodoItem 
        todo={sampleTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const todoText = screen.getByText('Test Todo');
    fireEvent.click(todoText);
    
    expect(mockOnToggle).toHaveBeenCalledWith(1);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <TodoItem 
        todo={sampleTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(1);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  test('renders completed todo', () => {
    render(
      <TodoItem 
        todo={completedTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('Completed Todo')).toBeInTheDocument();
  });
});