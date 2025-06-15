import React, { useState } from 'react';

function PackagePage() {
  const [showPayment, setShowPayment] = useState(false);

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
  background-color:rgb(29, 228, 52);
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
  background-image: url('/z6704234340468_d0d12baf257178fe87207c3dc9979725.jpg');
  background-size: cover;
  background-position: center;
  text-align: center;
  position: relative;
}

main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(192,192,192,0.4);
  z-index: 1;
  backdrop-filter: blur(8px);
}

.service-package-intro {
    z-index: 2;
    margin-bottom: 50px;
  }
  
  .service-package-intro h2 {
    font-size: 42px;
    margin-bottom: 15px;
    color: #388E3C; /* Dark green for heading */
    text-shadow: none; /* Remove text shadow */
  }
  
  .service-package-intro p {
    font-size: 20px;
    opacity: 1;
    font-weight: 300;
    color: #666; /* Dark grey for description */
  }

.packages-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  z-index: 2;
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
  display: flex;
  align-items: center;
  font-size: 17px;
  color: #444;
  transition: color 0.3s ease, transform 0.2s ease;
}

.package-card .features li:hover {
  color: #4CAF50;
  transform: translateX(5px);
}

.package-card .features .check-icon {
  color: #4CAF50;
  font-size: 22px;
  margin-right: 12px;
  transition: transform 0.2s ease;
}

.package-card:hover .features .check-icon {
  transform: scale(1.2); /* Pop effect on hover */
}

.package-card .features .cross-icon {
  color: #D32F2F;
  font-size: 22px;
  margin-right: 12px;
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
  `;

  return (
    <div>
      <style>{styles}</style>
      {/* Header */}
      <header>
        <nav>
          <div className="logo-section">
            <span className="logo">LOGO</span>
            <div className="app-name">
              <h1>NicOff</h1>
              <p>Turn Off Nicotine, Turn On Life!</p>
            </div>
          </div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Achievement</a></li>
            <li><a href="#">Coach</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Feedback</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <section className="service-package-intro">
          <h2>Service Package</h2>
          <p>Nicoff offers comprehensive support packages for your quitting smoking journey.</p>
        </section>

        <section className="packages-container">
          {/* Standard Package */}
          <div className="package-card">
            <h3>Standard Package</h3>
            <p className="price">$29</p>
            <p className="frequency">/month</p>
            <hr />
            <ul className="features">
              <li><i className="check-icon">✔️</i> Basic progress tracking</li>
              <li><i className="check-icon">✔️</i> Community Access</li>
              <li><i className="check-icon">✔️</i> Weekly tips</li>
            </ul>
            <button className="select-package-button" onClick={handleSelectPackage}>Select Package</button>
          </div>

          {/* Premium Package */}
          <div className="package-card popular">
            <div className="popular-badge">Popular</div>
            <h3>Premium Package</h3>
            <p className="price">$159</p>
            <p className="frequency">/6 month</p>
            <p className="save-text">Save 11% on Standard Package</p>
            <hr />
            <ul className="features">
              <li><i className="check-icon">✔️</i> Premium progress tracking</li>
              <li><i className="check-icon">✔️</i> Community access</li>
              <li><i className="check-icon">✔️</i> Weekly tips</li>
              <li><i className="cross-icon">❌</i> Personal coach</li>
              <li><i className="cross-icon">❌</i> Advanced analytics</li>
              <li><i className="check-icon">✔️</i> Email reminders</li>
            </ul>
            <button className="select-package-button" onClick={handleSelectPackage}>Select Package</button>
          </div>

          {/* Elite Package */}
          <div className="package-card elite">
            <h3>Elite Package</h3>
            <p className="price">$299</p>
            <p className="frequency">/12 month</p>
            <p className="save-text">Save 17% on Premium Package</p>
            <hr />
            <ul className="features">
              <li><i className="check-icon">✔️</i> Pro progress tracking</li>
              <li><i className="check-icon">✔️</i> Community access</li>
              <li><i className="check-icon">✔️</i> Daily tips</li>
              <li><i className="check-icon">✔️</i> Personal coach</li>
              <li><i className="check-icon">✔️</i> Advanced analytics</li>
              <li><i className="check-icon">✔️</i> Email reminders</li>
            </ul>
            <button className="select-package-button" onClick={handleSelectPackage}>Select Package</button>
          </div>
        </section>
      </main>

      {/* Payment Information Section */}
      {showPayment && (
        <section className="payment-section">
          <div className="payment-card">
            <div className="payment-header">
              <i className="payment-icon">💲</i>
              <h2>Payment Information</h2>
            </div>
            <span className="close-button" onClick={handleClosePayment}>X</span>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input type="text" id="cardNumber" placeholder="1234 5678 9012 ..." />
            </div>
            <div className="form-group">
              <label htmlFor="nameOnCard">Name of Card</label>
              <input type="text" id="nameOnCard" placeholder="Jonh Smith ..." />
            </div>
            <div className="form-row">
              <div className="form-group half-width">
                <label htmlFor="expiryDate">Expired Date</label>
                <input type="text" id="expiryDate" placeholder="MM/YY ..." />
              </div>
              <div className="form-group half-width">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" placeholder="123 ..." />
              </div>
            </div>
            <button className="complete-select-button">Complete Select</button>
          </div>
        </section>
      )}
    </div>
  );
}

export default PackagePage; 