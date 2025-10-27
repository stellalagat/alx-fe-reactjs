import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Integration', () => {
  test('renders both form components', () => {
    render(<App />);
    
    expect(screen.getByText(/react form handling demo/i)).toBeInTheDocument();
    expect(screen.getByText(/user registration \(controlled components\)/i)).toBeInTheDocument();
    expect(screen.getByText(/user registration \(formik\)/i)).toBeInTheDocument();
  });

  test('both forms have independent state', async () => {
    render(<App />);
    
    const controlledUsername = screen.getAllByLabelText(/username:/i)[0];
    const formikUsername = screen.getAllByLabelText(/username:/i)[1];
    
    expect(controlledUsername).toBeInTheDocument();
    expect(formikUsername).toBeInTheDocument();
    expect(controlledUsername).not.toBe(formikUsername);
  });
});