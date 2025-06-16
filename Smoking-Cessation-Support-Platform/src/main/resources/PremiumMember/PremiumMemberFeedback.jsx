import React, { useState } from "react";
import EditProfileModal from "../EditProfileModal";
import { useNavigate } from "react-router-dom";
function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Gửi feedback lên server tại đây nếu cần
  };
  const handleNotificationClick = () => {
    navigate("/premiumnotificationcenter");
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
      flex-grow: 1;
      padding: 10px 15px;
      border: 1px solid #7CB342;
      border-radius: 5px 0 0 5px;
      font-size: 14px;
      background-color: #558B2F;
      color: white;
    }
    .newsletter-input::placeholder {
      color: #B2FF59;
    }
    .newsletter-button {
      background-color: #8BC34A;
      color: #333;
      border: none;
      padding: 10px 20px;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }
    .newsletter-button:hover {
      background-color: #9CCC65;
    }
    .newsletter-description {
      font-size: 13px;
      line-height: 1.6;
      color: #CFD8DC;
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
  `;

  return (
    <div className="container">
      <style>{styles}</style>
      <EditProfileModal
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={() => setShowEditProfile(false)}
      />
      <header>
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
      </header>
      <nav className="welcome-nav">
        <ul>
          <li>
            <a href="/premiummemberhome">Home</a>
          </li>
          <li>
            <a href="/premiummemberdashboard">Dashboard</a>
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
            <a href="/feedbackpremium" className="active">Feedback</a>
          </li>
        </ul>
      </nav>
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
      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-column">
            <h4>NicOff</h4>
            <p>
              We're dedicated to helping you break free from smoking addiction
              through science-backed methods and community support
            </p>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/about">About Us</a>
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
          <div className="footer-column">
            <h4>Support</h4>
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
          <div className="footer-column">
            <h4>NewsLetter</h4>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your Email Address..."
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
            <p className="newsletter-description">
              Get the latest tips and motivation to stay smoke-free delivered to
              your inbox
            </p>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom-text">
          © 2025 NicOff. All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default Feedback;
