import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
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
      // Simulate login API call (replace with real API)
      if (form.email === 'user@example.com' && form.password === 'password') {
        const fakeUser = {
          user: { name: 'John Doe', email: form.email },
          token: 'fake-jwt-token',
        };
        dispatch(loginSuccess(fakeUser));
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login to Electro Mart</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
