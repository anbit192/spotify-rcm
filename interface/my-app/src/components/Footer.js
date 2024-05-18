import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p>&copy; 2024 Music Recommendation System</p>
      <div className="social-links">
        <a href="#" className="social-link">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="social-link">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="social-link">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
