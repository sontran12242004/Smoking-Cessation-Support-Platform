import React, { useState } from 'react';
import EditProfileModal from '../EditProfileModal';

function NotificationCenter() {
    // Placeholder for notifications, to be replaced with database data
    const [notifications] = useState([]);
    const [allRead, setAllRead] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);

    const styles = `
    html, body, #root {
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
    header {
      background-color: #e0f2f7;
      padding: 15px 40px;
      border-bottom: 1px solid #d0e8ef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header-left, .header-right {
      display: flex;
      align-items: center;
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
    .logo-section {
      display: flex;
      align-items: center;
      margin-right: 30px;
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
    .nav-links {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
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
    .nav-links a.active, .nav-links a:hover {
      color: #4CAF50;
      transform: translateY(-2px);
    }
    .header-actions {
      display: flex;
      align-items: center;
    }
    .notification-icon {
      font-size: 24px;
      color: #FBC02D;
      margin-right: 20px;
      cursor: pointer;
    }
    .logout-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
    }
    .main-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 40px 0 0 0;
      background-size: cover;
      background-position: center;
      color: #333;
      text-align: center;
      position: relative;
      overflow: hidden;
      min-height: 100vh;
    }
    .main-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('https://images.unsplash.com/photo-1447752875215-b276168b9f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
      background-size: cover;
      background-position: center;
      filter: blur(5px);
      background-color: rgba(255,255,255,0.6);
      z-index: 0;
    }
    .notification-center-wrapper {
      z-index: 2;
      background: #fff;
      border-radius: 24px;
      box-shadow: 0 12px 32px rgba(56,70,60,0.18);
      padding: 40px 0 40px 0;
      width: 95%;
      max-width: 800px;
      margin: 40px auto 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1);
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .back-btn {
      background: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 22px;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 25px;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
      align-self: flex-start;
      margin-left: 40px;
      box-shadow: 0 2px 8px rgba(56,70,60,0.10);
      animation: popIn 0.7s 0.1s both;
    }
    .back-btn:hover {
      background: #388E3C;
      transform: scale(1.06);
    }
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .notification-title {
      font-size: 36px;
      color: #388E3C;
      font-weight: bold;
      margin-bottom: 30px;
      text-align: center;
      letter-spacing: 1px;
      animation: fadeInUp 0.8s 0.2s both;
    }
    .notification-list {
      background: #fff;
      border-radius: 16px;
      border: 2.5px solid #38463C;
      width: 90%;
      max-width: 700px;
      margin: 0 auto 30px auto;
      padding: 0;
      box-sizing: border-box;
      overflow: hidden;
      box-shadow: 0 4px 18px rgba(56,70,60,0.08);
    }
    .notification-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      padding: 28px 28px 18px 28px;
      border-bottom: 2px solid #E0E0E0;
      background: #fff;
      transition: box-shadow 0.25s, background 0.25s, transform 0.18s;
      position: relative;
      animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .notification-item:hover {
      box-shadow: 0 8px 24px rgba(76,175,80,0.13);
      background: #F6FFF6;
      transform: translateY(-2px) scale(1.01);
    }
    .notification-item:last-child {
      border-bottom: none;
    }
    .notification-icon-badge {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4CAF50 60%, #8BC34A 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      color: #fff;
      margin-right: 18px;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(76,175,80,0.10);
    }
    .notification-content {
      text-align: left;
      flex: 1;
    }
    .notification-title-main {
      font-size: 18px;
      font-weight: bold;
      color: #222;
      margin-bottom: 6px;
      border-left: 4px solid #4CAF50;
      padding-left: 10px;
    }
    .notification-desc {
      font-size: 15px;
      color: #333;
      margin-bottom: 8px;
    }
    .notification-action {
      font-size: 14px;
      color: #4CAF50;
      text-decoration: underline;
      cursor: pointer;
      margin-bottom: 0;
      font-weight: 500;
      display: inline-block;
      transition: color 0.2s, text-shadow 0.2s;
    }
    .notification-action:hover {
      color: #388E3C;
      text-shadow: 0 2px 8px #B2FF59;
    }
    .notification-date {
      font-size: 14px;
      color: #555;
      min-width: 160px;
      text-align: right;
      margin-left: 20px;
      margin-top: 2px;
    }
    .mark-all-row {
      display: flex;
      align-items: center;
      margin: 0 0 0 24px;
      font-size: 18px;
      color: #4CAF50;
      font-weight: bold;
      gap: 10px;
      transition: color 0.2s;
    }
    .mark-all-row input[type='checkbox'] {
      width: 22px;
      height: 22px;
      accent-color: #4CAF50;
      margin-right: 8px;
      transition: box-shadow 0.2s;
    }
    .mark-all-row:hover, .mark-all-row input[type='checkbox']:hover {
      color: #388E3C;
      box-shadow: 0 2px 8px #B2FF59;
    }
    @media (max-width: 900px) {
      .notification-center-wrapper {
        padding: 20px 0 20px 0;
      }
      .notification-list {
        width: 98%;
      }
    }
    @media (max-width: 600px) {
      .notification-center-wrapper {
        padding: 10px 0 10px 0;
      }
      .notification-title {
        font-size: 22px;
      }
      .notification-list {
        width: 100%;
        border-radius: 0;
        border-left: none;
        border-right: none;
      }
      .notification-item {
        flex-direction: column;
        padding: 18px 10px 10px 10px;
      }
      .notification-date {
        margin-left: 0;
        margin-top: 10px;
        text-align: left;
      }
      .back-btn {
        margin-left: 10px;
      }
    }
    .welcome-footer {
        background-color: #38463C;
        color: #fff;
        padding: 40px;
        text-align: center;
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
  `;

    return (
        <div className="container">
            <style>{styles}</style>
            <EditProfileModal open={showEditProfile} onClose={() => setShowEditProfile(false)} onSave={() => setShowEditProfile(false)} />
            {/* Header */}
            <header>
                <div className="header-left">
                    <div className="profile-section">
                        <button className="profile-btn" onClick={() => setShowEditProfile(true)}>
                          <span className="profile-icon">👤</span> Premium Member
                        </button>
                    </div>
                    <div className="logo-section">
                        <span className="logo">LOGO</span>
                        <div className="app-name">
                            <h1>NicOff</h1>
                            <p>Turn Off Nicotine, Turn On Life!</p>
                        </div>
                    </div>
                </div>
                <ul className="nav-links">
                    <li><a href="/premiummemberhome">Home</a></li>
                    <li><a href="/premiummemberdashboard">Dashboard</a></li>
                    <li><a href="/premiumachievement">Achievement</a></li>
                    <li><a href="/premiummembercoach">Coach</a></li>
                    <li><a href="/premiummembercommun">Community</a></li>
                    <li><a href="/feedbackpremium">Feedback</a></li>
                </ul>
                <div className="header-actions">
                    <span className="notification-icon">🔔</span>
                    <button className="logout-button">Logout</button>
                </div>
            </header>
            {/* Main Content */}
            <main className="main-content">
                <div className="notification-center-wrapper">
                    <button className="back-btn">← Back To Home</button>
                    <div className="notification-title">Notification Center</div>
                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#888', fontSize: '18px' }}>No notifications yet.</div>
                        ) : (
                            notifications.map((noti, idx) => (
                                <div className="notification-item" key={idx}>
                                    <div className="notification-icon-badge">🔔</div>
                                    <div className="notification-content">
                                        <div className="notification-title-main">{noti.title}</div>
                                        <div className="notification-desc">{noti.desc}</div>
                                        <span className="notification-action">Mark as read</span>
                                    </div>
                                    <div className="notification-date">{noti.date}</div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="mark-all-row">
                        <input type="checkbox" checked={allRead} onChange={() => setAllRead(!allRead)} />
                        <span>Mark all as read</span>
                    </div>
                </div>
            </main>
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

export default NotificationCenter; 