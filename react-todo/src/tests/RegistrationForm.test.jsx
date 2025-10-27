import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationForm from '../RegistrationForm';

// Mock fetch API
global.fetch = jest.fn();

describe('RegistrationForm - Controlled Components', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders registration form with all fields', () => {
    render(<RegistrationForm />);
    
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('shows validation errors when fields are empty', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);
    
    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  test('shows email validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);
    
    const emailInput = screen.getByLabelText(/email:/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    expect(await screen.findByText(/email is invalid/i)).toBeInTheDocument();
  });

  test('shows password validation error for short password', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);
    
    const passwordInput = screen.getByLabelText(/password:/i);
    await user.type(passwordInput, '123');
    
    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, username: 'testuser' })
    });

    render(<RegistrationForm />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/username:/i), 'testuser');
    await user.type(screen.getByLabelText(/email:/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password:/i), 'Password123');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    // Verify API was called with correct data
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'testuser',
            email: 'test@example.com',
            password: 'Password123'
          }),
        }
      );
    });

    // Verify form was reset
    expect(screen.getByLabelText(/username:/i).value).toBe('');
    expect(screen.getByLabelText(/email:/i).value).toBe('');
    expect(screen.getByLabelText(/password:/i).value).toBe('');
  });

  test('handles API failure gracefully', async () => {
    const user = userEvent.setup();
    
    // Mock failed API response
    fetch.mockRejectedValueOnce(new Error('API Error'));

    render(<RegistrationForm />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/username:/i), 'testuser');
    await user.type(screen.getByLabelText(/email:/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password:/i), 'Password123');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    // Verify error state is handled (you might want to add error UI to test this)
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

  test('clears error when user starts typing in field', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);
    
    // Trigger validation error
    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    // Verify error is shown
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    
    // Start typing in username field
    const usernameInput = screen.getByLabelText(/username:/i);
    await user.type(usernameInput, 'test');
    
    // Error should be cleared
    expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
  });
});