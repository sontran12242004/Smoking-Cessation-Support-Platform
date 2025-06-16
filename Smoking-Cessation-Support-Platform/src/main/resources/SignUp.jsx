import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="container">
      <div className="signup-wrapper">
        <div className="left-panel">
          <div className="big-icon" aria-label="no smoking" role="img">🚭</div>
          <div className="brand-animate">
            <div className="brand">NicOff</div>
            <div className="slogan">Turn Off Nicotine, Turn On Life!</div>
          </div>
          <div className="welcome">Begin your<br />transformation<br />today</div>
          <div className="desc">Our proven system has helped thousands quit smoking for good. You're just 3 steps away from a healthier life.</div>
          <div className="stats">
            <div className="stat stat-animate"><span>87%</span>Success Rate</div>
            <div className="stat stat-animate"><span>24/7</span>Support</div>
          </div>
        </div>
        <div className="right-panel">
          <h2>Create Account</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-icon">
                <span className="input-ico" role="img" aria-label="user">👤</span>
                <input type="text" id="username" placeholder="Enter your username" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-icon">
                <span className="input-ico" role="img" aria-label="mail">📧</span>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon">
                <span className="input-ico" role="img" aria-label="lock">🔒</span>
                <input type="password" id="password" placeholder="Enter your password" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="input-icon">
                <span className="input-ico" role="img" aria-label="lock">🔒</span>
                <input type="password" id="confirm-password" placeholder="Confirm your password" required />
              </div>
            </div>
            <button type="submit" className="signup-btn">Sign up</button>
          </form>
          <div className="login-link">Already have an account? <Link to="/login">Login</Link></div>
        </div>
      </div>
      <style>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100vw;
          background: #f5f5f5;
          box-sizing: border-box;
          overflow: auto;
        }
        .signup-wrapper {
          display: flex;
          flex-direction: row;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.13);
          overflow: hidden;
          min-width: 800px;
          min-height: 420px;
          margin: 0 auto;
        }
        .left-panel {
          background: linear-gradient(135deg, #4d8b3c 60%, #6fd37c 100%);
          color: #fff;
          padding: 40px 36px 40px 40px;
          width: 370px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          box-shadow: 2px 0 16px rgba(0,0,0,0.08);
          animation: slideInLeft 1s cubic-bezier(.4,2,.6,1);
          align-items: center;
        }
        .big-icon {
          font-size: 100px;
          margin-bottom: 18px;
          filter: drop-shadow(0 4px 16px #0002);
          animation: popInIcon 0.9s cubic-bezier(.4,2,.6,1);
        }
        @keyframes popInIcon {
          0% { opacity: 0; transform: scale(0.7) rotate(-20deg); }
          60% { opacity: 1; transform: scale(1.15) rotate(8deg); }
          100% { opacity: 1; transform: scale(1) rotate(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px);}
          to { opacity: 1; transform: translateX(0);}
        }
        .brand-animate {
          animation: fadeInBrand 1.2s 0.2s both;
          width: 100%;
        }
        @keyframes fadeInBrand {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .left-panel .brand {
          font-size: 2.4rem;
          font-weight: 800;
          color: #333;
          margin-left: 100px;
          margin-bottom: 0;
          letter-spacing: 5px;
          text-shadow: 0 2px 12px #0002;
        }
        .left-panel .slogan {
          font-style: italic;
          font-size: 1.1rem;
          color: #e0ffe0;
          margin-bottom: 32px;
          margin-top: 4px;
          margin-left: 50px;
          text-shadow: 0 1px 8px #0001;
        }
        .left-panel .welcome {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 16px;
          margin-top: 18px;
          color: #fff;
          text-shadow: 0 2px 12px #0002;
          animation: fadeInBrand 1.2s 0.4s both;
          width: 100%;
        }
        .left-panel .desc {
          font-size: 1.05rem;
          margin-bottom: 32px;
          color: #e0ffe0;
          animation: fadeInBrand 1.2s 0.6s both;
          width: 100%;
        }
        .left-panel .stats {
          display: flex;
          gap: 32px;
          margin-top: 18px;
        }
        .left-panel .stat {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          background: rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px 18px;
          box-shadow: 0 2px 8px #0001;
          transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
          cursor: pointer;
          text-align: center;
          min-width: 90px;
          animation: fadeInBrand 1.2s 0.8s both;
        }
        .left-panel .stat span {
          display: block;
          font-size: 1.3rem;
          font-weight: 900;
          color: #b6ffb6;
          margin-bottom: 2px;
          transition: color 0.25s;
        }
        .left-panel .stat:hover {
          transform: scale(1.08) translateY(-4px);
          box-shadow: 0 8px 24px #0002;
          background: rgba(255,255,255,0.18);
        }
        .left-panel .stat:hover span {
          color: #fff;
        }
        .right-panel {
          padding: 40px 36px 40px 36px;
          width: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fff;
          border-radius: 0 10px 10px 0;
          box-shadow: 0 4px 32px #4d8b3c11;
          animation: slideInRight 1.1s cubic-bezier(.4,2,.6,1);
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px);}
          to { opacity: 1; transform: translateX(0);}
        }
        .right-panel h2 {
          color: #4d8b3c;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
          text-align: center;
          letter-spacing: 2px;
          animation: fadeInBrand 1.2s 0.2s both;
        }
        .right-panel .subtitle {
          color: #444;
          font-size: 1.1rem;
          margin-bottom: 24px;
          text-align: center;
          animation: fadeInBrand 1.2s 0.4s both;
        }
        .form-group {
          margin-bottom: 18px;
          animation: fadeInBrand 1.2s 0.6s both;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 4px;
          color: #333;
          letter-spacing: 1px;
        }
        .input-icon {
          display: flex;
          align-items: center;
          background: #f5f5f5;
          border-radius: 6px;
          border: 1.5px solid #b6d7b6;
          box-shadow: 0 1px 4px #4d8b3c11;
          transition: border 0.2s, box-shadow 0.2s;
          padding-left: 8px;
        }
        .input-icon:focus-within {
          border: 1.5px solid #4d8b3c;
          box-shadow: 0 2px 12px #4d8b3c22;
        }
        .input-ico {
          font-size: 1.2rem;
          margin-right: 6px;
          color: #4d8b3c;
          opacity: 0.8;
        }
        .input-icon input {
          border: none;
          outline: none;
          background: transparent;
          padding: 10px 12px;
          font-size: 1rem;
          flex: 1;
          color: #333;
        }
        .signup-btn {
          width: 100%;
          background: linear-gradient(90deg, #4d8b3c 60%, #6fd37c 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 14px 0;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 10px;
          margin-bottom: 5px;
          box-shadow: 0 2px 8px #4d8b3c22;
          transition: background 0.2s, box-shadow 0.2s, transform 0.18s;
          letter-spacing: 1px;
        }
        .signup-btn:hover {
          background: linear-gradient(90deg, #388e3c 60%, #4d8b3c 100%);
          box-shadow: 0 6px 24px #4d8b3c33;
          transform: translateY(-2px) scale(1.03);
        }
        .login-link {
          text-align: center;
          font-size: 1rem;
          color: #222;
          margin-top: 8px;
        }
        .login-link a {
          color: #4d8b3c;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }
        .login-link a:hover {
          color: #388e3c;
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .signup-wrapper {
            flex-direction: column;
            min-width: 340px;
            min-height: unset;
          }
          .left-panel, .right-panel {
            width: 100%;
            border-radius: 0;
            padding: 32px 16px;
          }
        }
      `}</style>
    </div>
  );
} 