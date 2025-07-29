import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
  removeItemCompletely,
} from '../features/cart/cartSlice';
import '../index.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🚫 Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleDelete = (id) => {
    dispatch(removeItemCompletely(id));
  };

  const handleIncrement = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(removeItemCompletely(product.id));
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-msg">Your cart is currently empty.</p>
      ) : (
        <div className="cart-content">
          {/* Desktop Table */}
          {!isMobile && (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="cart-product-info">
                      <img src={item.image} alt={item.name} className="cart-img" />
                      <span>{item.name}</span>
                    </td>
                    <td>Ksh {item.price.toLocaleString()}</td>
                    <td>{item.quantity}</td>
                    <td>Ksh {(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                      <div className="cart-actions">
                        <button onClick={() => handleDecrement(item)}>-</button>
                        <button onClick={() => handleIncrement(item)}>+</button>
                        <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Mobile Cards */}
          {isMobile &&
            cartItems.map((item) => (
              <div key={item.id} className="cart-item-mobile">
                <div className="cart-product-info">
                  <img src={item.image} alt={item.name} className="cart-img" />
                  <div className="cart-item-details">
                    <strong>{item.name}</strong>
                    <span>Price: Ksh {item.price.toLocaleString()}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>Subtotal: Ksh {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <button onClick={() => handleIncrement(item)}>+</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}

          <div className="cart-total">
            <h3>Total: Ksh {totalPrice.toLocaleString()}</h3>
            <div className="cart-buttons">
              <button className="continue-btn" onClick={() => navigate('/products')}>
                Continue Shopping
              </button>
              <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
