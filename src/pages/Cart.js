import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CartProductCard from '../components/CartProductCard';
import './Cart.css';

function Cart({ products, removeItem, setQuantity }) {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [ordered, setOrdered] = useState([]);

  const itemsEl = products.map(product => {
    return <CartProductCard key={product.id} product={product} removeItem={removeItem} setQuantity={setQuantity} />
  }
  );

  const confirmedOrderEl = (
    <div className="confirmed-order">
      <h3>Thank you for your order!</h3>
      <p>Order confirmed for</p>
      <ul>
        {ordered.map(product => (<li key={product.id}>{product.title}</li>))}
      </ul>
      <Link to="/shop" className='cart-btn'>Continue Shopping</Link>
    </div>
  )

  useEffect(() => {
    if (orderConfirmed === true) {
      setOrdered(products);
      products.forEach(product => {
        removeItem(product.id);
      })
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [orderConfirmed])

  const counterEl = (
    <div className='counter' key='cart-counter'>
      <p>Total: ${products.reduce((acc, product) => acc + product.price * product.quantity, 0)}</p>
      <button type='button' className='btn' onClick={() => setOrderConfirmed(true) } >Place Order</button>
    </div>
  );
  const noItemsEl =  <div className='no-item'><p>No items in cart</p><Link className='cart-btn' to='/shop'>Shop Now</Link></div>;
  const cartEl = products.length ? [counterEl, itemsEl] : noItemsEl;
  return (
 <div className='cart-items'>{orderConfirmed ? confirmedOrderEl : cartEl}</div>
  )
}

export default Cart