import React, { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy">
      <div className="privacy-header animate-fade-in">
        <div className="header-content">
          <h1>Privacy Policy</h1>
          <div className="header-divider"></div>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="privacy-content">
        <section className="privacy-section animate-slide-up">
          <h2>1. Information We Collect</h2>
          <div className="info-card">
            <div className="info-icon">📋</div>
            <div className="info-content">
              <h3>Personal Information</h3>
              <ul>
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Account credentials</li>
                <li>Smoking history and preferences</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="privacy-section animate-slide-up">
          <h2>2. How We Use Your Information</h2>
          <div className="info-card">
            <div className="info-icon">🎯</div>
            <div className="info-content">
              <h3>Primary Uses</h3>
              <ul>
                <li>Provide personalized support</li>
                <li>Track your progress</li>
                <li>Send relevant notifications</li>
                <li>Improve our services</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="privacy-section animate-slide-up">
          <h2>3. Data Security</h2>
          <div className="info-card">
            <div className="info-icon">🔒</div>
            <div className="info-content">
              <h3>Security Measures</h3>
              <ul>
                <li>Encryption of sensitive data</li>
                <li>Regular security audits</li>
                <li>Secure data storage</li>
                <li>Access controls</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="privacy-section animate-slide-up">
          <h2>4. Your Rights</h2>
          <div className="info-card">
            <div className="info-icon">👤</div>
            <div className="info-content">
              <h3>User Rights</h3>
              <ul>
                <li>Access your data</li>
                <li>Request data deletion</li>
                <li>Update your information</li>
                <li>Opt-out of communications</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="privacy-section animate-slide-up">
          <h2>5. Contact Us</h2>
          <div className="info-card">
            <div className="info-icon">📧</div>
            <div className="info-content">
              <h3>Get in Touch</h3>
              <p>For any privacy-related questions or concerns, please contact us at:</p>
              <a href="mailto:privacy@nicoff.com" className="contact-link">
                <span>privacy@nicoff.com</span>
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .privacy-policy {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          overflow: hidden;
          font-family: Arial, sans-serif;
        }

        .privacy-policy::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 70%);
          z-index: 0;
        }

        .privacy-header {
          text-align: center;
          margin-bottom: 60px;
          padding: 60px 0 40px;
          position: relative;
          z-index: 1;
        }

        .header-content {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .privacy-header h1 {
          font-size: 48px;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #2E7D32, #4CAF50);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .header-divider {
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #4CAF50, #2E7D32);
          margin: 20px auto;
          border-radius: 2px;
        }

        .privacy-header p {
          color: #666;
          font-size: 18px;
          margin-top: 20px;
        }

        .privacy-section {
          margin-bottom: 40px;
          opacity: 0;
        }

        .privacy-section h2 {
          color: #2E7D32;
          font-size: 32px;
          margin-bottom: 30px;
          position: relative;
          padding-left: 20px;
          font-weight: 700;
        }

        .privacy-section h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 32px;
          background: linear-gradient(45deg, #4CAF50, #2E7D32);
          border-radius: 4px;
        }

        .info-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: flex-start;
          gap: 40px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(76, 175, 80, 0.2);
        }

        .info-icon {
          font-size: 48px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          transition: transform 0.3s ease;
        }

        .info-card:hover .info-icon {
          transform: scale(1.1) rotate(-5deg);
        }
        .info-content p{
          color: #333;
        }
      
        .info-content {
          flex: 1;
        }

        .info-content h3 {
          color: #2E7D32;
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .info-content ul {
          list-style: none;
          padding: 0;
        }

        .info-content li {
          color: #444;
          margin-bottom: 15px;
          padding-left: 30px;
          position: relative;
          font-size: 16px;
          line-height: 1.6;
        }

        .info-content li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #4CAF50;
          font-weight: bold;
          font-size: 18px;
        }

        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #2E7D32;
          font-weight: 600;
          text-decoration: none;
          font-size: 18px;
          transition: all 0.3s ease;
          padding: 10px 15px;
          border-radius: 10px;
          background: #f1f8e9;
        }

        .contact-link:hover {
          background: #e8f5e9;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .contact-link .arrow {
          transition: transform 0.3s ease;
        }

        .contact-link:hover .arrow {
          transform: translateX(5px);
        }

        /* Animations */
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Stagger animation delays */
        .privacy-section:nth-child(1) { animation-delay: 0.1s; }
        .privacy-section:nth-child(2) { animation-delay: 0.2s; }
        .privacy-section:nth-child(3) { animation-delay: 0.3s; }
        .privacy-section:nth-child(4) { animation-delay: 0.4s; }
        .privacy-section:nth-child(5) { animation-delay: 0.5s; }

        @media (max-width: 768px) {
          .privacy-header h1 {
            font-size: 36px;
          }

          .header-content {
            padding: 30px 20px;
          }

          .privacy-section h2 {
            font-size: 28px;
          }

          .info-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 30px 20px;
          }

          .info-content li {
            padding-left: 0;
          }

          .info-content li::before {
            display: none;
          }

          .contact-link {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
} 