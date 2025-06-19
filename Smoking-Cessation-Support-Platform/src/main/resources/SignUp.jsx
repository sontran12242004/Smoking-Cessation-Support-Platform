import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.signupWrapper}>
          <div style={styles.leftPanel}>
            <div style={styles.logo}></div>
            <div style={styles.brand}>NicOff</div>
            <div style={styles.slogan}>Turn Off Nicotine, Turn On Life!</div>
            <div style={styles.welcome}>Begin your<br />transformation<br />today</div>
            <div style={styles.desc}>
              Our proven system has helped thousands quit smoking for good. You're just 3 steps away from a healthier life.
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
            <h2 style={styles.title}>Create Account</h2>
            <form style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="username" style={styles.label}>Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="confirm-password" style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  required
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.signupBtn}>Sign up</button>
            </form>
            <div style={styles.loginLink}>
              Already have an account? <Link to="/login" style={styles.loginLinkText}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
  signupWrapper: {
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
  signupBtn: {
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
  loginLink: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#222'
  },
  loginLinkText: {
    color: '#4d8b3c',
    fontWeight: '700',
    textDecoration: 'none'
  }
};

export default Signup; 