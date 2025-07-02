import React, { useState } from 'react';
import EditProfileModal from '../EditProfileModal';
import { Link, useNavigate } from 'react-router-dom';

function DailyCheckIn() {
  const [smokedToday, setSmokedToday] = useState(null);
  const [cigaretteStrength, setCigaretteStrength] = useState(0);
  const [feeling, setFeeling] = useState(null);
  const [cravingTrigger, setCravingTrigger] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [cigaretteCount, setCigaretteCount] = useState('');
  const [cigarettePrice, setCigarettePrice] = useState('');
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

    .elite-nav {
      background-color: #fff;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }

    .elite-nav ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 40px;
    }

    .elite-nav a {
      text-decoration: none;
      color: #5EBB34;
      font-weight: 400;
      font-size: 16px;
      padding: 5px 0;
      position: relative;
      transition: color 0.3s;
    }

    .elite-nav a::after {
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

    .elite-nav a:hover::after, .elite-nav a:focus::after, .elite-nav a.active::after {
      transform: scaleX(1);
    }

    /* Main Content Styles */
    .main-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      background-color: #DFF5DE;
      color: #333;
      text-align: center;
      position: relative;
      overflow: hidden;
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
      background-color: #DFF5DE;
      z-index: 0;
    }

    /* Daily Check-in Card Styles */
    .check-in-card-container {
      z-index: 2;
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      padding: 40px;
      width: 100%;
      max-width: 700px;
      text-align: left;
      border: 2px solid #64B5F6; /* Blue border */
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .check-in-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .check-in-header h2 {
      font-size: 32px;
      color: #4CAF50;
      margin-bottom: 8px;
    }

    .check-in-header p {
      font-size: 18px;
      color: #777;
    }

    .question-group {
      margin-bottom: 20px;
    }

    .question-group label {
      display: block;
      font-size: 20px;
      color: #4CAF50; /* Green color for questions */
      margin-bottom: 15px;
      font-weight: bold;
    }

    .button-options {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }

    .option-button {
      padding: 12px 25px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
      background-color: #f0f0f0; /* Light grey for unselected buttons */
      color: #555;
    }

    .option-button.selected {
      background-color: #4CAF50;
      color: white;
      border-color: #4CAF50;
    }

    .option-button.selected.red {
      background-color: #D32F2F;
      border-color: #D32F2F;
    }

    .option-button.selected.yellow {
      background-color: #FBC02D;
      color: #333;
      border-color: #FBC02D;
    }

    /* Slider Styles */
    .slider-group {
      margin-bottom: 25px;
    }

    .slider-group label {
      display: block;
      font-size: 20px;
      color: #4CAF50; /* Green color for slider label */
      margin-bottom: 15px;
      font-weight: bold;
    }

    .slider-container {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .slider-container input[type="range"] {
      flex-grow: 1;
      -webkit-appearance: none;
      width: 100%;
      height: 10px;
      border-radius: 5px;
      background: linear-gradient(to right, #8BC34A 0%, #8BC34A ${cigaretteStrength * 10}%, #ddd ${cigaretteStrength * 10}%, #ddd 100%);
      outline: none;
      transition: background 0.2s ease;
    }

    .slider-container input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #4CAF50;
      cursor: pointer;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #777;
      margin-top: 5px;
    }

    .current-strength {
      font-weight: bold;
      color: #4CAF50;
    }

    /* Save Responses Button */
    .save-responses-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
      width: 100%;
      font-weight: bold;
      margin-top: 30px;
    }

    .save-responses-button:hover {
      background-color: #388E3C;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .check-in-card-container {
        padding: 30px;
        gap: 20px;
      }
      .check-in-header h2 {
        font-size: 28px;
      }
      .check-in-header p {
        font-size: 16px;
      }
      .question-group label {
        font-size: 18px;
      }
      .option-button {
        padding: 10px 20px;
        font-size: 14px;
      }
      .slider-group label {
        font-size: 18px;
      }
      .save-responses-button {
        padding: 12px 25px;
        font-size: 16px;
      }
    }

    @media (max-width: 480px) {
      .check-in-card-container {
        padding: 20px;
      }
      .check-in-header h2 {
        font-size: 24px;
      }
      .check-in-header p {
        font-size: 14px;
      }
      .question-group label {
        font-size: 16px;
      }
      .option-button {
        padding: 8px 15px;
        font-size: 12px;
      }
      .slider-container input[type="range"]::-webkit-slider-thumb {
        width: 20px;
        height: 20px;
      }
      .slider-labels {
        font-size: 12px;
      }
      .save-responses-button {
        padding: 10px 20px;
        font-size: 14px;
      }
    }

    /* Footer Styles */
    .elite-footer {
      background-color: #333;
      color: #fff;
      padding: 30px 20px;
      text-align: center;
      font-size: 14px;
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
    <div className="container">
      <style>{styles}</style>
      <EditProfileModal open={showEditProfile} onClose={() => setShowEditProfile(false)} onSave={() => setShowEditProfile(false)} />
      {/* Header */}
      <header className="welcome-header">
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
          <span className="notification-icon">🔔</span>
          <button className="logout-button" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </header>

      <nav className="elite-nav">
        <ul>
          <li><Link to="/elite/home">Home</Link></li>
          <li><Link to="/elite/dashboard">Dashboard</Link></li>
          <li><Link to="/elite/achievement">Achievement</Link></li>
          <li><Link to="/elite/coach">Coach</Link></li>
          <li><Link to="/elite/community">Community</Link></li>
          <li><Link to="/elite/feedback">Feedback</Link></li>
        </ul>
      </nav>

      {/* Main Content - Daily Check-in Form */}
      <main className="main-content">
        <div className="check-in-card-container">
          <div className="check-in-header">
            <h2>Daily Check-In</h2>
            <p>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>

          {/* Did you smoke today? */}
          <div className="question-group">
            <label>Did you smoke today?</label>
            <div className="button-options">
              <button
                className={`option-button ${smokedToday === 'no' ? 'selected' : ''}`}
                onClick={() => setSmokedToday('no')}
              >
                No, I stayed strong!
              </button>
              <button
                className={`option-button ${smokedToday === 'yes' ? 'selected red' : ''}`}
                onClick={() => setSmokedToday('yes')}
              >
                Yes, I slipped up
              </button>
            </div>
          </div>

          {/* How strong were the cigarettes you smoked? */}
          <div className="slider-group">
            <label>How strong were the cigarettes you smoked? (on a scale of 10)</label>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="10"
                value={cigaretteStrength}
                onChange={(e) => setCigaretteStrength(parseInt(e.target.value))}
              />
            </div>
            <div className="slider-labels">
              <span>1 (Very Mild)</span>
              <span className="current-strength">Current: {cigaretteStrength}/10</span>
              <span>10 (Extremely Strong)</span>
            </div>
            {smokedToday === 'yes' && (
              <div style={{ marginTop: 20 }}>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', color: '#4CAF50', fontWeight: 'bold', fontSize: 20, marginBottom: 15 }}>
                    How many cigarettes did you smoke today?
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={cigaretteCount}
                    onChange={e => setCigaretteCount(e.target.value)}
                    placeholder="Enter number of cigarettes"
                    style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, fontFamily: 'inherit' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#4CAF50', fontWeight: 'bold', fontSize: 20, marginBottom: 15 }}>
                    Price of the cigarette pack
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={cigarettePrice}
                    onChange={e => setCigarettePrice(e.target.value)}
                    placeholder="Enter price of the pack"
                    style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, fontFamily: 'inherit' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* After a day without smoking, how do you feel? */}
          <div className="question-group">
            <label>After a day without smoking, how do you feel?</label>
            <div className="button-options">
              <button
                className={`option-button ${feeling === 'unbearable' ? 'selected red' : ''}`}
                onClick={() => setFeeling('unbearable')}
              >
                Feel unbearable
              </button>
              <button
                className={`option-button ${feeling === 'tolerable' ? 'selected' : ''}`}
                onClick={() => setFeeling('tolerable')}
              >
                I feel uncomfortable but still tolerable
              </button>
              <button
                className={`option-button ${feeling === 'okay' ? 'selected' : ''}`}
                onClick={() => setFeeling('okay')}
              >
                Feel okay
              </button>
              <button
                className={`option-button ${feeling === 'great' ? 'selected' : ''}`}
                onClick={() => setFeeling('great')}
              >
                Feel great!
              </button>
            </div>
          </div>

          {/* What was your biggest craving trigger today? */}
          <div className="question-group">
            <label>What was your biggest craving trigger today?</label>
            <div className="button-options">
              <button
                className={`option-button ${cravingTrigger === 'stress' ? 'selected' : ''}`}
                onClick={() => setCravingTrigger('stress')}
              >
                Stress
              </button>
              <button
                className={`option-button ${cravingTrigger === 'social_situation' ? 'selected' : ''}`}
                onClick={() => setCravingTrigger('social_situation')}
              >
                Social Situation
              </button>
              <button
                className={`option-button ${cravingTrigger === 'after_meals' ? 'selected' : ''}`}
                onClick={() => setCravingTrigger('after_meals')}
              >
                After meals
              </button>
              <button
                className={`option-button ${cravingTrigger === 'boredom' ? 'selected' : ''}`}
                onClick={() => setCravingTrigger('boredom')}
              >
                Boredom
              </button>
              <button
                className={`option-button ${cravingTrigger === 'other' ? 'selected' : ''}`}
                onClick={() => setCravingTrigger('other')}
              >
                Other
              </button>
            </div>
          </div>

          {/* Save Responses Button */}
          <button className="save-responses-button" onClick={() => navigate('/elite/home')}>Save Responses</button>
        </div>
      </main>
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
  );
}

export default DailyCheckIn;