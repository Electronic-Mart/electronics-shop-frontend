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

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminEmail = 'alexnjugi11@gmail.com';
    const adminPassword = '1234';

    if (form.email === adminEmail && form.password === adminPassword) {
      dispatch(loginSuccess({
        name: 'Admin',
        email: adminEmail,
        role: 'admin',
      }));
      navigate('/admin');
    } else {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = storedUsers.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (foundUser) {
        dispatch(loginSuccess({
          name: foundUser.name,
          email: foundUser.email,
          role: 'user',
        }));
        navigate('/products');
      } else {
        setError('Invalid credentials');
      }
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
          placeholder='Enter your email'
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder='Enter your password'
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
