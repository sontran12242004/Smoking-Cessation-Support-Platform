import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import journeyPath from '../assets/journey_path.jpg';

function StandardMember_Coach() {
  const navigate = useNavigate();

  const styles = `
    html, body, #root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background-color: #f0f2f5;
      font-family: Arial, sans-serif;
    }
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .welcome-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 40px;
      background-color: #fff;
      border-bottom: 1px solid #d0e8ef;
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      transform: translateX(-50%);
      box-sizing: border-box;
    }
    .header-left, .header-right {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .profile-btn {
      display: flex;
      align-items: center;
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 999px;
      padding: 8px 22px 8px 15px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
      box-shadow: 0 2px 8px rgba(76,175,80,0.10);
      outline: none;
    }
    .profile-btn:hover {
      background-color: #388E3C;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 16px rgba(76,175,80,0.18);
    }
    .header-center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .app-name {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .app-name h1 {
      margin: 0;
      font-size: 24px;
      color: #4CAF50;
    }
    .app-name p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
    .notification-icon {
      font-size: 24px;
      color: #f39c12;
      cursor: pointer;
    }
    .logout-button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .logout-button:hover {
      background-color: #45a049;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .welcome-nav {
      background-color: #fff;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .welcome-nav ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 40px;
    }
    .welcome-nav a {
      text-decoration: none;
      color: #5EBB34;
      font-weight: 400;
      font-size: 16px;
      padding: 5px 0;
      position: relative;
      transition: color 0.3s;
    }
    .welcome-nav a::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 3px;
      background: #5EBB34;
      border-radius: 2px;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
      z-index: 1;
    }
    .welcome-nav a:hover::after, .welcome-nav a:focus::after, .welcome-nav a.active::after {
      transform: scaleX(1);
    }
    main {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px;
      background-image: url(${journeyPath});
      background-size: cover;
      background-position: center;
      position: relative;
    }
    .main-content {
      position: relative;
      z-index: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .locked-feature-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      padding: 40px;
      text-align: center;
      max-width: 500px;
    }
    .sad-face {
      font-size: 3.5rem;
      color: #4CAF50;
      margin-bottom: 18px;
      font-weight: bold;
    }
    .locked-message {
      color: #43A047;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 18px;
    }
    .upgrade-text {
      color: #4CAF50;
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 24px;
    }
    .upgrade-btn {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 12px 32px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.18s;
      box-shadow: 0 2px 8px rgba(76,175,80,0.10);
      outline: none;
    }
    .upgrade-btn:hover {
      background-color: #388E3C;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 16px rgba(76,175,80,0.18);
    }
    .page-footer {
      background-color: #333; 
      color: #fff;
      padding: 30px 20px;
      text-align: center;
      font-size: 14px;
    }
    .footer-content {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      max-width: 1200px;
      margin: 0 auto 20px auto;
      text-align: left;
      flex-wrap: wrap;
    }
    .footer-column {
      flex: 1;
      min-width: 200px;
      padding: 10px;
    }
    .footer-column h3 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #4CAF50;
    }
    .footer-column p, .footer-column a {
      font-size: 14px;
      color: #ccc;
      text-decoration: none;
      display: block;
      margin-bottom: 8px;
    }
    .footer-column a:hover {
      color: #fff;
    }
    .newsletter-input {
      padding: 8px;
      border: none;
      border-radius: 5px;
      margin-right: 10px;
      width: 150px;
    }
    .newsletter-button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
    }
    .newsletter-button:hover {
      background-color: #45a049;
    }
    .copyright {
      border-top: 1px solid #555;
      padding-top: 15px;
      margin-top: 15px;
    }
  `;

  return (
    <div className="container">
      <style>{styles}</style>
      
      <div className="welcome-header">
        <div className="header-left">
          <button className="profile-btn" onClick={() => navigate('/standard/edit-profile')}>
            Standard Member
          </button>
        </div>
        <div className="header-center">
          <div className="app-name">
            <h1>NicOff</h1>
            <p>Turn Off Nicotine, Turn On Life!</p>
          </div>
        </div>
        <div className="header-right">
          <span className="notification-icon" onClick={() => navigate('/standard/notification')}>🔔</span>
          <button className="logout-button" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </div>

      <nav className="welcome-nav">
        <ul>
          <li><Link to="/standard/home">Home</Link></li>
          <li><Link to="/standard/dashboard">Dashboard</Link></li>
          <li><Link to="/standard/achievement">Achievement</Link></li>
          <li><Link to="/standard/coach" className="active">Coach</Link></li>
          <li><Link to="/standard/community">Community</Link></li>
          <li><Link to="/standard/feedback">Feedback</Link></li>
        </ul>
      </nav>

      <main>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#DFF5DE',
          opacity: 0.7,
          zIndex: 0
        }} />
        <div className="main-content">
          <div className="locked-feature-card">
            <div className="sad-face">:(</div>
            <div className="locked-message">This feature is locked</div>
            <div className="upgrade-text">Upgrade to Elite to get access to a personal coach.</div>
            <button className="upgrade-btn" onClick={() => navigate('/package', { state: { from: 'standard' } })}>
              Upgrade to Elite
            </button>
          </div>
        </div>
      </main>

      <footer className="page-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>NicOff</h3>
            <p>We're dedicated to helping you break free from smoking addiction through science-backed methods and community support</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <Link to="/about-us">About Us</Link>
            <Link to="/our-programs">Our Programs</Link>
            <Link to="/success-stories">Success Stories</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <Link to="/faq">FAQ</Link>
            <Link to="/help-center">Help Center</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Term Of Service</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div>
          <div className="footer-column">
            <h3>NewsLetter</h3>
            <input type="email" placeholder="Your Email Address..." className="newsletter-input" />
            <button className="newsletter-button">Subscribe</button>
            <p style={{fontSize: '0.8em', color: '#ccc', marginTop: '10px'}}>Get the latest tips and motivation to stay smoke-free delivered to your inbox</p>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 NicOff. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default StandardMember_Coach; 