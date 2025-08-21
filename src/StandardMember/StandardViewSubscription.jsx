import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import journeyPath from '../assets/journey_path.jpg';
import ApiService from '../apiService';

function StandardViewSubscription() {
  const navigate = useNavigate();
  const [elitePackage, setElitePackage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subscription dates
  const startDate = new Date();
  const endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());

  // Fetch packages to get Elite package info
  useEffect(() => {
    const fetchElitePackage = async () => {
      try {
        const packages = await ApiService.getMembershipPlans();
        // Find the most expensive package (assuming it's Elite)
        const elitePackageData = packages.find(pkg => pkg.price > 0) || packages[0];
        setElitePackage(elitePackageData);
      } catch (error) {
        console.error('Error fetching packages:', error);
        // Fallback to default Elite package
        setElitePackage({
          name: 'Elite Package',
          price: 299000,
          description: '+Premium progress tracking\n+Community access\n+Daily tips\n+Personal coach\n+Advanced analytics\n+Email reminders'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchElitePackage();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
  };

  const styles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
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
        max-width: 1000px;
    }

    .subscription-card {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 420px;
    }
    
    .current-plan {
        border: 2px solid #ccc;
    }

    .current-plan .card-title {
        position: relative;
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

    .upgrade-plan {
        border: 2px solid #4CAF50;
        transform: scale(1.05); /* Make it stand out */
    }

    .upgrade-plan .card-price {
        color: #4CAF50; /* Changed to green */
    }

    .card-title {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
        text-align: center;
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

    .upgrade-button {
        display: block;
        width: 60%; /* Reduced from 100% to 60% */
        padding: 15px;
        border: none;
        border-radius: 5px;
        background-color: #4CAF50;
        color: white;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        margin: auto; /* Center the button */
        margin-top: auto;
    }

    .upgrade-button:hover {
        background-color: #45a049;
        transition: background-color 0.3s ease;
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
          <p>Manage your plan and explore upgrade options.</p>
        </div>
        
        <div className="subscription-container">
          {/* Current Plan: Standard */}
          <div className="subscription-card current-plan">
            <h2 className="card-title">
              Standard Package
              <span className="current-badge">Current Package</span>
            </h2>
            <div className="card-price">Free</div>
            <ul className="card-features">
              <li>✔️ Basic progress tracking</li>
              <li>✔️ Weekly tips</li>
            </ul>
            <div className="date-info">
              <p>Start Date: {formatDate(startDate)}</p>
              <p>End Date: {formatDate(endDate)}</p>
            </div>
          </div>

          {/* Upgrade Option: Elite */}
          <div className="subscription-card upgrade-plan">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ 
                  width: '30px', height: '30px', 
                  border: '3px solid #f3f3f3', 
                  borderTop: '3px solid #4caf50', 
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 10px'
                }}></div>
                Loading upgrade options...
              </div>
            ) : elitePackage ? (
              <>
                <h2 className="card-title">Upgrade to {elitePackage.name}</h2>
                <div className="card-price">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(elitePackage.price)}/year
                </div>
            <ul className="card-features">
                  {elitePackage.description ? 
                    elitePackage.description.split('\n').filter(line => line.trim()).map((feature, index) => {
                      const cleanFeature = feature.replace(/^[+\-]/, '').trim();
                      const isIncluded = feature.startsWith('+');
                      return (
                        <li key={index} style={{ color: isIncluded ? '#333' : '#999' }}>
                          {isIncluded ? '✔️' : '❌'} {cleanFeature}
                        </li>
                      );
                    }) : 
                    <>
              <li>✔️ Premium progress tracking</li>
              <li>✔️ Community access</li>
              <li>✔️ Daily tips</li>
              <li>✔️ Personal coach</li>
              <li>✔️ Advanced analytics</li>
              <li>✔️ Email reminders</li>
                    </>
                  }
            </ul>
            <a href="/package" className="upgrade-button">
              Upgrade Now
            </a>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                No upgrade options available
              </div>
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

export default StandardViewSubscription; 