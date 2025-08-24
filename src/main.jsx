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

// Hide loading indicator
const hideLoading = () => {
  const loading = document.getElementById('app-loading');
  if (loading) {
    loading.classList.add('hidden');
  }
};

// Check if root element exists and render app
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = `
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
      <p>루트 요소를 찾을 수 없습니다.</p>
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
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    // Hide loading indicator immediately after render
    hideLoading();
    
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to render app:', error);
    hideLoading();
    
    // Show error state
    if (rootElement) {
      rootElement.innerHTML = `
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
          <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 1rem;">${error.message}</p>
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
}