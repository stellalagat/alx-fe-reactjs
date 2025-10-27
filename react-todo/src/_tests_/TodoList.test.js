import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the main component renders
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    
    // Check if the form renders
    expect(screen.getByTestId('add-todo-form')).toBeInTheDocument();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if stats are displayed
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
    expect(screen.getByText('Pending: 2')).toBeInTheDocument();
  });

  // Test 2: Adding Todos
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check if input is cleared after adding
    expect(input.value).toBe('');
    
    // Check if stats are updated
    expect(screen.getByText('Total: 4')).toBeInTheDocument();
    expect(screen.getByText('Pending: 3')).toBeInTheDocument();
  });

  // Test 3: Adding empty todo
  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const initialTodoCount = screen.getAllByTestId('todo-item').length;
    const addButton = screen.getByTestId('add-button');
    
    // Try to add empty todo
    fireEvent.click(addButton);
    
    // Check that no new todo was added
    expect(screen.getAllByTestId('todo-item')).toHaveLength(initialTodoCount);
  });

  // Test 4: Toggling Todos
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Learn React');
    const todoItem = todoText.closest('[data-testid="todo-item"]');
    
    // Initially should not be completed
    expect(todoItem).not.toHaveClass('completed');
    
    // Toggle to completed
    fireEvent.click(todoText);
    
    // Should now be completed
    expect(todoItem).toHaveClass('completed');
    
    // Toggle back to not completed
    fireEvent.click(todoText);
    
    // Should not be completed again
    expect(todoItem).not.toHaveClass('completed');
  });

  // Test 5: Deleting Todos
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    const initialTodos = screen.getAllByTestId('todo-item');
    const initialCount = initialTodos.length;
    const todoToDelete = initialTodos[0];
    const deleteButton = within(todoToDelete).getByTestId('delete-button');
    
    // Delete the first todo
    fireEvent.click(deleteButton);
    
    // Check that todo is deleted
    expect(screen.getAllByTestId('todo-item')).toHaveLength(initialCount - 1);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check if stats are updated
    expect(screen.getByText(`Total: ${initialCount - 1}`)).toBeInTheDocument();
  });

  // Test 6: Form submission with Enter key
  test('adds todo when Enter key is pressed in input', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    
    // Add todo using Enter key
    fireEvent.change(input, { target: { value: 'Todo with Enter' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    
    // Check if new todo is added
    expect(screen.getByText('Todo with Enter')).toBeInTheDocument();
  });

  // Test 7: Multiple todos operations
  test('handles multiple operations correctly', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add multiple todos
    fireEvent.change(input, { target: { value: 'First New Todo' } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: 'Second New Todo' } });
    fireEvent.click(addButton);
    
    // Check both are added
    expect(screen.getByText('First New Todo')).toBeInTheDocument();
    expect(screen.getByText('Second New Todo')).toBeInTheDocument();
    
    // Toggle one to completed
    fireEvent.click(screen.getByText('First New Todo'));
    const firstTodo = screen.getByText('First New Todo').closest('[data-testid="todo-item"]');
    expect(firstTodo).toHaveClass('completed');
    
    // Delete one todo
    const secondTodo = screen.getByText('Second New Todo').closest('[data-testid="todo-item"]');
    const deleteButton = within(secondTodo).getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    // Check final state
    expect(screen.getByText('First New Todo')).toBeInTheDocument();
    expect(screen.queryByText('Second New Todo')).not.toBeInTheDocument();
    expect(screen.getByText('Total: 5')).toBeInTheDocument();
  });

  // Test 8: Empty state
  test('displays empty state when no todos', () => {
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByTestId('delete-button');
    deleteButtons.forEach(button => {
      fireEvent.click(button);
    });
    
    // Check empty state message
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    expect(screen.getByText('Total: 0')).toBeInTheDocument();
    expect(screen.getByText('Completed: 0')).toBeInTheDocument();
    expect(screen.getByText('Pending: 0')).toBeInTheDocument();
  });
});