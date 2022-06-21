import {render,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from './Cart';

describe('Cart', () => {
  const products = [
    {
      id: 1,
      title: 'Product 1',
      image: 'https://via.placeholder.com/300',
      price: 11,
      quantity: 1,
    },
    {
      id: 2,
      title: 'Product 2',
      image: 'https://via.placeholder.com/300',
      price: 20,
      quantity: 2,
    },
  ];
  const removeItem = jest.fn();
  const setQuantity = jest.fn();


  it('renders without crashing', () => {
    render (
    <MemoryRouter>
      <Cart products={products} removeItem={removeItem} setQuantity={setQuantity} />
    </MemoryRouter>
    );
    expect(screen.getByText(/total/i)).toBeInTheDocument();
    expect(screen.getByText(/place order/i)).toBeInTheDocument();
    expect(screen.getByText(/51/i)).toBeInTheDocument();
  });

});