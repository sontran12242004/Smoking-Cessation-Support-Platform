import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import journeyPath from '../assets/journey_path.jpg';

function EliteEditProfile() {
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;

  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
    quitDate: '',
    formerDailyUsage: '',
    primaryMotivation: '',
  });

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8080/api/members/${userId}/edit-profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => {});
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:8080/api/members/${userId}/edit-profile`, {
        method: 'PUT', // hoặc 'POST' nếu backend yêu cầu
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        alert('Profile updated successfully!');
        navigate('/elite/home');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('Error updating profile');
    }
  };

  const styles = `
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background-color: #f0f2f5;
    }
    .main-container {
      background: url(${journeyPath}) center/cover no-repeat;
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #DFF5DE;
    opacity: 0.7;
    z-index: 0;
    pointer-events: none; /* <-- thêm dòng này */
}

    .content-wrap {
        position: relative;
        z-index: 1;
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
    }
    .header-left, .header-right {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .profile-btn {
      display: flex;
      align-items: center;
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 999px;
      padding: 8px 22px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
    }
    .header-center {
      text-align: center;
    }
    .header-center h1 { margin: 0; font-size: 24px; color: #4CAF50; }
    .header-center p { margin: 0; font-size: 14px; color: #666; }
    .notification-icon { font-size: 24px; color: #f39c12; cursor: pointer; }
    .logout-button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
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
    }
    .form-container {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 20px;
    }
    .edit-profile-form {
        background: #fff;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 800px;
    }
    .form-title {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        color: #333;
        margin-bottom: 30px;
    }
    .form-row {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }
    .form-group {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .form-group label {
        font-weight: bold;
        margin-bottom: 8px;
        color: #555;
    }
    .form-group input, .form-group select {
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }
    .form-group input[type="number"] {
        width: 100px;
    }
    .usage-note {
        font-size: 12px;
        color: #888;
        margin-top: 5px;
    }
    .form-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 30px;
    }
    .form-buttons button {
        padding: 12px 30px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }
    .cancel-btn {
        background-color: #ccc;
        color: #333;
    }
    .save-btn {
        background-color: #4CAF50;
        color: white;
    }
    .view-sub-btn {
        background-color: #007BFF;
        color: white;
    }
    .elite-footer {
        background: #333;
        color: white;
        padding: 40px 20px;
    }
    .footer-content {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: 0 auto;
        padding-bottom: 20px;
    }
    .footer-column {
        flex: 1;
        min-width: 200px;
        margin: 20px;
    }
    .footer-column h3 { color: #4CAF50; margin-bottom: 20px; }
    .footer-column a, .footer-column p {
        color: #ccc;
        text-decoration: none;
        display: block;
        margin-bottom: 10px;
    }
    .newsletter-input {
        width: calc(100% - 22px);
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #555;
        background: #444;
        color: white;
        margin-bottom: 10px;
    }
    .newsletter-button {
        width: 100%;
        padding: 10px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
    }
    .copyright {
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid #444;
        margin-top: 20px;
    }

    /* Styles for the new subscription section */
    .subscription-section {
        margin-top: 40px;
        padding-top: 30px;
        border-top: 1px solid #e0e0e0;
        text-align: center;
    }

    .subscription-title {
        font-size: 22px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
    }

    .view-sub-btn-new {
        padding: 10px 25px;
        border: 2px solid #4CAF50;
        border-radius: 5px;
        background-color: transparent;
        color: #4CAF50;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
    }

    .view-sub-btn-new:hover {
        background-color: #4CAF50;
        color: white;
    }
  `;

  return (
    <div className="main-container">
      <style>{styles}</style>
      <div className="overlay"></div>
      <div className="content-wrap">
        <header className="welcome-header">
          <div className="header-left">
            <button className="profile-btn">Elite Member</button>
          </div>
          <div className="header-center">
            <h1>NicOff</h1>
            <p>Turn Off Nicotine, Turn On Life!</p>
          </div>
          <div className="header-right">
            <span className="notification-icon">🔔</span>
            <button className="logout-button">Logout</button>
          </div>
        </header>

        <nav className="welcome-nav">
          <ul>
            <li><Link to="/elite/home">Home</Link></li>
            <li><Link to="/elite/dashboard">Dashboard</Link></li>
            <li><Link to="/elite/achievement">Achievement</Link></li>
            <li><Link to="/elite/coach">Coach</Link></li>
            <li><Link to="/elite/community">Community</Link></li>
            <li><Link to="/elite/feedback">Feedback</Link></li>
          </ul>
        </nav>

        <main className="form-container">
          <form className="edit-profile-form" onSubmit={handleSubmit}> 
            <h2 className="form-title">Edit Your Profile</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input type="text" id="firstname" name="firstname" value={profile.firstname} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" name="lastname" value={profile.lastname} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group" style={{marginBottom: '20px'}}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={profile.email} onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quitDate">Quit Date</label>
                <input type="date" id="quitDate" name="quitDate" value={profile.quitDate} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="formerDailyUsage">Former Daily Usage</label>
                <input type="number" id="formerDailyUsage" name="formerDailyUsage" value={profile.formerDailyUsage} onChange={handleInputChange} min="1" />
                <span className="usage-note">cigarettes per day</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="primaryMotivation">Primary Motivation</label>
              <select id="primaryMotivation" name="primaryMotivation" value={profile.primaryMotivation} onChange={handleInputChange}>
                <option>Better Health</option>
                <option>Save Money</option>
                <option>Family</option>
                <option>Social Reasons</option>
                <option>Other</option>
              </select>
            </div>

            {/* New Subscription Section */}
            <div className="subscription-section">
              <h3 className="subscription-title">Subscription Details</h3>
              <button 
                type="button" 
                className="view-sub-btn-new" 
                onClick={() => navigate('/elite-subscription')}
              >
                Manage My Subscription
              </button>
            </div>

            <div className="form-buttons">
              <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="save-btn">Save Changes</button>
            </div>
          </form>
        </main>
        
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

export default EliteEditProfile;
