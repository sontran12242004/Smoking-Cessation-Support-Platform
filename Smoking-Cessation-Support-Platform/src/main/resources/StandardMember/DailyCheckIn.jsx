import React, { useState } from 'react';
import EditProfileModal from '../EditProfileModal';

function DailyCheckIn() {
  const [smokedToday, setSmokedToday] = useState(null);
  const [cigaretteStrength, setCigaretteStrength] = useState(5);
  const [feeling, setFeeling] = useState(null);
  const [cravingTrigger, setCravingTrigger] = useState(null);
  const [confidence, setConfidence] = useState(null);
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

    /* Header Styles */
    header {
      background-color: #e0f2f7; /* Light blueish background */
      padding: 15px 40px;
      border-bottom: 1px solid #d0e8ef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left,
    .header-right {
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

    .nav-links a.active,
    .nav-links a:hover {
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
      background-image: url('https://images.unsplash.com/photo-1447752875215-b276168b9f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'); /* Updated background image */
      background-size: cover;
      background-position: center;
      filter: blur(5px);
      background-color: rgba(255, 255, 255, 0.6);
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
              <span className="profile-icon">👤</span> Standard Member
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
          <li><a href="/standardmemberhome">Home</a></li>
          <li><a href="/standardmemberdashboard">Dashboard</a></li>
          <li><a href="/standardachievement">Achievement</a></li>
          <li><a href="/standardmembercoach">Coach</a></li>
          <li><a href="/standardmembercommun">Community</a></li>
          <li><a href="/feedback">Feedback</a></li>
        </ul>
        <div className="header-actions">
          <span className="notification-icon">🔔</span>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      {/* Main Content - Daily Check-in Form */}
      <main className="main-content">
        <div className="check-in-card-container">
          <div className="check-in-header">
            <h2>Daily Check-In</h2>
            <p>May 31, 2025</p>
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
                min="1"
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

          {/* How confident are you about staying smoke-free tomorrow? */}
          <div className="question-group">
            <label>How confident are you about staying smoke-free tomorrow?</label>
            <div className="button-options">
              <button
                className={`option-button ${confidence === 'not_confident' ? 'selected red' : ''}`}
                onClick={() => setConfidence('not_confident')}
              >
                Not Confident
              </button>
              <button
                className={`option-button ${confidence === 'stress' ? 'selected' : ''}`}
                onClick={() => setConfidence('stress')}
              >
                Stress
              </button>
              <button
                className={`option-button ${confidence === 'confident' ? 'selected' : ''}`}
                onClick={() => setConfidence('confident')}
              >
                Confident
              </button>
              <button
                className={`option-button ${confidence === 'very_confident' ? 'selected' : ''}`}
                onClick={() => setConfidence('very_confident')}
              >
                Very Confident
              </button>
            </div>
          </div>

          <button className="save-responses-button">Save Responses</button>
        </div>
      </main>
    </div>
  );
}

export default DailyCheckIn;
 