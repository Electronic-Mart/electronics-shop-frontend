import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // === SIMULATED LOGIN - Replace this block with real API call later ===
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

      const existingUser = storedUsers.find(
        (user) => user.email === form.email && user.password === form.password
      );

      if (existingUser) {
        const fakeUser = {
          user: { name: existingUser.name, email: existingUser.email },
          token: 'fake-jwt-token',
        };
        dispatch(loginSuccess(fakeUser));
        navigate('/products');
      } else {
        setError('Invalid credentials');
      }
      // === END SIMULATED LOGIN ===
    } catch (err) {
      setError(err.message || 'Login failed');
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

        <button type="submit">Login</button>

        <p className="signup-text">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
