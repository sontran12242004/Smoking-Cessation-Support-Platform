import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import journeyPath from '../assets/journey_path.jpg';
import { useUser } from '../UserContext';
import ApiService from '../apiService';

function EliteViewSubscription() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subscription data when component mounts
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      // Debug: Log current user data
      console.log('EliteViewSubscription - Current user object:', user);
      console.log('EliteViewSubscription - localStorage user:', localStorage.getItem('user'));
      
      // Try different possible user ID properties
      const userId = user?.id || user?.userId || user?.memberId;
      
      console.log('EliteViewSubscription - Extracted userId:', userId);
      console.log('EliteViewSubscription - user.id:', user?.id);
      console.log('EliteViewSubscription - user.userId:', user?.userId);
      console.log('EliteViewSubscription - user.memberId:', user?.memberId);
      
      if (!user || !userId) {
        const errorMsg = !user ? 'User object is null/undefined' : 'User ID missing from user object';
        console.error('EliteViewSubscription - Error:', errorMsg);
        setError(`${errorMsg}. Please login again.`);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching subscription data for user ID:', userId);
        const data = await ApiService.getAccountMembership(userId);
        console.log('Subscription data received:', data);
        setSubscriptionData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching subscription data:', err);
        setError(`Failed to load subscription information: ${err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [user]);

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 3) return 'N/A';
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day); // month is 0-indexed in JavaScript
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

  if (loading) {
    return (
      <div className="main-container">
        <style>{styles}</style>
        <div className="overlay"></div>
        <div className="content-wrap">
          <div className="header-center">
            <h1>Loading Subscription...</h1>
            <p>Please wait while we fetch your subscription details.</p>
          </div>
          <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-container">
        <style>{styles}</style>
        <div className="overlay"></div>
        <div className="content-wrap">
          <div className="header-center">
            <h1>Error Loading Subscription</h1>
            <p>{error}</p>
          </div>
          <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!subscriptionData) {
    return (
      <div className="main-container">
        <style>{styles}</style>
        <div className="overlay"></div>
        <div className="content-wrap">
          <div className="header-center">
            <h1>No Subscription Found</h1>
            <p>No subscription data available.</p>
          </div>
          <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
              {subscriptionData.planName || 'Elite Package'}
              <span className="current-badge">
                {subscriptionData.hasActiveMembership ? 'Active' : 'Inactive'}
              </span>
            </h2>
            <div className="card-price">
              {subscriptionData.hasActiveMembership ? 'Active Subscription' : 'No Active Subscription'}
            </div>
            <ul className="card-features">
              <li>✔️ Premium progress tracking</li>
              <li>✔️ Community access</li>
              <li>✔️ Daily tips</li>
              <li>✔️ Personal coach</li>
              <li>✔️ Advanced analytics</li>
              <li>✔️ Email reminders</li>
            </ul>
            <div className="date-info">
              <p>Start Date: {formatDate(subscriptionData.startDate)}</p>
              <p>End Date: {formatDate(subscriptionData.endDate)}</p>
              {subscriptionData.daysRemaining !== undefined && (
                <p>Days Remaining: {subscriptionData.daysRemaining}</p>
              )}
              <p>Status: {subscriptionData.statusMessage || 'Unknown'}</p>
            </div>
            {subscriptionData.hasActiveMembership && !subscriptionData.expired && (
              <button className="cancel-button" onClick={handleCancelSubscription}>
                Cancel Subscription
              </button>
            )}
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