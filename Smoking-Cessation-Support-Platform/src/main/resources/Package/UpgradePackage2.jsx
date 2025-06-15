import React, { useState } from 'react';

function UpgradePackage2() {
    const [showPayment, setShowPayment] = useState(false);

    const handleUpgradeClick = () => {
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
    height: 100%;
    margin: 0;
  }
  
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
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
    animation: slideInLeft 0.7s ease-out forwards;
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-right: 10px;
    animation: scaleIn 0.5s ease-out forwards;
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
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
    animation: slideInRight 0.7s ease-out forwards;
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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
    background-color: #E6F0E6; /* Light green background */
    background-size: cover;
    background-position: center;
    color: #fff;
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
  
  @keyframes pulse {
    from {
      background-color: rgba(230, 240, 230, 0.7);
    }
    to {
      background-color: rgba(230, 240, 230, 0.75);
    }
  }
  
  .upgrade-intro {
    z-index: 2;
    margin-bottom: 50px;
  }
  
  .upgrade-intro h2 {
    font-size: 42px;
    margin-bottom: 15px;
    color: #388E3C; /* Dark green for heading */
    text-shadow: none;
  }
  
  .upgrade-intro p {
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
    animation: fadeInScale 0.6s ease-out forwards;
  }
  
  .package-card.premium {
    border: 3px solid #FFC107; /* Yellow border for Premium */
    box-shadow: 0 12px 25px rgba(255, 193, 7, 0.4); /* Stronger yellow shadow */
  }

  .package-card.current-plan {
    border: 3px solid #FFC107; /* Yellow border for current plan */
    box-shadow: 0 12px 25px rgba(255, 193, 7, 0.4); /* Stronger yellow shadow */
  }
  
  .package-card:hover {
    transform: translateY(-15px) scale(1.04) rotateZ(0.5deg); /* More pronounced lift and slight rotation */
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); /* Stronger shadow on hover */
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
    margin-bottom: 10px;
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
  
  .upgrade-button {
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
    animation: glow 1.5s infinite alternate ease-in-out;
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
    }
    to {
      box-shadow: 0 0 20px rgba(76, 175, 80, 0.8);
    }
  }

  

  
  
  .upgrade-button:hover {
    background-color: #388E3C;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  }
  
  /* Badges */
  .current-plan-badge {
    background-color: #FFC107; /* Primary green for current plan badge */
    color: #fff;
    padding: 8px 20px;
    border-radius: 0 0 10px 10px;
    position: absolute;
    top: -5px; /* Adjusted to protrude more */
    left: 50%;
    transform: translateX(-50%) rotateZ(-5deg); /* Initial rotation */
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
    animation: wobble 2s infinite ease-in-out;
  }
  
  .popular-badge {
    background-color: #FFC107; /* Yellow for popular badge */
    color: #fff;
    padding: 8px 20px;
    border-radius: 0 0 10px 10px;
    position: absolute;
    top: -5px; /* Adjusted to protrude more */
    left: 50%;
    transform: translateX(-50%) rotateZ(5deg); /* Initial rotation */
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
    animation: wobble 2s infinite ease-in-out 0.5s; /* Staggered wobble */
  }
  
  @keyframes wobble {
    0%, 100% {
      transform: translateX(-50%) rotateZ(-5deg);
    }
    50% {
      transform: translateX(-50%) rotateZ(5deg);
    }
  }
  
  .package-card .features li:hover {
    color: #4CAF50;
    transform: translateX(5px);
  }
  
  .package-card.elite {
    border: 3px solid #9C27B0; /* Purple border */
    box-shadow: 0 12px 25px rgba(156, 39, 176, 0.4); /* Stronger purple shadow */
    transform: scale(1.05);
  }

  .upgrade-info-text {
    background-color: #9C27B0; /* Dark green for upgrade info text (for Elite package) */
    color: #fff;
    padding: 10px 15px;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    width: fit-content;
    border: 1px solid #388E3C;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 5px; /* Adjust margin to be smaller */
    transition: transform 0.2s ease; /* Smooth transition for hover */
  }

  .upgrade-info-text.yellow {
    background-color: #FFC107;
    border: 1px solid #FFC107;
  }

  .upgrade-info-text:hover {
    transform: translateY(-5px); /* Slight bounce effect on hover */
  }

  /* Locked package styles */
  .package-card.locked-package {
    position: relative;
    opacity: 0.6; /* Dim the card */
    cursor: not-allowed;
  }

  .package-card.locked-package::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5); /* White overlay to dim */
    border-radius: 15px;
    z-index: 5;
  }

  .package-card.locked-package .lock-icon {
    position: absolute;
    font-size: 80px;
    color: #333;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    opacity: 1; /* Ensure the lock icon is visible */
  }

  .package-card.locked-package .upgrade-button {
    background-color: #ccc; /* Grey out the button */
    cursor: not-allowed;
  }

  .package-card.locked-package .upgrade-button:hover {
    background-color: #ccc;
    transform: none;
    box-shadow: none;
  }
  
  /* Payment Section Styles */
  .payment-section {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.3s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes popOut {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .payment-card {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 500px;
    position: relative;
    animation: popOut 0.3s forwards;
  }

  .payment-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    color: #4CAF50;
  }

  .payment-icon {
    font-size: 30px;
    margin-right: 15px;
  }

  .payment-header h2 {
    margin: 0;
    font-size: 28px;
    font-weight: bold;
  }

  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 24px;
    color: #555;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.2s ease;
  }

  .close-button:hover {
    color: #D32F2F;
    transform: rotate(90deg);
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
  }

  .form-group input[type="text"],
  .form-group select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .form-group input[type="text"]:focus,
  .form-group select:focus {
    border-color: #4CAF50;
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
    outline: none;
  }

  .form-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .form-group.half-width {
    flex: 1;
  }

  .complete-upgrade-button {
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 15px 25px;
    font-size: 18px;
    cursor: pointer;
    width: 100%;
    font-weight: bold;
    letter-spacing: 0.5px;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .complete-upgrade-button:hover {
    background-color: #388E3C;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  }

  /* Responsive adjustments for payment section */
  @media (max-width: 768px) {
    .payment-card {
      padding: 20px;
      width: 95%;
    }

    .payment-header h2 {
      font-size: 24px;
    }

    .payment-icon {
      font-size: 26px;
    }

    .close-button {
      font-size: 20px;
    }

    .form-row {
      flex-direction: column;
      gap: 0;
    }

    .form-group.half-width {
      width: 100%;
    }

    .complete-upgrade-button {
      font-size: 16px;
      padding: 12px 20px;
    }
  }

  @media (max-width: 480px) {
    .payment-card {
      padding: 15px;
    }

    .payment-header h2 {
      font-size: 20px;
    }

    .payment-icon {
      font-size: 22px;
    }

    .close-button {
      font-size: 18px;
      top: 10px;
      right: 10px;
    }

    .form-group label {
      font-size: 14px;
    }

    .form-group input[type="text"],
    .form-group select {
      font-size: 14px;
      padding: 10px;
    }

    .complete-upgrade-button {
      font-size: 14px;
      padding: 10px 15px;
    }
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
  
    .upgrade-intro h2 {
      font-size: 38px;
    }
  
    .upgrade-intro p {
      font-size: 18px;
    }
  
    .current-plan-badge,
    .popular-badge {
      font-size: 15px;
      padding: 7px 18px;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
    }
  
    .package-card.elite {
      transform: translateY(-20px) scale(1.03);
    }
  
    .upgrade-info-text {
      font-size: 14px;
      padding: 10px 20px;
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
  
    .upgrade-intro h2 {
      font-size: 32px;
    }
  
    .upgrade-intro p {
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
  
    .package-card h3 {
      font-size: 26px;
    }
  
    .package-card .price {
      font-size: 45px;
    }
  
    .upgrade-button {
      font-size: 18px;
      padding: 15px 25px;
    }
  
    .current-plan-badge,
    .popular-badge {
      font-size: 14px;
      padding: 6px 15px;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
    }
  
    .package-card.elite {
      transform: translateY(-10px) scale(1.02);
    }
  
    .upgrade-info-text {
      font-size: 14px;
      padding: 10px 20px;
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
  
    .upgrade-intro h2 {
      font-size: 28px;
    }
  
    .upgrade-intro p {
      font-size: 14px;
    }
  
    .package-card {
      padding: 20px;
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
  
    .upgrade-button {
      font-size: 16px;
      padding: 12px 20px;
    }
  
    .current-plan-badge,
    .popular-badge {
      font-size: 12px;
      padding: 5px 12px;
      top: -7px;
      left: 50%;
      transform: translateX(-50%);
    }
  
    .package-card.elite {
      transform: translateY(-5px) scale(1.01);
    }
  
    .upgrade-info-text {
      font-size: 12px;
      padding: 8px 15px;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .upgrade-intro h2 {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .upgrade-intro p {
    animation: fadeInUp 0.8s ease-out 0.2s forwards; /* Slight delay for paragraph */
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

  /* Stagger animation for each card */
  .packages-container .package-card:nth-child(1) {
    animation-delay: 0.1s;
  }

  .packages-container .package-card:nth-child(2) {
    animation-delay: 0.2s;
  }

  .packages-container .package-card:nth-child(3) {
    animation-delay: 0.3s;
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
                        <li><a href="/standardmemberhome">Home</a></li>
                        <li><a href="/standardmemberdashboard">Dashboard</a></li>
                        <li><a href="#">Achievement</a></li>
                        <li><a href="/standardmembercoach">Coach</a></li>
                        <li><a href="/standardmembercommunity">Community</a></li>
                        <li><a href="/standardmemberfeedback">Feedback</a></li>
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main>
                <section className="upgrade-intro">
                    <h2>Upgrade Your Account</h2>
                    <p>Nicoff offers comprehensive support packages for your quitting smoking journey.</p>
                </section>

                <section className="packages-container">
                    {/* Standard Package */}
                    <div className="package-card locked-package">
                        <span className="lock-icon">🔒</span>
                        <h3>Standard Package</h3>
                        <p className="price">$29</p>
                        <p className="frequency">/month</p>
                        <hr />
                        <ul className="features">
                            <li><i className="check-icon">✔️</i> Basic progress tracking</li>
                            <li><i className="check-icon">✔️</i> Community Access</li>
                            <li><i className="check-icon">✔️</i> Weekly tips</li>
                        </ul>
                    </div>

                    {/* Premium Package */}
                    <div className="package-card current-plan">
                        <span className="current-plan-badge">Current Plan</span>
                        <h3>Premium Package</h3>
                        <p className="price">$159</p>
                        <p className="frequency">/6 month</p>
                        <p className="save-text">Save 11% on Standard Package</p>
                        <hr />
                        <div className="upgrade-info-text yellow">Upgrade from Standard: $119 (Save $40)</div>
                        <ul className="features">
                            <li><i className="check-icon">✔️</i> Premium progress tracking</li>
                            <li><i className="check-icon">✔️</i> Community access</li>
                            <li><i className="check-icon">✔️</i> Weekly tips</li>
                            <li><i className="cross-icon">❌</i> Personal coach</li>
                            <li><i className="cross-icon">❌</i> Advanced analytics</li>
                            <li><i className="check-icon">✔️</i> Email reminders</li>
                        </ul>
                    </div>

                    {/* Elite Package */}
                    <div className="package-card elite">
                        <h3>Elite Package</h3>
                        <p className="price">$299</p>
                        <p className="frequency">/12 month</p>
                        <p className="save-text">Save 17% on Premium Package</p>
                        <hr />
                        <div className="upgrade-info-text">Upgrade from Basic: (Save $40)</div>
                        <div className="upgrade-info-text">Upgrade from Premium: (Save $90)</div>
                        <ul className="features">
                            <li><i className="check-icon">✔️</i> Pro progress tracking</li>
                            <li><i className="check-icon">✔️</i> Community access</li>
                            <li><i className="check-icon">✔️</i> Weekly tips</li>
                            <li><i className="check-icon">✔️</i> Personal coach</li>
                            <li><i className="check-icon">✔️</i> Advanced analytics</li>
                            <li><i className="check-icon">✔️</i> Email reminders</li>
                        </ul>

                        <button className="upgrade-button" onClick={handleUpgradeClick}>Upgrade to Elite</button>
                    </div>
                </section>
            </main>
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
                        <div className="form-group">
                            <label htmlFor="selectPackage">Select Package</label>
                            <select id="selectPackage">
                                <option>-- Select Package --</option>
                                <option>Premium Package</option>
                                <option>Elite Package</option>
                            </select>
                        </div>
                        <button className="complete-upgrade-button">Complete Upgrade</button>
                    </div>
                </section>
            )}
        </div>
    );
}

export default UpgradePackage2;