import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders correctly', () => {
    render(<Footer/>);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Shahzar Mazhar')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(2); 
    expect(screen.getByRole('link', {name: 'github'})).toHaveAttribute('href', 'https://github.com/szmazhr/shopping-cart')
  });
  it('matches snapshot', () =>{
    const {asFragment} = render(<Footer/>);
    expect(asFragment()).toMatchSnapshot();
  })
});