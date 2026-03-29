import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { apiFetch } from '../utils/api';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      let data = {};
      try {
        data = await res.json();
      } catch {}
      if (res.ok && data.token) {
        login({username: data.username, role: data.role}, data.token);
        navigate('/dashboard');
      } else if (!res.ok && data.message) {
        setError(data.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
        <div className="form-group">
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="form-link">
        Don't have an account? <a href="/signup">Create one</a>
      </div>
    </div>
  );
};

export default Login;
