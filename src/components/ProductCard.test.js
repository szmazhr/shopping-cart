import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  const product = {
    id: 10,
    title: "Product 1",
    image: "https://via.placeholder.com/300",
    price: 10,
  };

  it("renders correctly", () => {
    const { asFragment } = render(
      <ProductCard product={product} addToCart={() => {}} />, { wrapper: MemoryRouter }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls addToCart when add to cart button is clicked', () => {
    const addToCart = jest.fn();
    render(
      <ProductCard product={product} addToCart={addToCart} />, { wrapper: MemoryRouter }
    );
    userEvent.click(screen.getByText('Add to Cart'));
    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product, 1);
  });


});