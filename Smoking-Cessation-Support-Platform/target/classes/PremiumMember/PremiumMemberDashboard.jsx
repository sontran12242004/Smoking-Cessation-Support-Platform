import React, { useState } from "react";
import EditProfileModal from "../EditProfileModal";
import { useNavigate } from "react-router-dom";
function StandardMemberDashboard({
  daysSmokeFree = "--",
  daysToNext = "--",
  moneySaved = "--",
  healthImproved = "--",
  lungsCapacity = "--",
  heartRate = "--",
}) {
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
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
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
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
    }
    .dashboard-card-description {
      font-size: 14px;
      color: #666;
      margin: 0;
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
    @media (max-width: 768px) {
      .analytics-grid {
        grid-template-columns: 1fr;
      }
      .analytics-card {
        padding: 20px;
      }
      .analytics-card-value {
        font-size: 28px;
      }
      .analytics-title {
        font-size: 20px;
      }
      .analytics-subtitle {
        font-size: 14px;
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
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .card-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
    .card-subtitle {
      font-size: 14px;
      color: #666;
      margin: 4px 0 0 0;
    }
    .card-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .metric-card {
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .metric-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .metric-value {
      font-size: 24px;
      font-weight: 600;
      color: #4CAF50;
      margin: 0;
    }
    .metric-label {
      font-size: 14px;
      color: #666;
      margin: 4px 0 0 0;
    }
    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 8px;
    }
    .progress-fill {
      height: 100%;
      background: #4CAF50;
      border-radius: 4px;
      transition: width 0.3s ease;
    }
    .action-button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .action-button:hover {
      background-color: #388E3C;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .secondary-button {
      background-color: #fff;
      color: #4CAF50;
      border: 1px solid #4CAF50;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .secondary-button:hover {
      background-color: #f5f5f5;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .chart-container {
      width: 100%;
      height: 300px;
      margin-top: 20px;
    }
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
    .list-item:last-child {
      border-bottom: none;
    }
    .list-item-title {
      font-size: 14px;
      color: #333;
      margin: 0;
    }
    .list-item-value {
      font-size: 14px;
      color: #4CAF50;
      font-weight: 500;
      margin: 0;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .status-badge.success {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .status-badge.warning {
      background-color: #fff3e0;
      color: #ef6c00;
    }
    .status-badge.info {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    @media (max-width: 768px) {
      .metric-grid {
        grid-template-columns: 1fr;
      }
      .dashboard-card, .dashboard-card-small {
        padding: 16px;
      }
      .card-title {
        font-size: 18px;
      }
      .metric-value {
        font-size: 20px;
      }
    }
  `;
  const handleHealthMetric = () => {
    window.location.href = "/premiumhealthmetric";
  };

  const handlePackage = () => {
    window.location.href = "/upgradepackage2";
  };
  const handleNotificationClick = () => {
    navigate("/premiumnotificationcenter");
  };
  return (
    <div className="dashboard-bg">
      <style>{styles}</style>
      <EditProfileModal
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={() => setShowEditProfile(false)}
      />
      <div className="welcome-header">
        <div className="header-left">
          <div className="profile-section">
            <button
              className="profile-btn"
              onClick={() => setShowEditProfile(true)}
            >
              <span className="profile-icon">👤</span> Premium Member
            </button>
          </div>
        </div>
        <div className="header-center">
          <div className="app-name">
            <h1>NicOff</h1>
            <p>Turn Off Nicotine, Turn On Life!</p>
          </div>
        </div>
        <div className="header-right">
          <span className="notification-icon" onClick={handleNotificationClick}>
            🔔
          </span>
          <button className="logout-button">Logout</button>
        </div>
      </div>
      <nav className="welcome-nav">
        <ul>
          <li>
            <a href="/premiummemberhome">Home</a>
          </li>
          <li>
            <a href="/premiummemberdashboard" className="active">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#">Achievement</a>
          </li>
          <li>
            <a href="/premiummembercoach">Coach</a>
          </li>
          <li>
            <a href="/premiummembercommun">Community</a>
          </li>
          <li>
            <a href="/feedbackpremium">Feedback</a>
          </li>
        </ul>
      </nav>
      <div className="dashboard-main">
        <div className="dashboard-welcome">
          <div className="dashboard-welcome-title">
            Welcome back, <span className="highlight">John!</span> 👋
          </div>
          <div className="dashboard-welcome-quote">
            "Every cigarette not smoked is a victory. Be proud of your
            progress!"
          </div>
        </div>
        <div className="dashboard-cards-row">
          <div className="dashboard-card">
            <span className="dashboard-card-icon">📅</span>
            <div className="dashboard-card-value">{daysSmokeFree}</div>
            <div className="dashboard-card-label">Days Smoke-Free</div>
            <div className="dashboard-card-desc">
              {daysToNext} days until next milestone
            </div>
          </div>
          <div className="dashboard-card">
            <span className="dashboard-card-icon">💵</span>
            <div className="dashboard-card-value">${moneySaved}</div>
            <div className="dashboard-card-label">Money Saved</div>
            <div className="dashboard-card-desc">
              Based on 10 cigarettes/day
            </div>
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
              <div className="dashboard-card-small-title">Lungs Capacity</div>
              <div className="dashboard-card-small-value">
                +{lungsCapacity}%
              </div>
              <div className="dashboard-card-small-description">
                Your lung capacity has improved significantly since quitting.
              </div>
            </div>
          </div>
          <div className="dashboard-card-small">
            <span className="dashboard-card-small-icon">💓</span>
            <div className="dashboard-card-small-content">
              <div className="dashboard-card-small-title">Heart Rate</div>
              <div className="dashboard-card-small-value">{heartRate} bpm</div>
              <div className="dashboard-card-small-description">
                Resting heart rate has decreased to healthier levels.
              </div>
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
              <div className="analytics-upgrade-text">
                Upgrade To See This Feature
              </div>
              <button className="analytics-upgrade-btn" onClick={handlePackage}>
                Upgrade
              </button>
            </div>
          </div>
          <div className="analytics-card">
            <h3 className="analytics-card-title">Success Rate</h3>
            <div className="analytics-card-content">
              <div className="analytics-sad-face">:(</div>
              <div className="analytics-locked-message">
                We're sorry, but this feature is not available for your account!
              </div>
              <div className="analytics-upgrade-text">
                Upgrade To See This Feature
              </div>
              <button className="analytics-upgrade-btn" onClick={handlePackage}>
                Upgrade
              </button>
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
              We're dedicated to helping you break
              <br />
              free from smoking addiction through
              <br />
              science-backed methods and
              <br />
              community support
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/about">Our Programs</a>
              </li>
              <li>
                <a href="/ourprograms">Our Programs</a>
              </li>
              <li>
                <a href="/successstories">Success Stories</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/helpcenter">Help Center</a>
              </li>
              <li>
                <a href="/privacypolicy">Privacy Policy</a>
              </li>
              <li>
                <a href="/termsofservice">Term Of Service</a>
              </li>
              <li>
                <a href="/cookiepolicy">Cookie Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-section newsletter">
            <h3>NewsLetter</h3>
            <input type="email" placeholder="Your Email Address..." />
            <button>Subscribe</button>
            <p>
              Get the latest tips and
              <br />
              motivation to stay smoke-free
              <br />
              delivered to your inbox
            </p>
          </div>
        </div>
        <div className="copyright">© 2025 NicOff. All rights reserved</div>
      </footer>
    </div>
  );
}

export default StandardMemberDashboard;
