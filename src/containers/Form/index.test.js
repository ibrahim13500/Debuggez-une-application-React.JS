import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './index'; // Adjust the import path as necessary

describe('Form Component', () => {
  it('displays form fields correctly', async () => {
    render(<Form />);

    // Check if the form fields are present
    expect(screen.getByLabelText('Nom')).toBeInTheDocument();
    expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(<Form />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello!' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Envoyer'));

    // Add assertions to verify form submission logic
    // For example, check if a confirmation message appears or a callback function was called
    // Adjust this according to your form's actual submission behavior
    expect(screen.getByText('Submission Message')).toBeInTheDocument();
  });
});
