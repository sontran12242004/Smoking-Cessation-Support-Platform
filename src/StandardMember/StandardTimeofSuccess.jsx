import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import journeyPath from "../assets/journey_path.jpg";
import ApiService from "../apiService";
import { useUser } from "../UserContext";

const StandardTimeofSuccess = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [quitPlan, setQuitPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Load quit plan data on component mount
  useEffect(() => {
    const loadQuitPlan = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const userId = user.id || user.userId || user.memberId;
      if (!userId) {
        setError("User ID not found");
        setIsLoading(false);
        return;
      }

      try {
        const planData = await ApiService.getQuitPlan(userId);
        setQuitPlan(planData);
      } catch (error) {
        console.error("Error loading quit plan:", error);
        setError("Failed to load quit plan data");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuitPlan();
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate progress based on quit plan
  const calculateProgress = (quitPlan) => {
    if (!quitPlan || !quitPlan.created_at) {
      return {
        daysSinceQuit: 0,
        hoursSinceQuit: 0,
        minutesSinceQuit: 0,
        progressPercentage: 0,
        estimatedCompletionTime: "N/A",
        userName: "User",
      };
    }

    const quitDate = new Date(quitPlan.created_at);
    const now = new Date();
    const timeDiff = now - quitDate;

    // If quit date is in the future, show 0
    if (timeDiff < 0) {
      return {
        daysSinceQuit: 0,
        hoursSinceQuit: 0,
        minutesSinceQuit: 0,
        progressPercentage: 0,
        estimatedCompletionTime: formatDate(quitPlan.created_at),
        userName: user?.firstName || "User",
      };
    }

    const daysSinceQuit = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursSinceQuit = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesSinceQuit = Math.floor(
      (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
    );

    // Calculate progress percentage based on target days
    const targetDays = quitPlan.target_days || 30;
    const progressPercentage = Math.min(
      Math.round((daysSinceQuit / targetDays) * 100),
      100
    );

    // Calculate estimated completion time
    const remainingDays = Math.max(targetDays - daysSinceQuit, 0);
    const estimatedCompletion =
      remainingDays === 0
        ? "Congratulations! Goal achieved!"
        : `${remainingDays} days remaining`;

    return {
      daysSinceQuit,
      hoursSinceQuit,
      minutesSinceQuit,
      progressPercentage,
      estimatedCompletionTime: estimatedCompletion,
      userName: user?.firstName || user?.name || "User",
    };
  };

  const progress = quitPlan
    ? calculateProgress(quitPlan)
    : {
        daysSinceQuit: 0,
        hoursSinceQuit: 0,
        minutesSinceQuit: 0,
        progressPercentage: 0,
        estimatedCompletionTime: "N/A",
        userName: "User",
      };

  const allStyles = `
    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
    .welcome-page-container {
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

    .app-name {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
        border-bottom: 1px solid #d0e8ef;
    }

    .welcome-nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        gap: 40px;
    }

    .nav-link {
        text-decoration: none;
        color: #5EBB34;
        font-weight: 400;
        font-size: 16px;
        padding: 5px 0;
        position: relative;
        transition: color 0.3s;
    }

    .nav-link::after {
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

    .nav-link:hover::after, .nav-link:focus::after, .nav-link.active::after {
        transform: scaleX(1);
    }

    .time-of-success-main-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column; /* To stack cards vertically */
      align-items: center; /* Center cards horizontally */
      padding: 20px;
      background-image: linear-gradient(rgba(223, 245, 222, 0.5), rgba(223, 245, 222, 0.5)), url(${journeyPath});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      color: #fff;
      width: 100%; /* Ensure it spans full width */
      box-sizing: border-box; /* Include padding in width/height */
      padding-top: 50px; /* Space from top */
      padding-bottom: 50px; /* Space from bottom */
    }

    .top-section-text {
        font-size: 32px;
        color: #333;
        margin-bottom: 30px;
        font-weight: 500;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    }

    .progress-card, .success-card {
      background-color: #fff;
      color: #333;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 40px;
      text-align: center;
      max-width: 800px;
      width: 90%;
      margin-bottom: 30px; /* Space between cards */
    }

    .quit-plan-card {
      background-color: #fff;
      color: #333;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 30px;
      text-align: left;
      max-width: 800px;
      width: 90%;
      margin-bottom: 30px;
    }

    .quit-plan-title {
      font-size: 28px;
      color: #4CAF50;
      margin-bottom: 25px;
      text-align: center;
      font-weight: bold;
    }

    .quit-plan-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .quit-plan-item {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #4CAF50;
    }

    .quit-plan-label {
      font-weight: bold;
      color: #333;
      font-size: 14px;
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .quit-plan-value {
      color: #666;
      font-size: 16px;
      line-height: 1.4;
    }

    .triggers-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 5px;
    }

    .trigger-tag {
      background-color: #e8f5e8;
      color: #2e7d32;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }

    .loading-container, .error-container {
      background-color: #fff;
      color: #333;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 40px;
      text-align: center;
      max-width: 600px;
      width: 90%;
    }

    .error-text {
      color: #d32f2f;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .quit-plan-grid {
        grid-template-columns: 1fr;
      }
    }

    .progress-card-title, .success-card-title {
        font-size: 28px;
        color: #249325;
        margin-bottom: 25px;
        margin-top: 0;
    }

    .time-smoke-free {
        display: flex;
        justify-content: center;
        align-items: baseline;
        gap: 15px;
        margin-bottom: 30px;
    }

    .time-smoke-free .number {
        font-size: 60px;
        color: #249325;
        font-weight: bold;
        line-height: 1;
    }

    .time-smoke-free .label {
        font-size: 20px;
        color: #555;
    }

    .key-milestones-title {
        font-size: 22px;
        color: #555;
        margin-bottom: 20px;
    }

    .milestone-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .milestone-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f8f8f8;
        border-radius: 5px;
        padding: 15px 20px;
        margin-bottom: 10px;
        font-size: 16px;
        transition: all 0.3s ease;
        border-left: 4px solid #ddd;
    }

    .milestone-item.completed {
        background-color: #e8f5e8;
        border-left-color: #4CAF50;
    }

    .milestone-name {
        font-weight: bold;
        color: #333;
        min-width: 80px;
    }

    .milestone-desc {
        flex: 1;
        margin-left: 15px;
        color: #666;
    }

    .milestone-badge {
        font-size: 20px;
        min-width: 40px;
        text-align: center;
    }

    .progress-bar-container {
        background-color: #f0f0f0;
        border-radius: 10px;
        height: 30px;
        margin: 20px 0;
        overflow: hidden;
        position: relative;
    }

    .progress-bar-fill {
        background: linear-gradient(90deg, #4CAF50, #45a049);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        transition: width 0.5s ease;
        min-width: 100px;
    }

    .success-description {
        text-align: center;
        font-size: 16px;
        color: #555;
        line-height: 1.5;
    }

    .highlight {
        color: #4CAF50;
        font-weight: bold;
    }
    
    .go-to-home-button {
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 15px 30px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
        margin-top: 30px;
    }

    .go-to-home-button:hover {
        background-color: #388E3C;
        transform: translateY(-3px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
    
  `;

  return (
    <div className="welcome-page-container">
      <style>{allStyles}</style>
      <header className="welcome-header">
        <div className="header-left">
          <button
            className="profile-btn"
            onClick={() => navigate("/standard/edit-profile")}
          >
            Standard Member
          </button>
        </div>
        <div className="header-center">
          <div className="app-name">
            <h1>NicOff</h1>
            <p>Turn Off Nicotine, Turn On Life!</p>
          </div>
        </div>
        <div className="header-right">
          <span
            className="notification-icon"
            onClick={() => navigate("/standard/notification")}
          >
            &#128276;
          </span>
          <button className="logout-button" onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
      </header>
      <nav className="welcome-nav">
        <ul>
          <li>
            <NavLink to="/standard/home" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/standard/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/standard/achievement" className="nav-link">
              Achievement
            </NavLink>
          </li>
          <li>
            <NavLink to="/standard/coach" className="nav-link">
              Coach
            </NavLink>
          </li>
          <li>
            <NavLink to="/standard/community" className="nav-link">
              Community
            </NavLink>
          </li>
          <li>
            <NavLink to="/standard/feedback" className="nav-link">
              Feedback
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="time-of-success-main-content">
        <div className="top-section-text">
          <h1>Congratulations on creating your personalized quit plan!</h1>
        </div>

        {/* Quit Plan Details */}
        {isLoading ? (
          <div className="loading-container">
            <p>Loading your quit plan details...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-text">{error}</p>
            <button
              onClick={() => navigate("/standard/questionnaire")}
              className="go-to-home-button"
            >
              Go to Questionnaire
            </button>
          </div>
        ) : quitPlan ? (
          <div className="quit-plan-card">
            <h2 className="quit-plan-title">Your Quit Plan Details</h2>
            <div className="quit-plan-grid">
              <div className="quit-plan-item">
                <div className="quit-plan-label">Plan ID</div>
                <div className="quit-plan-value">#{quitPlan.id}</div>
              </div>
              <div className="quit-plan-item">
                <div className="quit-plan-label">Member ID</div>
                <div className="quit-plan-value">#{quitPlan.memberId}</div>
              </div>
              <div className="quit-plan-item">
                <div className="quit-plan-label">Motivation</div>
                <div className="quit-plan-value">{quitPlan.motivation}</div>
              </div>
              <div className="quit-plan-item">
                <div className="quit-plan-label">Daily Cigarettes</div>
                <div className="quit-plan-value">
                  {quitPlan.daily_cigarettes}
                </div>
              </div>
              <div className="quit-plan-item">
                <div className="quit-plan-label">
                  First Cigarette After Waking
                </div>
                <div className="quit-plan-value">
                  {quitPlan.first_cigarette_after_waking}
                </div>
              </div>
              <div className="quit-plan-item">
                <div className="quit-plan-label">Weekly Spending</div>
                <div className="quit-plan-value">
                  {quitPlan.weekly_spending}
                </div>
              </div>
              <div className="quit-plan-item">
                <div className="quit-plan-label">Previous Quit Attempts</div>
                <div className="quit-plan-value">{quitPlan.tried_before}</div>
              </div>
              <div className="quit-plan-item">
                <div className="quit-plan-label">Quit Goal</div>
                <div className="quit-plan-value">{quitPlan.quit_goal}</div>
              </div>
              <div className="quit-plan-item">
                <div className="quit-plan-label">Target Days</div>
                <div className="quit-plan-value">
                  {quitPlan.target_days} days
                </div>
              </div>
              <div className="quit-plan-item">
                <div className="quit-plan-label">Plan Created</div>
                <div className="quit-plan-value">
                  {formatDate(quitPlan.created_at)}
                </div>
              </div>
              <div className="quit-plan-item">
                <div className="quit-plan-label">Status</div>
                <div className="quit-plan-value">
                  {quitPlan.is_active ? "Active" : "Inactive"}
                </div>
              </div>
              <div className="quit-plan-item" style={{ gridColumn: "1 / -1" }}>
                <div className="quit-plan-label">Triggers</div>
                <div className="quit-plan-value">
                  {quitPlan.triggers && quitPlan.triggers.length > 0 ? (
                    <div className="triggers-list">
                      {quitPlan.triggers.map((trigger, index) => (
                        <span key={index} className="trigger-tag">
                          {trigger}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "No triggers specified"
                  )}
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => navigate("/standard/questionnaire")}
                className="go-to-home-button"
              >
                Edit Quit Plan
              </button>
            </div>
          </div>
        ) : (
          <div className="error-container">
            <p>No quit plan found. Please create one first.</p>
            <button
              onClick={() => navigate("/standard/questionnaire")}
              className="go-to-home-button"
            >
              Create Quit Plan
            </button>
          </div>
        )}
        <div className="progress-card">
          <h2 className="progress-card-title">Smoking Cessation Progress</h2>
          <div
            style={{
              textAlign: "right",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            <p style={{ margin: "0", color: "#555" }}>
              Welcome, {progress.userName}
            </p>
            <p style={{ margin: "0", color: "#555" }}>
              Quit date: {quitPlan ? formatDate(quitPlan.created_at) : "N/A"}
            </p>
          </div>
          <div className="time-smoke-free">
            <div className="number">{progress.daysSinceQuit}</div>
            <div className="label">Days</div>
            <div className="number">{progress.hoursSinceQuit}</div>
            <div className="label">Hours</div>
            <div className="number">{progress.minutesSinceQuit}</div>
            <div className="label">Minutes</div>
          </div>
          <h3 className="key-milestones-title">Key Milestones</h3>
          <ul className="milestone-list">
            <li
              className={`milestone-item ${
                progress.daysSinceQuit >= 2 ? "completed" : ""
              }`}
            >
              <span className="milestone-name">48 hours</span>
              <span className="milestone-desc">
                Nicotine eliminated from body
              </span>
              <span className="milestone-badge">
                {progress.daysSinceQuit >= 2 ? "✅" : "⏳"}
              </span>
            </li>
            <li
              className={`milestone-item ${
                progress.daysSinceQuit >= 14 ? "completed" : ""
              }`}
            >
              <span className="milestone-name">2 weeks</span>
              <span className="milestone-desc">
                Circulation and lung function improve
              </span>
              <span className="milestone-badge">
                {progress.daysSinceQuit >= 14 ? "✅" : "⏳"}
              </span>
            </li>
            <li
              className={`milestone-item ${
                progress.daysSinceQuit >= 30 ? "completed" : ""
              }`}
            >
              <span className="milestone-name">1 month</span>
              <span className="milestone-desc">
                Energy levels increase significantly
              </span>
              <span className="milestone-badge">
                {progress.progressPercentage}%
              </span>
            </li>
            <li
              className={`milestone-item ${
                progress.daysSinceQuit >= 90 ? "completed" : ""
              }`}
            >
              <span className="milestone-name">3 months</span>
              <span className="milestone-desc">
                Addiction broken, cravings rare
              </span>
              <span className="milestone-badge">
                {progress.daysSinceQuit >= 90 ? "✅" : "⏳"}
              </span>
            </li>
            <li
              className={`milestone-item ${
                progress.daysSinceQuit >= 365 ? "completed" : ""
              }`}
            >
              <span className="milestone-name">1 year</span>
              <span className="milestone-desc">Heart disease risk halved</span>
              <span className="milestone-badge">
                {progress.daysSinceQuit >= 365 ? "✅" : "⏳"}
              </span>
            </li>
          </ul>

          <h3 className="key-milestones-title">
            Estimated Time to Full Success
          </h3>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress.progressPercentage}%` }}
            >
              {progress.progressPercentage}% to complete success
            </div>
          </div>
          <p className="success-description">
            Based on your progress, you're on track to complete success in
            approximately{" "}
            <span className="highlight">
              {progress.estimatedCompletionTime}
            </span>{" "}
            Keep going!
          </p>
        </div>
        <div className="success-card">
          <h2 className="success-card-title">Share Your Commitment</h2>
          <p>
            Let your friends and family know about your decision. Their support
            can make a huge difference!
          </p>
          <div className="share-container">
            <textarea
              className="share-input"
              placeholder="I'm starting my journey to a smoke-free life with NicOff! #quitjourney #smokefree"
            />
            <button className="share-button">Share on Social Media</button>
          </div>
        </div>
        <button
          className="go-to-home-button"
          onClick={() => navigate("/standard/home")}
        >
          Go To Home
        </button>
      </main>
    </div>
  );
};

export default StandardTimeofSuccess;
