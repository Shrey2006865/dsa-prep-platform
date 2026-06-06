import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://dsa-prep-platform.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>DSA Prep Platform</h1>
        <h2 style={styles.subtitle}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={styles.button} type="submit">Login</button>
        </form>
        <p style={styles.link}>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' },
  card: { background: '#1e293b', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px' },
  title: { color: '#6366f1', textAlign: 'center', marginBottom: '8px' },
  subtitle: { color: '#fff', textAlign: 'center', marginBottom: '24px' },
  input: { width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff', fontSize: '16px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' },
  error: { color: '#ef4444', marginBottom: '16px' },
  link: { color: '#94a3b8', textAlign: 'center', marginTop: '16px' }
};

export default Login;