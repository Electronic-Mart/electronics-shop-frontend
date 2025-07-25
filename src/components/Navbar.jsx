import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import '../index.css';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>Electro Mart</Link>
        </div>

        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className="navbar-center-links">
          <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
          <li><NavLink to="/products" className="nav-link">Products</NavLink></li>
          <li><NavLink to="/about" className="nav-link">About Us</NavLink></li>
          <li><NavLink to="/contact" className="nav-link">Contacts</NavLink></li>
        </ul>

        <ul className="navbar-right-links">
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "profile-icon-link active" : "profile-icon-link"
                  }
                >
                  <FaUserCircle size={28} />
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "profile-icon-link active" : "profile-icon-link"
                  }
                >
                  <MdAdminPanelSettings size={28} />
                </NavLink>
              </li>

              <li style={{ position: 'relative' }}>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? "cart-icon active" : "cart-icon"
                  }
                >
                  <FaShoppingCart size={28} className="cart-svg" />
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </NavLink>
              </li>
            </>
          )}
          <li>
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); closeMenu(); }} className="login-btn logout-btn">
                Log out
              </button>
            ) : (
              <Link to="/login" className="login-btn">Log in</Link>
            )}
          </li>
        </ul>
      </nav>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <>
          <div className="mobile-drawer">
            <ul>
              <li><NavLink to="/" end className="nav-link" onClick={closeMenu}>Home</NavLink></li>
              <li><NavLink to="/products" className="nav-link" onClick={closeMenu}>Products</NavLink></li>
              <li><NavLink to="/about" className="nav-link" onClick={closeMenu}>About Us</NavLink></li>
              <li><NavLink to="/contact" className="nav-link" onClick={closeMenu}>Contacts</NavLink></li>

              {isAuthenticated && (
                <>
                  <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        isActive ? "profile-icon-link active" : "profile-icon-link"
                      }
                      onClick={closeMenu}
                    >
                      <FaUserCircle size={28} />
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        isActive ? "profile-icon-link active" : "profile-icon-link"
                      }
                      onClick={closeMenu}
                    >
                      <MdAdminPanelSettings size={28} />
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        isActive ? "cart-icon active" : "cart-icon"
                      }
                      onClick={closeMenu}
                    >
                      <FaShoppingCart size={28} className="cart-svg" />
                      {cartCount > 0 && (
                        <span className="cart-count">{cartCount}</span>
                      )}
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                {isAuthenticated ? (
                  <button onClick={() => { handleLogout(); closeMenu(); }} className="login-btn logout-btn">
                    Log out
                  </button>
                ) : (
                  <Link to="/login" className="login-btn" onClick={closeMenu}>Log in</Link>
                )}
              </li>
            </ul>
          </div>
          <div className="mobile-overlay" onClick={closeMenu}></div>
        </>
      )}
    </>
  );
};

export default Navbar;
