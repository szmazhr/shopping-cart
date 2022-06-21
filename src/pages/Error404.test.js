import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Error404 from './Error404';

describe('Error404', () => {
  it('renders correctly', () => {
    const {asFragment} = render(<Error404/>, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('heading')).toHaveTextContent('404');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});