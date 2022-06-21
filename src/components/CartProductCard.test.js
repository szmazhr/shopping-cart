import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CartProductCard from "./CartProductCard";

describe("CartProductCard", () => {

  const removeItem = jest.fn();
  const setQuantity = jest.fn();
  const product = {
                  id: 1,
                  title: "Product 1",
                  image: "https://via.placeholder.com/300",
                  price: 10,
                  quantity: 1
                }

  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CartProductCard
          product={product}
          removeItem={() => {}}
          setQuantity={() => {}}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders correctly with Quantity 5", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CartProductCard
          product={{...product, quantity: 5}}
          removeItem={() => {}}
          setQuantity={() => {}}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('calls removeItem when remove button is clicked', () => {
    render(
      <MemoryRouter>
        <CartProductCard
          product={product}
          removeItem={removeItem}
          setQuantity={() => {}}
        />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText('Remove'));
    expect(removeItem).toHaveBeenCalledTimes(1);
    expect(removeItem).toHaveBeenCalledWith(product.id);
  });
  it('calls setQuantity when quantity input is increment', () => {
    render(
      <MemoryRouter>
        <CartProductCard
          product={product}
          removeItem={() => {}}
          setQuantity={setQuantity}
        />
      </MemoryRouter>
    );
    userEvent.click(screen.getByText('+'));
    expect(setQuantity).toHaveBeenCalledTimes(2); // one is for the initial value, one for the increment
    expect(setQuantity).toHaveBeenCalledWith(product.id, 2);
  });
  it('calls setQuantity when quantity input is decrement', () => {
    render(
      <MemoryRouter>
        <CartProductCard
          product={product}
          removeItem={() => {}}
          setQuantity={setQuantity}
        />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText('-'));
    expect(setQuantity).toHaveBeenCalledTimes(1); // one is for the initial value, not for the decrement forbidden below 1
    expect(setQuantity).toHaveBeenCalledWith(product.id, 1);
  })
  it('calls setQuantity when quantity input is typed', () => {
    render(
      <MemoryRouter>
        <CartProductCard
          product={product}
          removeItem={() => {}}
          setQuantity={setQuantity}
        />
      </MemoryRouter>
    );
    userEvent.type(screen.getByLabelText(/^Quantity/i), '2');
    expect(setQuantity).toHaveBeenCalledTimes(2);
    expect(setQuantity).toHaveBeenCalledWith(product.id, 1);
    expect(setQuantity).toHaveBeenCalledWith(product.id, '12');
  });
});