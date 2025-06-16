import React from "react";

export default function SuccessStories() {
  return (
    <div className="success-root">
      {/* Hero Section */}
      <section className="success-hero">
        <h1>Success <span>Stories</span></h1>
        <p>Inspiration from those who succeeded with NicOff – You can do it too!</p>
      </section>

      {/* 1. Personal Journey */}
      <section className="success-section">
        <h2>1. Personal Journey</h2>
        <div className="story-cards">
          <div className="story-card">
            <div className="story-avatar">👨‍🦱</div>
            <div className="story-title">Mr. Minh, 35 years old</div>
            <div className="story-challenge">"I used to smoke a pack a day for 10 years. The cravings made me lose sleep and become irritable."</div>
            <div className="story-method">Method: <b>Nicotine replacement therapy</b> + <b>Psychological counseling</b></div>
            <div className="story-overcome">How I overcame it: "I used nicotine gum, practiced deep breathing, and joined NicOff's support group whenever I craved a cigarette."</div>
          </div>
          <div className="story-card">
            <div className="story-avatar">👩‍🦰</div>
            <div className="story-title">Ms. Lan, 28 years old</div>
            <div className="story-challenge">"I was worried about gaining weight and stress when quitting."</div>
            <div className="story-method">Method: <b>Progress tracking app</b> + <b>Changing eating habits</b></div>
            <div className="story-overcome">How I overcame it: "I practiced yoga, ate healthy snacks, and logged my emotions daily on the NicOff app."</div>
          </div>
        </div>
      </section>

      {/* 2. Benefits After Quitting */}
      <section className="success-section">
        <h2>2. Benefits After Quitting</h2>
        <div className="benefit-cards">
          <div className="benefit-card">
            <div className="benefit-icon">💪</div>
            <div className="benefit-desc">Improved health: <b>Easier breathing, brighter skin, more energy</b></div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <div className="benefit-desc">Financial savings: "After 6 months, I saved <b>5 million VND</b> and can run 5km without getting out of breath!"</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">👨‍👩‍👧‍👦</div>
            <div className="benefit-desc">Happier family, and your children are proud of you!</div>
          </div>
        </div>
      </section>

      {/* 3. Advice from Experienced Quitters */}
      <section className="success-section">
        <h2>3. Advice from Experienced Quitters</h2>
        <ul className="advice-list">
          <li><span className="advice-icon">🧘‍♂️</span> When stressed, try <b>meditation or walking</b> instead of smoking.</li>
          <li><span className="advice-icon">📱</span> Use the <b>NicOff app</b> to track your progress and receive daily encouragement.</li>
          <li><span className="advice-icon">🤝</span> Don't hesitate to <b>seek support from the NicOff community</b> – together, success is easier!</li>
        </ul>
      </section>

      {/* 4. Community Story */}
      <section className="success-section">
        <h2>4. Community Story</h2>
        <div className="community-story">
          <div className="community-icon">🎉</div>
          <div className="community-desc">
            <b>A group of 10 people</b> successfully completed NicOff's <b>30-day no-smoking challenge</b>. They shared, encouraged each other, and celebrated their success together!
          </div>
        </div>
      </section>

      {/* 5. Images/Videos */}
      <section className="success-section">
        <h2>5. Images/Videos</h2>
        <div className="media-gallery">
          <div className="media-item">
            <img src="/download.jpg" alt="Before quitting" />
            <div className="media-caption">Before quitting</div>
          </div>
          <div className="media-item">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="After quitting" />
            <div className="media-caption">After quitting</div>
          </div>
          <div className="media-item">
            <video controls width="220">
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="media-caption">Short interview</div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="success-cta">
        <h2>You can do it too!</h2>
        <p>Sign up now to get NicOff's support on your journey to quit smoking.</p>
        <a href="#" className="cta-btn">Sign up now</a>
      </section>

      <style>{`
        .success-root {
          background: #f7fafc;
          min-height: 100vh;
          width: 100vw;
          overflow-x: hidden;
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        .success-hero {
          background: linear-gradient(120deg, #eaf5e2 60%, #d2f1e1 100%);
          padding: 56px 0 32px 0;
          text-align: center;
          transition: background 0.5s;
        }
        .success-hero:hover {
          background: linear-gradient(120deg, #d2f1e1 60%, #eaf5e2 100%);
        }
        .success-hero h1 {
          font-size: 44px;
          color: #4ca44c;
          font-weight: bold;
        }
        .success-hero h1 span {
          color: #ffb800;
        }
        .success-hero p {
          color: #333;
          font-size: 20px;
          margin-top: 10px;
        }
        .success-section {
          max-width: 1100px;
          margin: 0 auto 36px auto;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 24px #0001;
          padding: 36px 28px 28px 28px;
          margin-bottom: 32px;
          animation: fadeInUp 0.8s;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .success-section:hover {
          box-shadow: 0 8px 32px #0002;
          transform: translateY(-5px);
        }
        .success-section h2 {
          color: #388e3c;
          font-size: 28px;
          margin-bottom: 18px;
        }
        .story-cards {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .story-card {
          background: #f0f8f4;
          border-radius: 14px;
          box-shadow: 0 2px 12px #0001;
          padding: 24px 20px;
          width: 320px;
          min-width: 220px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 18px;
          transition: box-shadow 0.2s, transform 0.2s;
          animation: fadeInUp 0.7s;
        }
        .story-card:hover {
          box-shadow: 0 8px 32px #4ca44c22;
          transform: translateY(-6px) scale(1.03);
        }
        .story-avatar {
          font-size: 38px;
          margin-bottom: 8px;
        }
        .story-title {
          color: #333;
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 6px;
        }
        .story-challenge, .story-method, .story-overcome {
          color: #333;
          font-size: 15px;
          margin-bottom: 6px;
        }
        .benefit-cards {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .benefit-card {
          background: #eaf7ea;
          border-radius: 12px;
          box-shadow: 0 2px 8px #0001;
          padding: 20px 18px;
          width: 260px;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 12px;
          animation: fadeInUp 0.7s;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .benefit-card:hover {
          box-shadow: 0 8px 32px #4ca44c22;
          transform: translateY(-6px) scale(1.03);
        }
        .benefit-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }
        .benefit-desc {
          color: #333;
          font-size: 15px;
          text-align: center;
        }
        .advice-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .advice-list li {
          color: #333;
          font-size: 16px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          transition: transform 0.2s;
        }
        .advice-list li:hover {
          transform: translateX(10px);
        }
        .advice-icon {
          font-size: 24px;
          margin-right: 10px;
        }
        .community-story {
          display: flex;
          align-items: center;
          background: #f0f8f4;
          border-radius: 14px;
          box-shadow: 0 2px 12px #0001;
          padding: 24px 20px;
          margin: 0 auto;
          max-width: 600px;
          animation: fadeInUp 0.7s;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .community-story:hover {
          box-shadow: 0 8px 32px #4ca44c22;
          transform: translateY(-6px) scale(1.03);
        }
        .community-icon {
          font-size: 38px;
          margin-right: 18px;
        }
        .community-desc {
          font-size: 16px;
          color: #333;
        }
        .media-gallery {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .media-item {
          background: #f0f8f4;
          border-radius: 12px;
          box-shadow: 0 2px 8px #0001;
          padding: 12px 10px 8px 10px;
          width: 220px;
          min-width: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 12px;
          animation: fadeInUp 0.7s;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .media-item:hover {
          box-shadow: 0 8px 32px #4ca44c22;
          transform: translateY(-6px) scale(1.03);
        }
        .media-item img, .media-item video {
          width: 180px;
          height: 120px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .media-caption {
          font-size: 14px;
          color: #555;
        }
        .success-cta {
          background: linear-gradient(90deg, #4ca44c 60%, #ffb800 100%);
          color: #fff;
          text-align: center;
          padding: 44px 0 36px 0;
          border-radius: 0 0 18px 18px;
          margin-bottom: 0;
        }
        .success-cta h2 {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .success-cta p {
          font-size: 18px;
          margin-bottom: 18px;
        }
        .cta-btn {
          background: #fff;
          color: #4ca44c;
          font-weight: bold;
          font-size: 18px;
          padding: 12px 38px;
          border-radius: 12px;
          border: none;
          box-shadow: 0 2px 8px #0002;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.18s;
          text-decoration: none;
          animation: pulse 2s infinite;
        }
        .cta-btn:hover {
          background: #ffb800;
          color: #fff;
          transform: translateY(-4px) scale(1.04);
        }
        @media (max-width: 900px) {
          .success-section, .community-story, .media-gallery {
            padding: 18px 6vw;
            flex-direction: column;
            gap: 18px;
          }
          .story-cards, .benefit-cards, .media-gallery {
            flex-direction: column;
            align-items: center;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(76, 164, 76, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(76, 164, 76, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(76, 164, 76, 0);
          }
        }
      `}</style>
    </div>
  );
} 