import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategorySection from '../components/CategorySection';
import '../index.css';

const backgroundImages = [
  '/hero1.jpg',
  '/hero2.jpg',
  '/hero3.jpg',
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="home-hero"
      style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
    >
      <section className="hero-overlay">
        <h1>Welcome to Electro Mart</h1>
        <p>Your one stop shop for quality electronic appliances.</p>
        <Link to="/products" className="shop-btn">Shop Now</Link>
      </section>

      <CategorySection />
    </div>
  );
};

export default Home;
