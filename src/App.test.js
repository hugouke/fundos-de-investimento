import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react title', () => {
  const { getByText } = render(<App />);
  const element = getByText(/lista de fundos de investimento/i);
  expect(element).toBeInTheDocument();
});
