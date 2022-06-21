import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Shop from "./Shop";

describe("Shop", () => {
  const products = [
    {
      id: 1,
      title: 'Product 1',
      image: 'https://via.placeholder.com/300',
      price: 11,
      category: 'category 1',
    },
    {
      id: 2,
      title: 'Product 2',
      image: 'https://via.placeholder.com/300',
      price: 20,
      category : 'category 2',
    },
    {
      id: 3,
      title: 'Product 2',
      image: 'https://via.placeholder.com/300',
      price: 20,
      category : 'category 1',
    },
  ];

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Shop products={products} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('listitem').length).toBe(3);
    expect(screen.getAllByText(/add to cart/i).length).toBe(3);
  });

  it("filters category", () => {
    render(
      <MemoryRouter initialEntries={['?category=category 1']}>
        <Shop products={products} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('listitem').length).toBe(3);
    expect(screen.getAllByText(/add to cart/i).length).toBe(2);
  });

});