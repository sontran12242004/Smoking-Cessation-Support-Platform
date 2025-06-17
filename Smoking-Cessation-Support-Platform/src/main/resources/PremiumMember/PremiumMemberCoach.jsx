import React, { useState } from "react";
import EditProfileModal from "../EditProfileModal";
import { useNavigate } from "react-router-dom";

function PremiumMemberCoach({
  coach = {},
  progress = {},
  onMessageCoach = () => {},
}) {
  // coach: { avatar, name, specialty, experience, nextSession: { date, time }, ... }
  // progress: { motivationLevel, cravingsControl, completion, coachNote }
  // activities: [{ icon, title, description, completed }]

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();


  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    setActivities([...activities, { ...form, completed: false }]);
    setForm({ title: "", description: "" });
  };

  const handleMarkActivity = (idx) => {
    setActivities((acts) =>
      acts.map((a, i) => (i === idx ? { ...a, completed: true } : a))
    );
  };

  const styles = `
    body, html, #root {
      width: 100%;
      height: 100%;
      margin: 0;
    }
    .pmc-bg {
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
    background-color: #fff;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.header-center .app-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    color: #5EBB34;
    font-weight: 400;
    font-size: 16px;
    padding: 5px 0;
    position: relative;
    transition: color 0.3s;
}

.welcome-nav a::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 3px;
    background: #5EBB34;
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    z-index: 1;
}

.welcome-nav a:hover::after, .welcome-nav a:focus::after, .welcome-nav a.active::after {
    transform: scaleX(1);
}
    .pmc-main {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 0 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1 0 auto;
    }
    .pmc-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #388E3C;
      margin-bottom: 18px;
      margin-top: 10px;
      text-align: center;
      width: 100%;
    }
    .pmc-coach-section {
      display: flex;
      gap: 32px;
      width: 100%;
      margin-bottom: 32px;
      flex-wrap: wrap;
      justify-content: center;
      /* margin-left: 32px; */
    }
    .pmc-coach-card, .pmc-progress-card {
      background: rgba(255,255,255,0.97);
      border-radius: 16px;
      box-shadow: 0 4px 18px rgba(56,70,60,0.10);
      padding: 28px 30px 18px 30px;
      min-width: 340px;
      max-width: 400px;
      flex: 1 1 340px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border: 1.5px solid #e0e8e0;
    }
    .pmc-coach-card {
      margin-right: 0;
    }
    .pmc-coach-info {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-bottom: 16px;
    }
    .pmc-coach-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 2.5px solid #4CAF50;
      background: #fff;
    }
    .pmc-coach-details {
      display: flex;
      flex-direction: column;
    }
    .pmc-coach-name {
      font-size: 1.1rem;
      font-weight: bold;
      color: #222;
    }
    .pmc-coach-specialty {
      color: #43A047;
      font-size: 1rem;
      margin-bottom: 2px;
    }
    .pmc-coach-exp {
      color: #888;
      font-size: 0.98rem;
    }
    .pmc-next-session {
      margin: 12px 0 18px 0;
      font-size: 1.05rem;
      color: #333;
    }
    .pmc-session-btns {
      display: flex;
      gap: 12px;
      margin-bottom: 8px;
      width: 100%;
    }
    .pmc-btn {
      background: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 8px 18px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
      flex: 1;
    }
    .pmc-btn:hover {
      background: #388E3C;
    }
    .pmc-progress-card {
      margin-left: 0;
      gap: 10px;
    }
    .pmc-progress-title {
      font-size: 1.1rem;
      font-weight: bold;
      color: #43A047;
      margin-bottom: 8px;
    }
    .pmc-progress-label {
      font-size: 1rem;
      color: #333;
      margin-bottom: 2px;
    }
    .pmc-progress-bar {
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 6px;
      margin: 6px 0 12px 0;
      overflow: hidden;
    }
    .pmc-progress-bar-inner {
      height: 100%;
      background: #4CAF50;
      border-radius: 6px;
      transition: width 0.4s;
    }
    .pmc-coach-note {
      background: #f0f8e8;
      border-left: 4px solid #4CAF50;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 1rem;
      color: #388E3C;
      margin-top: 8px;
    }
    .pmc-activities-title {
      font-size: 1.2rem;
      font-weight: bold;
      color: #388E3C;
      margin: 32px 0 18px 0;
      text-align: center;
      width: 100%;
    }
    .pmc-activities-row {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      width: 100%;
      background: rgba(255,255,255,0.7);
      border-radius: 18px;
      padding: 18px 0 18px 0;
      margin-bottom: 32px;
      box-shadow: 0 2px 8px rgba(56,70,60,0.08);
      justify-content: center;
    }
    .pmc-activity-card {
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 2px 8px rgba(56,70,60,0.10);
      padding: 22px 20px 18px 20px;
      min-width: 240px;
      max-width: 320px;
      flex: 1 1 240px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border: 1.5px solid #e0e8e0;
      margin-bottom: 12px;
    }
    .pmc-activity-icon {
      font-size: 2rem;
      margin-bottom: 8px;
      color: #4CAF50;
    }
    .pmc-activity-title {
      font-size: 1.1rem;
      font-weight: bold;
      color: #222;
      margin-bottom: 4px;
    }
    .pmc-activity-desc {
      font-size: 1rem;
      color: #555;
      margin-bottom: 10px;
    }
    .pmc-activity-btn {
      background: #e8f5e9;
      color: #4CAF50;
      border: none;
      border-radius: 8px;
      padding: 7px 18px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .pmc-activity-btn.completed {
      background: #4CAF50;
      color: #fff;
      cursor: default;
    }
    @media (max-width: 1100px) {
      .pmc-main { max-width: 98vw; }
      .pmc-coach-section, .pmc-activities-row { flex-direction: column; align-items: center; gap: 24px; }
      .pmc-coach-card, .pmc-progress-card, .pmc-activity-card { max-width: 95vw; }
      .pmc-title, .pmc-activities-title, .pmc-coach-section, .pmc-activities-row { margin-left: 0 !important; }
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
      margin-right: 10px;
      
    }
    footer {
      background-color: #333;
      color: white;
      padding: 50px 40px 20px;
      font-size: 15px;
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      transform: translateX(-50%);
      box-sizing: border-box;
    }
    .footer-content {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 30px;
      margin-bottom: 30px;
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    }
    .footer-column {
      flex: 1;
      min-width: 200px;
      max-width: 280px;
    }
    .footer-column h4 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #8BC34A; /* Light green for headings */
    }
    .footer-column p,
    .footer-column li a {
      color: #CFD8DC;
      line-height: 1.8;
    }
    .footer-column ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .footer-column li {
      margin-bottom: 10px;
    }
    .footer-column li a {
      text-decoration: none;
      transition: color 0.3s ease;
    }
    .footer-column li a:hover {
      color: white;
    }
    .newsletter-form {
      display: flex;
      margin-bottom: 15px;
    }
      .newsletter-input {
      flex-grow: 1;
      padding: 10px 15px;
      border: 1px solid #7CB342;
      border-radius: 5px 0 0 5px;
      font-size: 14px;
      background-color: #558B2F; /* Darker green for input background */
      color: white;
    }
    .newsletter-input::placeholder {
      color: #B2FF59; /* Lighter green for placeholder */
    }
    .newsletter-button {
      background-color: #8BC34A; /* Light green for button */
      color: #333;
      border: none;
      padding: 10px 20px;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }
    .newsletter-button:hover {
      background-color: #9CCC65;
    }
    .newsletter-description {
      font-size: 13px;
      line-height: 1.6;
      color: #CFD8DC;
    }
    .footer-divider {
      border: none;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      margin: 30px auto;
      width: 100%;
      max-width: 1400px;
    }
    .footer-bottom-text {
      text-align: center;
      font-size: 14px;
      color: #CFD8DC;
      width: 100vw;
      margin-left: auto;
      margin-right: auto;
    }
  `;
  const handleNotificationClick = () => {
    navigate("/premiumnotificationcenter");
  };
  return (
    <div className="pmc-bg">
      <style>{styles}</style>
      <EditProfileModal
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={() => setShowEditProfile(false)}
      />
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
            <div className="app-name">
              <h1>NicOff</h1>
              <p>Turn Off Nicotine, Turn On Life!</p>
            </div>
          </div>
        </div>
        <div className="header-right">
          <span className="notification-icon" onClick={handleNotificationClick}>
            🔔
          </span>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      <nav className="welcome-nav">
        <ul>
          <li>
            <a href="/premiummemberhome">Home</a>
          </li>
          <li>
            <a href="/premiummemberdashboard">Dashboard</a>
          </li>
          <li>
            <a href="/premiumachievement">Achievement</a>
          </li>
          <li>
            <a href="/premiummembercoach" className="active">Coach</a>
          </li>
          <li>
            <a href="/premiummembercommun">Community</a>
          </li>
          <li>
            <a href="/feedbackpremium">Feedback</a>
          </li>
        </ul>
      </nav>
      <div className="pmc-main">
        <div className="pmc-title">Your Personal Coach</div>
        <div className="pmc-coach-section">
          {/* Coach Card */}
          <div className="pmc-coach-card">
            <div className="pmc-coach-info">
              <img
                className="pmc-coach-avatar"
                src={coach.avatar ? coach.avatar : "/default-avatar.png"}
                alt="Coach Avatar"
              />
              <div className="pmc-coach-details">
                <div className="pmc-coach-name">
                  {coach.name || "Coach Name"}
                </div>
                <div className="pmc-coach-specialty">
                  {coach.specialty || "Specialty"}
                </div>
                <div className="pmc-coach-exp">
                  {coach.experience
                    ? `${coach.experience} years experience`
                    : ""}
                </div>
              </div>
            </div>
            <div className="pmc-next-session">
              <b>Next Session :</b>
              <br />
              <div
                style={{
                  background: "#61bb46",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 18px",
                  margin: "12px 0 10px 0",
                  fontWeight: 500,
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(56,70,60,0.10)",
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  {coach.nextSession ? (
                    <>
                      <span style={{ fontWeight: 700, fontSize: 18 }}>
                        {coach.nextSession.date}
                      </span>
                      <span style={{ fontSize: 15 }}>
                        {coach.nextSession.time}
                      </span>
                    </>
                  ) : (
                    <span style={{ fontWeight: 500, fontSize: 16 }}>
                      No appointment scheduled
                    </span>
                  )}
                </div>
                <button
                  style={{
                    background: "#23660e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 22px",
                    fontWeight: 700,
                    fontSize: 16,
                    marginLeft: 18,
                    cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(56,70,60,0.10)",
                  }}
                  onClick={() => navigate("/premiumbookappointment")}
                >
                  Book An Appointment
                </button>
              </div>
              <button
                style={{
                  width: "100%",
                  background: "#61bb46",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 0",
                  fontWeight: 700,
                  fontSize: 18,
                  marginTop: 10,
                  cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(56,70,60,0.10)",
                }}
                onClick={onMessageCoach}
              >
                Message Coach
              </button>
            </div>
          </div>
          {/* Progress Card */}
          <div className="pmc-progress-card">
            <div className="pmc-progress-title">Your Progress Report</div>
            <div className="pmc-progress-label">Motivation level</div>
            <div className="pmc-progress-bar">
              <div
                className="pmc-progress-bar-inner"
                style={{ width: progress.motivationLevel || "0%" }}
              ></div>
            </div>
            <div className="pmc-progress-label">Cravings control</div>
            <div className="pmc-progress-bar">
              <div
                className="pmc-progress-bar-inner"
                style={{ width: progress.cravingsControl || "0%" }}
              ></div>
            </div>
            <div className="pmc-progress-label">Program completion</div>
            <div className="pmc-progress-bar">
              <div
                className="pmc-progress-bar-inner"
                style={{ width: progress.completion || "0%" }}
              ></div>
            </div>
            <div className="pmc-coach-note">
              <b>Coach's Note:</b> {progress.coachNote || "No note yet."}
            </div>
          </div>
        </div>
        {/* Activities */}
        <div className="pmc-activities-title">Recommended Activities</div>
        <form
          onSubmit={handleAddActivity}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 18,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            style={{
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              width: 160,
            }}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            style={{
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              width: 260,
            }}
            required
          />
          <button type="submit" className="pmc-btn" style={{ minWidth: 120 }}>
            Add Activity
          </button>
        </form>
        <div className="pmc-activities-row">
          {activities.length === 0 && (
            <div style={{ color: "#888", fontStyle: "italic", padding: 20 }}>
              No activities yet. Add your first activity!
            </div>
          )}
          {activities.map((act, idx) => (
            <div
              className="pmc-activity-card"
              key={idx}
              style={idx === 0 ? { boxShadow: "0 0 0 3px #2196f3" } : {}}
            >
              <div className="pmc-activity-title">{act.title}</div>
              <div className="pmc-activity-desc">{act.description}</div>
              <button
                className={`pmc-activity-btn${
                  act.completed ? " completed" : ""
                }`}
                onClick={() => handleMarkActivity(idx)}
                disabled={act.completed}
              >
                Mark as Complete
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-column">
            <h4>NicOff</h4>
            <p>
              We're dedicated to helping you break free from smoking addiction
              through science-backed methods and community support
            </p>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/ourprograms">Our Programs</a>
              </li>
              <li>
                <a href="/successstories">Success Stories</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/helpcenter">Help Center</a>
              </li>
              <li>
                <a href="/privacypolicy">Privacy Policy</a>
              </li>
              <li>
                <a href="/termsofservice">Term Of Service</a>
              </li>
              <li>
                <a href="/cookiepolicy">Cookie Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>NewsLetter</h4>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your Email Address..."
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
            <p className="newsletter-description">
              Get the latest tips and motivation to stay smoke-free delivered to
              your inbox
            </p>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom-text">
          © 2025 NicOff. All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default PremiumMemberCoach;
