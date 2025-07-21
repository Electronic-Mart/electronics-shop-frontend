import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import '../index.css';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Electro Mart</Link>
      </div>

      <ul className="navbar-center-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contacts</Link></li>
      </ul>

      <ul className="navbar-right-links">
        {isAuthenticated && (
          <li>
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart size={18} />
            </Link>
          </li>
        )}
        <li><Link to="/login" className="login-btn">Log in</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
