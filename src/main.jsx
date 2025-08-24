import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

// Error boundary for the entire app
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
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
          <h1>앱 오류</h1>
          <p>예상치 못한 오류가 발생했습니다.</p>
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

// Remove loading state when app starts
const removeLoading = () => {
  const loadingElement = document.querySelector('.loading');
  if (loadingElement) {
    loadingElement.style.opacity = '0';
    setTimeout(() => {
      loadingElement.remove();
    }, 300);
  }
};

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  // Remove loading state after successful render
  removeLoading();
} catch (error) {
  console.error('Failed to render app:', error);
  removeLoading();
  
  // Show error state
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #FF3C00, #E53600);
        color: white;
        text-align: center;
        padding: 2rem;
      ">
        <h1>앱 초기화 실패</h1>
        <p>앱을 시작하는 중 오류가 발생했습니다.</p>
        <button onclick="window.location.reload()" style="
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: white;
          color: #FF3C00;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
        ">다시 시도</button>
      </div>
    `;
  }
}