import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItemCompletely } from '../features/cart/cartSlice';
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

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-msg">Your cart is currently empty.</p>
      ) : (
        <div className="cart-content">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th></th>
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
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
