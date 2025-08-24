import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FF3C00, #E53600)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        🎉 SKIN concierge
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>
        앱이 성공적으로 로드되었습니다!
      </p>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>✅ 다음 단계로 이동</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" style={{
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: '#FF3C00',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'none'
          }}>
            로그인
          </Link>
          <Link to="/signup" style={{
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'none'
          }}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
