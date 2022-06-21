import { Link } from 'react-router-dom';
import './Error404.css';
function Error404() {
  return (
    
    <div className="error-404">
      <h1>404</h1>
      <p>Page not found</p>
      <Link className='btn' to='/'>Home</Link>
    </div>
  )
}

export default Error404