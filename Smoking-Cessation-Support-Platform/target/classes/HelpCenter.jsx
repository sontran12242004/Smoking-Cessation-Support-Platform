import React, { useState, useEffect } from 'react';

function HelpCenter() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styles = `
    .help-center {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
          min-height: 100vh;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          overflow: hidden;
        }

    .help-center::before {
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

    .help-header {
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

    .help-title {
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

    .help-subtitle {
      color: #666;
      font-size: 18px;
      margin-top: 20px;
    }

    .help-search {
          max-width: 600px;
      margin: 0 auto 40px;
      position: relative;
    }

    .help-search input {
      width: 100%;
      padding: 15px 25px;
      padding-left: 45px;
      border: 2px solid #e0e0e0;
      border-radius: 30px;
      font-size: 16px;
      transition: all 0.3s ease;
      background: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

    .help-search input:focus {
      outline: none;
      border-color: #4CAF50;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
    }

    .help-search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    .help-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
        }

        .help-section {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
      align-items: flex-start;
      gap: 40px;
    }

    .help-section:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
      border-color: rgba(76, 175, 80, 0.2);
        }

    .help-section.active {
      border: 2px solid #4CAF50;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        }

    .help-section-icon {
      font-size: 48px;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      transition: transform 0.3s ease;
        }

    .help-section:hover .help-section-icon {
      transform: scale(1.1) rotate(-5deg);
    }

    .help-section-content {
          flex: 1;
        }

    .help-section-title {
      font-size: 24px;
      color: #2E7D32;
      font-weight: 600;
      margin-bottom: 12px;
        }

    .help-section-description {
          color: #666;
      font-size: 16px;
      line-height: 1.6;
        }

    .help-content {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      margin-bottom: 40px;
        }

    .help-content-title {
      font-size: 32px;
      color: #2E7D32;
      margin-bottom: 30px;
      position: relative;
      padding-left: 20px;
      font-weight: 700;
        }

    .help-content-title::before {
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

    .help-content-text {
      color: #444;
      line-height: 1.6;
      white-space: pre-line;
        }

    .help-contact {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

    .help-contact-title {
      font-size: 32px;
      color: #2E7D32;
      margin-bottom: 30px;
      position: relative;
      padding-left: 20px;
      font-weight: 700;
    }

    .help-contact-title::before {
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

    .help-contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
        }

    .help-contact-method {
      display: flex;
      align-items: center;
      gap: 16px;
          padding: 20px;
          border-radius: 12px;
      background: #f8f9fa;
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.05);
        }

    .help-contact-method:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      border-color: rgba(76, 175, 80, 0.2);
        }

    .help-contact-icon {
      font-size: 32px;
      color: #2E7D32;
          transition: transform 0.3s ease;
        }

    .help-contact-method:hover .help-contact-icon {
      transform: scale(1.1) rotate(-5deg);
        }

    .help-contact-info {
      flex: 1;
    }

    .help-contact-label {
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
      font-size: 18px;
    }

    .help-contact-value {
      color: #666;
      font-size: 16px;
    }

    /* Animations */
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }

    .animate-slide-up {
      animation: slideUp 0.8s ease-out forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(40px);
          }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Stagger animation delays */
    .help-section:nth-child(1) { animation-delay: 0.1s; }
    .help-section:nth-child(2) { animation-delay: 0.2s; }
    .help-section:nth-child(3) { animation-delay: 0.3s; }
    .help-section:nth-child(4) { animation-delay: 0.4s; }

    @media (max-width: 768px) {
      .help-title {
            font-size: 36px;
          }

      .header-content {
        padding: 30px 20px;
      }

      .help-section {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 30px 20px;
      }

      .help-content-title, .help-contact-title {
        font-size: 28px;
          }

      .help-content, .help-contact {
        padding: 30px 20px;
      }
    }
  `;

  const sections = {
    introduction: {
      title: 'Introduction',
      description: 'Learn about our platform and mission',
      icon: '🎯',
      content: `Our Vision:
Create a smoke-free future for everyone
Build a supportive community for those quitting smoking
Provide accessible and effective quit smoking tools

Our Mission:
Offer personalized support and guidance
Provide evidence-based resources and information
Create a safe and supportive environment for users
Help users track and celebrate their progress`
    },
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions',
      icon: '❓',
      content: `Common Questions:
How do I start my quit journey?
What support is available?
How do I track my progress?
What are the health benefits?
How do I deal with cravings?`
    },
    guides: {
      title: 'User Guides',
      description: 'Step-by-step instructions for using our platform',
      icon: '📱',
      content: `Getting Started:
Create your account
Set your quit date
Complete your profile
Choose your support plan
Download the mobile app`
    },
    health: {
      title: 'Health Information',
      description: 'Learn about the health benefits of quitting',
      icon: '🏥',
      content: `Health Benefits Timeline:
20 minutes: Blood pressure and heart rate normalize
24 hours: Risk of heart attack begins to decrease
48 hours: Taste and smell improve
2 weeks: Circulation and lung function improve
1 year: Risk of heart disease drops by half`
    }
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="help-center">
      <style>{styles}</style>
      
      <div className="help-header animate-fade-in">
        <div className="header-content">
          <h1 className="help-title">Help Center</h1>
          <div className="header-divider"></div>
          <p className="help-subtitle">Find the support and information you need</p>
        </div>
      </div>

      <div className="help-search animate-slide-up">
        <span className="help-search-icon">🔍</span>
        <input type="text" placeholder="Search for help..." />
      </div>

      <div className="help-sections">
        {Object.entries(sections).map(([key, section]) => (
          <div 
            key={key}
            className={`help-section animate-slide-up ${activeSection === key ? 'active' : ''}`}
            onClick={() => handleSectionClick(key)}
          >
            <span className="help-section-icon">{section.icon}</span>
            <div className="help-section-content">
              <h2 className="help-section-title">{section.title}</h2>
              <p className="help-section-description">{section.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="help-content animate-slide-up">
        <h2 className="help-content-title">{sections[activeSection].title}</h2>
        <div className="help-content-text">{sections[activeSection].content}</div>
      </div>

      <div className="help-contact animate-slide-up">
        <h2 className="help-contact-title">Contact Support</h2>
        <div className="help-contact-methods">
          <div className="help-contact-method">
            <span className="help-contact-icon">📧</span>
            <div className="help-contact-info">
              <div className="help-contact-label">Email Support</div>
              <div className="help-contact-value">support@nicoff.com</div>
            </div>
          </div>
          <div className="help-contact-method">
            <span className="help-contact-icon">📞</span>
            <div className="help-contact-info">
              <div className="help-contact-label">Phone Support</div>
              <div className="help-contact-value">+1 (234) 567-890</div>
            </div>
          </div>
          <div className="help-contact-method">
            <span className="help-contact-icon">💬</span>
            <div className="help-contact-info">
              <div className="help-contact-label">Live Chat</div>
              <div className="help-contact-value">Available 24/7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default HelpCenter; 