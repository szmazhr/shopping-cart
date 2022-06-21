import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import './Shop.css';

function getCategories(products) {
  return products.reduce((acc, product) => {
    if (!acc.includes(product.category)){
      acc.push(product.category);
    }
  return acc;
  }, []).sort((a, b) => a > b ? 1 : -1);
}

function Shop({products, addToCart}) {

  const [searchParams, setSearchParams] = useSearchParams({});
  const activeCategory = searchParams.get('category') || 'all';

  const categories = getCategories(products);

// Category mapping
  const categoryEl = ['All', ...categories].map(category => (
    <li className={activeCategory === category.toLowerCase() ? 'active' : ''}
      key={category} 
      onClick={() => (
        category !== 'All' ? 
        setSearchParams({category: category.toLowerCase()}) :
        setSearchParams({})
        )}
        >
        <span>{category}</span> <span>({products.filter(product => category === 'All' ? true : product.category === category).length})</span>
    </li>
    ));

    const productCards = products
      .filter(product => activeCategory === 'all' ? true : product.category.toLowerCase() === activeCategory)
      .map(product => (<ProductCard key={product.id} product={product} addToCart={addToCart} />));
  return (
    <div className="shop">
      <div className="categories">
        <h3>Browse by Category</h3>
        <ul>
          {categoryEl}
          </ul>
        </div>
        <div className="products">
        {productCards.length ? productCards : <p>No products found</p>}
        </div>
      </div>
  )
}

export default Shop