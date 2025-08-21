import React from "react";

export default function AboutUs() {
  return (
    <div className="aboutus-root">
      <section className="aboutus-hero">
        <h1>About <span>NicOff</span></h1>
        <p>
          We are dedicated to helping people quit smoking and live healthier, happier lives.
        </p>
      </section>
      <section className="aboutus-content">
        <div className="aboutus-block">
          <div className="aboutus-icon">🎯</div>
          <h2>Our Mission</h2>
          <p>
            NicOff empowers individuals to break free from nicotine addiction through science-backed methods, community support, and personalized tools. We believe everyone deserves a smoke-free future.
          </p>
        </div>
        <div className="aboutus-block">
          <div className="aboutus-icon">🛠️</div>
          <h2>What We Offer</h2>
          <ul>
            <li>Personalized quit plans and progress tracking</li>
            <li>Supportive community and expert advice</li>
            <li>Motivational stories and achievements</li>
            <li>Resources for both new quitters and long-term success</li>
          </ul>
        </div>
        <div className="aboutus-block">
          <div className="aboutus-icon">🤝</div>
          <h2>Our Team</h2>
          <p>
            We are a passionate group of health professionals, ex-smokers, and tech enthusiasts committed to making quitting easier for everyone.
          </p>
        </div>
      </section>
      <style>{`
        .aboutus-root {
          min-height: 100%;
          height: 100%;
          max-width: 100%;
          width: 100%;
          background: linear-gradient(120deg, #eaf7ea 60%, #d2f1e1 100%);
          font-family: Arial, sans-serif;
          color: #222;
          display: flex;
          flex-direction: column;
        }
        .aboutus-hero {
          padding: 60px 0 30px 0;
          text-align: center;
        }
        .aboutus-hero h1 {
          font-size: 42px;
          color: #222;
          margin-bottom: 12px;
        }
        .aboutus-hero h1 span {
          color: #4ca44c;
        }
        .aboutus-hero p {
          font-size: 20px;
          color: #388e3c;
        }
        .aboutus-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px 20px 60px 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
          justify-content: center;
          align-items: center;
          flex: 1;
        }
        .aboutus-block {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 16px #4ca44c11;
          padding: 32px 24px;
          min-width: 260px;
          max-width: 350px;
          flex: 1 1 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .aboutus-icon {
          font-size: 38px;
          margin-bottom: 10px;
          margin-top: -8px;
          display: block;
          filter: drop-shadow(0 2px 8px #4ca44c22);
        }
        .aboutus-block h2 {
          color: #388e3c;
          font-size: 22px;
          margin-bottom: 10px;
        }
        .aboutus-block ul {
          padding-left: 18px;
          margin: 0;
        }
        .aboutus-block li {
          margin-bottom: 8px;
        }
        @media (max-width: 900px) {
          .aboutus-content {
            flex-direction: column;
            align-items: center;
            gap: 18px;
          }
          .aboutus-block {
            max-width: 95vw;
          }
        }
      `}</style>
    </div>
  );
} 