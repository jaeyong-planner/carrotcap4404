import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext'; // Assuming you have an AuthContext

const Header = () => {
  // const { isAuthenticated, logout } = useAuth(); // Placeholder for auth logic
  const isAuthenticated = false; // <-- Change this to true to see the logged-in header
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div className="logo" style={styles.logo}>
        <Link to="/" style={styles.link}>SKIN concierge</Link>
      </div>
      <nav style={styles.nav}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={styles.link}>대시보드</Link>
            <Link to="/scan" style={styles.link}>피부 스캔</Link>
            <Link to="/products" style={styles.link}>추천 제품</Link>
            <Link to="/profile" style={styles.link}>마이페이지</Link>
            <button onClick={handleLogout} style={styles.button}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>로그인</Link>
            <Link to="/signup" style={styles.link}>회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
};

// Basic styling for demonstration
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
  },
  button: {
    border: 'none',
    background: 'transparent',
    color: '#333',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '1rem',
  }
};

export default Header;

