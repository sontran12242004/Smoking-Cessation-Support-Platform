import React from 'react';
import { useNavigate } from 'react-router-dom';
import journeyPath from '../assets/journey_path.jpg'; 

function EliteViewSubscription() {
  const navigate = useNavigate();

  // Subscription dates
  const startDate = new Date();
  const endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());

  const formatDate = (date) => {
    return date.toLocaleDateString('en-CA'); 
  };

  const handleCancelSubscription = () => {
    // Logic for cancelling subscription can be added here
    // For example, show a confirmation modal
    alert('Subscription cancellation process initiated.');
  };

  const styles = `
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background-color: #f0f2f5;
    }
    .main-container {
      background: url(${journeyPath}) center/cover no-repeat;
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #DFF5DE;
        opacity: 0.7;
        z-index: 0;
    }
    .content-wrap {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        align-items: center;
        padding: 40px 20px;
    }
    .header-center {
        text-align: center;
        margin-bottom: 40px;
    }
    .header-center h1 { margin: 0; font-size: 32px; color: #4CAF50; font-weight: bold; }
    .header-center p { margin: 0; font-size: 18px; color: #333; }
    
    .subscription-container {
        display: flex;
        gap: 40px;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        max-width: 500px; /* Adjusted for a single card */
    }

    .subscription-card {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        flex: 1;
        display: flex;
        flex-direction: column;
        border: 2px solid #4CAF50;
    }
    
    .card-title {
        position: relative;
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
        text-align: center;
    }
    
    .current-badge {
        position: absolute;
        top: -60px;
        right: -40px;
        background-color: #4CAF50;
        color: white;
        padding: 5px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: bold;
        z-index: 2;
    }

    .card-price {
        font-size: 36px;
        font-weight: bold;
        color: #4CAF50;
        margin-bottom: 20px;
        text-align: center;
    }
    
    .card-features {
        list-style: none;
        padding: 0;
        margin: 0 0 30px 0;
        flex-grow: 1;
    }

    .card-features li {
        margin-bottom: 12px;
        color: #555;
    }

    .date-info {
        font-size: 14px;
        color: #777;
        text-align: center;
        margin-top: auto;
        padding-top: 20px;
        border-top: 1px solid #eee;
    }

    .cancel-button {
        display: block;
        width: 60%;
        padding: 15px;
        border: none;
        border-radius: 5px;
        background-color: #dc3545; /* Red for cancellation */
        color: white;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        margin: auto;
        margin-top: 20px;
    }
    .back-button {
        margin-top: 40px;
        padding: 10px 25px;
        border: 2px solid #555;
        border-radius: 5px;
        background-color: transparent;
        color: #555;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }
  `;

  return (
    <div className="main-container">
      <style>{styles}</style>
      <div className="overlay"></div>
      <div className="content-wrap">
        <div className="header-center">
          <h1>Your Subscription</h1>
          <p>Manage your current plan details.</p>
        </div>
        
        <div className="subscription-container">
          <div className="subscription-card">
            <h2 className="card-title">
              Elite Package
              <span className="current-badge">Current Package</span>
            </h2>
            <div className="card-price">$299/year</div>
            <ul className="card-features">
              <li>✔️ Premium progress tracking</li>
              <li>✔️ Community access</li>
              <li>✔️ Daily tips</li>
              <li>✔️ Personal coach</li>
              <li>✔️ Advanced analytics</li>
              <li>✔️ Email reminders</li>
            </ul>
            <div className="date-info">
              <p>Start Date: {formatDate(startDate)}</p>
              <p>End Date: {formatDate(endDate)}</p>
            </div>
            <button className="cancel-button" onClick={handleCancelSubscription}>
              Cancel Subscription
            </button>
          </div>
        </div>

        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default EliteViewSubscription; 