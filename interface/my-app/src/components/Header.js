import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <Link to="/">Home</Link>
    <Link to="/search">Tìm kiếm bằng link bài hát</Link>
    <Link to="/realtime">Tìm kiếm bài hát</Link>
  </header>
);

export default Header;
