import React from 'react';

function WelcomePage() {
  const styles = `
/* react-app/src/components/WelcomePage.css */

html,
body,
#root {
    width: 100%;
    height: 100%;
    margin: 0;
}

.welcome-page-container {
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
    background-color: #e0f2f7;
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
    align-items: center;
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
    color: #555;
    font-weight: bold;
    padding: 5px 0;
    transition: color 0.3s ease, transform 0.2s ease;
}

.welcome-nav a:hover {
    color: #4CAF50;
    transform: translateY(-2px);
}

.welcome-main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('https://via.placeholder.com/1500x800?text=Journey+Path'); /* Updated Placeholder Image */
    background-size: cover;
    background-position: center;
    color: #fff;
    padding: 20px;
}

.welcome-message-card {
    animation: fadeIn 1.5s ease-out;
    background-color: #fff;
    color: #333;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 40px;
    text-align: center;
    max-width: 700px;
}

.welcome-message-card h2 {
    font-size: 36px;
    color: #4CAF50;
    margin-bottom: 20px;
}

.welcome-message-card .bold-message {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 1.5;
}

.welcome-message-card .highlight {
    color: #4CAF50;
    font-style: italic;
}

.welcome-message-card .quote {
    font-size: 18px;
    font-style: italic;
    color: #666;
    margin-bottom: 30px;
}

.explore-button {
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 15px 30px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.explore-button:hover {
    background-color: #45a049;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.features-section {
  background-color: #fff;
  padding: 60px 20px;
  text-align: center;
}

.features-section h2 {
  font-size: 32px;
  color: #333;
  margin-bottom: 40px;
}

.features-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.feature-card {
  animation: fadeIn 1.5s ease-out;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 280px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 48px;
  color: #4CAF50;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 22px;
  color: #333;
  margin-bottom: 10px;
}

.feature-card p {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

.testimonials-section {
  background-color: #f0f2f5;
  padding: 60px 20px;
  text-align: center;
}

.testimonials-section h2 {
  font-size: 32px;
  color: #333;
  margin-bottom: 40px;
}

.testimonials-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.testimonial-card {
  animation: fadeIn 1.5s ease-out;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 350px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.testimonial-text {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
  font-style: italic;
}

.testimonial-author {
  font-size: 16px;
  color: #4CAF50;
  font-weight: bold;
  text-align: right;
}


.welcome-footer {
    background-color: #333;
    color: #fff;
    padding: 40px;
    text-align: center;
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
    color: #4CAF50;
}

.footer-section p,
.footer-section ul {
    font-size: 14px;
    line-height: 1.6;
    color: #ccc;
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
    color: #ccc;
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
    padding-top: 20px;
    font-size: 14px;
    color: #aaa;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .welcome-header,
  .welcome-nav ul {
    padding: 10px 20px;
    gap: 20px;
  }

  .footer-content {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .footer-section {
    min-width: unset;
    width: 90%;
  }

  .newsletter input[type="email"] {
    width: 80%;
  }
}

@media (max-width: 768px) {
  .welcome-header {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }

  .header-left,
  .header-right {
    margin-top: 10px;
    justify-content: center;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 15px;
  }

  .welcome-nav ul {
    flex-wrap: wrap;
    gap: 15px;
  }

  .welcome-main {
    padding: 20px;
  }

  .welcome-message-card {
    padding: 30px;
    max-width: 90%;
  }

  .welcome-message-card h2 {
    font-size: 28px;
  }

  .welcome-message-card .bold-message {
    font-size: 20px;
  }

  .features-container,
  .testimonials-container {
    flex-direction: column;
    align-items: center;
  }

  .feature-card,
  .testimonial-card {
    max-width: 90%;
  }

  .welcome-footer {
    padding: 30px 20px;
  }

  .footer-section h3 {
    text-align: center;
  }

  .footer-section ul,
  .footer-section p {
    text-align: center;
  }

  .newsletter input[type="email"] {
    width: 90%;
  }
}

@media (max-width: 480px) {
  .profile-status,
  .logout-button {
    font-size: 12px;
    padding: 6px 12px;
  }

  .header-center .app-name h1 {
    font-size: 20px;
  }

  .header-center .app-name p {
    font-size: 12px;
  }

  .welcome-nav a {
    font-size: 14px;
  }

  .explore-button {
    font-size: 16px;
    padding: 12px 25px;
  }

  .testimonials-section h2,
  .features-section h2,
  


  .testimonial-text,
  .feature-card p {
    font-size: 14px;
  }

  .testimonial-author,
  .feature-card h3 {
    font-size: 18px;
  }

  .footer-section h3 {
    font-size: 18px;
  }

  .footer-section p,
  .footer-section ul,
  .newsletter input,
  .newsletter button,
  .copyright {
    font-size: 12px;
  }
}
`;

  return (
    <div className="welcome-page-container">
      <style>{styles}</style>
      {/* Header */}
      <header className="welcome-header">
        <div className="header-left">
          <div className="profile-status">
            <button className="profile-btn" onClick={() => {}}>
              <span className="profile-icon">👤</span> Premium Member
            </button>
          </div>
        </div>
        <div className="header-center">
          <div className="logo-section">
            <span className="logo">LOGO</span>
            <div className="app-name">
              <h1>NicOff</h1>
              <p>Turn Off Nicotine, Turn On Life!</p>
            </div>
          </div>
        </div>
        <div className="header-right">
          <i className="notification-icon">🔔</i>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      <nav className="welcome-nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Achievement</a></li>
          <li><a href="#">Coach</a></li>
          <li><a href="#">Community</a></li>
          <li><a href="#">Feedback</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="welcome-main">
        <section className="welcome-message-card">
          <h2>Welcome to NicOff!</h2>
          <p className="bold-message">
            Congratulations on taking the first step toward<br />
            <span className="highlight">a nicotine-free life!</span><br />
            You've just joined a community of people<br />
            <span className="highlight">supporting each other</span><br />
            in turning off nicotine and turning on life.
          </p>
          <p className="quote">"Every journey begins with a single step - you've just taken yours!"</p>
          <button className="explore-button">Explore NicOff Now ➔</button>
        </section>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose NicOff?</h2>
        <div className="features-container">
          <div className="feature-card">
            <i className="feature-icon">📈</i>
            <h3>Comprehensive Tracking</h3>
            <p>Monitor your progress with detailed analytics and insights.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">🤝</i>
            <h3>Supportive Community</h3>
            <p>Connect with others, share experiences, and get encouragement.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">💡</i>
            <h3>Expert Tips & Guidance</h3>
            <p>Receive daily tips and expert advice to stay on track.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">🎯</i>
            <h3>Personalized Coaching</h3>
            <p>Get one-on-one guidance from dedicated coaches.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <p className="testimonial-text">"NicOff has been a game-changer for me. I never thought I could quit, but their support and resources made it possible!"</p>
            <p className="testimonial-author">- Jane Doe</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"The community aspect is incredible. It's motivating to connect with others on the same journey."</p>
            <p className="testimonial-author">- John Smith</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"Weekly tips and personal coach guidance kept me on track. Highly recommend NicOff to anyone serious about quitting."</p>
            <p className="testimonial-author">- Emily White</p>
          </div>
        </div>
      </section>
      

      {/* Footer */}
      <footer className="welcome-footer">
        <div className="footer-content">
          <div className="footer-section about-nic-off">
            <h3>NicOff</h3>
            <p>
              We're dedicated to helping you break<br />
              free from smoking addiction through<br />
              science-backed methods and<br />
              community support
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Programs</a></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Term Of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="footer-section newsletter">
            <h3>NewsLetter</h3>
            <input type="email" placeholder="Your Email Address..." />
            <button>Subscribe</button>
            <p>
              Get the latest tips and<br />
              motivation to stay smoke-free<br />
              delivered to your inbox
            </p>
          </div>
        </div>
        <div className="copyright">
          © 2025 NicOff. All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default WelcomePage; 