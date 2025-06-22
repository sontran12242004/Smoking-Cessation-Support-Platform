import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import journeyPath from '../assets/journey_path.jpg';

const NotificationCenter = () => {
    const navigate = useNavigate();

    const notifications = [
        {
            title: "New Achievement Unlocked!",
            message: "Congratulations! You've reached 7 days nicotine-free. This is a significant milestone in your journey to better health. Keep up the great work!",
            timestamp: "May 28, 2025 - 10:30 AM"
        },
        {
            title: "Daily Check-in Reminder",
            message: "Don't forget to log your progress today. Tracking your journey helps you stay motivated and accountable. It only takes a minute!",
            timestamp: "May 28, 2025 - 8:15 AM"
        },
        {
            title: "Community Message",
            message: "Sarah replied to your post in the support group: \"Your progress is inspiring! I'm on day 3 and your story gives me hope to keep going.\"",
            timestamp: "May 27, 2025 - 4:45 PM"
        },
        {
            title: "New Educational Content",
            message: "We've added a new article about managing cravings during social situations. Check it out in the Resources section.",
            timestamp: "May 26, 2025 - 11:20 AM"
        },
        {
            title: "Welcome to NicOff!",
            message: "Thank you for joining NicOff! We're excited to support you on your journey to a nicotine-free life. Start by exploring your dashboard.",
            timestamp: "May 21, 2025 - 9:00 AM"
        }
    ];

    const handleLogout = () => {
        console.log("Logout");
        navigate("/login");
    };
    
    const handleNotificationClick = () => {
        navigate('/standard/notification');
    };

    return (
        <div className="container" style={{ background: `url(${journeyPath}) center/cover no-repeat` }}>
            <style>{`
    html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
    }
    .container {
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
    .welcome-nav a:hover::after, .welcome-nav a.active::after {
      transform: scaleX(1);
    }
    .notifications-container {
        flex: 1;
        padding: 40px;
    }
    .notifications-content {
        max-width: 800px;
        margin: 0 auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .notifications-header {
        text-align: center;
        margin-bottom: 30px;
    }
    .notifications-header h2 {
        font-size: 28px;
        color: #333;
    }
    .notification-list {
        list-style: none;
        padding: 0;
    }
    .notification-item {
        display: flex;
        padding: 20px 0;
        border-bottom: 1px solid #eee;
    }
    .notification-item:last-child {
        border-bottom: none;
    }
    .notification-indicator {
        width: 4px;
        background-color: #4CAF50;
        margin-right: 20px;
        border-radius: 2px;
    }
    .notification-details {
        flex: 1;
    }
    .notification-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin: 0 0 5px 0;
    }
    .notification-message {
        font-size: 16px;
        color: #666;
        margin: 0 0 10px 0;
    }
    .notification-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .notification-timestamp {
        font-size: 14px;
        color: #999;
    }
    .mark-as-read {
        font-size: 14px;
        color: #4CAF50;
        cursor: pointer;
        text-decoration: underline;
    }
    .elite-footer {
        background-color: #333; 
        color: #fff;
        padding: 30px 20px;
        text-align: center;
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
    .copyright {
        border-top: 1px solid #555;
        padding-top: 15px;
        margin-top: 15px;
    }
    .newsletter-input {
      padding: 8px;
      border: none;
      border-radius: 5px;
      margin-right: 10px;
      width: 150px;
    }
    .newsletter-button {
      padding: 8px 12px;
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
            `}</style>
            <div style={{ backgroundColor: 'rgba(223, 245, 222, 0.8)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <header className="welcome-header">
                    <div className="header-left">
                        <button className="profile-btn" onClick={() => navigate('/standard/edit-profile')}>Standard Member</button>
                    </div>
                    <div className="header-center">
                        <h1>NicOff</h1>
                        <p>Turn Off Nicotine, Turn On Life!</p>
                    </div>
                    <div className="header-right">
                        <span className="notification-icon" onClick={handleNotificationClick}>🔔</span>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                </header>
                <nav className="welcome-nav">
                    <ul>
                        <li><NavLink to="/standard/home">Home</NavLink></li>
                        <li><NavLink to="/standard/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/standard/achievement">Achievement</NavLink></li>
                        <li><NavLink to="/standard/coach">Coach</NavLink></li>
                        <li><NavLink to="/standard/community">Community</NavLink></li>
                        <li><NavLink to="/standard/feedback">Feedback</NavLink></li>
                    </ul>
                </nav>
                <main className="notifications-container">
                    <div className="notifications-content">
                        <div className="notifications-header">
                            <h2>Notifications</h2>
                        </div>
                        <ul className="notification-list">
                            {notifications.map((notification, index) => (
                                <li key={index} className="notification-item">
                                    <div className="notification-indicator"></div>
                                    <div className="notification-details">
                                        <h3 className="notification-title">{notification.title}</h3>
                                        <p className="notification-message">{notification.message}</p>
                                        <div className="notification-meta">
                                            <span className="notification-timestamp">{notification.timestamp}</span>
                                            <span className="mark-as-read">Mark as Read</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
                <footer className="elite-footer">
                    <div className="footer-content">
                        <div className="footer-column">
                            <h3>NicOff</h3>
                            <p>We're dedicated to helping you break free from smoking addiction through science-backed methods and community support</p>
                        </div>
                        <div className="footer-column">
                            <h3>Quick Links</h3>
                            <NavLink to="/about-us">About Us</NavLink>
                            <NavLink to="/our-programs">Our Programs</NavLink>
                            <NavLink to="/success-stories">Success Stories</NavLink>
                            <NavLink to="/blog">Blog</NavLink>
                            <NavLink to="/contact">Contact</NavLink>
                        </div>
                        <div className="footer-column">
                            <h3>Support</h3>
                            <NavLink to="/faq">FAQ</NavLink>
                            <NavLink to="/help-center">Help Center</NavLink>
                            <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                            <NavLink to="/terms-of-service">Term Of Service</NavLink>
                            <NavLink to="/cookie-policy">Cookie Policy</NavLink>
                        </div>
                        <div className="footer-column">
                            <h3>NewsLetter</h3>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                <input type="email" placeholder="Your Email Address..." className="newsletter-input" />
                                <button className="newsletter-button">Subscribe</button>
                            </div>
                            <p style={{ fontSize: '0.8em', color: '#ccc' }}>Get the latest tips and motivation to stay smoke-free delivered to your inbox</p>
                        </div>
                    </div>
                    <div className="copyright">
                        <p>© 2025 NicOff. All rights reserved</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default NotificationCenter; 