import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = auth.user || {};

  const [form, setForm] = useState({
    name: user.name || '',
    address: '',
    phone: user.phone || '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      setError('Please fill in all fields before placing the order.');
      return;
    }

    setError('');

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      items: cartItems,
      total,
      user: {
        name: form.name,
        email: user.email,
        phone: form.phone
      },
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

    // Update loggedInUser with new phone
    const updatedUser = { ...user, phone: form.phone };
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    // Also update in users list
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, phone: form.phone } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Order placed successfully!');
    dispatch(clearCart());
    navigate('/profile');
  };

  if (cartItems.length === 0) {
    return <p className="empty-cart-msg">Your cart is empty. Add items before checking out.</p>;
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <div className="checkout-form">
          <h3>Billing Information</h3>

          {error && <p className="error-text">{error}</p>}

          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} - Ksh {item.price.toLocaleString()}
              </li>
            ))}
          </ul>
          <h4>Total: Ksh {total.toLocaleString()}</h4>
          <button className="checkout-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
