import React, { Suspense } from 'react';
import AppRouter from './router';

// Simple loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#FFFFFF',
    color: '#FF3C00',
    fontSize: '1.2rem',
    fontWeight: '500'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '30px',
        height: '30px',
        border: '3px solid #FF3C00',
        borderTop: '3px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
      }}></div>
      <span>페이지 로딩 중...</span>
    </div>
  </div>
);

// Error boundary for router
class RouterErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Router Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #FF3C00, #E53600)',
          color: 'white',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <h1>라우팅 오류</h1>
          <p>페이지를 불러오는 중 문제가 발생했습니다.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: 'white',
              color: '#FF3C00',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <RouterErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <AppRouter />
      </Suspense>
    </RouterErrorBoundary>
  );
}

export default App;
