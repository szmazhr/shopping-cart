import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";


describe('Home', ()=>{
  const products = [{
    id: 10,
    title: "Product 1",
    image: "https://via.placeholder.com/300",
    price: 10,
  }]

  it('Renders Correctly', () => {
    const {asFragment} = render(<Home products={products} />, {wrapper : MemoryRouter});
    expect(asFragment).toMatchSnapshot();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Shop Now')).toHaveAttribute('href', '/shop');
    expect(screen.getByAltText('Product 1')).toHaveAttribute('src', 'https://via.placeholder.com/300');
  });
});