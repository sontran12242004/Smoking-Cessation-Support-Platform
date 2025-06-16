import React, { useEffect, useState } from 'react';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqData = {
    general: [
      {
        question: "What is Nicoff?",
        answer: "Nicoff is a comprehensive smoking cessation support platform designed to help individuals quit smoking and improve their health. We provide tools, resources, and community support to make your journey to a smoke-free life easier."
      },
      {
        question: "How does Nicoff work?",
        answer: "Nicoff combines personalized tracking tools, educational resources, and community support to help you quit smoking. Our platform adapts to your needs and provides continuous support throughout your journey."
      },
      {
        question: "Is Nicoff free to use?",
        answer: "Nicoff offers both free and premium features. Basic features are available at no cost, while premium features provide additional support and advanced tools for a more comprehensive experience."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "Creating an account is simple! Click the 'Sign Up' button, fill in your details, and verify your email address. You'll be guided through the process step by step."
      },
      {
        question: "How do I reset my password?",
        answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
      },
      {
        question: "Can I change my account settings?",
        answer: "Yes, you can modify your account settings at any time by going to your profile page and selecting 'Settings'. Here you can update your personal information, preferences, and notification settings."
      }
    ],
    features: [
      {
        question: "What tracking tools are available?",
        answer: "Nicoff provides various tracking tools including smoke-free days counter, money saved calculator, health improvement tracker, and personalized progress reports."
      },
      {
        question: "How does the community support work?",
        answer: "Our community support includes forums, group discussions, and peer support networks where you can connect with others on similar journeys, share experiences, and receive encouragement."
      },
      {
        question: "Are there mobile apps available?",
        answer: "Yes, Nicoff is available on both iOS and Android platforms. You can download our mobile app from the App Store or Google Play Store for on-the-go support."
      }
    ],
    privacy: [
      {
        question: "How is my data protected?",
        answer: "We take data protection seriously. Your information is encrypted, stored securely, and never shared with third parties without your consent. Read our Privacy Policy for more details."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account at any time through your account settings. This will permanently remove your data from our systems."
      },
      {
        question: "How do you use my health information?",
        answer: "Your health information is used solely to provide personalized support and recommendations. We never share this information with third parties without your explicit consent."
      }
    ]
  };

  const categories = [
    { id: 'general', name: 'General Questions', icon: '❓' },
    { id: 'account', name: 'Account & Settings', icon: '👤' },
    { id: 'features', name: 'Features & Tools', icon: '🛠️' },
    { id: 'privacy', name: 'Privacy & Security', icon: '🔒' }
  ];

  return (
    <div className="faq-page">
      <div className="faq-header animate-fade-in">
        <div className="header-content">
          <h1>FAQ & Help Center</h1>
          <div className="header-divider"></div>
          <p className="subtitle">Find answers to common questions and get the support you need</p>
          <div className="header-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
          </div>
        </div>
      </div>

      <div className="faq-content">
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
            </div>
            
        <div className="questions-container">
          {faqData[activeCategory].map((item, index) => (
            <div
              key={index}
              className={`question-card ${activeQuestion === index ? 'active' : ''}`}
              onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
            >
              <div className="question-header">
                <h3>{item.question}</h3>
                <span className="toggle-icon">{activeQuestion === index ? '−' : '+'}</span>
                    </div>
              <div className="answer-content">
                <p>{item.answer}</p>
                      </div>
                  </div>
                ))}
              </div>
          </div>

      <style jsx>{`
        .faq-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          overflow: hidden;
        }

        .faq-page::before {
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

        .faq-header {
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

        .faq-header h1 {
          font-size: 56px;
          margin-bottom: 25px;
          background: linear-gradient(45deg, #2E7D32, #4CAF50);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          letter-spacing: -1px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
          color: #666;
          font-size: 20px;
          margin-top: 15px;
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

        .category-tabs {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .category-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 25px;
          border: none;
          border-radius: 50px;
          background: white;
          color: #666;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .category-tab:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }

        .category-tab.active {
          background: #4CAF50;
          color: white;
          box-shadow: 0 6px 16px rgba(76, 175, 80, 0.2);
        }

        .category-icon {
          font-size: 20px;
        }

        .questions-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .question-card {
          background: white;
          border-radius: 15px;
          margin-bottom: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .question-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }

        .question-header {
          padding: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
        }

        .question-header h3 {
          margin: 0;
          font-size: 18px;
          color: #333;
          font-weight: 600;
        }

        .toggle-icon {
          font-size: 24px;
          color: #4CAF50;
          transition: transform 0.3s ease;
        }

        .question-card.active .toggle-icon {
          transform: rotate(180deg);
        }

        .answer-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: #f8f9fa;
        }

        .question-card.active .answer-content {
          max-height: 500px;
        }

        .answer-content p {
          margin: 0;
          padding: 25px;
          color: #666;
          line-height: 1.6;
        }

        /* Animations */
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
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

        @media (max-width: 768px) {
          .faq-header h1 {
            font-size: 42px;
          }

          .header-content {
            padding: 35px 25px;
            border-radius: 20px;
          }

          .category-tabs {
            flex-direction: column;
            align-items: stretch;
            padding: 0 20px;
          }

          .category-tab {
            width: 100%;
            justify-content: center;
          }

          .question-header h3 {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
} 