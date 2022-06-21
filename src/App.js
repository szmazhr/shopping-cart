import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalNav from './components/GlobalNav';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Error404 from './pages/Error404';
import productsList from './products.json';

const productsImage = require.context('./assets/products', false, /\.jpg$/i);

const products = productsList.map(product => {
  const image = productsImage(`./${product.img}`);
  return { ...product, image };
}
);

const heroProduct = [products[0], products[6]];

function App() {
  const [product, setProduct] = useState('');
  const [cart, setCart] = useState([]);

  const selectProduct = (id) => {
    const product = products.find(product => product.id === id);
    setProduct(product);
  }

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(cartProduct => cartProduct.id === product.id);
    if(existingProduct) {
      const index = cart.findIndex(cartProduct => cartProduct.id === product.id);
      const newCart = [...cart];
      newCart[index].quantity += quantity;
      setCart(newCart);
    }else{
      setCart(cart => [...cart, { ...product, quantity }]);
    }
  }

  const removeFromCart = (id) => {
    setCart(cart => cart.filter(product => product.id !== id));
  }

  const setQuantity = (id, quantity) => {
    const index = cart.findIndex(product => product.id === id);
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  }

  return (
<BrowserRouter>
  <Routes>
    <Route path='/' element={<GlobalNav itemCount={cart.length} />}>
      <Route index element={<Home products={heroProduct} />} />
      <Route path='shop' element={<Shop products={products} addToCart={addToCart}/>} />
      <Route path='cart' element={<Cart products={cart} setQuantity={setQuantity} removeItem={removeFromCart} />} />
      <Route path='product/:id' element={<Product product={product} addToCart={addToCart} selectProduct={selectProduct} />} />
      <Route path='*' element={<Error404 />} />
    </Route>
  </Routes>
</BrowserRouter>
  );
}

export default App;
