import { render, screen } from '@testing-library/react';
import GlobalNav from './GlobalNav';
import { MemoryRouter } from 'react-router-dom';

describe('GlobalNav', () => {
  it('renders correctly', () => {
    render(<GlobalNav/>, { wrapper: MemoryRouter });

    expect(screen.getByText('sZ Shop')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(3);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByAltText('cart')).toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('renders count correctly', () => {
    render(<GlobalNav itemCount={5}/>, { wrapper: MemoryRouter });
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(3);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('matches snapshot', () =>{
    const {asFragment} = render(<GlobalNav/>, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  })
  it('matches snapshot with count', () =>{
    const {asFragment} = render(<GlobalNav itemCount={5} />, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  })
});