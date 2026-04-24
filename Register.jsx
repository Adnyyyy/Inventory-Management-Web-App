import { useState } from 'react';

function Register({ onRegisterSuccess, onShowLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setStatus("Registration Successful!");
        setTimeout(onRegisterSuccess, 1500);
      } else {
        const error = await response.json();
        setStatus(error.detail || "Error occurred");
      }
    } catch (err) {
      setStatus("Server connection failed");
    }
  };

  return (
    <div className="auth-card">
      <h1 className="brand-title">
        <span className="brand-ds">DS</span>
        <span className="brand-inventory"> Inventory</span>
        <span className="brand-manager"> Manager</span>
      </h1>

      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button">Sign Up</button>
      </form>

      {status && <p className="status-message" style={{color: '#ff8c00', marginTop: '15px'}}>{status}</p>}

      <p className="auth-footer">
        Already have an account? <span onClick={onShowLogin} className="link-text">Login</span>
      </p>
    </div>
  );
}

export default Register;