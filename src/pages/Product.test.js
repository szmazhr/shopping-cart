import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Product from "./Product";

describe("Product", () => {

  const product = {
    id: 10,
    title: "Product 1",
    image: "https://via.placeholder.com/300",
    price: 10,
  }
  const selectProduct = jest.fn();
  const addToCart = jest.fn();

  it("renders product", () => {
    render(<Product product={product} selectProduct={()=>{}} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Price:")).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/)).toHaveValue("1");
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it('changes quantity', () => {
    render(<Product product={product} selectProduct={()=>{}} />, { wrapper: MemoryRouter });
    const input = screen.getByLabelText(/Quantity/);
    userEvent.type(input, "2,{arrowleft}{backspace}");
    expect(input.value).toBe("2");
  });

  it('adds to cart', () => {
    render(<Product product={product} selectProduct={()=>{}} addToCart={addToCart} />, { wrapper: MemoryRouter });
    const button = screen.getByText("Add to Cart");
    const input = screen.getByLabelText(/Quantity/);
    userEvent.type(input, "9,{arrowleft}{backspace}");
    userEvent.click(button);
    expect(input.value).toBe("9");
    expect(button.textContent).toBe("Added");
    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product, '9');
  });

  it('calls selectProduct', () => {
    render(
    <MemoryRouter initialEntries={['/product/10']} initialIndex={0}>
      <Routes>
        <Route path="product/:id" element={<Product product={product} selectProduct={selectProduct} />} />
      </Routes>
  </MemoryRouter>
  )
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(selectProduct).toHaveBeenCalledTimes(1);
    expect(selectProduct).toHaveBeenCalledWith("10");
  })
});