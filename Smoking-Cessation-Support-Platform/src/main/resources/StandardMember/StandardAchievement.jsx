import React, { useState } from "react";
import EditProfileModal from "../EditProfileModal";
import { useNavigate } from "react-router-dom";
// Badge icon placeholder (có thể thay bằng SVG hoặc emoji)
const badgeIcons = [
  "🏆", // 3 days
  "🏅", // 7 days
  "🏆", // 1 month
  "💰", // $ saved
];

// Badge data mẫu (sau này sẽ truyền từ database)
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
];

// Mock data cho nhiều thử thách với các trạng thái khác nhau
const challengeList = [
  {
    title: '30-Day Smoke-Free',
    totalDays: 30,
    completedDays: 14, // Đang làm dở
    reward: 'Gold Badge + Health Report',
    status: 'in-progress',
  },
  {
    title: '7-Day No Cigarette',
    totalDays: 7,
    completedDays: 7, // Đã hoàn thành
    reward: 'Silver Badge',
    status: 'completed',
  },
  {
    title: 'First 3 Days',
    totalDays: 3,
    completedDays: 0, // Chưa bắt đầu
    reward: 'Bronze Badge',
    status: 'not-started',
  },
];

// Lấy thử thách hiện tại (ví dụ: phần tử đầu tiên)
const challengeData = challengeList[0];

