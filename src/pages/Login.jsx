import React, { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Data from './Data';
import OutputData from './OutputData';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        padding: '40px 32px',
        width: 350,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{
          marginBottom: 24,
          color: '#4f46e5',
          fontWeight: 700,
          letterSpacing: 1
        }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              color: '#333',
              fontWeight: 500
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #d1d5db',
                outline: 'none',
                fontSize: 16,
                transition: 'border 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="you@example.com"
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              color: '#333',
              fontWeight: 500
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #d1d5db',
                outline: 'none',
                fontSize: 16,
                transition: 'border 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="********"
            />
          </div>
          {error && (
            <div style={{
              color: '#e53e3e',
              background: '#fff5f5',
              borderRadius: 6,
              padding: '8px 12px',
              marginBottom: 16,
              fontSize: 14,
              textAlign: 'center'
            }}>{error}</div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 0',
              borderRadius: 8,
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(118, 75, 162, 0.15)',
              transition: 'background 0.2s'
            }}
          >
            Login
          </button>
        </form>
        <div style={{ marginTop: 24, fontSize: 15 }}>
          Belum punya akun?{' '}
          <span
            onClick={() => navigate('/Register')}
            style={{
              color: '#4f46e5',
              cursor: 'pointer',
              fontWeight: 600,
              textDecoration: 'underline'
            }}
          >
            Daftar di sini
          </span>
        </div>
        
        <div>
          
        </div>
      </div>

    </div>
  );
}
