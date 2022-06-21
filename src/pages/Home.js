import { Link } from 'react-router-dom';
import './Home.css';
function Home({products}) {
const product = products.sort(() => Math.random() - 0.5)[0];
  return (
    <section className='hero'>
      <div className='hero-body'>
        <div className='hero-info'>
          <h1 className='title'>{product.title}</h1>
          <p>{product.description}</p>
          <Link to="shop" className="btn btn-primary">Shop Now</Link>
        </div>
        <div className='hero-img'>
          <img src={product.image} loading="lazy"  alt={product.title}/>
        </div>
      </div>
    </section>
  )
}
export default Home