import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import landingBg from "./assets/landing.jpg";
import PaymentCallback from "./PaymentCallback";

export default function LandingPage() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [searchParams] = useSearchParams();
  const [isPaymentCallback, setIsPaymentCallback] = useState(false);

  useEffect(() => {
    // Check if this is a payment callback from VNPay
    // Handle special URL format: /?packageID=3?paymentID=11&vnp_Amount=3999000...
    const currentUrl = window.location.href;
    
    const hasPackageID = currentUrl.includes('packageID=');
    const hasPaymentID = currentUrl.includes('paymentID=');
    const hasVnpResponse = searchParams.get('vnp_ResponseCode');
    
    const hasPaymentParams = hasPackageID && hasPaymentID && hasVnpResponse;
    
    setIsPaymentCallback(hasPaymentParams);
  }, [searchParams]);

  const handleFeatureClick = (e) => {
    e.preventDefault();
    setShowLoginPopup(true);
  };

  // If this is a payment callback, render the PaymentCallback component
  if (isPaymentCallback) {
    return <PaymentCallback />;
  }

  return (
    <div className="landing-root">
      {/* Header */}
      <header className="welcome-header">
        <div className="header-left"></div>
        <div className="header-center">
          <div className="logo-section">
            <div className="app-name">
              <h1>NicOff</h1>
              <p>Turn Off Nicotine, Turn On Life!</p>
            </div>
          </div>
        </div>
        <div className="header-right">
          <a href="/login" className="login-btn">
            Login
          </a>
          <a href="/signup" className="signup-btn">
            Sign Up
          </a>
        </div>
      </header>
      {/* Navigation */}
      <nav className="welcome-nav">
        <ul>
          <li>
            <a href="#" onClick={handleFeatureClick}>
              Home
            </a>
          </li>
          <li>
            <a href="#" onClick={handleFeatureClick}>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" onClick={handleFeatureClick}>
              Achievement
            </a>
          </li>
          <li>
            <a href="#" onClick={handleFeatureClick}>
              Coach
            </a>
          </li>
          <li>
            <a href="#" onClick={handleFeatureClick}>
              Community
            </a>
          </li>
          <li>
            <a href="#" onClick={handleFeatureClick}>
              Feedback
            </a>
          </li>
        </ul>
      </nav>

      {/* Login Required Popup */}
      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="login-popup">
            <div className="popup-content">
              <h2>Login Required</h2>
              <p>You need to login to access this feature</p>
              <div className="popup-buttons">
                <button
                  className="popup-login-btn"
                  onClick={() => (window.location.href = "/login")}
                >
                  Go to Login
                </button>
                <button
                  className="popup-close-btn"
                  onClick={() => setShowLoginPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        className="landing-bg"
        style={{
          background: `url(${landingBg}) center center/cover no-repeat`,
          minHeight: "800px",
          width: "100%",
        }}
      >
        <div className="landing-content" style={{ padding: "40px 0 0 7vw" }}>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              marginBottom: 0,
              color: "#222",
              lineHeight: 1.1,
            }}
          >
            Journey To
            <br />
            <span style={{ color: "#43b72a" }}>A Smoke-Free Life</span>
          </h1>
          <p
            style={{
              fontSize: 20,
              color: "#222",
              margin: "32px 0 24px 0",
              maxWidth: 480,
            }}
          >
            We accompany you on the path to quitting smoking, aiming for a
            healthy and energetic life.
          </p>
          <div
            className="landing-benefits"
            style={{
              fontSize: 18,
              color: "#222",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div>
              <span role="img" aria-label="money" style={{ marginRight: 8 }}>
                💰
              </span>{" "}
              Save money
            </div>
            <div>
              <span role="img" aria-label="lungs" style={{ marginRight: 8 }}>
                🫁
              </span>{" "}
              Healthier lungs
            </div>
            <div>
              <span role="img" aria-label="heart" style={{ marginRight: 8 }}>
                ❤️
              </span>{" "}
              Reduced risk of heart disease
            </div>
          </div>
        </div>
      </div>

      {/* Harms of Smoking Section */}
      <section className="harms-section">
        <h2 className="harms-title">Harms of Smoking</h2>
        <div className="harms-desc">
          Understanding the harms of smoking is the first step toward the
          determination to quit.
        </div>
        <div className="harms-cards">
          <div className="harms-card">
            <div className="harms-icon" style={{ background: "#ffe3e3" }}>
              <span role="img" aria-label="lung">
                🫁
              </span>
            </div>
            <div className="harms-card-title">
              Chronic Obstructive Pulmonary Disease (COPD)
            </div>
            <div className="harms-card-desc">
              Smoking is the main cause of COPD, a group of progressive lung
              diseases that impair breathing and cannot be fully reversed.
            </div>
            <div
              className="harms-card-stat"
              style={{ background: "#eaf7ea", color: "#3a7d3a" }}
            >
              <b>90%</b>
              <br />
              <span style={{ fontWeight: 400 }}>
                of COPD-related deaths are linked to smoking.
              </span>
            </div>
          </div>
          <div className="harms-card">
            <div className="harms-icon" style={{ background: "#fff3e3" }}>
              <span role="img" aria-label="cancer">
                🦠
              </span>
            </div>
            <div className="harms-card-title">Cancer</div>
            <div className="harms-card-desc">
              Smoking increases the risk of many types of cancer—not only lung
              cancer, but also cancers of the mouth, throat, esophagus, stomach,
              pancreas, and bladder.
            </div>
            <div
              className="harms-card-stat"
              style={{ background: "#f3f7ea", color: "#7d7d3a" }}
            >
              <b>30%</b>
              <br />
              <span style={{ fontWeight: 400 }}>
                of cancer-related deaths are linked to smoking.
              </span>
            </div>
          </div>
          <div className="harms-card">
            <div className="harms-icon" style={{ background: "#ffeaea" }}>
              <span role="img" aria-label="heart">
                ❤️
              </span>
            </div>
            <div className="harms-card-title">Cardiovascular Disease</div>
            <div className="harms-card-desc">
              Smoking increases the risk of heart diseases, including heart
              attacks, strokes, peripheral artery disease, and aortic aneurysms.
            </div>
            <div
              className="harms-card-stat"
              style={{ background: "#eaf7f3", color: "#3a7d7d" }}
            >
              <b>25%</b>
              <br />
              <span style={{ fontWeight: 400 }}>
                of cardiovascular deaths are linked to smoking.
              </span>
            </div>
          </div>
          <div className="harms-card">
            <div className="harms-icon" style={{ background: "#ffe3f3" }}>
              <span role="img" aria-label="baby">
                👶
              </span>
            </div>
            <div className="harms-card-title">Harm to the Fetus</div>
            <div className="harms-card-desc">
              Pregnant women who smoke have a higher risk of premature birth,
              low birth weight, and other pregnancy complications. Infants also
              face a higher risk of Sudden Infant Death Syndrome (SIDS).
            </div>
            <div
              className="harms-card-stat"
              style={{ background: "#f3f7f3", color: "#7d3a7d" }}
            >
              <b>10%</b>
              <br />
              <span style={{ fontWeight: 400 }}>
                of infant deaths are linked to smoking.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quit Journey Section */}
      <section className="quit-journey-section">
        <h2 className="quit-journey-title">
          Your quit journey: Get support at every stage
        </h2>
        <div className="quit-journey-desc">
          Whether you're thinking about quitting, ready to quit, or need help
          staying smoke free, we've got tips and support to help you at every
          stage. Learn how to get through the tough times, stay focused, and
          quit for good.
          <br />
          <br />
          You deserve a healthier, smoke-free life. Let's get started!
        </div>
        <div className="quit-journey-cards">
          <div className="quit-journey-card">
            <div className="quit-journey-icon" style={{ color: "#ffb800" }}>
              <span role="img" aria-label="lightbulb">
                💡
              </span>
            </div>
            <div className="quit-journey-card-title">Why quit smoking</div>
            <div className="quit-journey-card-desc">
              Learn how quitting smoking can make life better for you and those
              around you. Explore the benefits, understand the hidden costs, and
              get the truth about smoking, stress, and mental health.
            </div>
          </div>
          <div className="quit-journey-card">
            <div className="quit-journey-icon" style={{ color: "#ffb800" }}>
              <span role="img" aria-label="bin">
                🗑️
              </span>
            </div>
            <div className="quit-journey-card-title">Ready to quit smoking</div>
            <div className="quit-journey-card-desc">
              Get the support you need to quit for good! There are more proven
              ways to stop smoking than ever before. Find out what can help with
              cravings and explore expert and community support to keep you on
              track.
            </div>
          </div>
          <div className="quit-journey-card">
            <div className="quit-journey-icon" style={{ color: "#ffd600" }}>
              <span role="img" aria-label="heart">
                💛
              </span>
            </div>
            <div className="quit-journey-card-title">Staying smoke free</div>
            <div className="quit-journey-card-desc">
              Learn how to handle cravings, manage withdrawal symptoms, and get
              back on track if you slip up. Find tips to help you stay focused
              and enjoy a healthier, smoke-free life
            </div>
          </div>
        </div>
      </section>

      {/* Long-Term Harms Timeline Section */}
      <section className="timeline-section">
        <h2 className="timeline-title">Long-Term Harms of Smoking</h2>
        <div className="timeline-desc">
          Smoking doesn't just cause immediate harm—it also leaves serious
          long-term consequences.
        </div>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          <div className="timeline-item timeline-item-right">
            <div className="timeline-dot"></div>
            <div className="timeline-box">
              <div className="timeline-box-title">5–10 Years of Smoking</div>
              <ul>
                <li>Reduced lung function and physical endurance</li>
                <li>Increased risk of respiratory infections</li>
                <li>Premature skin aging and wrinkles</li>
                <li>Yellowing of teeth and fingernails</li>
                <li>Diminished sense of taste and smell</li>
              </ul>
            </div>
          </div>
          <div className="timeline-item timeline-item-left">
            <div className="timeline-dot"></div>
            <div className="timeline-box">
              <div className="timeline-box-title">10–20 Years of Smoking</div>
              <ul>
                <li>
                  2 to 4 times higher risk of developing cardiovascular diseases
                </li>
                <li>Onset of COPD symptoms</li>
                <li>Increased risk of lung cancer and other types of cancer</li>
                <li>Decreased bone density, higher risk of osteoporosis</li>
                <li>Impaired reproductive function</li>
              </ul>
            </div>
          </div>
          <div className="timeline-item timeline-item-right">
            <div className="timeline-dot"></div>
            <div className="timeline-box">
              <div className="timeline-box-title">20–30 Years of Smoking</div>
              <ul>
                <li>High risk of lung cancer and other cancers</li>
                <li>Advanced COPD with frequent shortness of breath</li>
                <li>Severe cardiovascular disease, increased risk of stroke</li>
                <li>Weakened immune system</li>
                <li>Reduced life expectancy by 10–15 years</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Quitting Smoking Section */}
      <section className="benefits-section">
        <h2 className="benefits-title">Benefits of Quitting Smoking</h2>
        <div className="benefits-desc">
          Your body begins to recover as soon as you stop smoking your last
          cigarette.
        </div>
        <div className="benefits-cards">
          <div className="benefits-card">
            <div className="benefits-icon">⏱️</div>
            <div className="benefits-badge">20 minutes</div>
            <div className="benefits-card-title">
              Blood pressure and heart rate decrease
            </div>
            <div className="benefits-card-desc">
              Just 20 minutes after your last cigarette, your blood pressure and
              heart rate begin to return to normal.
              <br />
              12 hours
            </div>
          </div>
          <div className="benefits-card">
            <div className="benefits-icon">🫁</div>
            <div className="benefits-badge">12 hours</div>
            <div className="benefits-card-title">CO levels decrease</div>
            <div className="benefits-card-desc">
              After 12 hours, the level of carbon monoxide in your blood drops
              to normal, allowing oxygen to be transported more efficiently.
            </div>
          </div>
          <div className="benefits-card">
            <div className="benefits-icon">💪</div>
            <div className="benefits-badge">2–12 weeks</div>
            <div className="benefits-card-title">Improved circulation</div>
            <div className="benefits-card-desc">
              Between 2 to 12 weeks, blood circulation improves and lung
              function increases significantly.
            </div>
          </div>
          <div className="benefits-card">
            <div className="benefits-icon">😮‍💨</div>
            <div className="benefits-badge">1–9 months</div>
            <div className="benefits-card-title">CO levels decrease</div>
            <div className="benefits-card-desc">
              Coughing, nasal congestion, and shortness of breath decrease. The
              lungs begin to cleanse themselves, reducing the risk of infection.
            </div>
          </div>
          <div className="benefits-card">
            <div className="benefits-icon">❤️</div>
            <div className="benefits-badge">1 year</div>
            <div className="benefits-card-title">
              Reduced risk of heart disease
            </div>
            <div className="benefits-card-desc">
              After 1 year, the risk of coronary heart disease drops to half
              that of a smoker.
            </div>
          </div>
          <div className="benefits-card">
            <div className="benefits-icon">💓</div>
            <div className="benefits-badge">5–15 years</div>
            <div className="benefits-card-title">
              Blood pressure and heart rate decrease
            </div>
            <div className="benefits-card-desc">
              After 5 to 15 years, the risk of stroke is similar to that of a
              non-smoker.
            </div>
          </div>
          <div className="benefits-card">
            <div className="benefits-icon">🦠</div>
            <div className="benefits-badge">10 years</div>
            <div className="benefits-card-title">
              Reduced risk of lung cancer
            </div>
            <div className="benefits-card-desc">
              After 10 years, the risk of dying from lung cancer is about half
              that of someone who continues to smoke.
            </div>
          </div>
          <div className="benefits-card">
            <div className="benefits-icon">🏆</div>
            <div className="benefits-badge">15 years</div>
            <div className="benefits-card-title">
              Heart disease risk equals that of a non-smoker
            </div>
            <div className="benefits-card-desc">
              After 15 years, the risk of coronary heart disease is the same as
              that of someone who has never smoked.
            </div>
          </div>
        </div>
      </section>

      {/* How NicOff Helps Section */}
      <section className="nicoff-helps-section">
        <h2 className="nicoff-helps-title">How NicOff Helps You Quit?</h2>
        <div className="nicoff-helps-cards">
          <div className="nicoff-helps-card">
            <div className="nicoff-helps-icon" style={{ fontSize: "38px" }}>
              📊
            </div>
            <div className="nicoff-helps-card-title">Progress Tracking</div>
            <div className="nicoff-helps-card-desc">
              Monitor your smoke-free days, money saved, and health improvements
              with our intuitive dashboard and real-time analytics.
            </div>
          </div>
          <div className="nicoff-helps-card">
            <div className="nicoff-helps-icon" style={{ fontSize: "38px" }}>
              🏅
            </div>
            <div className="nicoff-helps-card-title">Achievements</div>
            <div className="nicoff-helps-card-desc">
              Earn badges and rewards as you reach milestones in your quitting
              journey. Celebrate every smoke-free day!
            </div>
          </div>
          <div className="nicoff-helps-card">
            <div className="nicoff-helps-icon" style={{ fontSize: "38px" }}>
              🤝
            </div>
            <div className="nicoff-helps-card-title">Community Support</div>
            <div className="nicoff-helps-card-desc">
              Connect with others who are quitting through our forums and group
              chats. Share tips, struggles, and successes.
            </div>
          </div>
        </div>
      </section>

      {/* Real-life Stories Section */}
      <section className="stories-section">
        <h2 className="stories-title">
          Real-life stories from people who have quit smoking
        </h2>
        <div className="stories-cards">
          <div className="stories-card">
            <div className="stories-quote stories-quote-yellow">“</div>
            <div className="stories-content">
              I smoked for over 25 years, and it wasn't easy breaking the habit.
              But what worked was choosing a quit date and getting help from my
              local Stop Smoking Service. I don't have cravings anymore and will
              never put a cigarette in my mouth again.
            </div>
            <div className="stories-name">Stevie</div>
          </div>
          <div className="stories-card">
            <div className="stories-quote stories-quote-blue">“</div>
            <div className="stories-content">
              I used lozenges to help with cravings. However, when I'm around
              smokers I use a vape. This helped me quit for good. The NicOff app
              also helped. It shows the massive financial savings made. I'm
              totally confident that I have no need to smoke ever again.
            </div>
            <div className="stories-name">Maria</div>
          </div>
          <div className="stories-card">
            <div className="stories-quote stories-quote-yellow">“</div>
            <div className="stories-content">
              The NicOff app really helped me. I liked seeing my progress.
              Recording my goals and reading other people's stories kept me
              motivated. The daily health achievements made me feel proud. It
              was great to see how much money I saved too.
            </div>
            <div className="stories-name">Heather</div>
          </div>
        </div>
      </section>

      {/* Footer - copied 100% from EliteDashboard */}
      <footer className="elite-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>NicOff</h3>
            <p>
              We're dedicated to helping you break free from smoking addiction
              through science-backed methods and community support
            </p>
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
            <input
              type="email"
              placeholder="Your Email Address..."
              className="newsletter-input"
            />
            <button className="newsletter-button">Subscribe</button>
            <p style={{ fontSize: "0.8em", color: "#ccc", marginTop: "10px" }}>
              Get the latest tips and motivation to stay smoke-free delivered to
              your inbox
            </p>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 NicOff. All rights reserved</p>
        </div>
      </footer>

      <style>{`
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
        h1, h2, h3, h4, h5, h6 {
          font-family: Arial, sans-serif;
          font-weight: bold;
          margin: 0 0 12px 0;
        }
        h1 {
          font-size: 40px;
        }
        h2 {
          font-size: 32px;
        }
        h3 {
          font-size: 26px;
        }
        p, .landing-content p, .harms-desc, .quit-journey-desc, .timeline-desc {
          font-family: Arial, sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: #444;
        }
        .landing-benefits div, .harms-card-desc, .harms-card-stat, .quit-journey-card-desc, .timeline-item-desc {
          font-family: Arial, sans-serif;
          font-size: 17px;
          font-weight: 400;
        }
        .harms-card-title, .quit-journey-card-title, .timeline-title {
          font-family: Arial, sans-serif;
          font-size: 22px;
          font-weight: bold;
        }
        .welcome-nav a {
          font-family: Arial, sans-serif;
          font-size: 28px;
          font-weight: bold;
        }
        .app-name h1 {
          margin: 0;
          font-size: 24px;
          color: #4CAF50;
          font-weight: bold;
        }
        .app-name p {
          margin: 0 0 24px 0;
          font-size: 14px;
          color: #666;
        }
        .landing-root {
          min-height: 100vh;
          width: 100%;
          background: #f7f7f7;
          display: flex;
          flex-direction: column;
        }
        .welcome-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0 0 0;
          background: #fff;
          border-bottom: 1px solid #e0e0e0;
        }
        .header-left {
          display: flex;
          align-items: center;
        }
        .header-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .logo-section {
          text-align: center;
        }
        .login-btn, .signup-btn {
          display: inline-block;
          padding: 8px 22px;
          font-size: 16px;
          font-weight: 500;
          border-radius: 999px;
          border: none;
          outline: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .login-btn {
          background: #fff;
          color: #4CAF50;
          border: 2px solid #4CAF50;
        }
        .login-btn:hover {
          background: #4CAF50;
          color: #fff;
          box-shadow: 0 2px 8px #4caf5011;
        }
        .signup-btn {
          background: #4CAF50;
          color: #fff;
          border: 2px solid #4CAF50;
        }
        .signup-btn:hover {
          background: #388E3C;
          color: #fff;
          box-shadow: 0 2px 8px #4caf5011;
        }
        .coach-signup-btn {
          background: #FF9800;
          color: #fff;
          border: 2px solid #FF9800;
        }
        .coach-signup-btn:hover {
          background: #F57C00;
          color: #fff;
          box-shadow: 0 2px 8px #ff980011;
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
        .landing-bg {
          flex: 1;
          width: 100vw;
          min-height: 0;
          display: flex;
          position: relative;
          background: url('/062ee20a141c6c4bd2de0fff189f0328b971bdd0.jpg') center center/cover no-repeat;
        }
        .landing-content {
          padding: 48px 40px 40px 40px;
          max-width: 540px;
          min-width: 320px;
          margin: 48px 6vw 48px 0;
          text-align: left;
        }
        .landing-content h1 {
          font-size: 48px;
          font-weight: 700;
          margin: 0;
          color: #333;
        }
        .landing-content h1 span {
          color: #5eae3a;
        }
        .landing-content p {
          font-size: 20px;
          color: #333;
          margin: 28px 0 36px 0;
        }
        .landing-benefits {
          display: flex;
          flex-direction: column;
          gap: 18px;
          font-size: 20px;
          color: #333;
        }
        .landing-benefits div {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .landing-right {
          flex: 1 1 50%;
          min-width: 320px;
        }
        /* Harms of Smoking Section */
        .harms-section {
          width: 100vw;
          background: linear-gradient(120deg, #eaf7ea 60%, #d2f1e1 100%);
          padding: 48px 0 56px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-x: hidden;
        }
        .harms-title {
          color: #4ca44c;
          font-size: 50px;
          font-weight: bold;
          margin-bottom: 8px;
          text-align: center;
        }
        .harms-desc {
          color: #333;
          font-size: 20px;
          margin-bottom: 36px;
          text-align: center;
        }
        .harms-cards {
          display: flex;
          gap: 32px;
          width: 110vw;
          max-width: 1500px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .harms-card {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 0.8s forwards;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 16px #0001;
          padding: 18px 10px 14px 10px;
          width: 260px;
          height: 300px;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 18px;
        }
        .harms-card:nth-child(1) { animation-delay: 0.1s; }
        .harms-card:nth-child(2) { animation-delay: 0.3s; }
        .harms-card:nth-child(3) { animation-delay: 0.5s; }
        .harms-card:nth-child(4) { animation-delay: 0.7s; }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .harms-card {
          transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s;
        }
        .harms-card:hover {
          transform: scale(1.06) translateY(-6px);
          box-shadow: 0 8px 32px #0002, 0 2px 16px #0001;
          z-index: 2;
        }
        .harms-card:hover .harms-icon {
          animation: shake 0.4s;
        }
        @keyframes shake {
          10% { transform: rotate(-10deg); }
          20% { transform: rotate(8deg); }
          30% { transform: rotate(-6deg); }
          40% { transform: rotate(4deg); }
          50% { transform: rotate(-2deg); }
          60% { transform: rotate(1deg); }
          70% { transform: rotate(0deg); }
        }
        .harms-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 10px;
        }
        .harms-card-title {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 7px;
          color: #222;
        }
        .harms-card-desc {
          color: #444;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .harms-card-stat {
          border-radius: 10px;
          padding: 7px 8px;
          font-size: 14px;
          font-weight: 500;
          margin-top: auto;
          text-align: left;
        }
        @media (max-width: 1100px) {
          .landing-content {
            max-width: 90vw;
            padding: 32px 10vw;
            margin: 32px 0 32px 0;
          }
          .landing-left, .landing-right {
            min-width: 0;
          }
        }
        @media (max-width: 900px) {
          .landing-bg {
            flex-direction: column;
          }
          .landing-left, .landing-right {
            flex: 1 1 100%;
            min-width: 0;
            width: 100vw;
          }
          .landing-content {
            margin: 32px auto;
            text-align: center;
          }
        }
        @media (max-width: 700px) {
          .landing-header, .welcome-nav {
            padding-left: 2vw;
            padding-right: 2vw;
          }
          .landing-content h1 {
            font-size: 32px;
          }
          .landing-content p, .landing-benefits {
            font-size: 16px;
          }
          .landing-content {
            padding: 18px 2vw;
          }
          .harms-title {
            font-size: 24px;
          }
          .harms-desc {
            font-size: 15px;
          }
          .harms-card {
            width: 95vw;
            min-width: 0;
            padding: 20px 10px 16px 10px;
          }
        }
        /* Quit Journey Section */
        .quit-journey-section {
          width: 100vw;
          background: #e3f3ef;
          padding: 56px 0 56px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .quit-journey-title {
          color: #4ca44c;
          font-size: 38px;
          font-weight: bold;
          margin-bottom: 18px;
          text-align: left;
          width: 90vw;
          max-width: 1200px;
        }
        .quit-journey-desc {
          color: #222;
          font-size: 20px;
          margin-bottom: 38px;
          text-align: left;
          width: 90vw;
          max-width: 1200px;
        }
        .quit-journey-cards {
          display: flex;
          gap: 38px;
          width: 90vw;
          max-width: 1200px;
          justify-content: center;
          margin-top: 18px;
        }
        .quit-journey-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 16px #0001;
          padding: 28px 18px 18px 18px;
          width: 320px;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .quit-journey-card:hover {
          transform: translateY(-8px) scale(1.04);
          box-shadow: 0 8px 32px #0002, 0 2px 16px #0001;
        }
        .quit-journey-icon {
          font-size: 48px;
          margin-bottom: 18px;
          transition: transform 0.18s;
        }
        .quit-journey-card:hover .quit-journey-icon {
          transform: scale(1.18) rotate(-8deg);
        }
        .quit-journey-card-title {
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 10px;
          color: #111;
          text-align: center;
        }
        .quit-journey-card-desc {
          color: #222;
          font-size: 15px;
          text-align: center;
        }
        @media (max-width: 1100px) {
          .quit-journey-title, .quit-journey-desc, .quit-journey-cards {
            max-width: 98vw;
            width: 98vw;
          }
          .quit-journey-cards {
            gap: 18px;
          }
        }
        @media (max-width: 900px) {
          .quit-journey-cards {
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }
          .quit-journey-card {
            width: 95vw;
            min-width: 0;
            padding: 20px 10px 16px 10px;
          }
        }
        @media (max-width: 700px) {
          .quit-journey-title {
            font-size: 22px;
          }
          .quit-journey-desc {
            font-size: 14px;
          }
          .quit-journey-card-title {
            font-size: 16px;
          }
          .quit-journey-icon {
            font-size: 32px;
          }
        }
        /* Timeline Section */
        .timeline-section {
          width: 100vw;
          background: linear-gradient(120deg, #eaf7ea 60%, #d2f1e1 100%);
          padding: 56px 0 56px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-x: hidden;
        }
        .timeline-title {
          color: #4ca44c;
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 8px;
          text-align: center;
        }
        .timeline-desc {
          color: #333;
          font-size: 18px;
          margin-bottom: 36px;
          text-align: center;
        }
        .timeline-container {
          position: relative;
          width: 100vw;
          max-width: 900px;
          min-height: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 6px;
          background: linear-gradient(180deg, #4ca44c 0%, #a8e063 100%);
          box-shadow: 0 0 16px #4ca44c55;
          transform: translateX(-50%);
          z-index: 0;
        }
        .timeline-item {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          margin: 48px 0;
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUpTimeline 0.8s forwards;
        }
        .timeline-item:nth-child(2) { animation-delay: 0.1s; }
        .timeline-item:nth-child(3) { animation-delay: 0.3s; }
        .timeline-item:nth-child(4) { animation-delay: 0.5s; }
        @keyframes fadeInUpTimeline {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .timeline-item-left {
          justify-content: flex-start;
        }
        .timeline-item-right {
          justify-content: flex-end;
        }
        .timeline-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 28px;
          background: radial-gradient(circle, #a8e063 60%, #4ca44c 100%);
          border-radius: 50%;
          border: 4px solid #fff;
          z-index: 2;
          box-shadow: 0 0 16px 4px #4ca44c88, 0 0 0 8px #eaf7ea;
          animation: pulseDot 1.6s infinite;
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 16px 4px #4ca44c88, 0 0 0 8px #eaf7ea; }
          50% { box-shadow: 0 0 32px 10px #a8e06388, 0 0 0 16px #eaf7ea; }
          100% { box-shadow: 0 0 16px 4px #4ca44c88, 0 0 0 8px #eaf7ea; }
        }
        .timeline-box {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 4px 32px #4ca44c22, 0 2px 16px #0001;
          padding: 28px 26px 22px 26px;
          width: 320px;
          min-height: 120px;
          margin: 0 0 0 48px;
          font-size: 15px;
          color: #222;
          position: relative;
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .timeline-item-left .timeline-box {
          margin: 0 48px 0 0;
        }
        .timeline-box-title {
          font-weight: bold;
          color: #388e3c;
          font-size: 18px;
          margin-bottom: 10px;
        }
        .timeline-box ul {
          margin: 0;
          padding-left: 18px;
        }
        .timeline-box li {
          margin-bottom: 6px;
        }
        .timeline-box:hover {
          box-shadow: 0 8px 48px #4ca44c55, 0 2px 16px #0001;
          transform: scale(1.04) translateY(-4px);
        }
        @media (max-width: 900px) {
          .timeline-container {
            max-width: 98vw;
          }
          .timeline-box {
            width: 90vw;
            min-width: 0;
            margin: 0 0 0 18px;
          }
          .timeline-item-left .timeline-box {
            margin: 0 18px 0 0;
          }
        }
        @media (max-width: 700px) {
          .timeline-title {
            font-size: 22px;
          }
          .timeline-desc {
            font-size: 14px;
          }
          .timeline-box {
            font-size: 10px;
            padding: 10px 4px 8px 4px;
          }
        }
        /* Benefits Section */
        .benefits-section {
          width: 100vw;
          background: #eaf7ea;
          padding: 56px 0 56px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .benefits-title {
          color: #4ca44c;
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 8px;
          text-align: center;
        }
        .benefits-desc {
          color: #222;
          font-size: 20px;
          margin-bottom: 38px;
          text-align: center;
          font-weight: 600;
        }
        .benefits-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
          width: 100vw;
          max-width: 100vw;
          justify-content: center;
        }
        .benefits-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 16px #0001;
          padding: 28px 18px 18px 18px;
          width: 270px;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.22s, box-shadow 0.22s;
          position: relative;
        }
        .benefits-card:hover {
          transform: translateY(-8px) scale(1.04);
          box-shadow: 0 8px 32px #4ca44c33, 0 2px 16px #0001;
        }
        .benefits-icon {
          font-size: 38px;
          margin-bottom: 10px;
          margin-top: -8px;
          display: block;
          filter: drop-shadow(0 2px 8px #4ca44c22);
          transition: transform 0.18s;
        }
        .benefits-card:hover .benefits-icon {
          transform: scale(1.18) rotate(-8deg);
        }
        .benefits-badge {
          background: #d2f1e1;
          color: #388e3c;
          font-weight: bold;
          font-size: 16px;
          border-radius: 12px;
          padding: 6px 18px;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px #4ca44c11;
        }
        .benefits-card-title {
          font-weight: bold;
          font-size: 17px;
          margin-bottom: 10px;
          color: #222;
        }
        .benefits-card-desc {
          color: #444;
          font-size: 15px;
        }
        @media (max-width: 1100px) {
          .benefits-cards {
            gap: 18px;
          }
        }
        @media (max-width: 900px) {
          .benefits-cards {
            flex-direction: column;
            align-items: center;
            gap: 18px;
          }
          .benefits-card {
            width: 95vw;
            min-width: 0;
            padding: 20px 10px 16px 10px;
          }
        }
        @media (max-width: 700px) {
          .benefits-title {
            font-size: 22px;
          }
          .benefits-desc {
            font-size: 14px;
          }
          .benefits-card-title {
            font-size: 15px;
          }
          .benefits-badge {
            font-size: 13px;
            padding: 4px 10px;
          }
        }
        /* How NicOff Helps Section */
        .nicoff-helps-section {
          width: 100vw;
          background: linear-gradient(120deg, #eaf7ea 60%, #d2f1e1 100%);
          padding: 38px 0 38px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 36px;
          margin: 36px 0 0 0;
        }
        .nicoff-helps-title {
          color: #388e3c;
          font-size: 40px;
          font-weight: bold;
          margin-bottom: 28px;
          text-align: center;
        }
        .nicoff-helps-cards {
          display: flex;
          gap: 32px;
          width: 95vw;
          max-width: 1200px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .nicoff-helps-card {
          background: #fff;
          border-radius: 24px;
          border: 2px solid #4ca44c;
          box-shadow: 0 2px 16px #4ca44c11;
          padding: 32px 24px 24px 24px;
          width: 320px;
          min-height: 210px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .nicoff-helps-card:hover {
          transform: translateY(-8px) scale(1.04);
          box-shadow: 0 8px 32px #4ca44c33, 0 2px 16px #0001;
        }
        .nicoff-helps-icon {
          margin-bottom: 16px;
        }
        .nicoff-helps-card-title {
          font-weight: bold;
          font-size: 22px;
          margin-bottom: 10px;
          color: #333;
          text-align: center;
        }
        .nicoff-helps-card-desc {
          color: #222;
          font-size: 16px;
          text-align: center;
        }
        @media (max-width: 1100px) {
          .nicoff-helps-cards {
            gap: 18px;
          }
        }
        @media (max-width: 900px) {
          .nicoff-helps-cards {
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }
          .nicoff-helps-card {
            width: 95vw;
            min-width: 0;
            padding: 20px 10px 16px 10px;
          }
        }
        @media (max-width: 700px) {
          .nicoff-helps-title {
            font-size: 20px;
          }
          .nicoff-helps-card-title {
            font-size: 16px;
          }
          .nicoff-helps-card-desc {
            font-size: 13px;
          }
        }
        /* Real-life Stories Section */
        .stories-section {
          width: 100vw;
          background: linear-gradient(120deg, #eaf7ea 60%, #d2f1e1 100%);
          padding: 56px 0 56px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stories-title {
          color: #111;
          font-size: 38px;
          font-weight: bold;
          margin-bottom: 28px;
          text-align: left;
          width: 90vw;
          max-width: 1200px;
        }
        .stories-cards {
          display: flex;
          gap: 38px;
          width: 90vw;
          max-width: 1200px;
          justify-content: center;
          margin-top: 18px;
          flex-wrap: wrap;
        }
        .stories-card {
          background: #fff;
          border-radius: 32px;
          box-shadow: 0 4px 32px #4ca44c22, 0 2px 16px #0001;
          padding: 48px 32px 32px 32px;
          width: 340px;
          min-height: 240px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          transition: box-shadow 0.22s, transform 0.22s;
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUpStories 0.8s forwards;
        }
        
        @keyframes fadeInUpStories {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stories-card:hover {
          box-shadow: 0 12px 48px #4ca44c55, 0 2px 16px #0001;
          transform: scale(1.04) translateY(-4px);
          z-index: 2;
        }
        .stories-quote {
          font-size: 70px;
          font-weight: bold;
          line-height: 1;
          margin-bottom: 12px;
          filter: drop-shadow(0 4px 16px #4ca44c33);
          background: linear-gradient(90deg, #ffd600 40%, #fffbe0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .stories-quote-blue {
          background: linear-gradient(90deg, #b3c6ff 40%, #e0eaff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .stories-content {
          color: #222;
          font-size: 18px;
          margin-bottom: 24px;
        }
        .stories-name {
          color: #4ca44c;
          font-size: 17px;
          font-style: italic;
          font-weight: bold;
          margin-top: auto;
          align-self: flex-end;
        }
        @media (max-width: 1100px) {
          .stories-cards {
            gap: 18px;
          }
        }
        @media (max-width: 900px) {
          .stories-cards {
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }
          .stories-card {
            width: 95vw;
            min-width: 0;
            padding: 28px 10px 18px 10px;
          }
        }
        @media (max-width: 700px) {
          .stories-title {
            font-size: 22px;
          }
          .stories-content {
            font-size: 14px;
          }
          .stories-quote {
            font-size: 38px;
          }
        }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .login-popup {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          padding: 40px 32px 32px 32px;
          min-width: 340px;
          max-width: 90vw;
          text-align: center;
          animation: fadeIn 0.2s ease;
        }
        .popup-content h2 {
          font-size: 2rem;
          font-weight: bold;
          color: #222;
          margin-bottom: 18px;
        }
        .popup-content p {
          font-size: 1.15rem;
          color: #555;
          margin-bottom: 24px;
        }
        .popup-buttons {
          display: flex;
          gap: 18px;
          justify-content: center;
        }
        .popup-login-btn, .popup-close-btn {
          background: #4CAF50;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 28px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .popup-close-btn {
          background: #eee;
          color: #333;
        }
        .popup-login-btn:hover {
          background: #388E3C;
        }
        .popup-close-btn:hover {
          background: #ccc;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .elite-footer {
          background-color: #333;
          color: #fff;
          padding: 30px 20px;
          text-align: center;
          font-size: 14px;
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          transform: translateX(-50%);
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
          color: #white;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
