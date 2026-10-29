import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the existing webshop home page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Willkommen bei MediaMarktSaturn!' }))
    .toBeInTheDocument();
});
