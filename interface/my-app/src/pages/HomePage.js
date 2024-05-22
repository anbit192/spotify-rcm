import React from 'react';
import './HomePage.css'; // Import your CSS file for styling
import SongList from '../components/SongList';

const HomePage = () => (
  <div className="home-page">
    <h1 className="home-page-title">Thành viên nhóm</h1>
    <div className="member-list">
      <h2 className="member-name">Bùi Nguyên Phong</h2>
      <h2 className="member-name">Nguyễn Minh An</h2>
      <h2 className="member-name">Nguyễn Văn Thắng</h2>
      <h2 className="member-name">Nguyễn Ngọc Anh</h2>
    </div>
  </div>
);

export default HomePage;
