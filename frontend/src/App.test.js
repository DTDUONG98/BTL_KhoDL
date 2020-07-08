import React from 'react';
import { render } from '@testing-library/react';
import Major1 from './Major1'

test('renders learn react link', () => {
  const { getByText } = render(<Major1 />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
