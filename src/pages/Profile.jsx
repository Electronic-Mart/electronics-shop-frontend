import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../features/auth/authSlice';
import '../index.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { user: reduxUser, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const localUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
  const user = Object.keys(reduxUser || {}).length ? reduxUser : localUser;

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [orders, setOrders] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setForm({
      name: user.name || user.username || '',
      email: user.email || '',
      password: user.password || '',
      phone: user.phone || '',
    });

    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = allOrders.filter((order) => order.user?.email === user.email);
    setOrders(userOrders);
  }, [user]);

  const handleSave = () => {
    dispatch(updateProfile(form))
      .unwrap()
      .then((updatedUser) => {
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.map((u) =>
          u.email === user.email ? updatedUser : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        setSuccessMsg('✅ Profile updated successfully!');
      })
      .catch((error) => {
        setSuccessMsg(`❌ Failed to update profile: ${error}`);
      })
      .finally(() => {
        setTimeout(() => setSuccessMsg(''), 3000);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>

      <div className="profile-section">
        <h3>Update Account Details</h3>

        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input name="phone" value={form.phone} onChange={handleChange} />

        <button onClick={handleSave} className="save-btn">Save Changes</button>
        {successMsg && <p className="success-msg">{successMsg}</p>}
      </div>

      <div className="profile-section">
        <h3>Your Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="order-list">
            {orders.map((order, index) => (
              <div key={index} className="order-card">
                <p><strong>Order #{index + 1}</strong></p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} — Qty: {item.quantity} — Ksh {item.price.toLocaleString()}
                    </li>
                  ))}
                </ul>
                <p><strong>Total:</strong> Ksh {order.total.toLocaleString()}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
