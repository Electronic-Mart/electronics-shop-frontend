import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import '../index.css';

const Navbar = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setDrawerOpen(false);
    navigate('/login');
  };

  // Count only unique products in cart
  const cartCount = cartItems?.length || 0;

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Electro Mart</Link>
        </div>

        <ul className="navbar-center-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Contacts
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-right-links">
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'profile-icon-link'}>
                  <FaUserCircle size={28} />
                </NavLink>
              </li>
              {role === 'admin' && (
                <li>
                  <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'profile-icon-link'}>
                    <MdAdminPanelSettings size={28} />
                  </NavLink>
                </li>
              )}
              <li style={{ position: 'relative' }}>
                <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active cart-icon' : 'cart-icon'}>
                  <FaShoppingCart size={28} />
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </NavLink>
              </li>
            </>
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

        <div
          className={`hamburger ${isDrawerOpen ? 'open' : ''}`}
          onClick={() => setDrawerOpen(!isDrawerOpen)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      {isDrawerOpen && (
        <>
          <div className="mobile-overlay" onClick={closeDrawer}></div>
          <div className="mobile-drawer">
            <ul>
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  onClick={closeDrawer}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  onClick={closeDrawer}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  onClick={closeDrawer}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  onClick={closeDrawer}
                >
                  Contacts
                </NavLink>
              </li>

              {isAuthenticated && (
                <>
                  <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                      onClick={closeDrawer}
                    >
                      Profile
                    </NavLink>
                  </li>
                  {role === 'admin' && (
                    <li>
                      <NavLink
                        to="/admin"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        onClick={closeDrawer}
                      >
                        Admin Panel
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink
                      to="/cart"
                      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                      onClick={closeDrawer}
                    >
                      Cart {cartCount > 0 && `(${cartCount})`}
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">Log out</button>
                  </li>
                </>
              )}

              {!isAuthenticated && (
                <li>
                  <Link to="/login" className="login-btn" onClick={closeDrawer}>
                    Log in
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
