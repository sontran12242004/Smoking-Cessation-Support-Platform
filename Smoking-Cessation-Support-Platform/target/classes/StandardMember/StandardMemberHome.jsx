import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import EditProfileModal from "../EditProfileModal";

function StandardMemberHome() {
  const [smokedToday, setSmokedToday] = useState(null);
  const [feeling, setFeeling] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();

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

    /* Header Styles */
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
    .main-menu-item.active, .main-menu-item:hover {
        color: #43b649;
        border-bottom: 2.5px solid #43b649;
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

    /* Main Content Styles */
    .main-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      background-size: cover;
      background-position: center;
      color: #333;
      text-align: center;
      position: relative;
      overflow: hidden; /* To contain the absolute positioned overlay */
      padding-top: 80px;
      padding-bottom: 80px;
    }

    .main-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: none; /* Remove background image */
      filter: none; /* Remove blur filter */
      background-color: rgba(76, 175, 80, 0.3); /* Semi-transparent green overlay */
      z-index: 0; /* Ensure it is behind content */
    }

    .welcome-section {
      z-index: 2;
      margin-bottom: 50px;
      color: #333;
    }

    .welcome-section h2 {
      font-size: 42px;
      margin-bottom: 10px;
      color: #388E3C; /* Dark green for heading */
    }

    .welcome-section p {
      font-size: 20px;
      color: #666;
      margin-bottom: 5px;
    }

    .welcome-section .remember-text {
      font-size: 18px;
      color: #888;
      margin-top: 10px;
    }

    .stay-quit-image-container {
      position: relative;
      width: 100%;
      max-width: 700px;
      height: 350px; /* Adjust height as needed */
      margin: 0 auto;
      z-index: 2;
      border: 2px solid #55aaff; /* Blue border as seen in the image */
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.7); /* Slightly transparent background for the image area */
    }

    .stay-quit-image {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    }

    /* Check-in Section Styles */
    .check-in-section {
      background-color: #CCEEFF; /* Light blue background as in image */
      padding: 40px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      gap: 30px;
      margin-top: 30px;
      border-top: 1px solid #AADCEE;
    }

    .check-in-left {
      flex: 2;
      min-width: 300px;
      text-align: left;
    }

    .check-in-left h2 {
      font-size: 36px;
      color: #333;
      margin-bottom: 25px;
    }

    .check-in-question {
      font-size: 20px;
      color: #555;
      margin-bottom: 15px;
      font-weight: bold;
    }

    .button-group {
      display: flex;
      gap: 15px;
      margin-bottom: 25px;
      flex-wrap: wrap;
    }

    .check-in-button {
      padding: 12px 25px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
      font-weight: bold;
    }

    .check-in-button.smoked {
      background-color: #4CAF50;
      color: white;
    }

    .check-in-button.smoked:hover {
      background-color: #388E3C;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .check-in-button.slipped-up {
      background-color: #D32F2F;
      color: white;
    }

    .check-in-button.slipped-up:hover {
      background-color: #C62828;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .check-in-button.stayed-strong {
      background-color: #FBC02D;
      color: #333;
    }

    .check-in-button.stayed-strong:hover {
      background-color: #F9A825;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .check-in-button.unbearable {
      background-color: #D32F2F;
      color: white;
    }

    .check-in-button.unbearable:hover {
      background-color: #C62828;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .check-in-button.tolerable {
      background-color: #FBC02D;
      color: #333;
    }

    .check-in-button.tolerable:hover {
      background-color: #F9A825;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .diary-link {
      font-size: 18px;
      color: #1976D2;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      margin-top: 15px;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    .diary-link:hover {
      color: #1565C0;
    }

    .diary-link .arrow-icon {
      margin-left: 8px;
    }

    .check-in-right {
      flex: 1;
      min-width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .cigarette-person-image {
      max-width: 100%;
      height: auto;
    }

    /* Action Link Section Styles (Create My Quit Plan, View Your Dashboard) */
    .action-link-section {
      padding: 30px 20px;
      text-align: center;
      background-color: #f0f2f5;
    }

    .action-link {
      font-size: 24px;
      color: #4CAF50;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease, transform 0.2s ease;
      display: inline-flex;
      align-items: center;
    }

    .action-link:hover {
      color: #388E3C;
      transform: translateY(-2px);
    }

    /* Community Update Section Styles */
    .community-update-section {
      padding: 50px 20px;
      background-color: #F0FDF0; /* Lighter green background for the section */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .community-update-card {
      background-color: #fff; /* White background for the card */
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      padding: 30px;
      width: 100%;
      max-width: 600px;
      text-align: left; /* Align text to the left within the card */
    }

    .community-update-card h3 {
      font-size: 28px;
      color: #4CAF50;
      margin-bottom: 15px;
    }

    .milestone-text {
      font-size: 18px;
      color: #4CAF50;
      margin-bottom: 25px;
    }

    .user-testimonial {
      display: flex;
      align-items: flex-start;
      background-color: #E0E0E0; /* Grey background for testimonial */
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 25px;
      text-align: left;
      gap: 15px;
    }

    .user-avatar {
      font-size: 36px;
      color: #666;
    }

    .user-info {
      flex-grow: 1;
    }

    .user-name {
      font-weight: bold;
      margin-bottom: 5px;
      color: #333;
      font-size: 16px;
    }

    .user-time {
      font-size: 13px;
      color: #777;
    }

    .user-quote {
      font-style: italic;
      color: #444;
      font-size: 17px;
      line-height: 1.5;
    }

    .join-discussion-link {
      font-size: 18px;
      color: #4CAF50;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease, transform 0.2s ease;
      display: inline-flex;
      align-items: center;
      margin-top: 15px;
    }

    .join-discussion-link:hover {
      color: #388E3C;
      transform: translateY(-2px);
    }

    /* Footer Styles */
    footer {
      background-color: #333; /* Dark grey-blue, adjust if needed */
      color: white;
      padding: 50px 40px 20px;
      font-size: 15px;
    }

    .footer-content {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 30px;
      margin-bottom: 30px;
    }

    .footer-column {
      flex: 1;
      min-width: 200px;
      max-width: 280px;
    }

    .footer-column h4 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #8BC34A; /* Light green for headings */
    }

    .footer-column p,
    .footer-column li a {
      color: #CFD8DC;
      line-height: 1.8;
    }

    .footer-column ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-column li {
      margin-bottom: 10px;
    }

    .footer-column li a {
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-column li a:hover {
      color: white;
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
      background-color: #558B2F; /* Darker green for input background */
      color: white;
    }

    .newsletter-input::placeholder {
      color: #B2FF59; /* Lighter green for placeholder */
    }

    .newsletter-button {
      background-color: #8BC34A; /* Light green for button */
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

    /* Responsive adjustments for new sections */
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
      .action-link {
        font-size: 20px;
      }
      .community-update-card h3 {
        font-size: 24px;
      }
      .community-update-card p {
        font-size: 16px;
      }
      .user-testimonial {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .user-quote {
        margin-top: 10px;
      }
      footer {
        padding: 40px 20px 15px;
      }
    }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
      header {
        padding: 15px 20px;
      }
      .nav-links li {
        margin-left: 20px;
      }
      .main-content {
        padding: 60px 20px;
      }
      .welcome-section h2 {
        font-size: 36px;
      }
      .welcome-section p {
        font-size: 18px;
      }
      .check-in-section {
        padding: 30px 20px;
        flex-direction: column;
      }
      .check-in-left {
        text-align: center;
      }
      .check-in-right {
        margin-top: 30px;
      }
    }

    @media (max-width: 768px) {
      header {
        flex-direction: column;
        text-align: center;
      }
      .header-left,
      .header-right {
        flex-direction: column;
        margin-bottom: 15px;
      }
      .profile-status {
        margin-right: 0;
        margin-bottom: 10px;
      }
      .logo-section {
        margin-right: 0;
        margin-bottom: 15px;
      }
      .nav-links {
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
      }
      .nav-links li {
        margin-left: 0;
      }
      .main-content {
        padding: 40px 15px;
      }
      .welcome-section h2 {
        font-size: 30px;
      }
      .welcome-section p {
        font-size: 16px;
      }
      .check-in-section {
        padding: 20px 15px;
      }
      .check-in-left h2 {
        font-size: 30px;
      }
      .check-in-question {
        font-size: 18px;
      }
      .button-group {
        flex-direction: column;
        align-items: center;
      }
      .check-in-button {
        width: 80%;
        max-width: 250px;
      }
    }

    @media (max-width: 480px) {
      header {
        padding: 10px 15px;
      }
      .app-name h1 {
        font-size: 20px;
      }
      .app-name p {
        font-size: 12px;
      }
      .nav-links a {
        font-size: 14px;
      }
      .welcome-section h2 {
        font-size: 24px;
      }
      .welcome-section p {
        font-size: 14px;
      }
      .check-in-left h2 {
        font-size: 24px;
      }
      .check-in-question {
        font-size: 16px;
      }
      .check-in-button {
        font-size: 14px;
        padding: 10px 20px;
      }
      .diary-link {
        font-size: 16px;
      }
    }
  `;
  const handleDashboard = () => {
    window.location.href = "/standardmemberdashboard";
  };

  const handleDiary = () => {
    window.location.href = "/dailycheckin";
  };

  const handleNotificationClick = () => {
    navigate('/notificationcenter');
  };

  const handleLogout = () => {
    // Implement logout functionality
  };

  return (
    <div className="container">
      <style>{styles}</style>
      <EditProfileModal
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={() => setShowEditProfile(false)}
      />

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
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="welcome-nav">
        <ul>
          <li><a href="/standardmemberhome" className="active">Home</a></li>
          <li><a href="/standardmemberdashboard">Dashboard</a></li>
          <li><a href="#">Achievement</a></li>
          <li><a href="/standardmembercoach">Coach</a></li>
          <li><a href="/standardmembercommun">Community</a></li>
          <li><a href="/feedback">Feedback</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <section className="welcome-section">
          <h2>Welcome back, John! 👋</h2>
          <p>How are you feeling today?</p>
          <p className="remember-text">-remember to-</p>
        </section>

        <div className="stay-quit-image-container">
          <img
            src="https://assets.website-files.com/6045d62d669bb040e34c9c7f/6045d62d669bb040e34c9cb2_Group%202.png"
            alt="Stay Quit"
            className="stay-quit-image"
          />
        </div>
      </main>

      {/* Today's Check-In Section */}
      <section className="check-in-section">
        <div className="check-in-left">
          <h2>Today's Check-In:</h2>

          <p className="check-in-question">Did you smoke today?</p>
          <div className="button-group">
            <button
              className={`check-in-button slipped-up ${smokedToday === "yes" ? "smoked" : ""
                }`}
              onClick={() => setSmokedToday("yes")}
            >
              Yes, I slipped up
            </button>
            <button
              className={`check-in-button stayed-strong ${smokedToday === "no" ? "smoked" : ""
                }`}
              onClick={() => setSmokedToday("no")}
            >
              No, I stayed strong!
            </button>
          </div>

          <p className="check-in-question">
            After a day without smoking, how do you feel?
          </p>
          <div className="button-group">
            <button
              className={`check-in-button unbearable ${feeling === "unbearable" ? "smoked" : ""
                }`}
              onClick={() => setFeeling("unbearable")}
            >
              I feel unbearable
            </button>
            <button
              className={`check-in-button tolerable ${feeling === "tolerable" ? "smoked" : ""
                }`}
              onClick={() => setFeeling("tolerable")}
            >
              I feel uncomfortable but still tolerable
            </button>
          </div>

          <a href="#" className="diary-link" onClick={handleDiary}>
            Go To My Diary <span className="arrow-icon">→</span>
          </a>
        </div>

        <div className="check-in-right">
          <img
            src="https://assets.website-files.com/6045d62d669bb040e34c9c7f/6045d62d669bb040e34c9cb5_Group%203.png"
            alt="Cigarette Person"
            className="cigarette-person-image"
          />
        </div>
      </section>

      {/* Create My Quit Plan Section */}
      <section className="action-link-section">
        <a href="#" className="action-link">
          Create My Quit Plan →
        </a>
      </section>

      {/* Community Update Section */}
      <section className="community-update-section">
        <div className="community-update-card">
          <h3>Community Update</h3>
          <p className="milestone-text">
            5 users just hit the 1-month smoke-free milestone!
          </p>
          <div className="user-testimonial">
            <span className="user-avatar">👤</span>
            <div className="user-info">
              <p className="user-name">Alex</p>
              <p className="user-time">Just now</p>
            </div>
            <p className="user-quote">
              "I used the money I saved to buy a new bike!"
            </p>
          </div>
          <a href="/standardmembercommun" className="join-discussion-link">
            Join the discussion →
          </a>
        </div>
      </section>

      {/* View Your Dashboard Section */}
      <section className="action-link-section">
        <a href="#" className="action-link" onClick={handleDashboard}>
          View Your Dashboard →
        </a>
      </section>

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
                <a href="/termsofservice">Terms of Service</a>
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

export default StandardMemberHome;
