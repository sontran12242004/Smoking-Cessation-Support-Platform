import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from '../UserContext';
import ApiService from '../apiService';
import journeyPath from '../assets/journey_path.jpg';
import badgeIcon from '../assets/quit.png';

// Translation function for Vietnamese milestone labels to English
const translateMilestone = (vietnameseLabel) => {
  const translations = {
    "24 giờ": "24 hours",
    "1 tuần": "1 week",
    "1 tháng": "1 month", 
    "3 tháng": "3 months",
    "6 tháng": "6 months",
    "1 năm": "1 year",
    "2 năm": "2 years",
    "5 năm": "5 years",
    "10 năm": "10 years"
  };
  
  return translations[vietnameseLabel] || vietnameseLabel;
};

// Badge icon placeholder (có thể thay bằng SVG hoặc emoji)
const badgeIcons = [
  "🏆", // 3 days
  "🏅", // 7 days
  "🏆", // 1 month
  "💰", // $ saved
  "🥇", // 3 months
  "💵", // $50 saved
  "💎", // $100 saved
  "🏆", // 6 months
];

// Badge data mẫu cho Premium (bao gồm 6 tháng)
const badgesData = [
  {
    id: 1,
    icon: badgeIcons[0],
    title: "First 3 Days",
    desc: "Completed 3 days smoke-free",
  },
  {
    id: 2,
    icon: badgeIcons[1],
    title: "First 7 Days",
    desc: "Completed 7 days smoke-free",
  },
  {
    id: 3,
    icon: badgeIcons[2],
    title: "First Month",
    desc: "Completed 1 month smoke-free",
  },
  {
    id: 4,
    icon: badgeIcons[3],
    title: "$30 Saved",
    desc: "Saved $30 by not smoking",
  },
  {
    id: 5,
    icon: badgeIcons[4],
    title: "3 Months",
    desc: "Completed 3 months smoke-free",
  },
  {
    id: 6,
    icon: badgeIcons[5],
    title: "$50 Saved",
    desc: "Saved $50 by not smoking",
  },
  {
    id: 7,
    icon: badgeIcons[6],
    title: "$100 Saved",
    desc: "Saved $100 by not smoking",
  },
  {
    id: 8,
    icon: badgeIcons[7],
    title: "6 Months",
    desc: "Completed 6 months smoke-free",
  },
];

// Milestone cho Premium: mục tiêu 6 tháng (182 ngày)
const timeMilestones = [
  {
    value: 3,
    title: "3-Day Streak",
    desc: "First milestone",
  },
  {
    value: 7,
    title: "7-Day Streak",
    desc: "Cacbon Monoxide levels normalized",
  },
  {
    value: 14,
    title: "14-Day Streak",
    desc: "Circulation improved",
  },
  {
    value: 30,
    title: "1 Month",
    desc: "Lung function increases",
  },
  {
    value: 90,
    title: "3 Months",
    desc: "Major health improvement",
  },
  {
    value: 182,
    title: "6 Months",
    desc: "Premium Milestone!",
  },
];

const badgeData = [
  { icon: '🏆', label: 'First 3 Days' },
  { icon: '🏆', label: 'First 7 Days', color: '#FF9800' },
  { icon: '🏆', label: 'First Month' },
  { icon: '🏆', label: '3 Months', color: '#FFC107', stars: true },
  { icon: '🏆', label: '9 Months', color: '#8D5524', special: true },
  { icon: '🏆', label: '$30 Saved', money: true },
  { icon: '🏆', label: '$50 Saved', money: true },
  { icon: '🏆', label: '$100 Saved', money: true },
  { icon: '🏆', label: '$150 Saved', money: true },
  { icon: '🏆', label: '$300 Saved', money: true },
];

