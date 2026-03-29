import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { apiFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
      let data = {};
      try {
        data = await res.json();
      } catch {}
      if (res.ok) {
        navigate('/login');
      } else if (!res.ok && data.message) {
        setError(data.message || 'Signup failed');
      } else {
        setError('Signup failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
        <div className="form-group">
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="form-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Signup;
