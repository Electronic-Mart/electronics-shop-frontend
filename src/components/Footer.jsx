import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-column">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/products">Laptops</Link></li>
            <li><Link to="/products">Phones</Link></li>
            <li><Link to="/products">Accessories</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/contact">Shipping</Link></li>
            <li><Link to="/contact">Returns</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/about">Careers</Link></li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>© 2025 Electro Mart</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
