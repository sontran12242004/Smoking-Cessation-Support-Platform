import React, { useState } from 'react';
import EditProfileModal from '../EditProfileModal';
import { Link, useNavigate } from 'react-router-dom';

function DailyCheckIn() {
  const [smokedToday, setSmokedToday] = useState(null);
  const [cigarettesCount, setCigarettesCount] = useState('');
  const [healthToday, setHealthToday] = useState(null);
  const [cravingLevel, setCravingLevel] = useState(null);
  const [breathFreshness, setBreathFreshness] = useState(null);
  const [tasteSmellChange, setTasteSmellChange] = useState(null);
  const [physicalActivity, setPhysicalActivity] = useState(null);
  const [moodToday, setMoodToday] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();
  const expectedPerDay = 10;
  const pricePerCigarette = 2;

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
      background: linear-gradient(to right, #8BC34A 0%, #8BC34A ${cigarettesCount ? cigarettesCount * 10 : 0}% #ddd ${cigarettesCount ? cigarettesCount * 10 : 0}% #ddd 100%);
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

  const handleSave = () => {
    // Validation: require smokedToday and healthToday
    if (!smokedToday) {
      alert('Please answer: Did you smoke any cigarettes today?');
      return;
    }
    if (!healthToday) {
      alert('Please answer: How do you feel about your overall health today?');
      return;
    }
    const todayStr = new Date().toISOString().slice(0, 10);
    const moneySavedToday = (expectedPerDay - (smokedToday === 'yes' ? Number(cigarettesCount || 0) : 0)) * pricePerCigarette;
    const checkinEntry = {
      date: todayStr,
      smokedToday,
      cigarettesCount: smokedToday === 'yes' ? cigarettesCount : 0,
      moneySavedToday,
      healthToday,
      cravingLevel,
      breathFreshness,
      tasteSmellChange,
      physicalActivity,
      moodToday,
      lastCheckinDate: new Date().toISOString(),
    };
    // Save single checkin for dashboard as before
    localStorage.setItem('elite_checkin_data', JSON.stringify(checkinEntry));
    // Save history array
    let history = JSON.parse(localStorage.getItem('elite_checkin_history') || '[]');
    // Remove any entry with the same date (overwrite today's check-in)
    history = history.filter(entry => entry.date !== todayStr);
    history.push(checkinEntry);
    localStorage.setItem('elite_checkin_history', JSON.stringify(history));
    navigate('/elite/dashboard', { state: { checkinData: checkinEntry } });
  };

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
            <p>{new Date().toLocaleDateString()}</p>
          </div>

          {/* 1. Did you smoke any cigarettes today? */}
          <div className="question-group">
            <label>Did you smoke any cigarettes today?</label>
            <div className="button-options">
              <button className={`option-button ${smokedToday === 'no' ? 'selected' : ''}`} onClick={() => setSmokedToday('no')}>No</button>
              <button className={`option-button ${smokedToday === 'yes' ? 'selected' : ''}`} onClick={() => setSmokedToday('yes')}>Yes</button>
            </div>
          </div>

          {/* 2. If yes, how many cigarettes did you smoke today? */}
          {smokedToday === 'yes' && (
            <div className="question-group">
              <label>If yes, how many cigarettes did you smoke today?</label>
              <input
                type="number"
                min="1"
                value={cigarettesCount}
                onChange={e => setCigarettesCount(e.target.value)}
                className="option-input"
                placeholder="Enter number of cigarettes"
              />
            </div>
          )}

          {/* 3. How do you feel about your overall health today? */}
          <div className="question-group">
            <label>How do you feel about your overall health today?</label>
            <div className="button-options">
              <button className={`option-button ${healthToday === 'very_good' ? 'selected' : ''}`} onClick={() => setHealthToday('very_good')}>Very Good</button>
              <button className={`option-button ${healthToday === 'good' ? 'selected' : ''}`} onClick={() => setHealthToday('good')}>Good</button>
              <button className={`option-button ${healthToday === 'normal' ? 'selected' : ''}`} onClick={() => setHealthToday('normal')}>Normal</button>
              <button className={`option-button ${healthToday === 'bad' ? 'selected' : ''}`} onClick={() => setHealthToday('bad')}>Bad</button>
            </div>
          </div>

          {/* 4. Did you feel cravings for cigarettes today? */}
          <div className="question-group">
            <label>Did you feel cravings for cigarettes today?</label>
            <div className="button-options">
              <button className={`option-button ${cravingLevel === 'none' ? 'selected' : ''}`} onClick={() => setCravingLevel('none')}>Not at all</button>
              <button className={`option-button ${cravingLevel === 'controlled' ? 'selected' : ''}`} onClick={() => setCravingLevel('controlled')}>Yes, but I managed</button>
              <button className={`option-button ${cravingLevel === 'strong' ? 'selected' : ''}`} onClick={() => setCravingLevel('strong')}>Very strong cravings</button>
            </div>
          </div>

          {/* 5. Did you feel your breath was fresher today? */}
          <div className="question-group">
            <label>Did you feel your breath was fresher today?</label>
            <div className="button-options">
              <button className={`option-button ${breathFreshness === 'yes' ? 'selected' : ''}`} onClick={() => setBreathFreshness('yes')}>Yes</button>
              <button className={`option-button ${breathFreshness === 'not_sure' ? 'selected' : ''}`} onClick={() => setBreathFreshness('not_sure')}>Not sure</button>
              <button className={`option-button ${breathFreshness === 'no' ? 'selected' : ''}`} onClick={() => setBreathFreshness('no')}>No</button>
            </div>
          </div>

          {/* 6. Did you notice any changes in your taste or smell today? */}
          <div className="question-group">
            <label>Did you notice any changes in your taste or smell today?</label>
            <div className="button-options">
              <button className={`option-button ${tasteSmellChange === 'better' ? 'selected' : ''}`} onClick={() => setTasteSmellChange('better')}>Better</button>
              <button className={`option-button ${tasteSmellChange === 'no_change' ? 'selected' : ''}`} onClick={() => setTasteSmellChange('no_change')}>No change</button>
              <button className={`option-button ${tasteSmellChange === 'worse' ? 'selected' : ''}`} onClick={() => setTasteSmellChange('worse')}>Worse</button>
            </div>
          </div>

          {/* 7. Did you exercise or do any physical activity today? */}
          <div className="question-group">
            <label>Did you exercise or do any physical activity today?</label>
            <div className="button-options">
              <button className={`option-button ${physicalActivity === 'yes' ? 'selected' : ''}`} onClick={() => setPhysicalActivity('yes')}>Yes</button>
              <button className={`option-button ${physicalActivity === 'no' ? 'selected' : ''}`} onClick={() => setPhysicalActivity('no')}>No</button>
            </div>
          </div>

          {/* 8. What was your overall mood today? */}
          <div className="question-group">
            <label>What was your overall mood today?</label>
            <div className="button-options">
              <button className={`option-button ${moodToday === 'happy' ? 'selected' : ''}`} onClick={() => setMoodToday('happy')}>Happy</button>
              <button className={`option-button ${moodToday === 'normal' ? 'selected' : ''}`} onClick={() => setMoodToday('normal')}>Normal</button>
              <button className={`option-button ${moodToday === 'stress' ? 'selected' : ''}`} onClick={() => setMoodToday('stress')}>Stressed</button>
              <button className={`option-button ${moodToday === 'sad' ? 'selected' : ''}`} onClick={() => setMoodToday('sad')}>Sad</button>
            </div>
          </div>

          <button className="save-responses-button" onClick={handleSave}>Save Responses</button>
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
 