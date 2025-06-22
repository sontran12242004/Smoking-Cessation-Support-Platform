import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import journeyPath from '../assets/journey_path.jpg';

const EliteHealthMetric = () => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate("/elitenotificationcenter");
  };
  const styles = `
    html,
    body,
    #root {
      width: 100%;
      height: 100%;
      margin: 0;
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background-color: #f0f2f5;
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
    .header-left,
    .header-right {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .profile-status {
      display: flex;
      align-items: center;
      background: none;
      padding: 0;
      border-radius: 0;
      font-size: 14px;
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
    .header-center .logo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .header-center .logo {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-right: 10px;
    }
    .header-center .app-name h1 {
      margin: 0;
      font-size: 24px;
      color: #4CAF50;
    }
    .header-center .app-name p {
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
    .dashboard-bg {
      min-height: 100vh;
      background: url('https://images.unsplash.com/photo-1447752875215-b276168b9f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80') center/cover no-repeat;
      /* padding-bottom: 60px; */
      display: flex;
      flex-direction: column;
    }
    .dashboard-header {
      background: #fff;
      border-bottom: 1px solid #d0e8ef;
      padding: 0;
    }
    .dashboard-nav {
      display: flex;
      justify-content: space-between;
      padding: 18px 40px 0 40px;
    }
    .dashboard-logo-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .dashboard-logo {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-right: 10px;
    }
    .dashboard-app-name h1 {
      margin: 0;
      font-size: 24px;
      color: #4CAF50;
    }
    .dashboard-app-name p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
    .dashboard-nav-links {
      list-style: none;
      display: flex;
      gap: 32px;
      margin: 0 0 0 40px;
      padding: 0;
    }
    .dashboard-nav-links li a {
      text-decoration: none;
      color: #388E3C;
      font-weight: bold;
      font-size: 17px;
      padding-bottom: 4px;
      border-bottom: 2.5px solid transparent;
      transition: color 0.2s, border 0.2s;
    }
    .dashboard-nav-links li a.active, .dashboard-nav-links li a:hover {
      color: #4CAF50;
      border-bottom: 2.5px solid #4CAF50;
    }
    .dashboard-header-actions {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .dashboard-notification-icon {
      font-size: 26px;
      color: #FBC02D;
      cursor: pointer;
      margin-right: 10px;
    }
    .dashboard-logout-btn {
      background: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 8px 22px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .dashboard-logout-btn:hover {
      background: #388E3C;
    }
    .dashboard-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1 0 auto;
    }
    .dashboard-welcome {
      text-align: center;
      margin-bottom: 18px;
    }
    .dashboard-welcome-title {
      font-size: 36px;
      font-weight: bold;
      color: #000;
      margin-bottom: 5px;
      letter-spacing: 1px;
      text-shadow: none;
    }
    .dashboard-welcome-title .welcome-name {
      color: #4CAF50;
    }
    .dashboard-welcome-quote {
      font-size: 1.15rem;
      color: #388E3C;
      margin-bottom: 30px;
      font-style: italic;
      text-shadow: 0 1px 6px rgba(255,255,255,0.5);
    }
    .dashboard-cards-row {
      display: flex;
      gap: 32px;
      width: 100%;
      justify-content: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .dashboard-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      width: 350px;
      height: 220px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .dashboard-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
    .dashboard-card-icon {
      font-size: 32px;
      color: #4CAF50;
      margin-bottom: 16px;
    }
    .dashboard-card-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }
    .dashboard-card-subtitle {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
    .dashboard-card-value {
      font-size: 28px;
      font-weight: 700;
      color: #4CAF50;
      margin: 12px 0;
      text-align: center;
      width: 100%;
      display: block;
    }
    .dashboard-card-desc {
      font-size: 14px;
      color: #666;
      margin-top: 18px;
      margin-bottom: 0;
      text-align: center;
      width: 100%;
      display: block;
    }
    .dashboard-cards-row-small {
      display: flex;
      gap: 32px;
      width: 100%;
      justify-content: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .dashboard-card-small {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .dashboard-card-small:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
    .dashboard-card-small-icon {
      font-size: 24px;
      color: #4CAF50;
    }
    .dashboard-card-small-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .dashboard-card-small-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
    .dashboard-card-small-value {
      font-size: 20px;
      font-weight: 700;
      color: #4CAF50;
      margin: 0;
    }
    .dashboard-card-small-description {
      font-size: 13px;
      color: #666;
      margin: 0;
    }
    .dashboard-explore-btn {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 20px 54px;
      font-size: 1.35rem;
      font-weight: bold;
      cursor: pointer;
      margin-top: 36px;
      transition: background 0.2s, transform 0.15s, box-shadow 0.18s;
      box-shadow: 0 4px 18px rgba(76,175,80,0.13);
    }
    .dashboard-explore-btn:hover {
      background-color: #388E3C;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 8px 24px rgba(76,175,80,0.18);
    }
    .analytics-section {
      width: 100%;
      background: none;
      padding: 40px 0 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
    }
    .analytics-title {
      font-size: 2.2rem;
      color: #4CAF50;
      font-weight: bold;
      margin-bottom: 30px;
      text-align: center;
      letter-spacing: 1px;
      text-shadow: none;
    }
    .analytics-cards-row {
      display: flex;
      flex-direction: row;
      gap: 48px;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      max-width: 950px;
      margin: 0 auto;
      flex-wrap: nowrap;
    }
    @media (max-width: 900px) {
      .analytics-cards-row {
        flex-direction: column;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
      }
    }
    .analytics-card {
      background: #fff;
      border-radius: 12px;
      border: 2px solid #4CAF50;
      box-shadow: none;
      padding: 32px 24px 32px 24px;
      min-width: 320px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      margin-bottom: 32px;
      position: relative;
      transition: box-shadow 0.22s, transform 0.18s, background 0.18s;
      overflow: hidden;
      z-index: 2;
    }
    .analytics-card-title {
      font-size: 2rem;
      color: #4CAF50;
      font-weight: bold;
      margin-bottom: 18px;
      text-shadow: none;
    }
    .analytics-card-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 180px;
    }
    .analytics-sad-face {
      font-size: 3.5rem;
      color: #4CAF50;
      margin-bottom: 18px;
      font-weight: bold;
    }
    .analytics-locked-message {
      color: #43A047;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 18px;
    }
    .analytics-upgrade-text {
      color: #4CAF50;
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 18px;
    }
    .analytics-upgrade-btn {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 32px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.18s;
      box-shadow: 0 2px 8px rgba(76,175,80,0.10);
      outline: none;
    }
    .analytics-upgrade-btn:hover {
      background-color: #388E3C;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 16px rgba(76,175,80,0.18);
    }
    .elite-footer {
      background-color: #333; 
      color: #fff;
      padding: 30px 20px;
      text-align: center;
      font-size: 14px;
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      transform: translateX(-50%);
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
      color: #fff;
      text-align: center;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      width: 100%;
      justify-items: center;
      margin-bottom: 32px;
    }
    @media (max-width: 900px) {
      .metrics-grid {
        grid-template-columns: 1fr;
    }
    }
    @media (max-width: 1200px) {
      .dashboard-card {
        width: 100%;
        min-width: 220px;
        height: 220px;
      }
    }
    .dashboard-title {
      font-size: 36px;
      font-weight: bold;
      color: #000;
      text-align: center;
      margin-bottom: 8px;
    }
    .dashboard-desc {
      font-size: 18px;
      color: #388E3C;
      font-style: italic;
      text-align: center;
      margin-bottom: 30px;
      margin-top: 0;
    }
    .back-to-dashboard-btn {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 16px 40px;
      font-size: 1.15rem;
      font-weight: bold;
      cursor: pointer;
      margin-top: 24px;
      transition: background 0.2s, transform 0.15s, box-shadow 0.18s;
      box-shadow: 0 4px 18px rgba(76,175,80,0.13);
      letter-spacing: 1px;
      outline: none;
      display: inline-block;
    }
    .back-to-dashboard-btn:hover {
      background-color: #388E3C;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 8px 24px rgba(76,175,80,0.18);
    }
    .dashboard-card-label {
      font-size: 20px;
      color: #249325;
      font-weight: 700;
      margin: 8px 0 0 0;
      text-align: center;
      width: 100%;
      display: block;
    }
  `;

  const metrics = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="4" stroke="#43b649" strokeWidth="2" />
          <path d="M8 10h8M8 14h5" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "14",
      label: "Days Smoke-Free",
      desc: "19 days until next milestone",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" stroke="#43b649" strokeWidth="2" />
          <path d="M12 17v-2m0-8v2m-4 4h2m8 0h-2" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "$155",
      label: "Money Saved",
      desc: "Based on 10 cigarettes/day",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#43b649" strokeWidth="2" />
          <path d="M8 12h8" stroke="#43b649" strokeWidth="2" />
          <path d="M12 8v8" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "38.5%",
      label: "Health Improved",
      desc: "Lung function recovery",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" stroke="#43b649" strokeWidth="2" />
          <path d="M12 8c-2.21 0-4 1.79-4 4" stroke="#43b649" strokeWidth="2" />
          <path d="M12 16c2.21 0 4-1.79 4-4" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "↓24%",
      label: "Heart Attack Risk",
      desc: "Reduction in heart attack probability",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="8" stroke="#43b649" strokeWidth="2" />
          <path d="M8 12h8" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "↓31%",
      label: "Lung Cancer Risk",
      desc: "Decreased risk of lung cancer",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" stroke="#43b649" strokeWidth="2" />
          <path d="M12 8c-2.21 0-4 1.79-4 4" stroke="#43b649" strokeWidth="2" />
          <path d="M12 16c2.21 0 4-1.79 4-4" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "↓27%",
      label: "Heart Disease Risk",
      desc: "Reduction in cardiovascular risk",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#43b649" strokeWidth="2" />
          <path d="M12 8v8" stroke="#43b649" strokeWidth="2" />
          <path d="M8 12h8" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "+22%",
      label: "Immune Function",
      desc: "Improved immunity and lung function",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" stroke="#43b649" strokeWidth="2" />
          <path d="M8 12h8" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "+19%",
      label: "Teeth Whitening",
      desc: "Reduction in tobacco staining",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#43b649" strokeWidth="2" />
          <path d="M12 8v8" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "+38.5%",
      label: "Breath Freshness",
      desc: "Improvement in breath odor",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#43b649" strokeWidth="2" />
          <path d="M8 12h8" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "+45%",
      label: "Taste & Smell",
      desc: "Recovery of sensory perception",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="10" width="12" height="4" rx="2" stroke="#43b649" strokeWidth="2" />
          <line x1="9" y1="8" x2="9" y2="16" stroke="#43b649" strokeWidth="2" />
          <line x1="15" y1="8" x2="15" y2="16" stroke="#43b649" strokeWidth="2" />
        </svg>
      ),
      value: "↓83%",
      label: "CO Levels",
      desc: "Reduction in blood carbon monoxide",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#43b649" strokeWidth="2" />
          <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#43b649">O₂</text>
        </svg>
      ),
      value: "+12%",
      label: "Oxygen Levels",
      desc: "Increase in blood oxygen",
    },
  ];

  const handleBack = () => {
    window.location.href = "/elite/dashboard";
  };

  return (
    <div className="elite-home-container">
      <style>{styles}</style>
      <header className="welcome-header">
          <div className="header-left">
            <button className="profile-btn" onClick={() => navigate('/elite/edit-profile')}>
               Elite Member
            </button>
          </div>
        <div className="header-center">
            <div className="logo-section">
              <div className="app-name">
                <h1>NicOff</h1>
                <p>Turn Off Nicotine, Turn On Life!</p>
              </div>
            </div>
          </div>
        <div className="header-right">
          <span className="notification-icon" onClick={handleNotificationClick}>🔔</span>
          <button className="logout-button" onClick={() => navigate('/login')}>Logout</button>
          </div>
        </header>
      <nav className="welcome-nav">
        <ul>
          <li><Link to="/elite/home">Home</Link></li>
          <li><Link to="/elite/dashboard">Dashboard</Link></li>
          <li><Link to="/elite/achievement">Achievement</Link></li>
          <li><Link to="/elite/coach">Coach</Link></li>
          <li><Link to="/elite/community">Community</Link></li>
          <li><Link to="/elite/feedback">Feedback</Link></li>
        </ul>
      </nav>
      <div className="dashboard-bg" style={{ background: `url(${journeyPath}) center/cover no-repeat`, position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#DFF5DE',
          opacity: 0.7,
          zIndex: 0
        }} />
        <div className="dashboard-main" style={{ position: 'relative', zIndex: 1 }}>
          <div className="dashboard-title" style={{ color: '#249325' }}>
            Elite Health Metrics Dashboard
          </div>
          <div className="dashboard-desc" style={{ color: '#888', fontStyle: 'italic' }}>
            "Your health progress at a glance!"
          </div>
          <div className="metrics-grid">
            {metrics.map((m, i) => (
              <div className="dashboard-card" key={i}>
                <div className="dashboard-card-icon">{m.icon}</div>
                <div className="dashboard-card-value">{m.value}</div>
                <div className="dashboard-card-label">{m.label}</div>
                <div className="dashboard-card-desc">{m.desc}</div>
              </div>
            ))}
          </div>
          <button className="back-to-dashboard-btn" onClick={handleBack} style={{ position: 'relative', zIndex: 2 }}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
      <footer className="elite-footer">
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

export default EliteHealthMetric;
