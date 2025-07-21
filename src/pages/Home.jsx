import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Electro Mart</h1>
        <p>Your one-stop shop for quality electronic appliances.</p>
        <Link to="/products" className="shop-btn">Shop Now</Link>
      </section>
    </div>
  );
};

export default Home;
