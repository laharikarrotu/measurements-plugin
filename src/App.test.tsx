import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Welcome to Measurements Plugin heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Measurements Plugin/i);
  expect(linkElement).toBeInTheDocument();
}); 