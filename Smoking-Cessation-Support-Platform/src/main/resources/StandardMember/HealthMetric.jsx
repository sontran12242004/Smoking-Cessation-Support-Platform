import React from 'react';

function HealthMetric() {
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
      background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .dashboard-bg-overlay {
      position: absolute;
      top: 100px; /* chiều cao header */
      left: 0;
      width: 100%;
      height: calc(100% - 100px);
      background: #fff;
      opacity: 0.6;
      z-index: 1;
      pointer-events: none;
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
      position: relative;
      z-index: 2;
    }
    .dashboard-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: bold;
      color: #222;
      margin-bottom: 8px;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px rgba(76,175,80,0.08);
    }
    .dashboard-title .highlight {
      color: #4CAF50;
      text-shadow: 0 2px 8px #B2FF59;
    }
    .dashboard-desc {
      font-size: 1.15rem;
      color: #388E3C;
      margin-bottom: 30px;
      font-style: italic;
      text-shadow: 0 1px 6px rgba(255,255,255,0.5);
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      width: 100%;
      justify-items: center;
      margin-bottom: 32px;
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
      max-width: 340px;
      border-top: 6px solid #4CAF50;
      margin-bottom: 0;
      transition: box-shadow 0.22s, transform 0.18s, background 0.18s;
      overflow: hidden;
    }
    .dashboard-card-icon {
      font-size: 54px;
      margin-bottom: 18px;
      color: #4CAF50;
      filter: drop-shadow(0 2px 8px #B2FF59);
      transition: filter 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dashboard-card-value {
      font-size: 2.2rem;
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
    .back-to-dashboard-btn {
      display: block;
      margin: 40px auto 40px auto;
      background: linear-gradient(90deg, rgb(43, 232, 55) 60%, #1ecbe1 100%);
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 18px 54px;
      font-size: 1.35rem;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(76,175,80,0.13);
      letter-spacing: 1px;
      transition: background 0.2s, transform 0.15s, box-shadow 0.18s;
    }
    .back-to-dashboard-btn:hover {
      background: linear-gradient(90deg, #1ecbe1 60%, rgb(43, 232, 55) 100%);
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 8px 24px rgba(76,175,80,0.18);
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
      color:rgb(43, 232, 55);
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
      color:rgb(255, 255, 255);
      transition: color 0.3s ease;
    }
    .footer-section ul li a:hover {
      color:rgb(43, 232, 55);
    }
    @media (max-width: 1100px) {
      .dashboard-main { max-width: 98vw; }
      .metrics-grid { grid-template-columns: 1fr; gap: 24px; }
      .dashboard-card { max-width: 95vw; }
      .dashboard-bg-overlay { top: 120px; height: calc(100% - 120px); }
    }
    header {
      width: 100vw;
      max-width: 100vw;
      height: 100px;
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
      margin: 0 0 0 40px;
    }
    .header-actions {
      margin: 40px;
      font-size: 24px;
      color: #4CAF50;
    }
    .logo-section {
      font-size: 10px;
      color: #4CAF50;
      display: flex;
      align-items: center;
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
      color: #4CAF50;
      font-weight: 500;
      font-size: 16px;
      padding: 5px 0;
      position: relative;
      transition: color 0.3s;
      opacity: 1;
    }
    .welcome-nav a::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 3px;
      background: #4CAF50;
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

    const metrics = [
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="4" stroke="#43b649" strokeWidth="2" /><path d="M8 2v4M16 2v4" stroke="#43b649" strokeWidth="2" /><rect x="7" y="10" width="4" height="4" rx="1" fill="#43b649" /><rect x="13" y="10" width="4" height="4" rx="1" fill="#43b649" /></svg>
            ),
            value: '14',
            label: 'Days Smoke-Free',
            desc: '19 days until next milestone',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" stroke="#43b649" strokeWidth="2" /><path d="M8 15h8M12 7v8" stroke="#43b649" strokeWidth="2" /></svg>
            ),
            value: '$155',
            label: 'Money Saved',
            desc: 'Based on 10 cigarettes/day',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" stroke="#43b649" strokeWidth="2" /><path d="M12 7v6l4 2" stroke="#43b649" strokeWidth="2" /></svg>
            ),
            value: '38.5%',
            label: 'Health Improved',
            desc: 'Lung function recovery',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" stroke="#43b649" strokeWidth="2" /><path d="M12 8v5l3 3" stroke="#43b649" strokeWidth="2" /><path d="M8 12h8" stroke="#43b649" strokeWidth="2" /></svg>
            ),
            value: '↓24%',
            label: 'Heart Attack Risk',
            desc: 'Reduction in heart attack probability',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="10" stroke="#43b649" strokeWidth="2" /><ellipse cx="12" cy="12" rx="5" ry="8" stroke="#43b649" strokeWidth="2" /></svg>
            ),
            value: '↓31%',
            label: 'Lung Cancer Risk',
            desc: 'Decreased risk of lung cancer',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" stroke="#43b649" strokeWidth="2" /><path d="M12 8v5l3 3" stroke="#43b649" strokeWidth="2" /><path d="M8 12h8" stroke="#43b649" strokeWidth="2" /></svg>
            ),
            value: '↓27%',
            label: 'Heart Disease Risk',
            desc: 'Reduction in cardiovascular risk',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#43b649" strokeWidth="2" /><path d="M12 8v8" stroke="#43b649" strokeWidth="2" /><path d="M8 12h8" stroke="#43b649" strokeWidth="2" /></svg>
            ),
            value: '+22%',
            label: 'Immune Function',
            desc: 'Improved immunity and lung function',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="6" stroke="#222" strokeWidth="2" /><path d="M9 15c.5-1 1.5-1 2-1s1.5 0 2 1" stroke="#222" strokeWidth="2" /></svg>
            ),
            value: '+19%',
            label: 'Teeth Whitening',
            desc: 'Reduction in tobacco staining',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M17 10c1.104 0 2 .896 2 2s-.896 2-2 2H7c-1.104 0-2-.896-2-2s.896-2 2-2h10z" stroke="#43b649" strokeWidth="2" /><path d="M9 14v2a2 2 0 002 2h2a2 2 0 002-2v-2" stroke="#222" strokeWidth="2" /></svg>
            ),
            value: '+38.5%',
            label: 'Breath Freshness',
            desc: 'Improvement in breath odor',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#43b649" strokeWidth="2" /><path d="M8 15c1.5-2 6.5-2 8 0" stroke="#43b649" strokeWidth="2" /><circle cx="12" cy="12" r="3" stroke="#43b649" strokeWidth="2" /></svg>
            ),
            value: '+45%',
            label: 'Taste & Smell',
            desc: 'Recovery of sensory perception',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><rect x="6" y="10" width="12" height="4" rx="2" stroke="#43b649" strokeWidth="2" /><line x1="9" y1="8" x2="9" y2="16" stroke="#43b649" strokeWidth="2" /><line x1="15" y1="8" x2="15" y2="16" stroke="#43b649" strokeWidth="2" /></svg>
            ),
            value: '↓83%',
            label: 'CO Levels',
            desc: 'Reduction in blood carbon monoxide',
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#43b649" strokeWidth="2" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#43b649">O₂</text></svg>
            ),
            value: '+12%',
            label: 'Oxygen Levels',
            desc: 'Increase in blood oxygen',
        },
    ];

    const handleBack = () => {
        window.location.href = '/standardmemberdashboard';
    };

    return (
        <>
            <style>{styles}</style>
            <div className="dashboard-bg">
                <header className="welcome-header">
                    <div className="header-left">
                        <div className="profile-status">
                            <button className="profile-btn">
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
                        <span className="notification-icon">🔔</span>
                        <button className="logout-button">Logout</button>
                    </div>
                </header>
                <nav className="welcome-nav">
                    <ul>
                        <li><a href="/standardmemberhome">Home</a></li>
                        <li><a href="/standardmemberdashboard">Dashboard</a></li>
                        <li><a href="/standardachievement">Achievement</a></li>
                        <li><a href="/standardmembercoach">Coach</a></li>
                        <li><a href="/standardmembercommun">Community</a></li>
                        <li><a href="/feedback">Feedback</a></li>
                    </ul>
                </nav>
                <div className="dashboard-bg-overlay"></div>
                <div className="dashboard-main">
                    <div className="dashboard-title">Health Metrics <span className="highlight">Dashboard</span></div>
                    <div className="dashboard-desc">"Your health progress at a glance!"</div>
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
                </div>
            </div>
            <button className="back-to-dashboard-btn" onClick={handleBack}>
                ← Back to Dashboard
            </button>
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
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Our Programs</a></li>
                            <li><a href="#">Success Stories</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Term Of Service</a></li>
                            <li><a href="#">Cookie Policy</a></li>
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
        </>
    );
}

export default HealthMetric; 