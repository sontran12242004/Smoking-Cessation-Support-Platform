import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import cigaretteHouse from '../assets/cigarette_house.png';
import journeyPath from '../assets/journey_path.jpg';
import stayImage from '../assets/stay.png';
import quitImage from '../assets/quit.png';

const StandardMemberHome = () => {
  const navigate = useNavigate();
  
  const handleNotificationClick = () => {
    navigate('/standard/notification');
  };

  // Refs for scroll animation
  const checkinSectionRef = useRef(null);
  const planButtonRef = useRef(null);
  const communityUpdateRef = useRef(null);
  const dashboardLinkRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const refs = [checkinSectionRef, planButtonRef, communityUpdateRef, dashboardLinkRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const styles = `
    .standard-home-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-family: Arial, sans-serif;
        background-color: #f0f2f5;
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
        transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        box-shadow: 0 2px 8px rgba(76,175,80,0.10);
        outline: none;
    }

    .profile-btn:hover {
        background-color: #388E3C;
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 4px 16px rgba(76,175,80,0.18);
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

    .standard-nav {
        background-color: #fff;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    .standard-nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        gap: 40px;
    }

    .standard-nav a {
        text-decoration: none;
        color: #5EBB34;
        font-weight: 400;
        font-size: 16px;
        padding: 5px 0;
        position: relative;
        transition: color 0.3s;
    }

    .standard-nav a::after {
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

    .standard-nav a:hover::after, .standard-nav a:focus::after, .standard-nav a.active::after {
        transform: scaleX(1);
    }

    .main-content-standard {
        flex-grow: 1;
        padding: 20px;
    }

    .hero-section-standard {
      background-size: cover;
      background-position: center;
      color: #333;
      padding: 60px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 400px;
    }

    .hero-section-standard h2 {
      font-size: 36px;
      margin-bottom: 5px;
      color: #000;
      animation: slideInUp 0.8s ease-out forwards;
    }

    .hero-section-standard p {
      font-size: 18px;
      margin-bottom: 5px;
      color: #000;
      animation: slideInUp 0.8s ease-out 0.2s forwards;
      opacity: 0;
    }

    .hero-section-standard .welcome-name {
      color: #4CAF50;
    }

    .stay-quit-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      animation: fadeIn 1.2s ease-out 0.5s forwards;
      opacity: 0;
    }

    .stay-img {
      max-width: 260px;
      height: auto;
      margin-bottom: -104px;
    }

    .quit-img {
      max-width: 520px;
      height: auto;
    }

    .checkin-section {
      background-color: #E6FFFE;
      padding: 40px 20px;
      text-align: center;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-wrap: wrap;
      border-top: 9px solid #3A8985;
    }

    .checkin-left-column {
      flex: 1;
      min-width: 300px;
      padding-right: 20px;
      text-align: left;
    }

    .checkin-right-column {
      flex: 1;
      min-width: 300px;
      padding-left: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .checkin-right-column img {
      max-width: 100%;
      height: auto;
    }

    .checkin-section h2 {
      font-size: 50px;
      color: #3A8985;
      margin-bottom: 20px;
      line-height: 1.0;
    }

    .checkin-questions {
      display: flex;
      flex-direction: column;
      gap: 20px;
      text-align: left;
      flex: 1;
      min-width: 300px;
      max-width: 50%;
      padding-right: 20px;
    }

    .checkin-question {
      font-size: 18px;
      color: #3A8985;
      font-weight: bold;
    }

    .checkin-buttons {
      display: flex;
      gap: 15px;
      margin-top: 10px;
      flex-wrap: wrap;
    }

    .checkin-buttons button {
      border: none;
      border-radius: 8px;
      padding: 12px 25px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
      font-weight: bold;
      white-space: nowrap;
    }

    .checkin-button-green {
      background-color: #3A8985;
      color: #fff;
    }

    .checkin-button-green:hover {
      background-color: #2e6b66;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .checkin-button-yellow {
      background-color: #F7F584;
      color: #898708;
    }

    .checkin-button-yellow:hover {
      background-color: #e6c200;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .diary-button {
      background-color: #3A8985;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 8px 15px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
      margin-top: 20px;
      display: inline-block; 
    }

    .diary-button:hover {
      background-color: #2F6E6B; 
      transform: translateY(-1px);
    }

    .create-plan-button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 15px 30px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
      margin: 40px auto;
      display: block;
    }

    .create-plan-button:hover {
      background-color: #388E3C;
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .community-update-section {
      background-color: #DFF5DE;
      padding: 40px 20px;
      text-align: center;
    }

    .community-update-section h2 {
      font-size: 28px;
      color: #4CAF50;
      margin-bottom: 20px;
    }

    .community-milestone-text {
      color: #4CAF50;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .community-message {
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
      text-align: left;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      animation: fadeIn 1s ease-in-out forwards;
      animation-delay: 0.3s;
    }

    .community-message p {
      font-size: 16px;
      color: #555;
    }

    .community-message .author {
      font-weight: bold;
      color: #333;
      margin-top: 10px;
      display: block;
    }

    .join-discussion-link {
      color: #4CAF50;
      font-weight: bold;
      text-decoration: none;
      margin-top: 20px;
      display: inline-block;
      transition: color 0.2s;
      animation: fadeIn 1s ease-in-out forwards;
      animation-delay: 0.4s;
    }

    .join-discussion-link:hover {
      color: #388E3C;
    }

    .view-dashboard-link {
      color: #fff;
      background-color: #4CAF50;
      border: none;
      border-radius: 5px;
      padding: 15px 30px;
      font-weight: bold;
      text-decoration: none;
      margin-top: 40px;
      display: inline-block;
      font-size: 18px; 
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }

    .view-dashboard-link:hover {
      background-color: #388E3C; 
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .standard-footer {
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

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .hero-section-standard h2, .hero-section-standard p, .stay-quit-text {
        opacity: 0;
    }

    .hero-section-standard h2 {
      animation: slideInUp 0.8s ease-out forwards;
    }
    
    .hero-section-standard p {
        animation: slideInUp 0.8s ease-out 0.2s forwards;
    }

    .stay-quit-text {
        animation: fadeIn 1.2s ease-out 0.5s forwards;
    }

    .animate-on-scroll {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .animate-on-scroll.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  return (
    <div className="standard-home-container">
      <style>{styles}</style>
      <header className="welcome-header">
        <div className="header-left">
          <button className="profile-btn" onClick={() => navigate('/standard/dashboard')}>
            Standard Member
          </button>
        </div>
        <div className="header-center">
            <div className="app-name">
              <h1>NicOff</h1>
              <p>Turn Off Nicotine, Turn On Life!</p>
            </div>
        </div>
        <div className="header-right">
          <span className="notification-icon" onClick={handleNotificationClick}>🔔</span>
          <button className="logout-button" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </header>
      <nav className="standard-nav">
        <ul>
          <li><NavLink to="/standard/home" className="active">Home</NavLink></li>
          <li><NavLink to="/standard/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/standard/achievement">Achievement</NavLink></li>
          <li><NavLink to="/standard/coach">Coach</NavLink></li>
          <li><NavLink to="/standard/community">Community</NavLink></li>
          <li><NavLink to="/standard/feedback">Feedback</NavLink></li>
        </ul>
      </nav>

      <main className="main-content-standard">
        <section className="hero-section-standard" style={{ backgroundImage: `linear-gradient(rgba(223, 245, 222, 0.7), rgba(223, 245, 222, 0.7)), url(${journeyPath})` }}>
          <h2>Welcome back, <span className="welcome-name">Member!</span> 👋</h2>
          <p>How are you feeling today?</p>
          <p>-remember to-</p>
          <div className="stay-quit-text">
            <img src={stayImage} alt="STAY" className="stay-img" />
            <img src={quitImage} alt="QUIT" className="quit-img" />
          </div>
        </section>

        <section className="checkin-section animate-on-scroll" ref={checkinSectionRef}>
          <div className="checkin-left-column">
            <h2>Today's<br/>Check-In:</h2>
            <p className="checkin-question">Did you smoke today?</p>
            <div className="checkin-buttons">
              <button className="checkin-button-green">Yes, I slipped up</button>
              <button className="checkin-button-yellow">No, I stayed strong!</button>
            </div>
            <p className="checkin-question">After a day without smoking, how do you feel?</p>
            <div className="checkin-buttons">
              <button className="checkin-button-green">I feel unbearable</button>
              <button className="checkin-button-yellow">I feel uncomfortable but still tolerable</button>
            </div>
            <button className="diary-button" onClick={() => navigate('/standard/daily-checkin')}>Go To My Diary</button>
          </div>
          <div className="checkin-right-column">
            <img src={cigaretteHouse} alt="Cigarette House" />
          </div>
        </section>

        <button className="create-plan-button animate-on-scroll" ref={planButtonRef} onClick={() => navigate('/standard/questionnaire')}>Create My Quit Plan →</button>

        <section className="community-update-section animate-on-scroll" ref={communityUpdateRef}>
          <h2>Community Update</h2>
          <p className="community-milestone-text">5 users just hit the 1-month smoke-free milestone!</p>
          <div className="community-message">
            <p>👤 Alex <span style={{float: 'right', fontSize: '0.8em', color: '#888'}}>Just now</span></p>
            <p>"I used the money I saved to buy a new bike!"</p>
          </div>
          <a href="#" className="join-discussion-link">Join the discussion →</a>
        </section>

        <section ref={dashboardLinkRef} className="animate-on-scroll" style={{textAlign: 'center', padding: '40px 20px', backgroundColor: '#DFF5DE'}}>
          <Link to="/standard/dashboard" className="view-dashboard-link">View Your Dashboard →</Link>
        </section>
      </main>

      <footer className="standard-footer">
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

export default StandardMemberHome;
