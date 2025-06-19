import React, { useState } from "react";
import EditProfileModal from "../EditProfileModal";
import { useNavigate } from "react-router-dom";
import journeyPath from '../assets/journey_path.jpg';

function EliteCoach({
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

  // Lấy lịch sử đặt lịch từ localStorage
  const [bookingHistory, setBookingHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('elite_booking_history');
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {}
      }
    }
    return null;
  });

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

  const handleClearBooking = () => {
    localStorage.removeItem('elite_booking_history');
    setBookingHistory(null);
  };

  const styles = `
    .elite-home-container {
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
    .elite-nav {
        background-color: #fff;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
    .elite-nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        gap: 40px;
    }
    .elite-nav a {
        text-decoration: none;
        color: #5EBB34;
        font-weight: 400;
        font-size: 16px;
        padding: 5px 0;
        position: relative;
        transition: color 0.3s;
    }
    .elite-nav a::after {
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
    .elite-nav a:hover::after, .elite-nav a:focus::after, .elite-nav a.active::after {
        transform: scaleX(1);
    }
    .main-content-elite {
        flex-grow: 1;
        padding: 20px;
    }
    .elite-footer {
        background-color: #333; 
        color: #fff;
        padding: 30px 20px;
        text-align: center;
        font-size: 14px;
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
      color: #4CAF50; /* Keep green color */
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
    }
  `;
  const handleNotificationClick = () => {
    navigate("/elitenotificationcenter");
  };
  return (
    <div className="elite-home-container">
      <style>{styles}</style>
      <EditProfileModal
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={() => setShowEditProfile(false)}
      />
      <header className="welcome-header">
        <div className="header-left">
          <button className="profile-btn">
            Elite Member
          </button>
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
          <span className="notification-icon" onClick={() => navigate('/elitenotificationcenter')}>🔔</span>
          <button className="logout-button" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </header>
      <nav className="elite-nav">
        <ul>
          <li><a href="/elite/home">Home</a></li>
          <li><a href="/elite/dashboard">Dashboard</a></li>
          <li><a href="/elite/achievement">Achievement</a></li>
          <li><a href="/elite/coach" className="active">Coach</a></li>
          <li><a href="/elite/community">Community</a></li>
          <li><a href="/elite/feedback">Feedback</a></li>
        </ul>
      </nav>
      <main className="main-content-elite" style={{
        background: `linear-gradient(rgba(223,245,222,0.85), rgba(223,245,222,0.85)), url(${journeyPath}) center/cover no-repeat`,
        minHeight: 'calc(100vh - 220px)',
        padding: '40px 0 0 0',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#388E3C', fontWeight: 700, marginBottom: 28, fontSize: 32 }}>Your Personal Coach</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
            {/* Coach Card */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(56,70,60,0.10)', border: '2px solid #222', minWidth: 340, maxWidth: 400, flex: '1 1 340px', padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 10 }}>
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Coach Avatar" style={{ width: 64, height: 64, borderRadius: '50%', border: '2.5px solid #4CAF50', background: '#fff', objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>Dr. Sarah JonhSon</div>
                  <div style={{ color: '#61bb46', fontSize: 15, fontWeight: 500, marginBottom: 2 }}>Certified Smoking Cessation Specialist</div>
                  <div style={{ color: '#444', fontSize: 15 }}>5 years experience</div>
                </div>
              </div>
              <div style={{ fontWeight: 600, margin: '10px 0 2px 0' }}>Next Session :</div>
              <div style={{ background: '#61bb46', borderRadius: 10, color: '#fff', padding: '14px 18px', margin: '8px 0 12px 0', fontWeight: 500, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17 }}>April 5, 2025</div>
                  <div style={{ fontSize: 15 }}>3:00 PM - 3:45 PM</div>
                </div>
                <button
                  style={{ background: '#23660e', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, fontSize: 16, marginLeft: 18, cursor: 'pointer', boxShadow: '0 1px 4px rgba(56,70,60,0.10)' }}
                  onClick={() => navigate('/elite/book-appointment')}
                >Book An Appointment</button>
              </div>
              <button style={{ width: '100%', background: '#61bb46', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 700, fontSize: 18, marginTop: 6, cursor: 'pointer', boxShadow: '0 1px 4px rgba(56,70,60,0.10)' }}>Message Coach</button>
            </div>
            {/* Progress Card */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(56,70,60,0.10)', border: '2px solid #222', minWidth: 340, maxWidth: 400, flex: '1 1 340px', padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ color: '#61bb46', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>Your Progress Report</div>
              <div style={{ fontWeight: 500, marginBottom: 2 }}>Motivation level <span style={{ float: 'right', color: '#444', fontWeight: 400, fontSize: 15 }}>Medium</span></div>
              <div style={{ width: '100%', height: 7, background: '#eee', borderRadius: 6, marginBottom: 12 }}>
                <div style={{ width: '60%', height: '100%', background: '#23660e', borderRadius: 6 }}></div>
              </div>
              <div style={{ fontWeight: 500, marginBottom: 2 }}>Cravings control <span style={{ float: 'right', color: '#444', fontWeight: 400, fontSize: 15 }}>High</span></div>
              <div style={{ width: '100%', height: 7, background: '#eee', borderRadius: 6, marginBottom: 12 }}>
                <div style={{ width: '90%', height: '100%', background: '#23660e', borderRadius: 6 }}></div>
              </div>
              <div style={{ fontWeight: 500, marginBottom: 2 }}>Program completion <span style={{ float: 'right', color: '#444', fontWeight: 400, fontSize: 15 }}>35%</span></div>
              <div style={{ width: '100%', height: 7, background: '#eee', borderRadius: 6, marginBottom: 12 }}>
                <div style={{ width: '35%', height: '100%', background: '#23660e', borderRadius: 6 }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 22, color: '#222', marginTop: -2 }}>💬</span>
                <div><b>Coach's Note:</b> <span style={{ fontWeight: 400 }}>&quot;Your are doing great! Let's work on managing those afternoon cravings this week.&quot;</span></div>
              </div>
            </div>
          </div>
          {/* Booking History section below Personal Coach */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            {bookingHistory ? (
              <div style={{ background: '#fff', border: '2px solid #61bb46', borderRadius: 12, padding: 20, maxWidth: 500, boxShadow: '0 2px 8px rgba(56,70,60,0.10)', width: '100%', textAlign: 'center' }}>
                <div style={{ color: '#388E3C', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Booking History</div>
                <div><b>Date:</b> {bookingHistory.date}</div>
                <div><b>Time:</b> {bookingHistory.time}</div>
                {bookingHistory.coach && bookingHistory.coach.name && (
                  <div><b>Coach:</b> {bookingHistory.coach.name}</div>
                )}
                <button onClick={handleClearBooking} style={{ marginTop: 16, background: '#eee', color: '#388E3C', border: '1px solid #61bb46', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Clear booking history</button>
              </div>
            ) : (
              <div style={{ background: '#fff', border: '2px solid #ccc', borderRadius: 12, padding: 20, maxWidth: 500, boxShadow: '0 2px 8px rgba(56,70,60,0.06)', color: '#888', fontWeight: 500, width: '100%', textAlign: 'center' }}>
                No booking yet.
              </div>
            )}
          </div>
          {/* Activities */}
          <div style={{ fontWeight: 700, color: '#388E3C', fontSize: 24, margin: '30px 0 18px 8px' }}>Recommended Activities</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            {/* Activity 1 */}
            <div style={{ background: '#fff', border: '2px solid #61bb46', borderRadius: 14, boxShadow: '0 2px 8px rgba(56,70,60,0.10)', padding: '22px 20px 18px 20px', minWidth: 260, maxWidth: 320, flex: '1 1 260px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: 28, marginBottom: 8, color: '#61bb46' }}>🚶‍♂️</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>15 min walk</div>
              <div style={{ fontSize: 15, color: '#222', marginBottom: 12 }}>When craving hit, take a brisk walk outside to distract yourself.</div>
              <button style={{ background: '#e8f5e9', color: '#61bb46', border: 'none', borderRadius: 8, padding: '7px 18px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 'auto' }}>Mark as Complete</button>
            </div>
            {/* Activity 2 */}
            <div style={{ background: '#fff', border: '2px solid #61bb46', borderRadius: 14, boxShadow: '0 2px 8px rgba(56,70,60,0.10)', padding: '22px 20px 18px 20px', minWidth: 260, maxWidth: 320, flex: '1 1 260px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: 28, marginBottom: 8, color: '#444' }}>🥤</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Hydration Reminder</div>
              <div style={{ fontSize: 15, color: '#222', marginBottom: 12 }}>Drink a glass of water when you make up and before meals.</div>
              <button style={{ background: '#e8f5e9', color: '#61bb46', border: 'none', borderRadius: 8, padding: '7px 18px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 'auto' }}>Mark as Complete</button>
            </div>
            {/* Activity 3 */}
            <div style={{ background: '#fff', border: '2px solid #61bb46', borderRadius: 14, boxShadow: '0 2px 8px rgba(56,70,60,0.10)', padding: '22px 20px 18px 20px', minWidth: 260, maxWidth: 320, flex: '1 1 260px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: 28, marginBottom: 8, color: '#222' }}>📖</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Journey Entry</div>
              <div style={{ fontSize: 15, color: '#222', marginBottom: 12 }}>Write about your smoke-free journey and how feel today.</div>
              <button style={{ background: '#e8f5e9', color: '#61bb46', border: 'none', borderRadius: 8, padding: '7px 18px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 'auto' }}>Mark as Complete</button>
            </div>
          </div>
        </div>
      </main>
      <footer className="elite-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>NicOff</h3>
            <p>We're dedicated to helping you break free from smoking addiction through science-backed methods and community support</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <a href="/about-us">About Us</a>
            <a href="/our-programs">Our Programs</a>
            <a href="/success-stories">Success Stories</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <a href="/faq">FAQ</a>
            <a href="/help-center">Help Center</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Term Of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>
          <div className="footer-column">
            <h3>NewsLetter</h3>
            <input type="email" placeholder="Your Email Address..." className="newsletter-input" />
            <button className="newsletter-button">Subscribe</button>
            <p style={{fontSize: '0.8em', color: '#ccc', marginTop: '10px'}}>Get the latest tips and motivation to stay smoke-free delivered to your inbox</p>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 NicOff. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default EliteCoach;