export default function StandardAchievement() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [streak, setStreak] = React.useState(0);
  const navigate = useNavigate();

  // Di chuyển các mốc milestone vào đây để sử dụng được biến streak
  const timeMilestones = [
    {
      value: 3,
      title: '3-Day Streak',
      desc: 'First milestone',
      achieved: streak >= 3,
      highlight: '',
      remain: 0,
      remainText: '',
    },
    {
      value: 7,
      title: '7-Day Streak',
      desc: 'Cacbon Monoxide levels normalized',
      achieved: streak >= 7,
      highlight: '',
      remain: 0,
      remainText: '',
    },
    {
      value: 14,
      title: '14-Day Streak',
      desc: 'Circulation improved',
      achieved: streak >= 14,
      highlight: '',
      remain: 0,
      remainText: '',
    },
    {
      value: 30,
      title: '30-Day Streak',
      desc: 'Lung function increses',
      achieved: streak >= 30,
      highlight: streak < 30 ? `${30 - streak} Days to go` : '',
      remain: streak < 30 ? 30 - streak : 0,
      remainText: streak < 30 ? `${30 - streak} Days to go` : '',
    },
  ];

  const savingMilestones = [
    {
      value: 30,
      title: '$30 Saved',
      desc: 'Treat Your Self!',
      achieved: streak >= 3, // ví dụ: đạt 3 ngày tiết kiệm được 30$
      highlight: '',
      remain: 0,
      remainText: '',
    },
    {
      value: 50,
      title: '$50 Saved',
      desc: 'Nice Dinner Reward',
      achieved: streak >= 7, // ví dụ: đạt 7 ngày tiết kiệm được 50$
      highlight: '',
      remain: 0,
      remainText: '',
    },
    {
      value: 100,
      title: '$100 Saved',
      desc: 'Big saving achievement',
      achieved: streak >= 30, // ví dụ: đạt 30 ngày tiết kiệm được 100$
      highlight: streak < 30 ? `$${100 - ((streak / 30) * 100).toFixed(0)} to go` : '',
      remain: streak < 30 ? 100 - ((streak / 30) * 100) : 0,
      remainText: streak < 30 ? `$${100 - ((streak / 30) * 100).toFixed(0)} to go` : '',
    },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStreak((s) => (s < 14 ? s + 1 : s));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    navigate('/notificationcenter');
  };
  const handleLogout = () => {
    // Implement logout functionality
  };

  return (
    <div className="container">
      <style>{`
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
          position: relative;
        }
        
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
          z-index: 1;
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
        .header-center {
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
        .achievement-container {
          max-width: 900px;
          width: 100%;
          margin: 40px auto;
          background: rgba(255,255,255,0.95);
          border-radius: 16px;
          box-shadow: 0 4px 24px #0002;
          padding: 32px 24px 40px 24px;
        }
        .achievement-header h1 {
          color: #388e3c;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.2em;
          text-align: center;
        }
        .achievement-header p {
          text-align: center;
          color: #222;
          font-size: 1.1rem;
          margin-bottom: 32px;
        }
        .badges-section h2 {
          color: #388e3c;
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .badges-list {
          display: flex;
          justify-content: space-around;
          gap: 32px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 12px #388e3c11;
          padding: 32px 0;
          margin-bottom: 32px;
        }
        .badge-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 120px;
        }
        .badge-icon-large {
          font-size: 3.5rem;
          margin-bottom: 10px;
          filter: drop-shadow(0 2px 8px #388e3c22);
        }
        .badge-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #222;
          text-align: center;
        }
        .progress-section h2 {
          color: #388e3c;
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .progress-box {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 12px #388e3c11;
          padding: 24px 18px;
          font-size: 1.3rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 0;
        }
        .progress-label {
          color: #222;
        }
        .progress-value {
          color: #388e3c;
        }
        @media (max-width: 900px) {
          .badges-list {
            flex-direction: column;
            align-items: center;
            gap: 18px;
          }
        }
        .progress-bar-container {
          margin-top: 18px;
          width: 100%;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        .progress-bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.98rem;
          color: #388e3c;
          margin-bottom: 4px;
        }
        .progress-bar-bg {
          width: 100%;
          height: 18px;
          background: #e0f2e9;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 1px 6px #388e3c11;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #4d8b3c 60%, #6fd37c 100%);
          border-radius: 10px 0 0 10px;
          transition: width 0.5s cubic-bezier(.4,2,.6,1);
        }
        .progress-bar-text {
          text-align: center;
          font-size: 1rem;
          color: #222;
          margin-top: 4px;
          font-weight: 600;
        }
        .timeline-progress-container {
          width: 100%;
          max-width: 600px;
          margin: 28px auto 0 auto;
          position: relative;
          height: 32px;
        }
        .timeline-bar {
          position: relative;
          width: 100%;
          height: 10px;
          background: #b0aeb1;
          border-radius: 8px;
        }
        .timeline-bar-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 10px;
          background: #4caf50;
          border-radius: 8px 0 0 8px;
          z-index: 1;
          transition: width 0.5s cubic-bezier(.4,2,.6,1);
        }
        .timeline-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background: #b0aeb1;
          border-radius: 50%;
          border: 2.5px solid #fff;
          z-index: 2;
          box-shadow: 0 1px 4px #0001;
        }
        .timeline-dot:nth-child(-n+5) {
          background: #4caf50;
        }
        .timeline-bar-fill + .timeline-dot {
          background: #4caf50;
        }
        .timeline-dot {
          background: #b0aeb1;
        }
        .timeline-dot:nth-child(2) { background: ${(streak >= 0) ? '#4caf50' : '#b0aeb1'}; }
        .timeline-dot:nth-child(3) { background: ${(streak >= 10) ? '#4caf50' : '#b0aeb1'}; }
        .timeline-dot:nth-child(4) { background: ${(streak >= 20) ? '#4caf50' : '#b0aeb1'}; }
        .timeline-dot:nth-child(5) { background: ${(streak >= 30) ? '#4caf50' : '#b0aeb1'}; }
        .timeline-labels {
          position: relative;
          width: 100%;
          margin-top: 10px;
          height: 22px;
        }
        .timeline-labels span {
          position: absolute;
          transform: translateX(-50%);
          font-size: 1rem;
          color: #222;
          font-weight: 500;
          min-width: 60px;
          text-align: center;
        }
        .challenge-section {
          margin: 48px auto 0 auto;
          max-width: 900px;
          width: 100%;
        }
        .challenge-header {
          display: flex;
          align-items: center;
          font-size: 2rem;
          font-weight: 700;
          color: #43b649;
          margin-bottom: 10px;
          gap: 12px;
        }
        .challenge-icon {
          font-size: 2.2rem;
        }
        .challenge-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #43b649;
          text-shadow: 0 2px 8px #43b64922;
        }
        .challenge-box {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 4px 18px #0001;
          padding: 32px 32px 24px 32px;
          margin-top: 8px;
        }
        .challenge-main-title {
          color: #333;
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .challenge-progress-label {
          color: #333;
          font-size: 1.1rem;
          margin-bottom: 18px;
        }
        .challenge-progress-bar-bg {
          width: 100%;
          height: 8px;
          background: #e0e0e0;
          border-radius: 6px;
          margin-bottom: 18px;
          overflow: hidden;
        }
        .challenge-progress-bar-fill {
          height: 100%;
          background: #43b649;
          border-radius: 6px 0 0 6px;
          transition: width 0.5s cubic-bezier(.4,2,.6,1);
        }
        .challenge-reward {
          font-size: 1rem;
          color: #444;
          margin-top: 8px;
        }
        .achievement-gallery-section {
          margin: 40px auto 0 auto;
          max-width: 900px;
          width: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
          border-radius: 20px;
          padding: 32px 0;
          box-shadow: 0 8px 32px rgba(67, 182, 73, 0.1);
          border: 1px solid rgba(67, 182, 73, 0.1);
          backdrop-filter: blur(10px);
        }
        .gallery-header {
          text-align: center;
          margin-bottom: 32px;
          background: linear-gradient(135deg, #e8fbe8, #f1f8e9);
          border-radius: 16px;
          padding: 24px 0 16px 0;
          border: 2px solid #b6eab6;
          position: relative;
          overflow: hidden;
        }
        .gallery-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            rgba(67, 182, 73, 0.1) 0%,
            rgba(67, 182, 73, 0.05) 50%,
            rgba(67, 182, 73, 0.1) 100%);
          animation: gradientShift 8s ease infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .gallery-header h2 {
          color: #2e7d32;
          font-size: 2.4rem;
          font-weight: 800;
          margin-bottom: 0.3em;
          text-shadow: 0 2px 4px rgba(67, 182, 73, 0.1);
          position: relative;
        }
        .gallery-header p {
          color: #43b649;
          font-size: 1.2rem;
          margin-bottom: 0;
          font-weight: 500;
          position: relative;
        }
        .milestone-group {
          margin-top: 40px;
          padding: 0 24px;
          position: relative;
        }
        .milestone-group::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 1px;
          background: linear-gradient(90deg, 
            rgba(67, 182, 73, 0) 0%,
            rgba(67, 182, 73, 0.2) 50%,
            rgba(67, 182, 73, 0) 100%);
        }
        .milestone-group:last-child::after {
          display: none;
        }
        .milestone-title {
          color: #2e7d32;
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e8f5e9;
          position: relative;
        }
        .milestone-title::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, #43b649, transparent);
        }
        .milestone-icon {
          font-size: 1.8rem;
          filter: drop-shadow(0 2px 4px rgba(67, 182, 73, 0.2));
        }
        .milestone-list {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          justify-content: center;
          padding: 8px 0;
        }
        .milestone-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          padding: 28px 20px 20px 20px;
          min-width: 180px;
          max-width: 200px;
          flex: 1 1 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
          overflow: hidden;
        }
        .milestone-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #43b649, #2e7d32);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .milestone-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 28px rgba(67, 182, 73, 0.15);
          border-color: #43b649;
        }
        .milestone-card:hover::before {
          opacity: 1;
        }
        .milestone-card-inactive {
          background: #fafafa;
          color: #aaa;
          opacity: 0.85;
          border: 2px solid #eee;
        }
        .milestone-card-inactive:hover {
          border-color: #ddd;
          transform: translateY(-4px);
        }
        .milestone-value {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #43b649, #2e7d32);
          color: #fff;
          font-size: 2.0rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 6px 16px rgba(67, 182, 73, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .milestone-value::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }
        .milestone-card:hover .milestone-value {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 8px 24px rgba(67, 182, 73, 0.3);
        }
        .milestone-card-inactive .milestone-value {
          background: linear-gradient(135deg, #e0e0e0, #bdbdbd);
          box-shadow: none;
        }
        .milestone-main-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 8px;
          text-align: center;
          line-height: 1.4;
        }
        .milestone-desc {
          color: #43b649;
          font-size: 1.1rem;
          margin-bottom: 12px;
          text-align: center;
          font-weight: 500;
          line-height: 1.4;
        }
        .milestone-remain {
          color: #e53935;
          font-size: 1.1rem;
          margin-bottom: 12px;
          text-align: center;
          font-weight: 600;
          padding: 6px 16px;
          background: rgba(229, 57, 53, 0.1);
          border-radius: 16px;
          line-height: 1.4;
        }
        .milestone-bar {
          width: 90%;
          height: 8px;
          background: linear-gradient(90deg, #43b649, #2e7d32);
          border-radius: 6px;
          margin-top: 16px;
          position: relative;
          overflow: hidden;
        }
        .milestone-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.4) 50%,
            rgba(255,255,255,0) 100%);
          animation: shimmer 2s infinite;
        }
        
        /* Footer */
        footer {
        background-color: #333;
        color: #fff;
        margin-top: 50px;
        padding: 40px;
        text-align: center;
    }

    .footer-content {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        text-align: left;
        margin-bottom: 30px;
    }

    .footer-column {
        flex: 1;
        min-width: 200px;
        margin: 15px;
    }

    .footer-column h3 {
        font-size: 20px;
        margin-bottom: 15px;
        color: #4CAF50;
    }

    .footer-column p,
    .footer-column ul {
        font-size: 14px;
        color: #ccc;
        line-height: 1.6;
    }

    .footer-column ul {
        list-style: none;
        padding: 0;
    }

    .footer-column ul li {
        margin-bottom: 8px;
    }

    .footer-column ul li a {
        color: #ccc;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-column ul li a:hover {
        color: #4CAF50;
    }

    .newsletter-input {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        margin-bottom: 10px;
        background-color: #555;
        color: #fff;
    }

    .newsletter-button {
        background-color: #4CAF50;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        width: 100%;
    }

    .newsletter-button:hover {
        background-color: #388E3C;
    }

    .newsletter-text {
        font-size: 12px;
        color: #ccc;
        margin-top: 10px;
    }

    .footer-bottom {
        border-top: 1px solid #555;
        padding-top: 20px;
        margin-top: 30px;
        font-size: 14px;
        color: #ccc;
    }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
      <EditProfileModal
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={() => setShowEditProfile(false)}
      />
      {/* Header */}
      <header className="welcome-header">
        <div className="header-left">
          <div className="profile-status">
            <button className="profile-btn" onClick={() => setShowEditProfile(true)}>
              <span className="profile-icon">👤</span> Standard Member
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
          <i className="notification-icon" onClick={handleNotificationClick}>🔔</i>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      {/* Navigation */}
      <nav className="welcome-nav">
        <ul>
          <li><a href="/standardmemberhome">Home</a></li>
          <li><a href="/standardmemberdashboard">Dashboard</a></li>
          <li><a href="/standardachievement" className="active">Achievement</a></li>
          <li><a href="/standardmembercoach">Coach</a></li>
          <li><a href="/standardmembercommun">Community</a></li>
          <li><a href="/feedback">Feedback</a></li>
        </ul>
      </nav>
      {/* Main Content */}
      <div className="achievement-container">
        <div className="achievement-header">
          <h1>Your Achievements</h1>
          <p>Celebrate your smoke-free journey milestones</p>
        </div>
        <div className="badges-section">
          <h2>
            <span className="badge-icon">🏅</span> Badges Earned
          </h2>
          <div className="badges-list">
            {badgesData.map((badge) => (
              <div className="badge-card" key={badge.id}>
                <div className="badge-icon-large">{badge.icon}</div>
                <div className="badge-title">{badge.title}</div>
                {/* <div className="badge-desc">{badge.desc}</div> */}
              </div>
            ))}
          </div>
        </div>
        <div className="progress-section">
          <h2>
            <span className="progress-icon">✔️</span> Your Progress
          </h2>
          <div className="progress-box">
            <span className="progress-label">Current Streak: </span>
            <span className="progress-value">{streak} days smoke-free</span>
          </div>
          {/* Timeline Progress Bar to 1 Month Goal */}
          <div className="timeline-progress-container">
            <div className="timeline-bar">
              <div className="timeline-bar-fill" style={{ width: `${Math.min((streak / 30) * 100, 100)}%` }}></div>
              {/* 4 milestones: 3, 7, 14, 30 */}
              <div className="timeline-dot" style={{ left: '0%' }}></div>
              <div className="timeline-dot" style={{ left: '20%' }}></div>
              <div className="timeline-dot" style={{ left: '53.33%' }}></div>
              <div className="timeline-dot" style={{ left: '100%' }}></div>
            </div>
            <div className="timeline-labels">
              <span style={{ left: '0%' }}>3 Days</span>
              <span style={{ left: '20%' }}>7 Days</span>
              <span style={{ left: '53.33%' }}>14 Days</span>
              <span style={{ left: '100%' }}>1 Month</span>
            </div>
          </div>
        </div>

        <div className="challenge-section">
          <div className="challenge-header">
            <span className="challenge-icon">📈</span>
            <span className="challenge-title">Challenges</span>
          </div>
          <div className="challenge-box">
            <div className="challenge-main-title">
              Current Challenge: {challengeData.title}
            </div>
            <div className="challenge-progress-label">
              <b>{challengeData.completedDays}/{challengeData.totalDays} Days Complete ({Math.round((challengeData.completedDays / challengeData.totalDays) * 100)}%)</b>
            </div>
            <div className="challenge-progress-bar-bg">
              <div className="challenge-progress-bar-fill" style={{ width: `${Math.min((challengeData.completedDays / challengeData.totalDays) * 100, 100)}%` }}></div>
            </div>
            <div className="challenge-reward">Reward: {challengeData.reward}</div>
          </div>
        </div>
      </div>
      {/* Achievement Gallery Section */}
      <div className="achievement-gallery-section">
        <div className="gallery-header">
          <h2>Your Achievement Gallery</h2>
          <p>Celebrate every step of your smoke-free jouney</p>
        </div>
        {/* Time Milestones */}
        <div className="milestone-group">
          <div className="milestone-title"><span className="milestone-icon">⏱️</span> Time Milestones</div>
          <div className="milestone-list">
            {timeMilestones.map((m, idx) => (
              <div className={`milestone-card${m.achieved ? '' : ' milestone-card-inactive'}`} key={idx}>
                <div className="milestone-value">{m.value}</div>
                <div className="milestone-main-title">{m.title}</div>
                {m.achieved ? (
                  <div className="milestone-desc">{m.desc}</div>
                ) : (
                  <div className="milestone-remain">{m.remainText || m.desc}</div>
                )}
                {m.achieved && <div className="milestone-bar"></div>}
              </div>
            ))}
          </div>
        </div>
        {/* Saving Milestones */}
        <div className="milestone-group">
          <div className="milestone-title"><span className="milestone-icon">💰</span> Saving milestone</div>
          <div className="milestone-list">
            {savingMilestones.map((m, idx) => (
              <div className={`milestone-card${m.achieved ? '' : ' milestone-card-inactive'}`} key={idx}>
                <div className="milestone-value">${m.value}</div>
                <div className="milestone-main-title">{m.title}</div>
                {m.achieved ? (
                  <div className="milestone-desc">{m.desc}</div>
                ) : (
                  <div className="milestone-remain">{m.remainText || m.desc}</div>
                )}
                {m.achieved && <div className="milestone-bar"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-column">
            <h3>NicOff</h3>
            <p>We're dedicated to helping you break free from smoking addiction through science-backed methods and community support</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/ourprograms">Our Programs</a></li>
              <li><a href="/successstories">Success Stories</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/helpcenter">Help Center</a></li>
              <li><a href="/privacypolicy">Privacy Policy</a></li>
              <li><a href="/termsofservice">Term Of Service</a></li>
              <li><a href="/cookiepolicy">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>NewsLetter</h3>
            <input type="email" placeholder="Your Email Address..." className="newsletter-input" />
            <button className="newsletter-button">Subscribe</button>
            <p className="newsletter-text">Get the latest tips and motivation to stay smoke-free delivered to your inbox</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 NicOff. All rights reserved
        </div>
      </footer>
    </div>
  );
}
