import React, { useState, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import journeyPath from '../assets/journey_path.jpg';
import { useUser } from '../UserContext';
import ApiService from '../apiService';
import UserWelcome from '../components/UserWelcome';

function EliteDashboard() {
  const navigate = useNavigate();
  const { getUserName, logout, user } = useUser();
  const [healthMetrics, setHealthMetrics] = useState({
    daysSmokeFree: "--",
    daysToNext: "--",
    moneySaved: "--",
    healthImproved: "--",
    lungsCapacity: "--",
    heartRate: "--",
  });
  const [lungCancerRisk, setLungCancerRisk] = useState("--");
  const [heartDiseaseRisk, setHeartDiseaseRisk] = useState("--");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = user?.id;
  const [daysSmokeFree, setDaysSmokeFree] = useState("--");
  const [moneySaved, setMoneySaved] = useState("--");
  const [healthImproved, setHealthImproved] = useState("--");
  const [healthImprovementData, setHealthImprovementData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all health metrics data
        const [
          healthMetricsData,
          lungCancerRiskData,
          heartDiseaseRiskData,
          daysSmokeFreeData,
          moneySavedData,
          healthImprovedData,
          healthImprovementRateData
        ] = await Promise.all([
          ApiService.getHealthMetrics(userId),
          ApiService.getLungCancerRisk(userId),
          ApiService.getHeartDiseaseRisk(userId),
          ApiService.getDaysSmokeFree(userId),
          ApiService.getMoneySaved(userId),
          ApiService.getHealthImproved(userId),
          ApiService.getHealthImprovementRate(userId)
        ]);

        setHealthMetrics(healthMetricsData);
        setLungCancerRisk(lungCancerRiskData);
        setHeartDiseaseRisk(heartDiseaseRiskData);
        setDaysSmokeFree(daysSmokeFreeData);
        setMoneySaved(moneySavedData);
        setHealthImproved(healthImprovedData);
        setHealthImprovementData(healthImprovementRateData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching health metrics:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const styles = `
    html,
    body,
    #root {
      width: 100%;
      height: 100%;
      margin: 0;
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background-color: #f0f2f5;
    }
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .welcome-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 40px;
      background-color: #fff;
      border-bottom: 1px solid #d0e8ef;
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      transform: translateX(-50%);
      box-sizing: border-box;
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
    .header-center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .app-name {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .header-center .logo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
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
    .dashboard-bg {
      min-height: 100vh;
      background: url('https://images.unsplash.com/photo-1447752875215-b276168b9f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80') center/cover no-repeat;
      /* padding-bottom: 60px; */
      display: flex;
      flex-direction: column;
    }
    .dashboard-header {
      background: #fff;
      border-bottom: 1px solid #d0e8ef;
      padding: 0;
    }
    .dashboard-nav {
      display: flex;
      justify-content: space-between;
      padding: 18px 40px 0 40px;
    }
    .dashboard-logo-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .dashboard-logo {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-right: 10px;
    }
    .dashboard-app-name h1 {
      margin: 0;
      font-size: 24px;
      color: #4CAF50;
    }
    .dashboard-app-name p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
    .dashboard-nav-links {
      list-style: none;
      display: flex;
      gap: 32px;
      margin: 0 0 0 40px;
      padding: 0;
    }
    .dashboard-nav-links li a {
      text-decoration: none;
      color: #388E3C;
      font-weight: bold;
      font-size: 17px;
      padding-bottom: 4px;
      border-bottom: 2.5px solid transparent;
      transition: color 0.2s, border 0.2s;
    }
    .dashboard-nav-links li a.active, .dashboard-nav-links li a:hover {
      color: #4CAF50;
      border-bottom: 2.5px solid #4CAF50;
    }
    .dashboard-header-actions {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .dashboard-notification-icon {
      font-size: 26px;
      color: #FBC02D;
      cursor: pointer;
      margin-right: 10px;
    }
    .dashboard-logout-btn {
      background: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 8px 22px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .dashboard-logout-btn:hover {
      background: #388E3C;
    }
    .dashboard-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1 0 auto;
    }
    .dashboard-welcome {
      text-align: center;
      margin-bottom: 18px;
    }
    .dashboard-welcome-title {
      font-size: 36px;
      font-weight: bold;
      color: #000;
      margin-bottom: 5px;
      letter-spacing: 1px;
      text-shadow: none;
    }
    .dashboard-welcome-title .welcome-name {
      color: #4CAF50;
    }
    .dashboard-welcome-quote {
      font-size: 1.15rem;
      color: #388E3C;
      margin-bottom: 30px;
      font-style: italic;
      text-shadow: 0 1px 6px rgba(255,255,255,0.5);
    }
    .dashboard-cards-row {
      display: flex;
      gap: 32px;
      width: 100%;
      justify-content: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .dashboard-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .dashboard-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
    .dashboard-card-icon {
      font-size: 32px;
      color: #4CAF50;
      margin-bottom: 16px;
    }
    .dashboard-card-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }
    .dashboard-card-subtitle {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
    .dashboard-card-value {
      font-size: 28px;
      font-weight: 700;
      color: #4CAF50;
      margin: 12px 0;
    }
    .dashboard-card-description {
      font-size: 14px;
      color: #666;
      margin: 0;
      text-align: center;
    }
    .dashboard-cards-row-small {
      display: flex;
      gap: 32px;
      width: 100%;
      justify-content: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .dashboard-card-small {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .dashboard-card-small:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
    .dashboard-card-small-icon {
      font-size: 24px;
      color: #4CAF50;
    }
    .dashboard-card-small-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .dashboard-card-small-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
    .dashboard-card-small-value {
      font-size: 20px;
      font-weight: 700;
      color: #4CAF50;
      margin: 0;
    }
    .dashboard-card-small-description {
      font-size: 13px;
      color: #666;
      margin: 0;
    }
    .dashboard-explore-btn {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 20px 54px;
      font-size: 1.35rem;
      font-weight: bold;
      cursor: pointer;
      margin-top: 36px;
      transition: background 0.2s, transform 0.15s, box-shadow 0.18s;
      box-shadow: 0 4px 18px rgba(76,175,80,0.13);
    }
    .dashboard-explore-btn:hover {
      background-color: #388E3C;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 8px 24px rgba(76,175,80,0.18);
    }
    @media (max-width: 1100px) {
      .dashboard-main { max-width: 98vw; }
      .dashboard-cards-row, .dashboard-cards-row-small { flex-direction: column; align-items: center; gap: 24px; }
      .dashboard-card, .dashboard-card-small { max-width: 95vw; }
    }
    .analytics-section {
      width: 100%;
      background: none;
      padding: 40px 0 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
    }
    .analytics-title {
      font-size: 2.2rem;
      color: #4CAF50;
      font-weight: bold;
      margin-bottom: 30px;
      text-align: center;
      letter-spacing: 1px;
      text-shadow: none;
    }
    .analytics-cards-row {
      display: flex;
      flex-direction: row;
      gap: 48px;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      max-width: 950px;
      margin: 0 auto;
      flex-wrap: nowrap;
    }
    .analytics-card {
      background: #fff;
      border-radius: 12px;
      border: 2px solid #4CAF50;
      box-shadow: none;
      padding: 32px 24px 32px 24px;
      min-width: 320px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      margin-bottom: 32px;
      position: relative;
      transition: box-shadow 0.22s, transform 0.18s, background 0.18s;
      overflow: hidden;
      z-index: 2;
    }
    .analytics-card-title {
      font-size: 2rem;
      color: #4CAF50;
      font-weight: bold;
      margin-bottom: 18px;
      text-shadow: none;
    }
    .analytics-card-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 180px;
    }
    .analytics-sad-face {
      font-size: 3.5rem;
      color: #4CAF50;
      margin-bottom: 18px;
      font-weight: bold;
    }
    .analytics-locked-message {
      color: #43A047;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 18px;
    }
    .analytics-upgrade-text {
      color: #4CAF50;
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 18px;
    }
    .analytics-upgrade-btn {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 32px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.18s;
      box-shadow: 0 2px 8px rgba(76,175,80,0.10);
      outline: none;
    }
    .analytics-upgrade-btn:hover {
      background-color: #388E3C;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 16px rgba(76,175,80,0.18);
    }
    @media (max-width: 900px) {
      .analytics-cards-row {
        flex-direction: column;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
      }
    }
    .welcome-footer {
      background-color: #333;
      color: #fff;
      padding: 40px;
      text-align: center;
      flex-shrink: 0;
    }
    .footer-content {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 30px;
      margin-bottom: 30px;
      text-align: left;
    }
    .footer-section {
      flex: 1;
      min-width: 200px;
    }
    .footer-section h3 {
      font-size: 20px;
      margin-bottom: 15px;
      color: #8BC34A;
    }
    .footer-section p,
    .footer-section ul {
      font-size: 14px;
      line-height: 1.6;
      color: #eee;
    }
    .footer-section ul {
      list-style: none;
      padding: 0;
    }
    .footer-section ul li {
      margin-bottom: 8px;
    }
    .footer-section ul li a {
      text-decoration: none;
      color: #B2FF59;
      transition: color 0.3s ease;
    }
    .footer-section ul li a:hover {
      color: #fff;
    }
    .newsletter input[type="email"] {
      width: calc(100% - 20px);
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #555;
      background-color: #444;
      color: #fff;
      border-radius: 5px;
    }
    .newsletter button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .newsletter button:hover {
      background-color: #45a049;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .copyright {
      border-top: 1px solid #555;
      padding-top: 15px;
      margin-top: 15px;
    }
    .elite-footer {
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
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .card-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
    .card-subtitle {
      font-size: 14px;
      color: #666;
      margin: 4px 0 0 0;
    }
    .card-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .metric-card {
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .metric-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .metric-value {
      font-size: 24px;
      font-weight: 600;
      color: #4CAF50;
      margin: 0;
    }
    .metric-label {
      font-size: 14px;
      color: #666;
      margin: 4px 0 0 0;
    }
    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 8px;
    }
    .progress-fill {
      height: 100%;
      background: #4CAF50;
      border-radius: 4px;
      transition: width 0.3s ease;
    }
    .action-button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .action-button:hover {
      background-color: #388E3C;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .secondary-button {
      background-color: #fff;
      color: #4CAF50;
      border: 1px solid #4CAF50;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .secondary-button:hover {
      background-color: #f5f5f5;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .chart-container {
      width: 100%;
      height: 300px;
      margin-top: 20px;
    }
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
    .list-item:last-child {
      border-bottom: none;
    }
    .list-item-title {
      font-size: 14px;
      color: #333;
      margin: 0;
    }
    .list-item-value {
      font-size: 14px;
      color: #4CAF50;
      font-weight: 500;
      margin: 0;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .status-badge.success {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .status-badge.warning {
      background-color: #fff3e0;
      color: #ef6c00;
    }
    .status-badge.info {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    @media (max-width: 768px) {
      .metric-grid {
        grid-template-columns: 1fr;
      }
      .dashboard-card, .dashboard-card-small {
        padding: 16px;
      }
      .card-title {
        font-size: 18px;
      }
      .metric-value {
        font-size: 20px;
      }
    }
  `;
  const handleHealthMetric = () => {
    window.location.href = "/elitehealthmetric";
  };
  
  const handleNotificationClick = () => {
    navigate("/elite/notification");
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Loading state
  if (loading) {
    return (
      <div className="container">
        <style>{styles}</style>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#4CAF50'
        }}>
          Loading dashboard data...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container">
        <style>{styles}</style>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#D32F2F'
        }}>
          {error}
        </div>
      </div>
    );
  }

  // Mock data for charts
  const successRateData = [
    { month: 'Jan', value: 10 },
    { month: 'Feb', value: 25 },
    { month: 'Mar', value: 40 },
    { month: 'Apr', value: 55 },
    { month: 'May', value: 70 },
    { month: 'Jun', value: 85 },
  ];
  return (
    <div className="dashboard-bg" style={{ background: `url(${journeyPath}) center/cover no-repeat`, position: 'relative' }}>
      <style>{styles}</style>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#DFF5DE',
        opacity: 0.7,
        zIndex: 0
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="welcome-header">
        <div className="header-left">
          <div className="profile-section">
            <button
              className="profile-btn"
              onClick={() => navigate('/elite/edit-profile')}
            >
              Elite Member
            </button>
          </div>
        </div>
        <div className="header-center">
          <div className="app-name">
            <h1>NicOff</h1>
            <p>Turn Off Nicotine, Turn On Life!</p>
          </div>
        </div>
        <div className="header-right">
          <span className="notification-icon" onClick={handleNotificationClick}>
            🔔
          </span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <nav className="welcome-nav">
        <ul>
          <li>
            <a href="/elite/home">Home</a>
          </li>
          <li>
            <a href="/elite/dashboard" className="active">Dashboard</a>
          </li>
          <li>
            <a href="/elite/achievement">Achievement</a>
          </li>
          <li>
            <a href="/elite/coach">Coach</a>
          </li>
          <li>
            <a href="/elite/community">Community</a>
          </li>
          <li>
            <a href="/elite/feedback">Feedback</a>
          </li>
        </ul>
      </nav>
      <div className="dashboard-main">
        <div className="dashboard-welcome">
          <div className="dashboard-welcome-title">
            <UserWelcome />
          </div>
          <div className="dashboard-welcome-quote">
            "Every cigarette not smoked is a victory. Be proud of your
            progress!"
          </div>
        </div>
        <div className="dashboard-cards-row">
          <div className="dashboard-card">
            <span className="dashboard-card-icon">📅</span>
            <div className="dashboard-card-label"><b>Days Smoke-Free</b></div>
            <div className="dashboard-card-value">{daysSmokeFree}</div>
            <div className="dashboard-card-desc">
              {healthMetrics.daysToNext} days until next milestone
            </div>
          </div>
          <div className="dashboard-card">
            <span className="dashboard-card-icon">💵</span>
            <div className="dashboard-card-label"><b>Money Saved</b></div>
            <div className="dashboard-card-value">${moneySaved}</div>
            <div className="dashboard-card-desc">
              Based on 10 cigarettes/day
            </div>
          </div>
          <div className="dashboard-card">
            <span className="dashboard-card-icon">💚</span>
            <div className="dashboard-card-label"><b>Health Improved</b></div>
            <div className="dashboard-card-value">{healthImproved}%</div>
            <div className="dashboard-card-desc">Lung function recovery</div>
          </div>
        </div>
        <div className="dashboard-cards-row-small">
          <div className="dashboard-card-small">
            <span className="dashboard-card-small-icon">🫁</span>
            <div className="dashboard-card-small-content">
              <div className="dashboard-card-small-title">Lungs Capacity</div>
              <div className="dashboard-card-small-value">
                +{healthMetrics.lungCancerRisk}%
              </div>
              <div className="dashboard-card-small-description">
                Your lung capacity has improved significantly since quitting.<br/>
              </div>
            </div>
          </div>
          <div className="dashboard-card-small">
            <span className="dashboard-card-small-icon">💓</span>
            <div className="dashboard-card-small-content">
              <div className="dashboard-card-small-title">Heart Disease Risk</div>
              <div className="dashboard-card-small-value">{heartDiseaseRisk}%</div>
              <div className="dashboard-card-small-description">
                Your heart disease risk has decreased significantly since quitting.
              </div>
            </div>
          </div>
        </div>
        <button className="dashboard-explore-btn" onClick={handleHealthMetric}>
          Explore more →
        </button>
      </div>
      {/* Analytics Section */}
      <section className="analytics-section">
        <h2 className="analytics-title">Analytics</h2>
        <div className="analytics-cards-row">
          <div className="analytics-card">
            <h3 className="analytics-card-title">Health Improvement Rate</h3>
            <div className="analytics-card-content" style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthImprovementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="analytics-card">
            <h3 className="analytics-card-title">Success Rate</h3>
            <div className="analytics-card-content" style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={successRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#388E3C" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
        <footer className="elite-footer">
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
    </div>
  );
}

export default EliteDashboard;

