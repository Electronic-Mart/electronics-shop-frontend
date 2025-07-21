import React from 'react';
import '../index.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Electro Mart</h1>
        <p>Your trusted destination for the latest and most reliable electronic appliances.</p>
      </section>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          Electro Mart is an online electronics shop dedicated to helping individuals and families access high-quality gadgets and home appliances at the best prices.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Top brands of electronics including TVs, laptops, phones, and more</li>
          <li>Fast and reliable home delivery</li>
          <li>Secure and simulated checkout process</li>
          <li>Excellent customer service</li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          To make electronics shopping simple, affordable, and accessible for everyone.
        </p>

        <h2>Our Stories</h2>
        <p>
          From a small electronics stall in 2020 to a growing digital store today, our journey is powered by the trust of our customers. We’ve helped thousands find the perfect device for their homes and businesses.
        </p>

        <h2>Careers at Electro Mart</h2>
        <p>
          We’re always on the lookout for passionate and innovative minds to join our team. If you’re excited by tech and driven by customer happiness, Electro Mart might just be your next adventure.
        </p>
        <p>
          <strong>Interested?</strong> Send us your CV at <a href="mailto:careers@electromart.com">careers@electromart.com</a>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
