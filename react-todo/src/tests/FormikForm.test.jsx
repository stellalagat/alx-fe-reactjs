import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormikForm from '../FormikForm';

// Mock fetch API
global.fetch = jest.fn();

describe('FormikForm', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders formik form with all fields', () => {
    render(<FormikForm />);
    
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('shows Formik validation errors', async () => {
    const user = userEvent.setup();
    render(<FormikForm />);
    
    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    // Formik validation errors
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  test('shows password complexity validation error', async () => {
    const user = userEvent.setup();
    render(<FormikForm />);
    
    const passwordInput = screen.getByLabelText(/password:/i);
    await user.type(passwordInput, 'simple');
    
    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    expect(await screen.findByText(/password must contain at least one uppercase letter/i)).toBeInTheDocument();
  });

  test('submits form with valid data using Formik', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, username: 'testuser' })
    });

    render(<FormikForm />);
    
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
  });

  test('disables submit button during submission', async () => {
    const user = userEvent.setup();
    
    // Mock slow API response
    fetch.mockImplementationOnce(() => new Promise(resolve => 
      setTimeout(() => resolve({
        ok: true,
        json: async () => ({ id: 1 })
      }), 100)
    ));

    render(<FormikForm />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/username:/i), 'testuser');
    await user.type(screen.getByLabelText(/email:/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password:/i), 'Password123');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    // Button should be disabled during submission
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/registering.../i);
  });

  test('validates username length', async () => {
    const user = userEvent.setup();
    render(<FormikForm />);
    
    const usernameInput = screen.getByLabelText(/username:/i);
    await user.type(usernameInput, 'ab'); // Too short
    
    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    expect(await screen.findByText(/username must be at least 3 characters/i)).toBeInTheDocument();
  });
});