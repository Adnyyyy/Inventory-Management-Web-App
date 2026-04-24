import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import './App.css';

function App() {
  const [view, setView] = useState('login');
  const [token, setToken] = useState(null);

  // Theme State - checks localStorage so it persists on refresh
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Effect to apply the theme to the HTML tag whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="main-app">
      {view === 'login' && (
        <Login
          onLoginSuccess={(t) => {setToken(t); setView('products');}}
          onShowRegister={() => setView('register')}
        />
      )}

      {view === 'register' && (
        <Register
          onRegisterSuccess={() => setView('login')}
          onShowLogin={() => setView('login')}
        />
      )}

      {view === 'products' && (
        <Products
          token={token}
          onLogout={() => {setToken(null); setView('login');}}
        />
      )}

      {/* Theme Toggle Button - Fixed to Bottom Right via CSS */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}

export default App;