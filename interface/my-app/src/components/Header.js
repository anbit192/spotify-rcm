// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';

// const Header = () => (
//   <header className="header">
//     <Link to="/">Home</Link>
//     <Link to="/search">Tìm kiếm bằng link bài hát</Link>
//     <Link to="/realtime">Tìm kiếm bài hát</Link>
//   </header>
// );

// export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="logo">Music App</div>
    <nav>
      <NavLink to="/" activeClassName="active" exact>Home</NavLink>
      <NavLink to="/search" activeClassName="active">Tìm kiếm bằng link bài hát</NavLink>
      <NavLink to="/realtime" activeClassName="active">Tìm kiếm bài hát</NavLink>
    </nav>
  </header>
);

export default Header;
