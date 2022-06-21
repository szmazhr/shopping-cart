import { Link, NavLink, Outlet } from 'react-router-dom';
import cartIcon from '../assets/cart.svg';
import './GlobalNav.css';
import Footer from './Footer';

function GlobalNav({ itemCount }) {
  return (
  <>
  <header className='global-nav'>
    <div className="container">

    <div className="brandName">
      <Link to="/">sZ Shop</Link>
    </div>
    <nav className='navbar'>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/cart"><img src={cartIcon} alt="cart"></img></NavLink>
          {itemCount ? <span className="cart-count">{itemCount}</span> : ''}
        </li>
      </ul>
    </nav>
    </div>
  </header>
    <Outlet />
    <Footer />
  </>
  )
}

export default GlobalNav