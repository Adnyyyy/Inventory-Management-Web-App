import { useState } from 'react';

function Login({ onLoginSuccess, onShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data.access_token);
      } else {
        setStatus(typeof data.detail === 'string' ? data.detail : "Login failed");
      }
    } catch (err) {
      setStatus("Backend connection error");
    }
  };

  return (
    <div className="auth-card">
      <h1 className="brand-title">
        <span className="brand-ds">DS</span>
        <span className="brand-inventory"> Inventory</span>
        <span className="brand-manager"> Manager</span>
      </h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      {status && <p style={{color: '#ff8c00', marginTop: '15px'}}>{status}</p>}
      <p style={{marginTop: '25px'}}>
        Don't have an account? <button onClick={onShowRegister} className="link-text">Sign Up</button>
      </p>
    </div>
  );
}

export default Login;