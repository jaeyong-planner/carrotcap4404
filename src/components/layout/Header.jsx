import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">SKIN concierge</Link>
      </div>
      <nav>
        <Link to="/dashboard">대시보드</Link>
        <Link to="/scan">피부 스캔</Link>
        <Link to="/products">추천 제품</Link>
        <Link to="/profile">마이페이지</Link>
      </nav>
    </header>
  );
};

export default Header;
