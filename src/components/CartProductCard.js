import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './CartProductCard.css';


function CartProductCard({ product, removeItem, setQuantity }) {
  
  const [count, setCount] = useState(product.quantity);

  const countIncrement = () => {
    setCount(count => count + 1);

  }

  const countDecrement = () => {
    if(count > 1) {
    setCount(count => count - 1);
    setQuantity(product.id, count);
    }
  }

  useEffect(() => {
    setQuantity(product.id, count);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count] );



  const changeHandler = (e) => {
    const value = e.target.value;
    if(value > 0 && value.match(/^[0-9]*$/)) {
      setCount(e.target.value);
    }
  }
  return (
    <div className="cart-product-card">
    <div className="cart-product-card-img">
      <img src={product.image} loading="lazy" alt="product" />
    </div>
    <div className="cart-product-card-info">
      <Link to={`/product/${product.id}`}>
        <h3 className="cart-product-card-title">{product.title}</h3>
      </Link>
      <div className='cart-product-card-quantity'>
        <label htmlFor="product-quantity">Quantity: </label>
        <button type='button' disabled={count > 1 ? false : true } onClick={countDecrement} className="quantity-btn">-</button>
        <input type="text" value={count} id="product-quantity" onChange={changeHandler} />
        <button type='button' onClick={countIncrement} className="quantity-btn">+</button>
      </div>

      {/* <Link to='/cart' className="cart-product-card-btn">View Cart</Link> */}
    </div>
      <div className="action-btns">
        
      <p className="cart-product-card-price"><strong>Amount:</strong> ${product.price * product.quantity}</p>

      <button className="cart-product-card-btn" onClick={()=> removeItem(product.id)}>Remove</button>
      </div>
  </div>
  )
}

export default CartProductCard