const EliteAchievement = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // API states
  const [milestoneData, setMilestoneData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch milestone data from API
  useEffect(() => {
    const fetchMilestoneData = async () => {
      if (!user?.userId) {
        // Use sample data for demo
        const sampleData = {
          "quitDate": null,
          "currentMilestone": "24 giờ",
          "daysToNext": 3,
          "hasNewMilestone": false,
          "nextMilestone": "1 tuần",
          "daysSmokeFree": 4,
          "milestones": [
            {
              "daysRemaining": 0,
              "isCurrent": true,
              "completedAt": [2025, 1, 13],
              "daysCompleted": 1,
              "daysRequired": 1,
              "label": "24 giờ",
              "isAchieved": true
            },
            {
              "daysRemaining": 3,
              "isCurrent": false,
              "completedAt": null,
              "daysCompleted": 4,
              "daysRequired": 7,
              "label": "1 tuần",
              "isAchieved": false
            },
            {
              "daysRemaining": 24,
              "isCurrent": false,
              "completedAt": null,
              "daysCompleted": 4,
              "daysRequired": 28,
              "label": "1 tháng",
              "isAchieved": false
            },
            {
              "daysRemaining": 86,
              "isCurrent": false,
              "completedAt": null,
              "daysCompleted": 4,
              "daysRequired": 90,
              "label": "3 tháng",
              "isAchieved": false
            },
            {
              "daysRemaining": 176,
              "isCurrent": false,
              "completedAt": null,
              "daysCompleted": 4,
              "daysRequired": 180,
              "label": "6 tháng",
              "isAchieved": false
            },
            {
              "daysRemaining": 361,
              "isCurrent": false,
              "completedAt": null,
              "daysCompleted": 4,
              "daysRequired": 365,
              "label": "1 năm",
              "isAchieved": false
            },
            {
              "daysRemaining": 726,
              "isCurrent": false,
              "completedAt": null,
              "daysCompleted": 4,
              "daysRequired": 730,
              "label": "2 năm",
              "isAchieved": false
            },
            {
              "daysRemaining": 1821,
              "isCurrent": false,
              "completedAt": null,
              "daysCompleted": 4,
              "daysRequired": 1825,
              "label": "5 năm",
              "isAchieved": false
            },
            {
              "daysRemaining": 3646,
              "isCurrent": false,
              "completedAt": null,
              "daysCompleted": 4,
              "daysRequired": 3650,
              "label": "10 năm",
              "isAchieved": false
            }
          ],
          "username": "Minh Quan",
          "isCompleted": false
        };
        setMilestoneData(sampleData);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await ApiService.getMilestoneData(user.userId);
        setMilestoneData(data);
      } catch (err) {
        console.error('Error fetching milestone data:', err);
        setError('Failed to load milestone data');
      } finally {
        setLoading(false);
      }
    };

    fetchMilestoneData();
  }, [user?.userId]);

  // Map API milestone data to display format
  const getMilestoneDisplayData = () => {
    if (!milestoneData) return timeMilestones;
    
    return milestoneData.milestones.map((milestone, index) => ({
      value: milestone.daysRequired,
      title: translateMilestone(milestone.label),
      desc: milestone.isAchieved ? 'Completed!' : `${milestone.daysRemaining} days remaining`,
      achieved: milestone.isAchieved,
      current: milestone.isCurrent,
      completedAt: milestone.completedAt,
      progress: milestone.daysCompleted,
      total: milestone.daysRequired
    }));
  };

  // Generate badges based on milestones
  const getBadgeDisplayData = () => {
    if (!milestoneData) return badgeData;
    
    const allBadges = [];
    
    // Add milestone badges based on achievement status
    milestoneData.milestones.forEach((milestone, index) => {
      const badgeIcon = milestone.isAchieved ? badgeIcons[index % badgeIcons.length] : '🔒';
      allBadges.push({
        icon: badgeIcon,
        label: translateMilestone(milestone.label),
        achieved: milestone.isAchieved,
        completedAt: milestone.completedAt,
        daysRemaining: milestone.daysRemaining,
        isCurrent: milestone.isCurrent
      });
    });
    
    // Add money saving badges (sample data)
    const savingsBadges = [
      { icon: '💰', label: '$30 Saved', achieved: milestoneData.daysSmokeFree >= 7 },
      { icon: '💵', label: '$50 Saved', achieved: milestoneData.daysSmokeFree >= 14 },
      { icon: '💎', label: '$100 Saved', achieved: milestoneData.daysSmokeFree >= 30 },
      { icon: '🏦', label: '$150 Saved', achieved: milestoneData.daysSmokeFree >= 60 },
      { icon: '🤑', label: '$300 Saved', achieved: milestoneData.daysSmokeFree >= 90 }
    ];
    
    allBadges.push(...savingsBadges);
    
    return allBadges;
  };

  const handleNotificationClick = () => {
    navigate('/elite/notification');
  };
  const handleLogout = () => {
    navigate('/login');
  };
  const handleBack = () => {
    navigate('/elite/dashboard');
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
        color: #fff;
        text-align: center;
    }
    .elite-achievement-bg {
      min-height: 100vh;
      background: linear-gradient(rgba(223,245,222,0.85), rgba(223,245,222,0.85)), url(${journeyPath}) center/cover no-repeat;
      padding: 0;
    }
    .ea-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 40px 0 0 0;
    }
    .ea-title {
      color: #388E3C;
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.3em;
    }
    .ea-subtitle {
      text-align: center;
      color: #222;
      font-size: 1.05rem;
      margin-bottom: 2.5em;
    }
    .ea-badges-earned {
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      font-weight: 700;
      color: #388E3C;
      margin-bottom: 1.2em;
      margin-left: 0.5em;
    }
    .ea-badges-earned img {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }
    .ea-badge-card {
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 2px 12px 0 rgba(56,142,60,0.08);
      padding: 36px 32px 36px 32px;
      margin-bottom: 2.5em;
    }
    .ea-badge-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: minmax(90px, auto);
      gap: 38px 0;
      min-height: 340px;
    }
    .ea-badge-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      min-height: 90px;
    }
    .ea-badge-icon {
      font-size: 3.2rem;
      margin-bottom: 0.3em;
    }
    .ea-badge-label {
      font-size: 1.08rem;
      color: #388E3C;
      font-weight: 700;
      margin-top: 0.1em;
      text-align: center;
    }
    /* Special styles for 3 months, 9 months, and money badges */
    .ea-badge-item.stars .ea-badge-icon {
      position: relative;
    }
    .ea-badge-item.stars .ea-badge-icon:after {
      content: '⭐⭐⭐';
      position: absolute;
      left: 50%;
      top: 0.1em;
      transform: translateX(-50%);
      font-size: 1.1rem;
      color: #FFC107;
    }
    .ea-badge-item.special .ea-badge-icon {
      filter: hue-rotate(40deg) brightness(0.9);
    }
    .ea-badge-item.money .ea-badge-icon {
      position: relative;
    }
    .ea-badge-item.money .ea-badge-icon:after {
      content: '$';
      position: absolute;
      right: -0.7em;
      top: 0.1em;
      font-size: 1.2rem;
      color: #FFD600;
    }
    @media (max-width: 900px) {
      .ea-badge-grid {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(5, 1fr);
      }
    }
    @media (max-width: 600px) {
      .ea-container {
        padding: 18px 2vw 0 2vw;
      }
      .ea-badge-card {
        padding: 18px 4vw 18px 4vw;
      }
      .ea-badge-grid {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(10, 1fr);
        gap: 22px 0;
      }
    }
    .ea-section-title {
      display: flex;
      align-items: center;
      font-size: 2rem;
      font-weight: 700;
      color: #388E3C;
      margin-bottom: 0.7em;
      margin-top: 1.5em;
      gap: 0.4em;
    }
    .ea-section-icon {
      font-size: 1.5em;
      margin-right: 0.15em;
    }
    .ea-progress-card, .ea-challenge-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 12px 0 rgba(56,142,60,0.08);
      padding: 32px 32px 28px 32px;
      margin-bottom: 2.5em;
      border-top: 4px solid #5EBB34;
    }
    .ea-progress-title, .ea-challenge-title {
      font-size: 1.35rem;
      font-weight: 700;
      margin-bottom: 1.2em;
      color: #111;
    }
    .ea-progress-timeline {
      width: 100%;
      margin: 0 auto;
      margin-bottom: 0.5em;
      position: relative;
      height: 40px;
    }
    .ea-progress-line-bg {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 12px;
      background: #a29e9e;
      border-radius: 6px;
      width: 100%;
      z-index: 1;
      transform: translateY(-50%);
    }
    .ea-progress-line-fill {
      position: absolute;
      left: 0; top: 50%;
      height: 12px;
      background: #5EBB34;
      border-radius: 6px;
      z-index: 2;
      transform: translateY(-50%);
    }
    .ea-progress-milestones {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      width: 100%;
      height: 40px;
      z-index: 3;
    }
    .ea-progress-milestone {
      position: relative;
      width: 32px;
      height: 32px;
      background: none;
      z-index: 4;
    }
    .ea-progress-milestone:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #a29e9e;
      border: 4px solid #a29e9e;
      transform: translate(-50%, -50%);
      z-index: 5;
    }
    .ea-progress-milestone.done:before {
      background: #5EBB34;
      border: 4px solid #388E3C;
    }
    .ea-challenge-desc {
      font-size: 1.1rem;
      color: #111;
      margin-bottom: 1.2em;
    }
    .ea-challenge-bar-bg {
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 6px;
      position: relative;
    }
    .ea-challenge-bar-fill {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 73%;
      background: #5EBB34;
      border-radius: 6px;
      height: 8px;
      z-index: 1;
    }
    @media (max-width: 700px) {
      .ea-section-title { font-size: 1.2rem; }
      .ea-progress-card, .ea-challenge-card { padding: 18px 2vw 18px 2vw; }
      .ea-progress-title, .ea-challenge-title { font-size: 1.1rem; }
      .ea-progress-milestone { font-size: 0.95rem; min-width: 40px; }
    }
    .ea-streak-title {
      color: #388E3C;
      font-size: 2.1rem;
      font-weight: 800;
      text-align: center;
      margin: 0 auto;
      letter-spacing: 0.5px;
      padding: 18px 0 18px 0;
    }
    .ea-streak-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 18px 0 18px 0;
    }
    .ea-streak-label {
      color: #388E3C;
      font-size: 1.15rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }
    .ea-streak-value {
      color: #388E3C;
      font-size: 2.1rem;
      font-weight: 800;
      text-align: center;
      letter-spacing: 0.5px;
    }
    .ea-milestone-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 1.2em;
      margin-top: 2.5em;
    }
    .ea-milestone-title-text {
      color: #43a047;
      font-size: 2.1rem;
      font-weight: 800;
      text-shadow: 0 2px 6px #d0e8d6;
      letter-spacing: 0.5px;
      line-height: 1;
    }
    .ea-stopwatch-icon {
      display: flex;
      align-items: center;
      height: 2.3rem;
    }
    .ea-milestone-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 28px 18px;
      margin-bottom: 2.5em;
    }
    .ea-milestone-card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 12px 0 rgba(56,142,60,0.08);
      padding: 28px 18px 18px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 180px;
      position: relative;
      transition: box-shadow 0.2s;
    }
    .ea-milestone-card.done {
      opacity: 1;
    }
    .ea-milestone-card.current {
      background: #fff3e0;
      border: 2px solid #ff9800;
      box-shadow: 0 4px 16px rgba(255, 152, 0, 0.2);
    }
    .ea-milestone-card.current .ea-milestone-number {
      background: #ff9800;
      color: #fff;
    }
    .ea-milestone-card.current .ea-milestone-underline {
      background: #ff9800;
    }
    .ea-milestone-card.disabled {
      background: #f5f5f5;
      opacity: 0.7;
    }
    .ea-milestone-number {
      background: #e8f7e9;
      color: #388E3C;
      font-size: 2.1rem;
      font-weight: 700;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
    }
    .ea-milestone-number.disabled {
      background: #e0e0e0;
      color: #bdbdbd;
    }
    .ea-milestone-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #222;
      margin-bottom: 2px;
      text-align: center;
    }
    .ea-milestone-title.disabled {
      color: #e53935;
    }
    .ea-milestone-desc {
      font-size: 1rem;
      color: #222;
      text-align: center;
      margin-bottom: 8px;
    }
    .ea-milestone-desc.disabled {
      color: #bdbdbd;
    }
    .ea-milestone-underline {
      width: 80%;
      height: 6px;
      background: #7be495;
      border-radius: 3px;
      margin-top: 10px;
    }
    .ea-milestone-card.disabled .ea-milestone-underline {
      display: none;
    }
    @media (max-width: 900px) {
      .ea-milestone-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 600px) {
      .ea-milestone-grid {
        grid-template-columns: 1fr;
      }
    }
    .ea-achievement-gallery-box {
      background: #e3f6e8;
      border-radius: 18px;
      border: 2px solid #fff;
      padding: 36px 0 24px 0;
      margin: 36px auto 36px auto;
      max-width: 900px;
      width: 100%;
      text-align: center;
    }
    .ea-achievement-gallery-title {
      color: #43a047;
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 10px;
    }
    .ea-achievement-gallery-desc {
      color: #43a047;
      font-size: 1.25rem;
      font-weight: 400;
    }
    .ea-saving-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 1.2em;
      margin-top: 2.5em;
    }
    .ea-saving-title-text {
      color: #43a047;
      font-size: 2.1rem;
      font-weight: 800;
      text-shadow: 0 2px 6px #d0e8d6;
      letter-spacing: 0.5px;
      line-height: 1;
    }
    .ea-moneybag-icon {
      display: flex;
      align-items: center;
      height: 2.3rem;
    }
    .ea-saving-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px 18px;
      margin-bottom: 2.5em;
    }
    .ea-saving-card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 12px 0 rgba(56,142,60,0.08);
      padding: 28px 18px 18px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 180px;
      position: relative;
      transition: box-shadow 0.2s;
    }
    .ea-saving-card.done {
      opacity: 1;
    }
    .ea-saving-card.disabled {
      background: #f5f5f5;
      opacity: 0.7;
    }
    .ea-saving-number {
      background: #e8f7e9;
      color: #388E3C;
      font-size: 2.1rem;
      font-weight: 700;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
    }
    .ea-saving-number.disabled {
      background: #e0e0e0;
      color: #bdbdbd;
    }
    .ea-saving-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #222;
      margin-bottom: 2px;
      text-align: center;
    }
    .ea-saving-title.disabled {
      color: #e53935;
    }
    .ea-saving-desc {
      font-size: 1rem;
      color: #222;
      text-align: center;
      margin-bottom: 8px;
    }
    .ea-saving-desc.disabled {
      color: #bdbdbd;
    }
    .ea-saving-underline {
      width: 80%;
      height: 6px;
      background: #7be495;
      border-radius: 3px;
      margin-top: 10px;
    }
    .ea-saving-underline.disabled {
      background: #e0e0e0;
    }
    .ea-saving-card.disabled .ea-saving-underline {
      background: #e0e0e0;
    }
    @media (max-width: 900px) {
      .ea-saving-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 600px) {
      .ea-saving-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  return (
    <div className="elite-home-container">
      <style>{styles}</style>
      <header className="welcome-header">
        <div className="header-left">
          <button
            className="profile-btn"
            onClick={() => navigate('/elite/edit-profile')}
          >
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
          <span
            className="notification-icon"
            onClick={handleNotificationClick}
          >
            🔔
          </span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <nav className="elite-nav">
        <ul>
          <li><Link to="/elite/home">Home</Link></li>
          <li><Link to="/elite/dashboard">Dashboard</Link></li>
          <li><Link to="/elite/achievement" className="active">Achievement</Link></li>
          <li><Link to="/elite/coach">Coach</Link></li>
          <li><Link to="/elite/community">Community</Link></li>
          <li><Link to="/elite/feedback">Feedback</Link></li>
        </ul>
      </nav>
      <div className="elite-achievement-bg">
        <div className="ea-container">
          <div className="ea-title">Your Achievements</div>
          <div className="ea-subtitle">Celebrate your smoke-free journey milestones</div>
          <div className="ea-badges-earned">
            Badges Earned
          </div>
          <div className="ea-badge-card">
            <div className="ea-badge-grid">
              {getBadgeDisplayData().slice(0, 16).map((badge, index) => {
                if (!badge.label) return <div key={index}></div>;
                
                const getBadgeStyle = () => {
                  if (badge.achieved) return { opacity: 1, filter: 'none' };
                  if (badge.isCurrent) return { 
                    opacity: 0.8, 
                    filter: 'sepia(100%) saturate(200%) hue-rotate(30deg)',
                    border: '2px solid #ff9800',
                    borderRadius: '12px',
                    background: '#fff3e0'
                  };
                  return { opacity: 0.5, filter: 'grayscale(100%)' };
                };
                
                return (
                  <div 
                    key={index} 
                    className={`ea-badge-item ${badge.achieved ? '' : badge.isCurrent ? 'current' : 'locked'}`}
                    style={getBadgeStyle()}
                  >
                    <span className="ea-badge-icon" role="img" aria-label={badge.label}>
                      {badge.achieved ? badge.icon : badge.isCurrent ? '⏳' : '🔒'}
                    </span>
                    <div className="ea-badge-label">
                      {badge.label}
                      {badge.achieved && badge.completedAt && (
                        <div style={{ fontSize: '12px', color: '#2e7d32', marginTop: '2px' }}>
                          ✓ Completed {new Date(badge.completedAt[0], badge.completedAt[1] - 1, badge.completedAt[2]).toLocaleDateString()}
                        </div>
                      )}
                      {badge.isCurrent && (
                        <div style={{ fontSize: '12px', color: '#ff9800', marginTop: '2px' }}>
                          🎯 In Progress
                        </div>
                      )}
                      {!badge.achieved && !badge.isCurrent && badge.daysRemaining && (
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                          {badge.daysRemaining} days to go
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* Fill empty slots */}
              {Array.from({ length: Math.max(0, 16 - getBadgeDisplayData().length) }, (_, index) => (
                <div key={`empty-${index}`}></div>
              ))}
            </div>
          </div>

          {/* Loading/Error States */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <div>Loading your achievements...</div>
            </div>
          )}
          
          {error && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#d32f2f', 
              background: '#ffebee', 
              borderRadius: '16px', 
              margin: '20px 0',
              border: '1px solid #ffcdd2'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>⚠️ Error</div>
              <div>{error}</div>
            </div>
          )}

          {/* --- Your Progress Card --- */}
          <div className="ea-section-title"><span className="ea-section-icon"></span> Your Progress</div>
          <div className="ea-progress-card">
            <div className="ea-streak-main">
              <div className="ea-streak-label">Current Streak</div>
              <div className="ea-streak-value">
                {milestoneData ? `${milestoneData.daysSmokeFree} days smoke-free` : '0 days smoke-free'}
              </div>
              {milestoneData && (
                <div style={{ marginTop: '10px', fontSize: '16px', color: '#666' }}>
                  Current milestone: {translateMilestone(milestoneData.currentMilestone)}
                  {milestoneData.daysToNext > 0 && (
                    <div style={{ fontSize: '14px', marginTop: '5px' }}>
                      {milestoneData.daysToNext} days to {translateMilestone(milestoneData.nextMilestone)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* --- Challenges Card --- */}
          {milestoneData && (
            <>
          <div className="ea-section-title"><span className="ea-section-icon"></span> Challenges</div>
          <div className="ea-challenge-card">
                <div className="ea-challenge-title">
                  <b>Current Challenge: {translateMilestone(milestoneData.nextMilestone) || 'Complete your journey!'}</b>
                </div>
                <div className="ea-challenge-desc">
                  <b>{milestoneData.daysSmokeFree}/{milestoneData.daysSmokeFree + milestoneData.daysToNext} Days Complete 
                  ({milestoneData.daysToNext > 0 ? Math.round((milestoneData.daysSmokeFree / (milestoneData.daysSmokeFree + milestoneData.daysToNext)) * 100) : 100}%)</b>
                </div>
            <div className="ea-challenge-bar-bg">
                  <div 
                    className="ea-challenge-bar-fill" 
                    style={{ 
                      width: `${milestoneData.daysToNext > 0 ? Math.round((milestoneData.daysSmokeFree / (milestoneData.daysSmokeFree + milestoneData.daysToNext)) * 100) : 100}%` 
                    }}
                  ></div>
            </div>
          </div>
            </>
          )}

          {/* --- Time Milestones --- */}
          <div className="ea-achievement-gallery-box">
            <div className="ea-achievement-gallery-title">Your Achievement Gallery</div>
            <div className="ea-achievement-gallery-desc">Celebrate every step of your smoke-free journey</div>
          </div>
          <div className="ea-milestone-title-row">
            <span className="ea-section-icon ea-stopwatch-icon">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                <circle cx="19" cy="19" r="15" fill="#e8f7e9" stroke="#388E3C" strokeWidth="3"/>
                <rect x="17" y="7" width="4" height="6" rx="2" fill="#388E3C"/>
                <rect x="18.25" y="3" width="1.5" height="4" rx="0.75" fill="#388E3C"/>
                <path d="M19 19V12" stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="19" cy="19" r="10" fill="#fff"/>
                <path d="M19 19L24 22" stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="ea-milestone-title-text">Time Milestones</span>
          </div>
          <div className="ea-milestone-grid">
            {/* Dynamically render milestones from API data */}
            {milestoneData?.milestones?.map((milestone, index) => {
              const milestoneDescriptions = {
                "24 giờ": "First milestone",
                "1 tuần": "Carbon Monoxide levels normalized",
                "1 tháng": "Lung function increases",
                "3 tháng": "Major health improvement",
                "6 tháng": "Heart disease risk reduced",
                "1 năm": "Risk of coronary heart disease",
                "2 năm": "Heart attack risk significantly reduced",
                "5 năm": "Stroke risk reduced to normal",
                "10 năm": "Cancer risk reduced significantly"
              };

              return (
                <div 
                  key={index}
                  className={`ea-milestone-card ${milestone.isAchieved ? 'done' : milestone.isCurrent ? 'current' : ''}`}
                >
                  <div className="ea-milestone-number">{milestone.daysRequired}</div>
                  <div className="ea-milestone-title">
                    <b>{translateMilestone(milestone.label)} Streak</b>
                  </div>
                  <div className="ea-milestone-desc">
                    {milestoneDescriptions[milestone.label] || "Keep going!"}
                    {milestone.isAchieved && milestone.completedAt && (
                      <div style={{ fontSize: '12px', color: '#2e7d32', marginTop: '4px' }}>
                        ✓ Completed {new Date(milestone.completedAt[0], milestone.completedAt[1] - 1, milestone.completedAt[2]).toLocaleDateString()}
                      </div>
                    )}
                    {!milestone.isAchieved && (
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                        {milestone.daysRemaining} days remaining
                      </div>
                    )}
                  </div>
                  <div className="ea-milestone-underline"></div>
                </div>
              );
            })}
          </div>

          {/* --- Saving Milestones --- */}
          <div className="ea-saving-title-row">
            <span className="ea-section-icon ea-moneybag-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                <ellipse cx="18" cy="28" rx="12" ry="7" fill="#e8f7e9" stroke="#388E3C" strokeWidth="2.5"/>
                <rect x="14" y="6" width="8" height="10" rx="4" fill="#388E3C"/>
                <ellipse cx="18" cy="6" rx="4" ry="3" fill="#43a047"/>
                <path d="M18 16V28" stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="ea-saving-title-text">Saving milestone</span>
          </div>
          <div className="ea-saving-grid">
            {/* Completed milestones */}
            <div className="ea-saving-card done">
              <div className="ea-saving-number">$30</div>
              <div className="ea-saving-title"><b>$30 Saved</b></div>
              <div className="ea-saving-desc">Treat Your Self!</div>
              <div className="ea-saving-underline"></div>
            </div>
            <div className="ea-saving-card done">
              <div className="ea-saving-number">$50</div>
              <div className="ea-saving-title"><b>$50 Saved</b></div>
              <div className="ea-saving-desc">Nice Dinner Reward</div>
              <div className="ea-saving-underline"></div>
            </div>
            <div className="ea-saving-card done">
              <div className="ea-saving-number">$100</div>
              <div className="ea-saving-title"><b>$100 Saved</b></div>
              <div className="ea-saving-desc">Big saving achievement</div>
              <div className="ea-saving-underline"></div>
            </div>
            <div className="ea-saving-card done">
              <div className="ea-saving-number">$150</div>
              <div className="ea-saving-title"><b>$150 Saved</b></div>
              <div className="ea-saving-desc">Big rewards for long term efforts!</div>
              <div className="ea-saving-underline"></div>
            </div>
            <div className="ea-saving-card done">
              <div className="ea-saving-number">$300</div>
              <div className="ea-saving-title"><b>$300 Saved</b></div>
              <div className="ea-saving-desc">Weekend getaway treat!</div>
              <div className="ea-saving-underline"></div>
            </div>
            {/* Incomplete milestones */}
            <div className="ea-saving-card disabled">
              <div className="ea-saving-number disabled">$900</div>
              <div className="ea-saving-title disabled"><b>$29 to go</b></div>
              <div className="ea-saving-title disabled">$900 Saved</div>
              <div className="ea-saving-desc disabled">New tech or upgrade!</div>
              <div className="ea-saving-underline disabled"></div>
            </div>
            <div className="ea-saving-card disabled">
              <div className="ea-saving-number disabled">$1500</div>
              <div className="ea-saving-title disabled"><b>$571 to go</b></div>
              <div className="ea-saving-title disabled">$1500 Saved</div>
              <div className="ea-saving-desc disabled">Flight to your dream place</div>
              <div className="ea-saving-underline disabled"></div>
            </div>
            <div className="ea-saving-card disabled">
              <div className="ea-saving-number disabled">$2000</div>
              <div className="ea-saving-title disabled"><b>$1400 to go</b></div>
              <div className="ea-saving-title disabled">$2000 Saved</div>
              <div className="ea-saving-desc disabled">Life-changing milestone!</div>
              <div className="ea-saving-underline disabled"></div>
            </div>
          </div>
        </div>
      </div>
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
  );
}

export default EliteAchievement;
