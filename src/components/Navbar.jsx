import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import '../index.css';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Electro Mart</Link>
      </div>

      <ul className="navbar-center-links">
        <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
        <li><NavLink to="/products" className="nav-link">Products</NavLink></li>
        <li><NavLink to="/about" className="nav-link">About Us</NavLink></li>
        <li><NavLink to="/contact" className="nav-link">Contacts</NavLink></li>
      </ul>

      <ul className="navbar-right-links">
        {isAuthenticated && (
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "cart-icon active" : "cart-icon"
              }
            >
              <FaShoppingCart size={36} className="cart-svg" />
            </NavLink>
          </li>
        )}

        <li>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="login-btn logout-btn">
              Log out
            </button>
          ) : (
            <Link to="/login" className="login-btn">Log in</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
