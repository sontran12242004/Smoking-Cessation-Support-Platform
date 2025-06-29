import React, { useEffect } from 'react';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-of-service">
      <div className="terms-header animate-fade-in">
        <div className="header-content">
          <h1>Terms of Service</h1>
          <div className="header-divider"></div>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
          <div className="header-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
          </div>
        </div>
      </div>

      <div className="terms-content">
        <section className="terms-section animate-slide-up">
          <h2>1. Introduction</h2>
          <div className="info-card">
            <div className="info-icon">👋</div>
            <div className="info-content">
              <p>Welcome to our Smoking Cessation Support Platform! This website is designed to provide information, resources, tools, and community support for those who want to quit smoking and improve their health. By accessing and using this website, you agree to the following terms.</p>
            </div>
          </div>
        </section>

        <section className="terms-section animate-slide-up">
          <h2>2. Acceptance of Terms</h2>
          <div className="info-card">
            <div className="info-icon">✓</div>
            <div className="info-content">
              <p>By accessing the website, you confirm that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use the website.</p>
            </div>
          </div>
        </section>

        <section className="terms-section animate-slide-up">
          <h2>3. Services Provided</h2>
          <div className="info-card">
            <div className="info-icon">🛠️</div>
            <div className="info-content">
              <h3>We provide:</h3>
              <ul>
                <li>Health and smoking cessation related information and articles</li>
                <li>Smoking cessation progress tracking tools</li>
                <li>Expert and community support (forums, comments)</li>
                <li>User account registration for personal information and progress tracking</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="terms-section animate-slide-up">
          <h2>4. User Rights and Responsibilities</h2>
          <div className="info-card">
            <div className="info-icon">⚖️</div>
            <div className="info-content">
              <h3>Users commit to:</h3>
              <ul>
                <li>Not sharing false information, tobacco advertisements, or harmful content</li>
                <li>Not using the website for commercial purposes without written consent</li>
                <li>Not disrupting or damaging system or community operations</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="terms-section animate-slide-up">
          <h2>5. User Accounts</h2>
          <div className="info-card">
            <div className="info-icon">👤</div>
            <div className="info-content">
              <ul>
                <li>Users are responsible for securing their account information</li>
                <li>We reserve the right to suspend or delete accounts for terms violations</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="terms-section animate-slide-up">
          <h2>6. Intellectual Property Rights</h2>
          <div className="info-card">
            <div className="info-icon">📝</div>
            <div className="info-content">
              <ul>
                <li>All content (articles, images, designs, logos) belongs to the platform or is legally used</li>
                <li>Unauthorized copying or distribution of content is prohibited</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="terms-section animate-slide-up">
          <h2>7. Privacy Policy</h2>
          <div className="info-card">
            <div className="info-icon">🔒</div>
            <div className="info-content">
              <p>User personal information is protected according to our Privacy Policy and will not be shared with third parties without consent, unless required by law.</p>
            </div>
          </div>
        </section>

        <section className="terms-section animate-slide-up">
          <h2>8. Disclaimer</h2>
          <div className="info-card">
            <div className="info-icon">⚠️</div>
            <div className="info-content">
              <ul>
                <li>The website provides health support information and does not replace professional medical advice</li>
                <li>Users should consult doctors or healthcare professionals for health concerns</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="terms-section animate-slide-up">
          <h2>9. Terms Changes</h2>
          <div className="info-card">
            <div className="info-icon">🔄</div>
            <div className="info-content">
              <p>We may update these Terms at any time. Changes will be notified on the website, and users are responsible for staying informed of updates.</p>
            </div>
          </div>
        </section>

        <section className="terms-section animate-slide-up">
          <h2>10. Governing Law and Disputes</h2>
          <div className="info-card">
            <div className="info-icon">⚖️</div>
            <div className="info-content">
              <p>These terms are governed by Vietnamese law. Any disputes will be resolved in the competent court.</p>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .terms-of-service {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          overflow: hidden;
          font-family: Arial, sans-serif;
        }

        .terms-of-service::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 300px;
          background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
          z-index: 0;
        }

        .terms-header {
          text-align: center;
          margin-bottom: 60px;
          padding: 80px 0 60px;
          position: relative;
          z-index: 1;
        }

        .header-content {
          background: white;
          border-radius: 30px;
          padding: 50px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        .header-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: -1;
        }

        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(46, 125, 50, 0.1));
          animation: float 6s ease-in-out infinite;
        }

        .decoration-circle:nth-child(1) {
          width: 150px;
          height: 150px;
          top: -75px;
          left: -75px;
          animation-delay: 0s;
        }

        .decoration-circle:nth-child(2) {
          width: 100px;
          height: 100px;
          bottom: -50px;
          right: -50px;
          animation-delay: 2s;
        }

        .decoration-circle:nth-child(3) {
          width: 75px;
          height: 75px;
          top: 50%;
          right: 10%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .terms-header h1 {
          font-size: 56px;
          margin-bottom: 25px;
          background: linear-gradient(45deg, #2E7D32, #4CAF50);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          letter-spacing: -1px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header-divider {
          width: 80px;
          height: 5px;
          background: linear-gradient(90deg, #4CAF50, #2E7D32);
          margin: 25px auto;
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }

        .header-divider::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          20% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }

        .last-updated {
          color: #666;
          font-size: 18px;
          margin-top: 25px;
          font-style: italic;
        }

        .terms-section {
          margin-bottom: 50px;
          opacity: 0;
          transform: translateY(30px);
        }

        .terms-section h2 {
          color: #2E7D32;
          font-size: 36px;
          margin-bottom: 35px;
          position: relative;
          padding-left: 25px;
          font-weight: 700;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
        }

        .terms-section h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 40px;
          background: linear-gradient(45deg, #4CAF50, #2E7D32);
          border-radius: 5px;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .info-card {
          background: white;
          border-radius: 25px;
          padding: 45px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: flex-start;
          gap: 45px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
        }

        .info-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #4CAF50, #2E7D32);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
          border-color: rgba(76, 175, 80, 0.3);
        }

        .info-card:hover::before {
          opacity: 1;
        }

        .info-icon {
          font-size: 52px;
          color: #4CAF50;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
          transition: all 0.4s ease;
          background: rgba(76, 175, 80, 0.1);
          padding: 20px;
          border-radius: 20px;
        }

        .info-card:hover .info-icon {
          transform: scale(1.15) rotate(-8deg);
          background: rgba(76, 175, 80, 0.15);
        }

        .info-content {
          flex: 1;
        }

        .info-content h3 {
          color: #2E7D32;
          font-size: 28px;
          margin-bottom: 25px;
          font-weight: 600;
          position: relative;
          display: inline-block;
        }

        .info-content h3::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #4CAF50, #2E7D32);
          border-radius: 2px;
        }

        .info-content p {
          color: #444;
          font-size: 17px;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .info-content ul {
          list-style: none;
          padding: 0;
        }

        .info-content li {
          color: #444;
          margin-bottom: 18px;
          padding-left: 35px;
          position: relative;
          font-size: 17px;
          line-height: 1.7;
          transition: transform 0.3s ease;
        }

        .info-content li:hover {
          transform: translateX(5px);
        }

        .info-content li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #4CAF50;
          font-weight: bold;
          font-size: 20px;
          transition: transform 0.3s ease;
        }

        .info-content li:hover::before {
          transform: scale(1.2);
        }

        /* Animations */
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        .terms-section:nth-child(1) { animation-delay: 0.1s; }
        .terms-section:nth-child(2) { animation-delay: 0.2s; }
        .terms-section:nth-child(3) { animation-delay: 0.3s; }
        .terms-section:nth-child(4) { animation-delay: 0.4s; }
        .terms-section:nth-child(5) { animation-delay: 0.5s; }
        .terms-section:nth-child(6) { animation-delay: 0.6s; }
        .terms-section:nth-child(7) { animation-delay: 0.7s; }
        .terms-section:nth-child(8) { animation-delay: 0.8s; }
        .terms-section:nth-child(9) { animation-delay: 0.9s; }
        .terms-section:nth-child(10) { animation-delay: 1s; }

        @media (max-width: 768px) {
          .terms-header h1 {
            font-size: 42px;
          }

          .header-content {
            padding: 35px 25px;
            border-radius: 20px;
          }

          .terms-section h2 {
            font-size: 32px;
          }

          .info-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 35px 25px;
          }

          .info-content h3::after {
            left: 50%;
            transform: translateX(-50%);
          }

          .info-content li {
            padding-left: 0;
            text-align: center;
          }

          .info-content li::before {
            display: none;
          }

          .info-icon {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
} 