import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedForm = {
      email: form.email.trim(),
      password: form.password,
    };

    try {
      console.log('🔐 Logging in with:', trimmedForm); // Optional debug
      const result = await dispatch(login(trimmedForm)).unwrap();

      const userRole = result?.user?.role;
      console.log('✅ Logged in user:', result?.user); // Optional debug

      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log in</h2>
        {error && <p className="error-text">{error}</p>}

        <label>Email address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="signup-text">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
