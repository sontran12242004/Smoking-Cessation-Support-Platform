import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import cigaretteHouse from '../assets/cigarette_house.png';
import journeyPath from '../assets/journey_path.jpg';
import stayImage from '../assets/stay.png';
import quitImage from '../assets/quit.png';

const EliteHome = () => {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);

  const handleNotificationClick = () => {
    navigate('/elite/notification');
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
        threshold: 0.1, // Animate when 10% of the element is visible
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
    .elite-home-container {
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

    .main-content-elite {
        flex-grow: 1;
        padding: 20px;
    }

    .hero-section-elite {
      background-size: cover;
      background-position: center;
      color: #333;
      padding: 60px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 400px; /* Adjust height as needed */
    }

    .hero-section-elite h2 {
      font-size: 36px;
      margin-bottom: 5px; /* Reduced margin-bottom to bring text closer */
      color: #000; /* Adjust color for 'Welcome back, John!' */
      animation: slideInUp 0.8s ease-out forwards;
    }

    .hero-section-elite p {
      font-size: 18px;
      margin-bottom: 5px; /* Reduced margin-bottom to bring text closer */
      color: #000; /* Adjust color for other text */
      animation: slideInUp 0.8s ease-out 0.2s forwards;
      opacity: 0; /* Start with opacity 0 to let animation handle it */
    }

    .hero-section-elite .welcome-name {
      color: #4CAF50; /* Color for 'John!' */
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
      background-color: #E6FFFE; /* New background color */
      padding: 40px 20px;
      text-align: center;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-wrap: wrap;
      border-top: 9px solid #3A8985; /* Increased border thickness */
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
      justify-content: flex-end; /* Align content to the right */
      align-items: center;
    }

    .checkin-right-column img {
      max-width: 100%;
      height: auto;
    }

    .checkin-section h2 {
      font-size: 50px; /* Increased font size */
      color: #3A8985; /* New color */
      margin-bottom: 20px;
      line-height: 1.0; /* Adjust line height for the two lines */
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
      color: #3A8985; /* New color */
      font-weight: bold; /* Make it bold as in the image */
    }

    .checkin-buttons {
      display: flex;
      gap: 15px; /* Increased gap between buttons */
      margin-top: 10px;
      flex-wrap: wrap; /* Allow buttons to wrap */
    }

    .checkin-buttons button {
      border: none;
      border-radius: 8px; /* More rounded corners */
      padding: 12px 25px; /* Increased padding */
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
      font-weight: bold; /* Make button text bold */
      white-space: nowrap; /* Prevent text from wrapping inside button */
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
      background-color: #F7F584; /* New background color */
      color: #898708; /* New text color */
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
      margin-top: 20px; /* Space from the check-in buttons */
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
      margin: 40px auto; /* Centered horizontally with auto margins */
      display: block; /* Ensures it takes full width for auto margin to work */
    }

    .create-plan-button:hover {
      background-color: #388E3C;
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .community-update-section {
      background-color: #DFF5DE; /* New background color */
      padding: 40px 20px;
      text-align: center;
    }

    .community-update-section h2 {
      font-size: 28px;
      color: #4CAF50; /* Changed to green */
      margin-bottom: 20px;
    }

    .community-milestone-text {
      color: #4CAF50; /* Changed to green */
      font-weight: bold; /* Added bold as in the image */
      margin-bottom: 20px;
    }

    .community-message {
      background-color: #fff; /* Changed back to white */
      border-radius: 10px;
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
      text-align: left;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Keep box shadow for card effect */
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
      color: #fff; /* Changed text color to white */
      background-color: #4CAF50; /* Added background color */
      border: none; /* Removed border */
      border-radius: 5px; /* Matched border-radius */
      padding: 15px 30px; /* Matched padding */
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
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Matched hover box shadow */
    }

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
      color: #4CAF50; /* Keep green color */
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
    
    .hero-section-elite h2, .hero-section-elite p, .stay-quit-text {
        opacity: 0; /* Start hidden for load animation */
    }

    .hero-section-elite h2 {
      animation: slideInUp 0.8s ease-out forwards;
    }
    
    .hero-section-elite p {
        animation: slideInUp 0.8s ease-out 0.2s forwards;
    }

    .stay-quit-text {
        animation: fadeIn 1.2s ease-out 0.5s forwards;
    }

    /* Styles for scroll animations */
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
    <div className="elite-home-container">
      <style>{styles}</style>
      <header className="welcome-header">
        <div className="header-left">
          <button className="profile-btn" onClick={() => navigate('/elite/edit-profile')}>
            Elite Member
          </button>
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
          <span className="notification-icon" onClick={handleNotificationClick}>🔔</span>
          <button className="logout-button" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </header>
      <nav className="elite-nav">
        <ul>
          <li><Link to="/elite/home" className="active">Home</Link></li>
          <li><Link to="/elite/dashboard">Dashboard</Link></li>
          <li><Link to="/elite/achievement">Achievement</Link></li>
          <li><Link to="/elite/coach">Coach</Link></li>
          <li><Link to="/elite/community">Community</Link></li>
          <li><Link to="/elite/feedback">Feedback</Link></li>
        </ul>
      </nav>

      <main className="main-content-elite">
        <section className="hero-section-elite" style={{ backgroundImage: `linear-gradient(rgba(223, 245, 222, 0.7), rgba(223, 245, 222, 0.7)), url(${journeyPath})` }}>
          <h2>Welcome back, <span className="welcome-name">jason!</span> 👋</h2>
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
            <button className="diary-button" onClick={() => navigate('/elite/daily-checkin')}>Go To My Diary</button>
          </div>
          <div className="checkin-right-column">
            <img src={cigaretteHouse} alt="Cigarette House" />
          </div>
        </section>

        <button className="create-plan-button animate-on-scroll" ref={planButtonRef} onClick={() => navigate('/elite/questionnaire')}>Create My Quit Plan →</button>

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
          <Link to="/elite/dashboard" className="view-dashboard-link">View Your Dashboard →</Link>
        </section>
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

export default EliteHome; 