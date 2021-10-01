import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders warm welcome', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("My Restaurent");
  expect(linkElement).toBeInTheDocument();
});

