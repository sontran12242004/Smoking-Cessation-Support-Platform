import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8085/api/login', {
        email,
        password
      }, { withCredentials: true });
      console.log('Full response:', response);
      // Nếu login thành công, chuyển hướng theo vai trò (role)
      if (response.status === 200 && response.data) {
        const user = response.data;
        switch (user.role) {
          case 'ADMIN':
            navigate('/admin/dashboard');
            break;
          case 'USER':
            navigate('/elite/home'); // Chuyển đến trang của member
            break;
          case 'Coach':
            navigate('/coach/dashboard'); // Chuyển đến trang của coach
            break;
          default:
            // Nếu không có role hoặc role là GUEST, về trang chủ
            navigate('/');
        }
      } else {
        setError('Login failed: Invalid response from server.');
      }
    } catch (err) {
      setError('Incorrect email or password.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.loginWrapper}>
          <div style={styles.leftPanel}>
            <div style={styles.logo}></div>
            <div style={styles.brand}>NicOff</div>
            <div style={styles.slogan}>Turn Off Nicotine, Turn On Life!</div>
            <div style={styles.welcome}>Welcome back to your<br />smoke-free journey</div>
            <div style={styles.desc}>
              Join our community of 250,000+ people who have taken control of their health and wellbeing.
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
            <h2 style={styles.title}>Login</h2>
            <div style={styles.subtitle}>Access your personalized dashboard</div>
            <button style={styles.googleBtn}>
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google" 
                style={styles.googleIcon}
              />
              Continue with Google
            </button>
            <form style={styles.form} onSubmit={handleLogin}>
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
              <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  style={styles.input}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div style={styles.remember}>
                <input type="checkbox" id="remember" style={styles.checkbox} />
                <label htmlFor="remember" style={styles.rememberLabel}>Remember me</label>
              </div>
              {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
              <button type="submit" style={styles.loginBtn}>Log in</button>
            </form>
            <Link to="/forgot-password" style={styles.forgot}>Forgot password?</Link>
            <div style={styles.signup}>
              Don't have account? <Link to="/signup" style={styles.signupLink}>Create one</Link>
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
    width: '100%',
  },
  loginWrapper: {
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
  googleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    border: '1.5px solid #4d8b3c',
    borderRadius: '6px',
    padding: '8px 0',
    marginBottom: '18px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.2s'
  },
  googleIcon: {
    width: '22px',
    marginRight: '8px'
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
  remember: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '18px'
  },
  checkbox: {
    marginRight: '8px'
  },
  rememberLabel: {
    marginBottom: 0
  },
  loginBtn: {
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
  forgot: {
    color: '#4d8b3c',
    fontWeight: '700',
    textAlign: 'center',
    display: 'block',
    marginBottom: '8px',
    textDecoration: 'none',
    fontSize: '1rem'
  },
  signup: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#222'
  },
  signupLink: {
    color: '#4d8b3c',
    fontWeight: '700',
    textDecoration: 'none'
  }
};

export default Login; 