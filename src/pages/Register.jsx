import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // REPLACE THIS BLOCK with real API call when backend is ready
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const exists = users.find((u) => u.email === form.email);

      if (exists) {
        setError('User already exists');
        return;
      }

      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      // END OF PLACEHOLDER BLOCK

      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

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
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Account</button>

        <p className="signup-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
