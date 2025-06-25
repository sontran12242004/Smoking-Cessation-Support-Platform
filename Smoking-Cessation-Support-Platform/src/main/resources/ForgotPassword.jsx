import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8085/api/forgot-password', { email });
      if (response.status === 200) {
        setMessage('Please check your email, a reset link has been sent.');
      } else {
        setError('Failed to send reset link.');
      }
    } catch (err) {
      setError('Failed to send reset link.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%'
    },
    forgotWrapper: {
      display: 'flex',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.13)',
      overflow: 'hidden',
      minWidth: '800px',
      minHeight: '420px'
    },
    leftPanel: {
      background: '#4d8b3c',
      color: '#fff',
      padding: '40px 36px 40px 40px',
      width: '370px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
      boxShadow: '2px 0 8px rgba(0,0,0,0.04)'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: '400',
      color: '#222',
      marginBottom: '8px'
    },
    brand: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#fff',
      marginBottom: '0'
    },
    slogan: {
      fontStyle: 'italic',
      fontSize: '1rem',
      color: '#e0e0e0',
      marginBottom: '32px'
    },
    welcome: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '16px'
    },
    desc: {
      fontSize: '1rem',
      marginBottom: '32px',
      color: '#e0e0e0'
    },
    stats: {
      display: 'flex',
      gap: '32px'
    },
    stat: {
      fontSize: '1rem',
      fontWeight: '700',
      color: '#fff'
    },
    statNumber: {
      display: 'block',
      fontSize: '1.2rem',
      fontWeight: '900',
      color: '#b6ffb6'
    },
    rightPanel: {
      padding: '40px 36px 40px 36px',
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    title: {
      color: '#4d8b3c',
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '8px',
      textAlign: 'center'
    },
    subtitle: {
      color: '#444',
      fontSize: '1.1rem',
      marginBottom: '24px',
      textAlign: 'center'
    },
    form: {
      width: '100%'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: '4px',
      color: '#222'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1.5px solid #b6d7b6',
      borderRadius: '6px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border 0.2s'
    },
    sendBtn: {
      width: '100%',
      background: '#4d8b3c',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      padding: '12px 0',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      marginBottom: '10px',
      transition: 'background 0.2s'
    },
    backToLogin: {
      color: '#4d8b3c',
      fontWeight: '700',
      textAlign: 'center',
      display: 'block',
      marginBottom: '8px',
      textDecoration: 'none',
      fontSize: '1rem'
    },
    message: {
      color: '#4CAF50',
      marginBottom: 10,
      textAlign: 'center'
    },
    error: {
      color: 'red',
      marginBottom: 10,
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.forgotWrapper}>
          <div style={styles.leftPanel}>
            <div style={styles.logo}></div>
            <div style={styles.brand}>NicOff</div>
            <div style={styles.slogan}>Turn Off Nicotine, Turn On Life!</div>
            <div style={styles.welcome}>Forgot your password?</div>
            <div style={styles.desc}>
              No worries! We'll help you reset it and get back on track.
            </div>
            <div style={styles.stats}>
              <div style={styles.stat}>
                <span style={styles.statNumber}>87%</span>
                Success Rate
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>24/7</span>
                Support
              </div>
            </div>
          </div>
          <div style={styles.rightPanel}>
            <h2 style={styles.title}>Forgot Password</h2>
            <div style={styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</div>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  style={styles.input}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              {error && <div style={styles.error}>{error}</div>}
              {message && <div style={styles.message}>{message}</div>}
              <button type="submit" style={styles.sendBtn}>Send Reset Link</button>
            </form>
            <Link to="/login" style={styles.backToLogin}>Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 