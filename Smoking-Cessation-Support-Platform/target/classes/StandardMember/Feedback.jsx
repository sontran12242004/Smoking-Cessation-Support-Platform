import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import journeyPath from '../assets/journey_path.jpg';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Gửi feedback lên server tại đây nếu cần
  };
  const handleNotificationClick = () => {
    navigate("/notificationcenter");
  };
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
    .header-center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
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
    .feedback-bg {
      min-height: 50vh;
      width: 100%;
      background: url('https://images.unsplash.com/photo-1447752875215-b276168b9f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 0;
    }
    .feedback-card {
      background: rgba(255,255,255,0.97);
      border-radius: 18px;
      box-shadow: 0 8px 32px rgba(56,70,60,0.18);
      padding: 48px 32px 36px 32px;
      max-width: 800px;
      width: 100%;
      text-align: center;
      margin: 0 auto;
    }
    .feedback-title {
      color: #388E3C;
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 18px;
    }
    .feedback-desc {
      color: #222;
      font-size: 1.18rem;
      margin-bottom: 18px;
    }
    .feedback-question {
      color: #357a38;
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .star-rating {
      display: flex;
      justify-content: center;
      margin-bottom: 18px;
      font-size: 2.2rem;
      gap: 8px;
    }
    .star {
      cursor: pointer;
      color: #ccc;
      transition: color 0.2s;
    }
    .star.filled {
      color: #FFB400;
    }
    .feedback-label {
      font-size: 1.1rem;
      color: #222;
      margin-bottom: 8px;
      text-align: left;
      display: block;
    }
    .feedback-textarea {
      width: 100%;
      min-height: 120px;
      border-radius: 10px;
      border: 1.5px solid #B2DFDB;
      padding: 14px;
      font-size: 1rem;
      margin-bottom: 22px;
      resize: vertical;
      background: #f9f9f9;
      transition: border 0.2s;
    }
    .feedback-textarea:focus {
      border: 1.5px solid #388E3C;
      outline: none;
    }
    .send-btn {
      background: #388E3C;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 14px 38px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
      margin-top: 10px;
    }
    .send-btn:hover {
      background: #256029;
      transform: translateY(-2px);
    }
    .feedback-success {
      color: #388E3C;
      font-size: 1.3rem;
      font-weight: bold;
      margin-top: 18px;
    }
    @media (max-width: 600px) {
      .feedback-card { padding: 24px 8px 18px 8px; }
      .feedback-title { font-size: 2rem; }
    }
    .newsletter-form {
      display: flex;
      margin-bottom: 15px;
    }
    .newsletter-input {
      padding: 4px 10px;
      border: none;
      border-radius: 5px;
      margin-right: 10px;
      width: 160px;
      background: #fff;
      color: #333;
      font-size: 13px;
      font-weight: 400;
      height: 32px;
      box-sizing: border-box;
    }
    .newsletter-input::placeholder {
      color: #bbb;
      opacity: 1;
    }
    .newsletter-button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      padding: 4px 16px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 400;
      height: 32px;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
    }
    .newsletter-button:hover {
      background-color: #45a049;
    }
    .footer-column p.newsletter-desc {
      margin-top: 8px;
      font-size: 13px;
      color: #ccc;
      font-weight: 400;
    }
    .footer-divider {
      border: none;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      margin: 30px 0;
    }
    .footer-bottom-text {
      text-align: center;
      font-size: 14px;
      color: #CFD8DC;
    }
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .footer-column {
        max-width: 90%;
      }
      .newsletter-form {
        justify-content: center;
      }
      .newsletter-input,
      .newsletter-button {
        border-radius: 5px;
      }
      .newsletter-input {
        margin-bottom: 10px;
      }
    }
    @media (max-width: 480px) {
      footer {
        padding: 40px 20px 15px;
      }
    }
    footer {
      background-color: #333;
      color: #fff;
      padding: 60px 50px 25px 50px;
      font-size: 16px;
      margin-top: 0;
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 30px;
      margin-bottom: 30px;
      text-align: left;
    }
    .footer-column {
      flex: 1;
      min-width: 220px;
      max-width: 340px;
    }
    .footer-column h4 {
      font-size: 22px;
      margin-bottom: 18px;
      color: #8BC34A;
      font-weight: bold;
    }
    .footer-column p,
    .footer-column ul {
      font-size: 16px;
      line-height: 1.7;
      color: #fff;
      margin-bottom: 0;
    }
    .footer-column ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .footer-column li {
      margin-bottom: 12px;
    }
    .footer-column li a {
      color: #fff;
      text-decoration: none;
      transition: color 0.2s;
      font-size: 16px;
    }
    .footer-column li a:hover {
      color: #8BC34A;
    }
    .newsletter-form {
      display: flex;
      margin-bottom: 15px;
      gap: 0;
    }
    .newsletter-input {
      flex: 1;
      padding: 12px 18px;
      border: none;
      border-radius: 7px 0 0 7px;
      font-size: 16px;
      background-color: #689F38;
      color: #fff;
      outline: none;
      transition: background 0.2s;
    }
    .newsletter-input::placeholder {
      color: #C5E1A5;
      opacity: 1;
    }
    .newsletter-button {
      background-color: #8BC34A;
      color: #222;
      border: none;
      padding: 12px 28px;
      border-radius: 0 7px 7px 0;
      cursor: pointer;
      font-size: 17px;
      font-weight: bold;
      transition: background 0.2s, color 0.2s;
      margin-left: -1px;
    }
    .newsletter-button:hover {
      background-color: #7CB342;
      color: #fff;
    }
    .newsletter-description {
      font-size: 15px;
      line-height: 1.6;
      color: #fff;
      margin-top: 8px;
    }
    .footer-divider {
      border: none;
      border-top: 1px solid #888;
      margin: 35px 0 18px 0;
    }
    .footer-bottom-text {
      text-align: center;
      font-size: 16px;
      color: #fff;
      margin-top: 0;
    }
    @media (max-width: 900px) {
      .footer-content {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        gap: 30px;
      }
      .footer-column {
        max-width: 100%;
        min-width: 0;
      }
    }
    @media (max-width: 600px) {
      footer {
        padding: 30px 10px 10px 10px;
      }
      .footer-content {
        gap: 18px;
      }
      .footer-column h4 {
        font-size: 18px;
      }
      .newsletter-input, .newsletter-button {
        font-size: 15px;
        padding: 10px 10px;
      }
    }
    .welcome-footer {
      background-color: #333;
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
      padding-top: 15px;
      margin-top: 15px;
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
      background: #fff;
      color: #333;
    }
    .newsletter-input::placeholder {
      color: #888;
      opacity: 1;
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
      <header>
        <div className="header-left">
          <div className="profile-section">
            <button className="profile-btn" onClick={() => navigate('/standard/edit-profile')}>
              Standard Member
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
          <div className="header-actions">
            <span
              className="notification-icon"
              onClick={() => navigate('/standard/notification')}
            >
              🔔
            </span>
            <button className="logout-button" onClick={() => navigate('/login')}>Logout</button>
          </div>
        </div>
      </header>
      <nav className="welcome-nav">
        <ul>
          <li>
            <a href="/standard/home">Home</a>
          </li>
          <li>
            <a href="/standard/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/standard/achievement">Achievement</a>
          </li>
          <li>
            <a href="/standard/coach">Coach</a>
          </li>
          <li>
            <a href="/standard/community">Community</a>
          </li>
          <li>
            <a href="/standard/feedback" className="active">Feedback</a>
          </li>
        </ul>
      </nav>
      <div style={{ position: 'relative', background: `url(${journeyPath}) center/cover no-repeat`, minHeight: 'calc(100vh - 220px)' }}>
        {/* Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#DFF5DE', opacity: 0.7, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="feedback-bg">
            <div className="feedback-card">
              <div className="feedback-title">Share Your Feedback</div>
              <div className="feedback-desc">
                We value your opinion! Please let us know about your experience with
                NicOff. Your feedback helps us improve our service.
              </div>
              <div className="feedback-question">
                How would you rate your overall experience?
              </div>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star${(hover || rating) >= star ? " filled" : ""}`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    role="button"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <form onSubmit={handleSubmit}>
                <label className="feedback-label" htmlFor="feedback-text">
                  Your feedback (optional):
                </label>
                <textarea
                  id="feedback-text"
                  className="feedback-textarea"
                  placeholder="What did you like about NicOff? What we could improve?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <button className="send-btn" type="submit">
                  Send Feedback
                </button>
              </form>
              {submitted && (
                <div className="feedback-success">Thank you for your feedback!</div>
              )}
            </div>
          </div>
        </div>
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
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <input type="email" placeholder="Your Email Address..." className="newsletter-input" />
              <button className="newsletter-button">Subscribe</button>
            </div>
            <p className="newsletter-desc">Get the latest tips and motivation to stay smoke-free delivered to your inbox</p>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 NicOff. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default Feedback; 