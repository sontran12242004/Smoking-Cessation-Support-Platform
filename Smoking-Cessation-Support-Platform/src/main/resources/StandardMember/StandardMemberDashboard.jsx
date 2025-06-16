import React, { useState } from 'react';
import EditProfileModal from '../EditProfileModal';
import { useNavigate } from 'react-router-dom';

function StandardMemberDashboard({
  daysSmokeFree = '--',
  daysToNext = '--',
  moneySaved = '--',
  healthImproved = '--',
  lungsCapacity = '--',
  heartRate = '--',
}) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate('/notificationcenter');
  };

  const styles = `
    body, html, #root {
      background: #f0f2f5;
      justify-content: center;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
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
      margin-right: 18px;
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
    .header-right {
      margin-left: 20px;
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
    .dashboard-notification-icon {
      font-size: 28px;
      color: #ffb300;
      background: #fff;
      border-radius: 50%;
      padding: 8px;
      margin-right: 16px;
      box-shadow: 0 2px 8px rgba(255, 193, 7, 0.08);
      transition: background 0.2s, color 0.2s, transform 0.18s, box-shadow 0.18s;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dashboard-notification-icon:hover {
      background: #fffbe7;
      color: #ff9800;
      transform: scale(1.12) rotate(-8deg);
      box-shadow: 0 4px 16px rgba(255, 193, 7, 0.18);
    }
    .dashboard-logout-btn {
      background: linear-gradient(90deg, #4CAF50 60%, #43b649 100%);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 28px;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
      margin-left: 8px;
      box-shadow: 0 2px 8px rgba(76,175,80,0.10);
      transition: background 0.2s, transform 0.15s, box-shadow 0.18s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dashboard-logout-btn:hover {
      background: linear-gradient(90deg, #388E3C 60%, #43b649 100%);
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 16px rgba(76,175,80,0.18);
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
      font-size: 2.5rem;
      font-weight: bold;
      color: #222;
      margin-bottom: 8px;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px rgba(76,175,80,0.08);
    }
    .dashboard-welcome-title .highlight {
      color: #4CAF50;
      text-shadow: 0 2px 8px #B2FF59;
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
      background: rgba(255,255,255,0.92);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(56,70,60,0.13), 0 1.5px 0 #4CAF50 inset;
      padding: 38px 34px 30px 34px;
      min-width: 260px;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      flex: 1 1 260px;
      max-width: 340px;
      border-top: 6px solid #4CAF50;
      margin-bottom: 0;
      transition: box-shadow 0.22s, transform 0.18s, background 0.18s;
      overflow: hidden;
    }
    .dashboard-card:hover {
      box-shadow: 0 16px 40px rgba(76,175,80,0.18), 0 1.5px 0 #4CAF50 inset;
      background: rgba(255,255,255,0.98);
      transform: translateY(-6px) scale(1.035);
    }
    .dashboard-card-icon {
      font-size: 54px;
      margin-bottom: 18px;
      color: #4CAF50;
      filter: drop-shadow(0 2px 8px #B2FF59);
      transition: filter 0.2s;
    }
    .dashboard-card:hover .dashboard-card-icon {
      filter: drop-shadow(0 4px 16px #B2FF59);
    }
    .dashboard-card-value {
      font-size: 2.7rem;
      color: #4CAF50;
      font-weight: bold;
      margin-bottom: 6px;
      text-align: center;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px #B2FF59;
    }
    .dashboard-card-label {
      font-size: 1.15rem;
      color: #333;
      margin-bottom: 8px;
      font-weight: 600;
      text-align: center;
      letter-spacing: 0.5px;
    }
    .dashboard-card-desc {
      font-size: 1.01rem;
      color: #888;
      margin-top: 8px;
      text-align: center;
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
      background: rgba(255,255,255,0.93);
      border-radius: 16px;
      box-shadow: 0 4px 18px rgba(56,70,60,0.10);
      padding: 26px 30px 18px 30px;
      min-width: 320px;
      min-height: 80px;
      display: flex;
      align-items: center;
      gap: 18px;
      position: relative;
      flex: 1 1 320px;
      max-width: 480px;
      margin-bottom: 0;
      transition: box-shadow 0.18s, background 0.18s, transform 0.15s;
    }
    .dashboard-card-small:hover {
      box-shadow: 0 10px 28px rgba(76,175,80,0.13);
      background: rgba(255,255,255,0.99);
      transform: translateY(-3px) scale(1.02);
    }
    .dashboard-card-small-icon {
      font-size: 36px;
      color: #4CAF50;
      margin-right: 10px;
      filter: drop-shadow(0 2px 8px #B2FF59);
      transition: filter 0.2s;
    }
    .dashboard-card-small:hover .dashboard-card-small-icon {
      filter: drop-shadow(0 4px 16px #B2FF59);
    }
    .dashboard-card-small-content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .dashboard-card-small-label {
      font-size: 1.13rem;
      color: #388E3C;
      font-weight: 700;
      margin-bottom: 2px;
      letter-spacing: 0.5px;
    }
    .dashboard-card-small-value {
      font-size: 1.6rem;
      color: #4CAF50;
      font-weight: bold;
      margin-bottom: 2px;
      text-shadow: 0 2px 8px #B2FF59;
    }
    .dashboard-card-small-desc {
      font-size: 1.01rem;
      color: #888;
      margin-top: 2px;
    }
    .dashboard-explore-btn {
      background: linear-gradient(90deg, #4CAF50 60%, #8BC34A 100%);
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
      letter-spacing: 1px;
    }
    .dashboard-explore-btn:hover {
      background: linear-gradient(90deg, #388E3C 60%, #8BC34A 100%);
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 8px 24px rgba(76,175,80,0.18);
    }
    @media (max-width: 1100px) {
      .dashboard-main { max-width: 98vw; }
      .dashboard-cards-row, .dashboard-cards-row-small { flex-direction: column; align-items: center; gap: 24px; }
      .dashboard-card, .dashboard-card-small { max-width: 95vw; }
    }
    header {
      width: 100vw;
      max-width: 100vw;
      background-color: #e0f2f7;
      padding: 15px 0;
      border-bottom: 1px solid #d0e8ef;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      box-sizing: border-box;
      position: relative;
      left: 50%;
      right: 50%;
      transform: translateX(-50%);
    }

    .header-left,
    .header-right {
      display: flex;
      align-items: center;
      margin-left: 20px;
      margin-right: 20px;
    }

    .header-action {
      margin-left: 20px;
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    .logo-section {
      display: flex;
      align-items: center;
      margin-right: 30px;
    }

    .nav-links {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex: 1;
      justify-content: center;
      min-width: 0;
    }

    .nav-links li {
      margin-left: 30px;
    }

    .nav-links a {
      text-decoration: none;
      color: #555;
      font-weight: bold;
      transition: color 0.3s ease, transform 0.2s ease;
    }

    .nav-links a.active,
    .nav-links a:hover {
      color: #4CAF50;
      transform: translateY(-2px);
    }

    .profile-section {
      display: flex;
      align-items: center;
      margin-right: 20px;
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

    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-right: 10px;
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
      color: #388E3C;
      font-weight: bold;
      margin-bottom: 30px;
      text-align: center;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px #B2FF59;
    }
    .analytics-cards-row {
      display: flex;
      gap: 48px;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      max-width: 950px;
      margin: 0 auto;
      flex-wrap: wrap;
    }
    .analytics-card {
      background: linear-gradient(180deg, #fff 80%, #e0e0e0 100%);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(56,70,60,0.13), 0 1.5px 0 #4CAF50 inset;
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
      text-shadow: 0 2px 8px #B2FF59;
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
    @media (max-width: 900px) {
      .analytics-cards-row {
        flex-direction: column;
        align-items: center;
        gap: 32px;
      }
      .analytics-card {
        min-width: 260px;
        max-width: 98vw;
      }
    }
    .welcome-footer {
      background-color: #38463C;
      color: #fff;
      padding: 40px;
      text-align: center;
      flex-shrink: 0;
    }
    .footer-content {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 30px;
      margin-bottom: 30px;
      text-align: left;
    }
    .footer-section {
      flex: 1;
      min-width: 200px;
    }
    .footer-section h3 {
      font-size: 20px;
      margin-bottom: 15px;
      color: #8BC34A;
    }
    .footer-section p,
    .footer-section ul {
      font-size: 14px;
      line-height: 1.6;
      color: #eee;
    }
    .footer-section ul {
      list-style: none;
      padding: 0;
    }
    .footer-section ul li {
      margin-bottom: 8px;
    }
    .footer-section ul li a {
      text-decoration: none;
      color: #B2FF59;
      transition: color 0.3s ease;
    }
    .footer-section ul li a:hover {
      color: #fff;
    }
    .newsletter input[type="email"] {
      width: calc(100% - 20px);
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #555;
      background-color: #444;
      color: #fff;
      border-radius: 5px;
    }
    .newsletter button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .newsletter button:hover {
      background-color: #45a049;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .copyright {
      border-top: 1px solid #555;
      padding-top: 20px;
      font-size: 14px;
      color: #aaa;
    }
    @media (max-width: 1024px) {
      .footer-content {
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
      .footer-section {
        min-width: unset;
        width: 90%;
      }
      .newsletter input[type="email"] {
        width: 80%;
      }
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

    .header-center .logo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .header-center .app-name {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
  `;
  const handleHealthMetric = () => {
    window.location.href = '/healthmetric';
  };

  const handlePackage = () => {
    window.location.href = '/upgradepackage1';
  };

  return (
    <div className="dashboard-bg">
      <style>{styles}</style>
      <EditProfileModal open={showEditProfile} onClose={() => setShowEditProfile(false)} onSave={() => setShowEditProfile(false)} />
      {/* Header */}
      <header className="welcome-header">
        <div className="header-left">
          <div className="profile-status">
            <button className="profile-btn" onClick={() => setShowEditProfile(true)}>
              <span className="profile-icon">👤</span> Standard Member
            </button>
          </div>
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
          <i className="notification-icon" onClick={handleNotificationClick}>🔔</i>
          <button className="logout-button">Logout</button>
        </div>
      </header>
      {/* Navigation */}
      <nav className="welcome-nav">
        <ul>
          <li><a href="/standardmemberhome">Home</a></li>
          <li><a href="/standardmemberdashboard" className="active">Dashboard</a></li>
          <li><a href="#">Achievement</a></li>
          <li><a href="/standardmembercoach">Coach</a></li>
          <li><a href="/standardmembercommun">Community</a></li>
          <li><a href="/feedback">Feedback</a></li>
        </ul>
      </nav>
      <div className="dashboard-main">
        <div className="dashboard-welcome">
          <div className="dashboard-welcome-title">Welcome back, <span className="highlight">John!</span> 👋</div>
          <div className="dashboard-welcome-quote">"Every cigarette not smoked is a victory. Be proud of your progress!"</div>
        </div>
        <div className="dashboard-cards-row">
          <div className="dashboard-card">
            <span className="dashboard-card-icon">📅</span>
            <div className="dashboard-card-value">{daysSmokeFree}</div>
            <div className="dashboard-card-label">Days Smoke-Free</div>
            <div className="dashboard-card-desc">{daysToNext} days until next milestone</div>
          </div>
          <div className="dashboard-card">
            <span className="dashboard-card-icon">��</span>
            <div className="dashboard-card-value">${moneySaved}</div>
            <div className="dashboard-card-label">Money Saved</div>
            <div className="dashboard-card-desc">Based on 10 cigarettes/day</div>
          </div>
          <div className="dashboard-card">
            <span className="dashboard-card-icon">💚</span>
            <div className="dashboard-card-value">{healthImproved}%</div>
            <div className="dashboard-card-label">Health Improved</div>
            <div className="dashboard-card-desc">Lung function recovery</div>
          </div>
        </div>
        <div className="dashboard-cards-row-small">
          <div className="dashboard-card-small">
            <span className="dashboard-card-small-icon">🫁</span>
            <div className="dashboard-card-small-content">
              <div className="dashboard-card-small-label">Lungs Capacity</div>
              <div className="dashboard-card-small-value">+{lungsCapacity}%</div>
              <div className="dashboard-card-small-desc">Your lung capacity has improved significantly since quitting.</div>
            </div>
          </div>
          <div className="dashboard-card-small">
            <span className="dashboard-card-small-icon">💓</span>
            <div className="dashboard-card-small-content">
              <div className="dashboard-card-small-label">Heart Rate</div>
              <div className="dashboard-card-small-value">{heartRate} bpm</div>
              <div className="dashboard-card-small-desc">Resting heart rate has decreased to healthier levels.</div>
            </div>
          </div>
        </div>
        <button className="dashboard-explore-btn" onClick={handleHealthMetric}>
          Explore more →
        </button>
      </div>
      {/* Analytics Section */}
      <section className="analytics-section">
        <h2 className="analytics-title">Analytics</h2>
        <div className="analytics-cards-row">
          <div className="analytics-card">
            <h3 className="analytics-card-title">Health Improvement Rate</h3>
            <div className="analytics-card-content">
              <div className="analytics-sad-face">:(</div>
              <div className="analytics-locked-message">
                We're sorry, but this feature is not available for your account!
              </div>
              <div className="analytics-upgrade-text">Upgrade To See This Feature</div>
              <button className="analytics-upgrade-btn" onClick={handlePackage}>Upgrade</button>
            </div>
          </div>
          <div className="analytics-card">
            <h3 className="analytics-card-title">Success Rate</h3>
            <div className="analytics-card-content">
              <div className="analytics-sad-face">:(</div>
              <div className="analytics-locked-message">
                We're sorry, but this feature is not available for your account!
              </div>
              <div className="analytics-upgrade-text">Upgrade To See This Feature</div>
              <button className="analytics-upgrade-btn" onClick={handlePackage}>Upgrade</button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="welcome-footer">
        <div className="footer-content">
          <div className="footer-section about-nic-off">
            <h3>NicOff</h3>
            <p>
              We're dedicated to helping you break<br />
              free from smoking addiction through<br />
              science-backed methods and<br />
              community support
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/ourprograms">Our Programs</a></li>
              <li><a href="/successstories">Success Stories</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/helpcenter">Help Center</a></li>
              <li><a href="/privacypolicy">Privacy Policy</a></li>
              <li><a href="/termsofservice">Term Of Service</a></li>
              <li><a href="/cookiepolicy">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="footer-section newsletter">
            <h3>NewsLetter</h3>
            <input type="email" placeholder="Your Email Address..." />
            <button>Subscribe</button>
            <p>
              Get the latest tips and<br />
              motivation to stay smoke-free<br />
              delivered to your inbox
            </p>
          </div>
        </div>
        <div className="copyright">
          © 2025 NicOff. All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default StandardMemberDashboard; 