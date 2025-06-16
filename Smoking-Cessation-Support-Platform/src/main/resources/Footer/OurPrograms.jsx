import React from "react";

export default function OurPrograms() {
  return (
    <div className="programs-root">
      <section className="programs-hero">
        <h1>Our <span>Programs</span></h1>
        <p>
          Choose the right support for your smoke-free journey. NicOff offers flexible programs for everyone!
        </p>
      </section>
      <section className="programs-cards">
        <div className="program-card">
          <div className="program-icon">📅</div>
          <h2>1-Month Plan</h2>
          <p className="program-desc">Start your journey with essential support and daily motivation.</p>
          <ul>
            <li>Access to quit-smoking guidance materials</li>
            <li>Daily email reminders</li>
          </ul>
        </div>
        <div className="program-card premium">
          <div className="program-icon">💬</div>
          <h2>6-Month Plan</h2>
          <p className="program-desc">Get more support and regular health tracking for a stronger commitment.</p>
          <ul>
            <li>Direct chat with Coach Off</li>
            <li>Regular health reports</li>
            <li>Personalized quit journey (lộ trình cá nhân hóa)</li>
          </ul>
          <div className="program-achievement">
            <span className="achievement-icon">🏅</span> Achievement: Badges for milestones (7 days, 1 month smoke-free...)
          </div>
        </div>
        <div className="program-card">
          <div className="program-icon">🏆</div>
          <h2>1-Year Plan</h2>
          <p className="program-desc">Full support, health consultations, and personalized appointments for long-term success.</p>
          <ul>
            <li>Direct chat with Coach (online/offline)</li>
            <li>Regular health consultations with doctors</li>
            <li>Book private consultation appointments on demand</li>
            <li>Regular health reports</li>
            <li>Personalized quit journey (lộ trình cá nhân hóa)</li>
            <li>Event privileges (ưu đãi sự kiện, workshop, offline/online)</li>
          </ul>
          <div className="program-achievement">
            <span className="achievement-icon">🏅</span> Achievement: Badges for milestones (7 days, 1 month smoke-free...)
          </div>
        </div>
      </section>
      <style>{`
        .programs-root {
          min-height: 100vh;
          width: 100vw;
          max-width: 100vw;
          overflow-x: hidden;
          background: linear-gradient(120deg, #eaf7ea 60%, #d2f1e1 100%);
          font-family: Arial, sans-serif;
          color: #222;
        }
        .programs-hero {
          padding: 60px 0 30px 0;
          text-align: center;
        }
        .programs-hero h1 {
          font-size: 42px;
          color: #222;
          margin-bottom: 12px;
        }
        .programs-hero h1 span {
          color: #4ca44c;
        }
        .programs-hero p {
          font-size: 20px;
          color: #388e3c;
        }
        .programs-cards {
          max-width: 1100px;
          margin: 0 auto;
          padding: 30px 20px 60px 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
          justify-content: center;
        }
        .program-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 16px #4ca44c11;
          padding: 32px 24px 24px 24px;
          min-width: 260px;
          max-width: 340px;
          flex: 1 1 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .program-card.premium {
          border: 2px solid #ffd600;
          box-shadow: 0 4px 32px #ffd60033, 0 2px 16px #4ca44c11;
        }
        .program-card:hover {
          box-shadow: 0 8px 32px #4ca44c33, 0 2px 16px #0001;
          transform: scale(1.04) translateY(-4px);
        }
        .program-icon {
          font-size: 38px;
          margin-bottom: 10px;
          margin-top: -8px;
          display: block;
          filter: drop-shadow(0 2px 8px #4ca44c22);
        }
        .program-card h2 {
          color: #388e3c;
          font-size: 22px;
          margin-bottom: 10px;
        }
        .program-desc {
          color: #444;
          font-size: 15px;
          margin-bottom: 12px;
          text-align: center;
        }
        .program-card ul {
          padding-left: 18px;
          margin: 0;
          text-align: left;
        }
        .program-card li {
          margin-bottom: 8px;
        }
        .program-achievement {
          margin-top: 12px;
          color: #388e3c;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }
        .achievement-icon {
          font-size: 20px;
        }
        @media (max-width: 900px) {
          .programs-cards {
            flex-direction: column;
            align-items: center;
            gap: 18px;
          }
          .program-card {
            max-width: 95vw;
          }
        }
      `}</style>
    </div>
  );
} 