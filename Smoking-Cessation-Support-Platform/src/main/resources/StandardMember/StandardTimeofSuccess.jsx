import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import journeyPath from '../assets/journey_path.jpg';

const StandardTimeofSuccess = () => {
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
        color: #333;
        margin-bottom: 30px;
        font-weight: 500;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
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

    .milestone-name {
        flex: 1;
    }

    .milestone-badge {
        font-size: 24px;
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
    
  `;

  return (
    <div className="welcome-page-container">
      <style>{allStyles}</style>
      <header className="welcome-header">
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
          <span className="notification-icon" onClick={() => navigate('/standard/notification')}>&#128276;</span>
          <button className="logout-button" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </header>
      <nav className="welcome-nav">
        <ul>
          <li><NavLink to="/standard/home" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/standard/dashboard" className="nav-link">Dashboard</NavLink></li>
          <li><NavLink to="/standard/achievement" className="nav-link">Achievement</NavLink></li>
          <li><NavLink to="/standard/coach" className="nav-link">Coach</NavLink></li>
          <li><NavLink to="/standard/community" className="nav-link">Community</NavLink></li>
          <li><NavLink to="/standard/feedback" className="nav-link">Feedback</NavLink></li>
        </ul>
      </nav>
      <main className="time-of-success-main-content">
        <div className="top-section-text">
          <h1>Congratulations on creating your personalized quit plan!</h1>
        </div>
        <div className="progress-card">
          <h2 className="progress-card-title">Your smoke-free journey begins now!</h2>
          <div className="time-smoke-free">
            <div className="number">0</div>
            <div className="label">Days</div>
            <div className="number">0</div>
            <div className="label">Hours</div>
            <div className="number">0</div>
            <div className="label">Minutes</div>
          </div>
          <h3 className="key-milestones-title">Key Milestones Ahead:</h3>
          <ul className="milestone-list">
            <li className="milestone-item">
              <span className="milestone-name">1 Day Smoke-Free</span>
              <span className="milestone-badge">🥉</span>
            </li>
            <li className="milestone-item">
              <span className="milestone-name">1 Week Smoke-Free</span>
              <span className="milestone-badge">🥈</span>
            </li>
            <li className="milestone-item">
              <span className="milestone-name">1 Month Smoke-Free</span>
              <span className="milestone-badge">🥇</span>
            </li>
          </ul>
        </div>
        <div className="success-card">
          <h2 className="success-card-title">Share Your Commitment</h2>
          <p>Let your friends and family know about your decision. Their support can make a huge difference!</p>
          <div className="share-container">
            <textarea
              className="share-input"
              placeholder="I'm starting my journey to a smoke-free life with NicOff! #quitjourney #smokefree"
            />
            <button className="share-button">Share on Social Media</button>
          </div>
        </div>
         <button className="go-to-home-button" onClick={() => navigate('/standard/home')}>
           Go To Home
         </button>
      </main>
    </div>
  );
};

export default StandardTimeofSuccess;