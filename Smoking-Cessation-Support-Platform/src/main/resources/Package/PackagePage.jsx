import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import journeyPath from '../assets/journey_path.jpg';

function PackagePage() {
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || 'elite'; 

  const handleSelectPackage = () => {
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const styles = `
html,
body,
#root {
  width: 100%;
  height: 1200px;
  margin: 0;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #DBF5DD;
}

header {
  background-color: #e0f2f7;
  padding: 20px 40px;
  border-bottom: 1px solid #d0e8ef;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.app-name h1 {
  margin: 0;
  font-size: 24px;
  color: #4CAF50;
}

.app-name p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-links li {
  margin-left: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #555;
  font-weight: bold;
  transition: color 0.3s ease, transform 0.2s ease;
}

.nav-links a:hover {
  color: #4CAF50;
  transform: translateY(-2px);
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-image: url(${journeyPath});
  background-size: cover;
  background-position: center;
  text-align: center;
  position: relative;
}

.service-package-intro {
    z-index: 2;
    margin-bottom: 50px;
  }
  
  .service-package-intro h2 {
    font-size: 42px;
    margin-bottom: 15px;
    color: #388E3C;
    text-shadow: none;
  }
  
  .service-package-intro p {
    font-size: 20px;
    opacity: 1;
    font-weight: 300;
    color: #666;
  }

.packages-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  z-index: 2;
  min-height: 400px;
}

.package-card {
  background-color: #fff;
  color: #333;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  padding: 35px;
  width: 320px;
  text-align: left;
  position: relative;
  margin-top: 20px;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

.package-card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.3);
}

.package-card h3 {
  font-size: 32px;
  margin-bottom: 12px;
  color: #2E7D32;
  font-weight: bold;
}

.package-card .price {
  font-size: 56px;
  font-weight: 900;
  color: #4CAF50;
  margin-bottom: 8px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.package-card .frequency {
  font-size: 20px;
  color: #666;
  margin-bottom: 25px;
}

.package-card .save-text {
  font-size: 15px;
  color: #1976D2;
  margin-bottom: 25px;
  font-weight: bold;
}

.package-card hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 25px 0;
}

.package-card .features {
  list-style: none;
  padding: 0;
  margin-bottom: 35px;
}

.package-card .features li {
  margin-bottom: 12px;
}

.select-package-button {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 18px 35px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.select-package-button:hover {
  background-color: #388E3C;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
}

.package-card.popular {
  border: 2px solid #FBC02D;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.popular-badge {
  background-color: #FBC02D;
  color: #333;
  padding: 8px 20px;
  border-radius: 0 0 10px 10px;
  position: absolute;
  top: -10px;
  right: 15px;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: pulse 1.5s infinite ease-in-out;
  text-align: center;
  transform: rotate(0deg);
}

.package-card.elite {
  border: 4px solid #673AB7;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  header,
  nav ul {
    padding: 15px 20px;
    gap: 15px;
  }

  .package-card {
    width: 280px;
    padding: 30px;
  }

  .package-card h3 {
    font-size: 28px;
  }

  .package-card .price {
    font-size: 50px;
  }

  .service-package-intro h2 {
    font-size: 38px;
  }

  .service-package-intro p {
    font-size: 18px;
  }

  .popular-badge {
    font-size: 15px;
    padding: 7px 18px;
    top: -18px;
    right: 20px;
  }

  .package-card.elite {
    transform: translateY(-20px) scale(1.03);
  }
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    text-align: center;
  }

  nav .logo-section {
    margin-bottom: 15px;
  }

  nav ul {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  main {
    padding: 20px;
  }

  .service-package-intro h2 {
    font-size: 32px;
  }

  .service-package-intro p {
    font-size: 16px;
  }

  .packages-container {
    flex-direction: column;
    align-items: center;
  }

  .package-card {
    width: 90%;
    max-width: 380px;
    padding: 25px;
  }

  .package-card.popular {
    transform: translateY(-10px);
  }

  .package-card.elite {
    transform: translateY(-15px) scale(1.02);
  }

  .package-card h3 {
    font-size: 26px;
  }

  .package-card .price {
    font-size: 45px;
  }

  .select-package-button {
    font-size: 18px;
    padding: 15px 25px;
  }

  
}

@media (max-width: 480px) {
  header {
    padding: 10px 15px;
  }

  .app-name h1 {
    font-size: 20px;
  }

  .app-name p {
    font-size: 12px;
  }

  .nav-links a {
    font-size: 14px;
  }

  .service-package-intro h2 {
    font-size: 28px;
  }

  .service-package-intro p {
    font-size: 14px;
  }

  .package-card {
    padding: 20px;
  }

  .package-card.popular {
    transform: translateY(-5px);
  }

  .package-card.elite {
    transform: translateY(-10px) scale(1.01);
  }

  .package-card h3 {
    font-size: 22px;
  }

  .package-card .price {
    font-size: 38px;
  }

  .package-card .frequency {
    font-size: 16px;
  }

  .package-card .features li {
    font-size: 14px;
  }

  .select-package-button {
    font-size: 16px;
    padding: 12px 20px;
  }

  
}

/* Payment Section Styles */
.payment-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: rgba(240, 242, 245, 0.9);
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  animation: fadeIn 0.5s ease-out;
}

.payment-card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  padding: 45px;
  width: 100%;
  max-width: 550px;
  text-align: left;
  transform: scale(0.95);
  animation: fadeInScale 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  position: relative;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
  color: #888;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #333;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.payment-header {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  color: #4CAF50;
}

.payment-icon {
  font-size: 40px;
  margin-right: 18px;
}

.payment-header h2 {
  font-size: 32px;
  margin: 0;
  color: #4CAF50;
  font-weight: bold;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  font-size: 17px;
  color: #555;
  margin-bottom: 10px;
  font-weight: bold;
}

.form-group input[type="text"] {
  width: calc(100% - 24px);
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 17px;
  color:rgb(243, 248, 244);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input[type="text"]:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
}

.form-row {
  display: flex;
  gap: 25px;
  margin-bottom: 35px;
}

.form-row .half-width {
  flex: 1;
}

.complete-select-button {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 18px 35px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.complete-select-button:hover {
  background-color: #388E3C;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
}

/* Responsive adjustments for Payment Section */
@media (max-width: 1024px) {
  .payment-card {
    max-width: 500px;
    padding: 40px;
  }

  .payment-header h2 {
    font-size: 26px;
  }

  .payment-icon {
    font-size: 34px;
  }
}

@media (max-width: 768px) {
  .payment-section {
    padding: 30px 20px;
  }

  .payment-card {
    padding: 30px;
    max-width: 90%;
  }

  .payment-header h2 {
    font-size: 24px;
  }

  .payment-icon {
    font-size: 30px;
  }

  .form-row {
    flex-direction: column;
    gap: 15px;
  }

  .form-group input[type="text"] {
    width: calc(100% - 20px);
    padding: 12px;
  }

  .complete-select-button {
    font-size: 18px;
    padding: 15px 25px;
  }
}

@media (max-width: 480px) {
  .payment-section {
    padding: 20px 15px;
  }

  .payment-card {
    padding: 25px;
  }

  .payment-header h2 {
    font-size: 20px;
  }

  .payment-icon {
    font-size: 26px;
  }

  .form-group label,
  .form-group input[type="text"] {
    font-size: 14px;
  }

  .form-group input[type="text"] {
    padding: 10px;
  }

  .complete-select-button {
    font-size: 16px;
    padding: 12px 20px;
  }
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

.elite-nav {
  background-color: #fff;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  width: 100vw;
  max-width: none;
  margin-left: 0;
  margin-right: 0;
  display: flex;
  justify-content: center;
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

.select-package-btn {
  background: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s, transform 0.15s, box-shadow 0.18s;
  box-shadow: 0 2px 8px #4caf5022;
}

.select-package-btn:hover {
  background: #388E3C;
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 4px 16px #4caf5044;
}

.payment-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-modal {
  background: #fff;
  border-radius: 16px;
  padding: 32px 28px 24px 28px;
  min-width: 340px;
  max-width: 95vw;
  box-shadow: 0 8px 32px rgba(60,120,60,0.18);
  position: relative;
}

.close-modal-btn {
  position: absolute;
  top: 12px;
  right: 18px;
  background: none;
  border: none;
  font-size: 28px;
  color: #333;
  cursor: pointer;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.payment-form label {
  font-size: 15px;
  color: #222;
  margin-bottom: 2px;
}

.payment-form input {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid #b6d7b0;
  border-radius: 6px;
  font-size: 16px;
  margin-top: 4px;
  margin-bottom: 2px;
}

.pay-btn {
  background: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s, transform 0.15s, box-shadow 0.18s;
}

.pay-btn:hover {
  background: #388E3C;
  transform: translateY(-2px) scale(1.03);
}

.page-footer {
  background-color: #333; 
  color: #fff;
  padding: 30px 20px;
  text-align: center;
  font-size: 14px;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
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
  color: #4CAF50;
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

  return (
    <div>
      <style>{styles}</style>
      <div className="welcome-header">
        <div className="header-left"></div>
        <div className="header-center">
          <div className="logo-section">
            <div className="app-name">
              <h1 onClick={() => navigate('/')} style={{cursor: 'pointer'}}>NicOff</h1>
              <p>Turn Off Nicotine, Turn On Life!</p>
            </div>
          </div>
        </div>
        <div className="header-right"></div>
      </div>
      <nav className="elite-nav">
        <ul>
          {from === 'standard' ? (
            <>
              <li><Link to="/standard/home">Home</Link></li>
              <li><Link to="/standard/dashboard">Dashboard</Link></li>
              <li><Link to="/standard/achievement">Achievement</Link></li>
              <li><Link to="/standard/coach">Coach</Link></li>
              <li><Link to="/standard/community">Community</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/elite/home">Home</Link></li>
              <li><Link to="/elite/dashboard">Dashboard</Link></li>
              <li><Link to="/elite/achievement">Achievement</Link></li>
              <li><Link to="/elite/coach">Coach</Link></li>
              <li><Link to="/elite/community">Community</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Main Content */}
      <main>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#DFF5DE',
          opacity: 0.7,
          zIndex: 0
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="service-package-intro">
            <h2>Subcribe Your Package</h2>
            <p>Unlock the best support for your smoke-free journey.</p>
          </div>
          <div className="packages-container" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div className="package-card elite" style={{
              background: '#fff',
              boxShadow: '0 4px 24px rgba(60,120,60,0.10)',
              textAlign: 'left',
              minWidth: 320,
              borderRadius: 18,
              border: '1.5px solid #b6d7b0',
              padding: '32px 24px 28px 24px',
              marginTop: 24,
              marginBottom: 12,
              transition: 'box-shadow 0.3s, transform 0.2s',
              position: 'relative',
            }}
            onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(60,120,60,0.18)'; e.currentTarget.style.transform = 'translateY(-4px) scale(1.015)'; }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(60,120,60,0.10)'; e.currentTarget.style.transform = 'none'; }}
            >
              <h3 style={{
                color: '#388E3C',
                fontWeight: 700,
                marginBottom: 22,
                textAlign: 'center',
                textShadow: '2px 4px 8px #b6d7b0',
                fontSize: 30,
                letterSpacing: 1
              }}>Elite Package</h3>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#222', letterSpacing: 2 }}>$</span>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#222', margin: '0 8px' }}>299</span>
                <span style={{ fontSize: 18, fontWeight: 400, color: '#222', marginLeft: 4 }}>/year</span>
              </div>
              <ul className="features" style={{ color: '#222', margin: 0, padding: 0, listStyle: 'none', fontSize: 16, fontWeight: 400 }}>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 14, gap: 10 }}><span style={{ color: '#1ca21c', fontSize: 22, marginRight: 8 }}>✓</span><span>Premium progress tracking</span></li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 14, gap: 10 }}><span style={{ color: '#1ca21c', fontSize: 22, marginRight: 8 }}>✓</span><span>Community access</span></li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 14, gap: 10 }}><span style={{ color: '#1ca21c', fontSize: 22, marginRight: 8 }}>✓</span><span>Daily tips</span></li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 14, gap: 10 }}><span style={{ color: '#1ca21c', fontSize: 22, marginRight: 8 }}>✓</span><span>Personal coach</span></li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 14, gap: 10 }}><span style={{ color: '#1ca21c', fontSize: 22, marginRight: 8 }}>✓</span><span>Advanced analytics</span></li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ color: '#1ca21c', fontSize: 22, marginRight: 8 }}>✓</span><span>Email reminders</span></li>
              </ul>
            </div>
            <div style={{ textAlign: 'center', marginTop: 0 }}>
              <button className="select-package-btn" onClick={() => setShowPayment(true)}>
                Select This Package
              </button>
            </div>
            {showPayment && (
              <div className="payment-modal-overlay" onClick={() => setShowPayment(false)}>
                <div className="payment-modal" onClick={e => e.stopPropagation()}>
                  <button className="close-modal-btn" onClick={() => setShowPayment(false)}>&times;</button>
                  <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Payment Information</h2>
                  <form className="payment-form" onSubmit={e => { e.preventDefault(); setShowPayment(false); navigate('/elite/home'); }}>
                    <label>Name on Card
                      <input type="text" placeholder="Full Name" required />
                    </label>
                    <label>Card Number
                      <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} required />
                    </label>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <label style={{ flex: 1 }}>Expiry
                        <input type="text" placeholder="MM/YY" maxLength={5} required />
                      </label>
                      <label style={{ flex: 1 }}>CVC
                        <input type="text" placeholder="CVC" maxLength={4} required />
                      </label>
                    </div>
                    <button type="submit" className="pay-btn">Pay</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="page-footer">
        <div className="footer-content">
            <div className="footer-column">
            <h3>NicOff</h3>
              <p>We're dedicated to helping you break free from smoking addiction through science-backed methods and community support</p>
          </div>
            <div className="footer-column">
            <h3>Quick Links</h3>
              <Link to="/about-us">About Us</Link>
              <Link to="/our-programs">Our Programs</Link>
              <Link to="/success-stories">Success Stories</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
          </div>
            <div className="footer-column">
            <h3>Support</h3>
              <Link to="/faq">FAQ</Link>
              <Link to="/help-center">Help Center</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Term Of Service</Link>
              <Link to="/cookie-policy">Cookie Policy</Link>
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

export default PackagePage; 