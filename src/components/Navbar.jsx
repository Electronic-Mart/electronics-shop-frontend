import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
        <li>
          <NavLink to="/" end className="nav-link">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products" className="nav-link">Products</NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-link">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="nav-link">Contacts</NavLink>
        </li>
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
