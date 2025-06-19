import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import journeyPath from '../assets/journey_path.jpg'; // Corrected path

const TimeofSuccess = () => {
  const navigate = useNavigate();

  const allStyles = `
    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
    .welcome-page-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      background-color: #f0f2f5;
    }

    .welcome-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 40px;
        background-color: #fff;
        border-bottom: 1px solid #d0e8ef;
    }

    .header-left,
    .header-right {
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

    .profile-icon {
        color: #5B2A99;
        font-size: 20px;
        margin-right: 8px;
    }

    .header-center .logo-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
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
        border-bottom: 1px solid #d0e8ef;
    }

    .welcome-nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        gap: 40px;
    }

    .nav-link {
        text-decoration: none;
        color: #5EBB34;
        font-weight: 400;
        font-size: 16px;
        padding: 5px 0;
        position: relative;
        transition: color 0.3s;
    }

    .nav-link::after {
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

    .nav-link:hover::after, .nav-link:focus::after, .nav-link.active::after {
        transform: scaleX(1);
    }

    .time-of-success-main-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column; /* To stack cards vertically */
      align-items: center; /* Center cards horizontally */
      padding: 20px;
      background-image: linear-gradient(rgba(223, 245, 222, 0.5), rgba(223, 245, 222, 0.5)), url(${journeyPath});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      color: #fff;
      width: 100%; /* Ensure it spans full width */
      box-sizing: border-box; /* Include padding in width/height */
      padding-top: 50px; /* Space from top */
      padding-bottom: 50px; /* Space from bottom */
    }

    .top-section-text {
        font-size: 32px;
        color: #eee;
        margin-bottom: 30px;
        font-weight: 500;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    }

    .progress-card, .success-card {
      background-color: #fff;
      color: #333;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 40px;
      text-align: center;
      max-width: 800px;
      width: 90%;
      margin-bottom: 30px; /* Space between cards */
    }

    .progress-card-title, .success-card-title {
        font-size: 28px;
        color: #249325;
        margin-bottom: 25px;
        margin-top: 0;
    }

    .time-smoke-free {
        display: flex;
        justify-content: center;
        align-items: baseline;
        gap: 15px;
        margin-bottom: 30px;
    }

    .time-smoke-free .number {
        font-size: 60px;
        color: #249325;
        font-weight: bold;
        line-height: 1;
    }

    .time-smoke-free .label {
        font-size: 20px;
        color: #555;
    }

    .key-milestones-title {
        font-size: 22px;
        color: #555;
        margin-bottom: 20px;
    }

    .milestone-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .milestone-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f8f8f8;
        border-radius: 5px;
        padding: 15px 20px;
        margin-bottom: 10px;
        font-size: 16px;
    }

    .milestone-item.completed {
        background-color: #E6F3E6; /* Light green */
    }
    .milestone-item.in-progress {
        background-color: #E0F2F7; /* Light blue */
    }
    .milestone-item.upcoming {
        background-color: #F5F5F5; /* Light gray */
    }

    .milestone-text {
        text-align: left;
        flex-grow: 1;
        color: #444;
    }

    .milestone-status {
        font-size: 24px;
        color: #4CAF50;
        font-weight: bold;
    }

    .milestone-percentage {
        color: #007bff;
        font-weight: bold;
    }

    .success-progress-bar-container {
        width: 100%;
        background-color: #e0e0e0;
        border-radius: 5px;
        height: 25px;
        margin-bottom: 20px;
        overflow: hidden;
    }

    .success-progress-bar-fill {
        height: 100%;
        width: 25%; /* Example: 25% completed */
        background-color: #4CAF50;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: bold;
        font-size: 14px;
    }

    .success-description {
        font-size: 18px;
        color: #555;
        line-height: 1.5;
    }

    .success-description .highlight {
        color: #007bff;
        font-weight: bold;
    }

    .go-to-home-button {
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 15px 30px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
        margin-top: 30px;
    }

    .go-to-home-button:hover {
        background-color: #388E3C;
        transform: translateY(-3px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .welcome-footer {
        background-color: #333; /* Elite_Welcome uses #333 */
        color: #e0e0e0;
        padding: 40px 60px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
    }

    .footer-content {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 1200px; /* Match max-width of header if desired */
        flex-wrap: wrap;
        gap: 30px;
        margin-bottom: 40px;
    }

    .footer-section {
        flex: 1;
        min-width: 200px;
        margin-right: 20px;
    }

    .footer-section h3 {
        color: #4CAF50;
        margin-bottom: 15px;
        font-size: 18px;
    }

    .footer-section p {
        font-size: 14px;
        line-height: 1.6;
    }

    .footer-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-section ul li {
        margin-bottom: 10px;
    }

    .footer-section ul li a {
        color: #e0e0e0;
        text-decoration: none;
        font-size: 14px;
        transition: color 0.2s ease;
    }

    .footer-section ul li a:hover {
        color: #4CAF50;
    }

    .newsletter-signup input {
        background-color: #555;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        width: calc(100% - 30px);
        margin-bottom: 10px;
        color: #fff;
        font-size: 14px;
    }

    .newsletter-signup input::placeholder {
        color: #bbb;
    }

    .newsletter-signup button {
        background-color: #4CAF50;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s ease;
    }

    .newsletter-signup button:hover {
        background-color: #45a049;
    }

    .newsletter-signup p {
        font-size: 12px;
        color: #bbb;
        margin-top: 10px;
    }

    .footer-bottom {
        border-top: 1px solid #444;
        padding-top: 20px;
        margin-top: 20px;
        text-align: center;
        width: 100%;
        font-size: 14px;
        color: #bbb;
    }

    .copyright {
      border-top: 1px solid #555;
      padding-top: 15px;
      margin-top: 15px;
    }
  `;

  return (
    <div className="welcome-page-container">
      <style>{allStyles}</style>
      <header className="welcome-header">
        <div className="header-left">
          <i className="fas fa-user-circle profile-icon"></i>
          <button className="profile-btn">
            Elite Member
          </button>
        </div>
        <div className="header-center">
          <div className="app-name">
            <h1>NicOff</h1>
            <p>Turn Off Nicotine, Turn On Life!</p>
          </div>
        </div>
        <div className="header-right">
          <i className="fas fa-bell notification-icon"></i>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      <nav className="welcome-nav">
        <ul>
          <li><NavLink to="/elite-home" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink></li>
          <li><NavLink to="/dashboard" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Dashboard</NavLink></li>
          <li><NavLink to="/achievement" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Achievement</NavLink></li>
          <li><NavLink to="/coach" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Coach</NavLink></li>
          <li><NavLink to="/community" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Community</NavLink></li>
          <li><NavLink to="/feedback" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Feedback</NavLink></li>
        </ul>
      </nav>

      <div className="time-of-success-main-content">
        <h2 className="top-section-text">ESTIMATED TIME OF SUCCESS</h2>

        <div className="progress-card">
          <h2 className="progress-card-title">Smoking Cessation Progress</h2>
          <div className="welcome-message" style={{textAlign: 'right', marginBottom: '20px', fontSize: '14px'}}>
            <p style={{margin: '0', color: '#555'}}>Welcome, John</p>
            <p style={{margin: '0', color: '#555'}}>Quit date: May 14, 2025</p>
          </div>

          <div className="time-smoke-free">
            <span className="number">14</span><span className="label">Days</span>
            <span className="number">06</span><span className="label">Hours</span>
            <span className="number">32</span><span className="label">Minutes</span>
          </div>

          <h3 className="key-milestones-title">Key Milestones</h3>
          <ul className="milestone-list">
            <li className="milestone-item completed">
              <span className="milestone-text">48 hours</span>
              <span className="milestone-text">Nicotine eliminated from body</span>
              <span className="milestone-status"><i className="fas fa-check-circle"></i></span>
            </li>
            <li className="milestone-item completed">
              <span className="milestone-text">2 weeks</span>
              <span className="milestone-text">Circulation and lung function improve</span>
              <span className="milestone-status"><i className="fas fa-check-circle"></i></span>
            </li>
            <li className="milestone-item in-progress">
              <span className="milestone-text">1 month</span>
              <span className="milestone-text">Energy levels increase significantly</span>
              <span className="milestone-percentage">75%</span>
            </li>
            <li className="milestone-item upcoming">
              <span className="milestone-text">3 months</span>
              <span className="milestone-text">Addiction broken, cravings rare</span>
              <span className="milestone-status"></span>
            </li>
            <li className="milestone-item upcoming">
              <span className="milestone-text">1 year</span>
              <span className="milestone-text">Heart disease risk halved</span>
              <span className="milestone-status"></span>
            </li>
          </ul>
        </div>

        <div className="success-card">
          <h2 className="success-card-title">Estimated Time to Full Success</h2>
          <div className="success-progress-bar-container">
            <div className="success-progress-bar-fill">
              25% to complete success
            </div>
          </div>
          <p className="success-description">
            Based on your progress, you're on track to complete success in approximately <span className="highlight">2 months and 2 weeks!</span> Keep going!
          </p>
        </div>

        <button className="go-to-home-button" onClick={() => navigate('/elite/home')}>
          Go To Home
        </button>
      </div>

      <footer className="welcome-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>NicOff</h3>
            <p>We're dedicated to helping you break free from smoking addiction through science-backed methods and community support</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><NavLink to="/about-us">About Us</NavLink></li>
              <li><NavLink to="/our-programs">Our Programs</NavLink></li>
              <li><NavLink to="/success-stories">Success Stories</NavLink></li>
              <li><NavLink to="/blog">Blog</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><NavLink to="/faq">FAQ</NavLink></li>
              <li><NavLink to="/help-center">Help Center</NavLink></li>
              <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms-of-service">Term Of Service</NavLink></li>
              <li><NavLink to="/cookie-policy">Cookie Policy</NavLink></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>NewsLetter</h3>
            <div className="newsletter-signup">
              <input type="email" placeholder="Your Email Address..." />
              <button>Subscribe</button>
              <p>Get the latest tips and motivation to stay smoke-free delivered to your inbox</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 NicOff. All rights reserved
        </div>
      </footer>
    </div>
  );
};

export default TimeofSuccess;