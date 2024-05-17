import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <Link to="/">Home</Link>
    <Link to="/search">Search</Link>
    <Link to="/realtime">Real Time Search</Link>
  </header>
);

export default Header;
