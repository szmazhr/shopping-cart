import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({product, addToCart}) {

  const buttonClickHandler = (e) => {
    e.target.textContent = 'Added';
    addToCart(product, 1);
  }

  return (
    <div className='product-card'>
      <div className='product-card-img'>
        <img src={product.image} loading="lazy"  alt={product.title}/>
      </div>
      <div className='product-card-info'>
        <Link to={`/product/${product.id}`}>
          <h3 className='product-card-title'>{product.title}</h3>
        </Link>
        <div className='product-card-footer'>
        <p className='product-card-price'>${product.price}</p>
        <button className='product-card-btn' onClick={buttonClickHandler}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard