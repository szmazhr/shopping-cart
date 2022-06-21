import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Product.css';

function Product({ product, selectProduct, addToCart }) {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    selectProduct(id);
  }, [id, selectProduct] );

  const countIncrement = () => {
    setCount(count => count + 1);
  }

  const countDecrement = () => {
    if(count > 1) {
    setCount(count => count - 1);
    }
  }

  const buttonClickHandler = (e) => {
    e.target.textContent = 'Added';
    addToCart(product, count);
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  }

  const changeHandler = (e) => {
    const value = e.target.value;
    if(value > 0 && value.match(/^[0-9]*$/)) {
      setCount(e.target.value);
    }
  }

  return (
    <div className="product">
      <div className="product-img">
        <img src={product.image}  width={300} loading="lazy" alt="product" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <p className="image-credit">Photo by {' '}
        <a href={product['img-credit-link']} rel="noreferrer" target='_blank'>{product['img-credit']}</a> on <a href='https://unsplash.com/' rel='noreferrer'>Unsplash</a></p>
        <p className="product-price"><strong>Price:</strong> ${product.price}</p>
        <div className='product-quantity'>
          <label htmlFor="product-quantity">Quantity: </label>
          <button type='button' disabled={count > 1 ? false : true } onClick={countDecrement} className="quantity-btn">-</button>
          <input type="text" value={count} id="product-quantity" onChange={changeHandler} />
          <button type='button' onClick={countIncrement} className="quantity-btn">+</button>
        </div>

        <button className="product-btn" onClick={buttonClickHandler}>Add to Cart</button>
        <Link to='/cart' className="product-btn">View Cart</Link>
      </div>
    </div>
  )
}

export default Product