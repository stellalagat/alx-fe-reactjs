import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

test('renders todo text', () => {
  const todo = { id: 1, text: 'Learn React Testing', completed: false };
  render(<TodoItem todo={todo} toggleTodo={() => {}} />);
  expect(screen.getByText('Learn React Testing')).toBeInTheDocument();
});

test('calls toggleTodo when clicked', () => {
  const mockToggle = jest.fn();
  const todo = { id: 1, text: 'Learn React Testing', completed: false };
  render(<TodoItem todo={todo} toggleTodo={mockToggle} />);
  fireEvent.click(screen.getByText('Learn React Testing'));
  expect(mockToggle).toHaveBeenCalledWith(1);
});
