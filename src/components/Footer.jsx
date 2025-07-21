import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-column">
          <h4>Categories</h4>
          <ul>
            <li>Laptops</li>
            <li>Phones</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li>Contact Us</li>
            <li>Shipping</li>
            <li>Returns</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li>Our Story</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>© 2025 Electro Mart</p>
        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
