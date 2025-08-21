import React, { useState } from "react";
import EditProfileModal from "../editprofilemodal";
import { useNavigate, Link } from "react-router-dom";
import journeyPath from '../assets/journey_path.jpg';

function EliteCommunity() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();
  // Dữ liệu mẫu cho thảo luận
  const discussions = [
    {
      id: 1,
      user: {
        name: "JaneLegend",
        badge: "Most Liked Discussion",
        initials: "JL",
        info: "3 months smoke-free",
      },
      content:
        "After 10 years of smoking, I finally quit cold turkey! The first week was hell but using the breathing techniques from the Nicoff app saved me during cravings. Anyone else trying this method?",
      likes: 248,
      replies: 37,
      children: [],
      share: true,
    },
    {
      id: 2,
      user: { name: "MikeSmoker", initials: "MS", info: "1 week smoke-free" },
      content:
        "How do you deal with smoking triggers at parties? All my friends smoke and it's so hard to resist when I'm drinking.",
      likes: 56,
      replies: 12,
      children: [
        {
          id: 21,
          user: {
            name: "QuittingTom",
            initials: "QT",
            info: "2 months smoke-free",
          },
          content:
            "I bring nicotine gum and excuse myself when they smoke. After 15 minutes the craving passes! You got this 💪",
          likes: 23,
        },
      ],
      share: true,
    },
    {
      id: 3,
      user: { name: "NewbieFred", initials: "NF", info: "New member" },
      content:
        "Day 3 and the headaches are killing me. Is this normal? How long until withdrawal symptoms stop?",
      likes: 38,
      replies: 8,
      children: [],
      share: false,
    },
  ];

  const handleNotificationClick = () => {
    navigate('/elite/notification');
  };

  const styles = `
    html, body, #root {
      width: 100%;
      height: 100%;
      margin: 0;
      font-family: Arial, sans-serif;
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background-color: #f0f2f5;
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
    .profile-section {
      display: flex;
      align-items: center;
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
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      transform: translateX(-50%);
      box-sizing: border-box;
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
    .community-bg {
      min-height: 100vh;
      width: 100vw;
      background: url('https://images.unsplash.com/photo-1447752875215-b276168b9f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80') center/cover no-repeat, linear-gradient(120deg, #e0f7fa 60%, #f0f2f5 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0;
      animation: fadeInBg 1.2s;
      font-family: Arial, sans-serif;
    }
    @keyframes fadeInBg {
      from { filter: blur(8px); opacity: 0.5; }
      to { filter: blur(0); opacity: 1; }
    }
    .community-card {
      background: #fff;
      border-radius: 22px;
      box-shadow: 0 8px 32px rgba(56,70,60,0.13);
      padding: 48px 36px 36px 36px;
      max-width: 950px;
      width: 97vw;
      margin: 48px auto 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .community-title {
      font-size: 2.2rem;
      font-weight: bold;
      color: #388E3C;
      margin-bottom: 32px;
      text-align: center;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px #B2FF5922;
      animation: fadeInDown 0.7s;
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .discussion-top-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 32px;
      gap: 18px;
      animation: fadeInUp 0.7s;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .discussion-new-btn {
      background: linear-gradient(90deg, #4CAF50 80%, #8BC34A 100%);
      color: #fff;
      border: 2px solid #fff;
      border-radius: 14px;
      padding: 16px 38px;
      font-size: 1.25rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s, color 0.2s, border 0.2s, transform 0.18s;
      box-shadow: 0 2px 12px rgba(76,175,80,0.10);
      outline: none;
      z-index: 2;
      text-shadow: 0 1px 0 #388E3C22;
      margin-bottom: 0;
      align-self: center;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .discussion-new-btn:hover {
      background: linear-gradient(90deg, #fff 80%, #e8f5e9 100%);
      color: #4CAF50;
      border: 2px solid #4CAF50;
      box-shadow: 0 4px 18px rgba(76,175,80,0.18);
      transform: translateY(-2px) scale(1.04);
    }
    .discussion-form-box {
      background: #fff;
      border: 2px solid #b2dfdb;
      border-radius: 14px;
      box-shadow: 0 2px 12px rgba(56,70,60,0.10);
      padding: 22px 18px 16px 18px;
      margin-bottom: 0;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      max-width: 420px;
      text-align: left;
      position: relative;
      align-self: center;
      animation: popIn 0.4s;
    }
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }
    .discussion-form-title {
      font-weight: bold;
      color: #388E3C;
      margin-bottom: 10px;
      font-size: 1.18rem;
    }
    .discussion-form-textarea {
      width: 90%;
      min-height: 80px;
      border-radius: 10px;
      border: 1.5px solid #B2DFDB;
      padding: 15px;
      font-size: 1.05rem;
      margin-bottom: 14px;
      resize: vertical;
      background: #f9f9f9;
      transition: border 0.2s;
    }
    .discussion-form-textarea:focus {
      border: 1.5px solid #388E3C;
      outline: none;
    }
    .discussion-form-btn {
      background: linear-gradient(90deg, #4CAF50 80%, #8BC34A 100%);
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 12px 28px;
      font-size: 1.08rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s, transform 0.18s;
      float: right;
      box-shadow: 0 2px 8px #4caf5011;
    }
    .discussion-form-btn:hover {
      background: #388E3C;
      transform: translateY(-2px) scale(1.04);
    }
    .discussion-list {
      width: 100%;
      margin-bottom: 32px;
    }
    .discussion-item {
      background: linear-gradient(120deg, #f9f9f9 80%, #e8f5e9 100%);
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(56,70,60,0.10);
      padding: 26px 28px 20px 28px;
      margin-bottom: 22px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      border: 1.5px solid #e0e8e0;
      transition: box-shadow 0.18s, transform 0.18s;
      animation: fadeInUp 0.7s;
    }
    .discussion-item:hover {
      box-shadow: 0 8px 32px #8bc34a33;
      transform: translateY(-2px) scale(1.01);
    }
    .discussion-badge {
      background: #FFEB3B;
      color: #388E3C;
      font-weight: bold;
      font-size: 14px;
      border-radius: 8px;
      padding: 4px 14px;
      margin-bottom: 10px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 1px 4px #f9e79f44;
    }
    .discussion-badge .badge-icon {
      font-size: 1.1em;
      margin-right: 2px;
    }
    .discussion-user {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
    }
    .discussion-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, #8BC34A 60%, #43b649 100%);
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 14px;
      box-shadow: 0 2px 8px #8bc34a22;
      border: 2.5px solid #fff;
      transition: box-shadow 0.18s;
    }
    .discussion-item:hover .discussion-avatar {
      box-shadow: 0 4px 16px #8bc34a55;
    }
    .discussion-username {
      font-weight: bold;
      color: #388E3C;
      font-size: 1.08rem;
      letter-spacing: 0.2px;
    }
    .discussion-userdesc {
      color: #888;
      font-size: 1rem;
    }
    .discussion-content {
      font-size: 1.13rem;
      color: #222;
      margin-bottom: 12px;
      margin-left: 58px;
      line-height: 1.7;
      word-break: break-word;
    }
    .discussion-actions {
      display: flex;
      align-items: center;
      gap: 22px;
      margin-left: 58px;
      font-size: 1.05rem;
      color: #666;
      user-select: none;
    }
    .discussion-actions span {
      display: flex;
      align-items: center;
      gap: 4px;
      transition: color 0.18s;
      cursor: pointer;
    }
    .discussion-actions span:hover {
      color: #4CAF50;
    }
    .discussion-actions .icon {
      font-size: 1.1em;
      margin-right: 2px;
    }
    .discussion-reply {
      border-left: 3px solid #8BC34A;
      margin-left: 58px;
      padding-left: 20px;
      margin-top: 12px;
      background: linear-gradient(90deg, #f4fbe7 80%, #e8f5e9 100%);
      border-radius: 0 10px 10px 0;
      padding-top: 10px;
      padding-bottom: 10px;
      animation: fadeInUp 0.7s;
    }
    .discussion-reply .discussion-avatar {
      background: #43b649;
      border: 2.5px solid #8BC34A;
    }
    .discussion-reply .discussion-username {
      color: #43b649;
    }
    .view-all-btn {
      background: linear-gradient(90deg, #8BC34A 80%, #4CAF50 100%);
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 18px 0;
      font-size: 1.25rem;
      font-weight: bold;
      width: 100%;
      margin-top: 22px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: background 0.2s, transform 0.18s;
      box-shadow: 0 2px 12px #8bc34a22;
      letter-spacing: 0.5px;
      text-shadow: 0 1px 0 #388E3C22;
    }
    .view-all-btn:hover {
      background: #43b649;
      transform: translateY(-2px) scale(1.03);
    }
    @media (max-width: 900px) {
      .community-card { padding: 18px 4vw; }
      .discussion-new-btn { right: 4vw; }
    }
    @media (max-width: 600px) {
      .community-card { padding: 8px 2vw; }
      .discussion-new-btn { right: 2vw; top: 12px; padding: 10px 10px; font-size: 1rem; }
      .discussion-form-box { padding: 10px 6px; }
      .discussion-form-btn { padding: 8px 12px; font-size: 0.98rem; }
      .view-all-btn { padding: 12px 0; font-size: 1rem; }
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
    }
  `;

  return (
    <div className="community-bg" style={{ position: 'relative', background: `url(${journeyPath}) center/cover no-repeat` }}>
      <style>{styles}</style>
      {/* Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#DFF5DE', opacity: 0.7, zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <EditProfileModal
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={() => setShowEditProfile(false)}
      />
      <div className="welcome-header">
        <div className="header-left">
          <div className="profile-section">
            <button className="profile-btn" onClick={() => navigate('/elite/edit-profile')}>
              Elite Member
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
          <span className="notification-icon" onClick={handleNotificationClick}>
            🔔
          </span>
          <button className="logout-button" onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
      </div>
      <nav className="welcome-nav">
        <ul>
          <li>
            <a href="/elite/home">Home</a>
          </li>
          <li>
            <a href="/elite/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/elite/achievement">Achievement</a>
          </li>
          <li>
            <a href="/elite/coach">Coach</a>
          </li>
          <li>
            <a href="/elite/community" className="active">Community</a>
          </li>
          <li>
            <a href="/elite/feedback">Feedback</a>
          </li>
        </ul>
      </nav>

      <div className="community-card">
        <div className="community-title">Community Discussions</div>

        <div className="discussion-list">
          {discussions.map((disc) => (
            <div className="discussion-item" key={disc.id}>
              {disc.user.badge && (
                <span className="discussion-badge">
                  <span className="badge-icon">⭐</span> Most Liked Discussion
                </span>
              )}
              <div className="discussion-user">
                <span className="discussion-avatar">{disc.user.initials}</span>
                <div className="discussion-user-info">
                  <span className="discussion-username">{disc.user.name}</span>
                  <span className="discussion-userdesc">{disc.user.info}</span>
                </div>
              </div>
              <div className="discussion-content">{disc.content}</div>
              <div className="discussion-actions">
                <span>
                  <span className="icon">👍</span>
                  {disc.likes}
                </span>
                <span>
                  <span className="icon">💬</span>
                  {disc.replies} replies
                </span>
                {disc.share && (
                  <span>
                    <span className="icon">🔗</span>Share
                  </span>
                )}
              </div>
              {disc.children &&
                disc.children.map((reply) => (
                  <div className="discussion-reply" key={reply.id}>
                    <div className="discussion-user">
                      <span className="discussion-avatar">
                        {reply.user.initials}
                      </span>
                      <div className="discussion-user-info">
                        <span className="discussion-username">
                          {reply.user.name}
                        </span>
                        <span className="discussion-userdesc">
                          {reply.user.info}
                        </span>
                      </div>
                    </div>
                    <div className="discussion-content">{reply.content}</div>
                    <div className="discussion-actions">
                      <span>
                        <span className="icon">👍</span>
                        {reply.likes}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <button className="view-all-btn">View All Discussions (124)</button>
      </div>
      {/* Footer */}
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
    </div>
  );
}

export default EliteCommunity;
