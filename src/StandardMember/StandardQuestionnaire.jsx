import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import journeyPath from "../assets/journey_path.jpg";
import ApiService from "../apiService";
import { useUser } from "../UserContext";

const StandardQuestionnaire = () => {
  const [q1, setQ1] = useState(""); // Question 1: How many cigarettes do you typically smoke per day?
  const [q2, setQ2] = useState(""); // Question 2: How soon after waking up do you smoke your first cigarette?
  const [q3, setQ3] = useState(""); // Question 3: What's your main motivation for quitting?
  const [q4, setQ4] = useState(""); // Question 4: Have you tried quitting before?
  const [q5, setQ5] = useState([]); // Question 5: What situations trigger your urge to smoke? (Select all that apply)
  const [q6, setQ6] = useState(""); // Question 6: How much do you typically spend on cigarettes per week?

  // Additional fields for API
  const [quitGoal, setQuitGoal] = useState("");
  const [targetDays, setTargetDays] = useState(30);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [existingPlanId, setExistingPlanId] = useState(null);

  const navigate = useNavigate();
  const { user } = useUser();

  // Load existing quit plan data on component mount
  useEffect(() => {
    const loadExistingQuitPlan = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const userId = user.id || user.userId || user.memberId;
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const existingPlan = await ApiService.getQuitPlan(userId);
        if (existingPlan) {
          // Populate form with existing data
          setQ1(existingPlan.daily_cigarettes || "");
          setQ2(existingPlan.first_cigarette_after_waking || "");
          setQ3(existingPlan.motivation || "");
          setQ4(existingPlan.tried_before || "");
          setQ5(existingPlan.triggers || []);
          setQ6(existingPlan.weekly_spending || "");
          setQuitGoal(existingPlan.quit_goal || "");
          setTargetDays(existingPlan.target_days || 30);
          setIsEditing(true);
          setExistingPlanId(existingPlan.id);
        }
      } catch (error) {
        console.log("No existing quit plan found or error loading:", error);
        // If no existing plan, that's fine - user will create a new one
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingQuitPlan();
  }, [user]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setQ5((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const allStyles = `
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

    .main-content {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      background-image: url(${journeyPath});
      background-size: cover;
      background-position: center;
      position: relative;
      color: #fff;
      width: 100%;
    }
    .main-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(223, 245, 222, 0.7);
      z-index: 1;
    }
    .questionnaire-card {
      z-index: 2;
      animation: fadeIn 1.5s ease-out;
      background-color: #fff;
      color: #333;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 40px;
      text-align: center;
      max-width: 700px;
      margin: 0 auto; /* Explicitly add margin: auto for centering */
    }
    .main-title {
      font-size: 36px;
      color: #249325;
      margin-bottom: 20px;
      margin-top: 0;
    }
    .highlight-text {
      color: #4CAF50;
      font-style: italic;
    }
    .main-subtitle {
      font-size: 18px;
      font-style: italic;
      color: #666;
      margin-bottom: 30px;
    }
    .question-section {
      margin-bottom: 20px;
      text-align: left;
    }
    .question-title {
      font-size: 20px;
      color: #333;
      margin-bottom: 10px;
    }
    .options-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .option-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      color: #555;
    }
    .radio-input {
      margin-right: 10px;
    }
    .option-text {
      /* Additional styles for text if needed */
    }
    .create-plan-button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 15px 30px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
      margin-top: 30px;
    }
    .create-plan-button:hover {
      background-color: #45a049;
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
    .footer {
      background-color: #333;
      color: #fff;
      padding: 40px 20px;
      margin-top: auto;
      text-align: center;
    }
    .footer-content {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      max-width: 1200px;
      margin: 0 auto 20px auto;
      gap: 20px;
    }
    .footer-section {
      flex: 1;
      min-width: 200px;
      margin: 10px;
      text-align: left;
    }
    .footer-section-title {
      color: #4CAF50;
      margin-bottom: 15px;
      font-size: 18px;
    }
    .footer-text {
      font-size: 14px;
      line-height: 1.6;
    }
    .footer-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .footer-link {
      text-decoration: none;
      color: #fff;
      font-size: 14px;
      margin-bottom: 10px;
      display: block;
      transition: color 0.3s ease;
    }
    .footer-link:hover {
      color: #4CAF50;
    }
    .newsletter-input {
      width: calc(100% - 20px);
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #555;
      background-color: #444;
      color: #fff;
    }
    .subscribe-button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease;
    }
    .subscribe-button:hover {
      background-color: #388E3C;
    }
    .newsletter-text {
      font-size: 12px;
      color: #aaa;
      margin-top: 10px;
    }
    .copyright {
      border-top: 1px solid #444;
      padding-top: 20px;
      margin-top: 20px;
      font-size: 12px;
      color: #aaa;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  const handleSubmit = async () => {
    // Validate required fields
    if (!q1 || !q2 || !q3 || !q4 || !q6 || !quitGoal) {
      setError("Please answer all questions before submitting");
      return;
    }

    if (!user) {
      setError("User not authenticated");
      return;
    }

    // Try to get user ID from different possible fields
    const userId = user.id || user.userId || user.memberId;
    if (!userId) {
      setError("User ID not found. Please login again.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const quitPlanData = {
        motivation: q3, // main motivation for quitting
        triggers: q5, // array of trigger situations
        daily_cigarettes: q1, // cigarettes per day
        first_cigarette_after_waking: q2, // timing of first cigarette
        weekly_spending: q6, // weekly spending on cigarettes
        tried_before: q4, // previous quit attempts
        quit_goal: quitGoal, // new field for quit goal
        target_days: targetDays, // target days to quit
        is_active: true,
        created_at: isEditing ? undefined : new Date().toISOString(), // Don't overwrite existing created_at when editing
      };

      // Include ID when updating
      if (isEditing && existingPlanId) {
        quitPlanData.id = existingPlanId;
        quitPlanData.memberId = userId;
      }

      if (isEditing) {
        await ApiService.updateQuitPlan(userId, quitPlanData);
      } else {
        await ApiService.createQuitPlan(userId, quitPlanData);
      }

      // Navigate to success page on successful submission
      navigate("/standard/timeofsuccess");
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} quit plan:`,
        error
      );
      setError(
        `Failed to ${
          isEditing ? "update" : "submit"
        } questionnaire. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="welcome-page-container">
      <style>{allStyles}</style>
      {/* Header */}
      <div className="welcome-header">
        <div className="header-left">
          <div className="profile-section">
            <button
              className="profile-btn"
              onClick={() => navigate("/standard/edit-profile")}
            >
              Standard Member
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
          <span className="notification-icon">&#128276;</span>
          <button className="logout-button" onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="welcome-nav">
        <ul className="nav-links">
          <li>
            <NavLink
              to="/standard/home"
              className="nav-link"
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/standard/dashboard"
              className="nav-link"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/standard/achievement"
              className="nav-link"
              activeClassName="active"
            >
              Achievement
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/standard/coach"
              className="nav-link"
              activeClassName="active"
            >
              Coach
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/standard/community"
              className="nav-link"
              activeClassName="active"
            >
              Community
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/standard/feedback"
              className="nav-link"
              activeClassName="active"
            >
              Feedback
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {isLoading ? (
          <div className="questionnaire-card">
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p>Loading your quit plan...</p>
            </div>
          </div>
        ) : (
          <div className="questionnaire-card">
            <h1 className="main-title">
              {isEditing ? "Update Your" : "Answer Questions,"}{" "}
              <span className="highlight-text">
                {isEditing ? "Quit Plan" : "Build Your Plan"}
              </span>
            </h1>
            <p className="main-subtitle">
              {isEditing
                ? "Review and update your quit plan details"
                : "Help us understand your smoking habits to create a personalized quit plan"}
            </p>

            {/* Question 1 */}
            <div className="question-section">
              <h3 className="question-title">
                1. How many cigarettes do you typically smoke per day?
              </h3>
              <div className="options-container">
                <label className="option-label">
                  <input
                    type="radio"
                    name="q1"
                    value="1-5"
                    checked={q1 === "1-5"}
                    onChange={(e) => setQ1(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">1-5</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q1"
                    value="6-10"
                    checked={q1 === "6-10"}
                    onChange={(e) => setQ1(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">6-10</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q1"
                    value="11-20"
                    checked={q1 === "11-20"}
                    onChange={(e) => setQ1(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">11-20</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q1"
                    value="More than 20"
                    checked={q1 === "More than 20"}
                    onChange={(e) => setQ1(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">More than 20</span>
                </label>
              </div>
            </div>

            {/* Question 2 */}
            <div className="question-section">
              <h3 className="question-title">
                2. How soon after waking up do you smoke your first cigarette?
              </h3>
              <div className="options-container">
                <label className="option-label">
                  <input
                    type="radio"
                    name="q2"
                    value="Within 5 minutes"
                    checked={q2 === "Within 5 minutes"}
                    onChange={(e) => setQ2(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Within 5 minutes</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q2"
                    value="6-30 minutes"
                    checked={q2 === "6-30 minutes"}
                    onChange={(e) => setQ2(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">6-30 minutes</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q2"
                    value="31-60 minutes"
                    checked={q2 === "31-60 minutes"}
                    onChange={(e) => setQ2(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">31-60 minutes</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q2"
                    value="After 60 minutes"
                    checked={q2 === "After 60 minutes"}
                    onChange={(e) => setQ2(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">After 60 minutes</span>
                </label>
              </div>
            </div>

            {/* Question 3 */}
            <div className="question-section">
              <h3 className="question-title">
                3. What's your main motivation for quitting?
              </h3>
              <div className="options-container">
                <label className="option-label">
                  <input
                    type="radio"
                    name="q3"
                    value="Health reasons"
                    checked={q3 === "Health reasons"}
                    onChange={(e) => setQ3(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Health reasons</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q3"
                    value="Family/relationships"
                    checked={q3 === "Family/relationships"}
                    onChange={(e) => setQ3(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Family/relationships</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q3"
                    value="Financial savings"
                    checked={q3 === "Financial savings"}
                    onChange={(e) => setQ3(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Financial savings</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q3"
                    value="Appearance/smell"
                    checked={q3 === "Appearance/smell"}
                    onChange={(e) => setQ3(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Appearance/smell</span>
                </label>
              </div>
            </div>

            {/* Question 4 */}
            <div className="question-section">
              <h3 className="question-title">
                4. Have you tried quitting before?
              </h3>
              <div className="options-container">
                <label className="option-label">
                  <input
                    type="radio"
                    name="q4"
                    value="No, this is my first time"
                    checked={q4 === "No, this is my first time"}
                    onChange={(e) => setQ4(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">No, this is my first time</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q4"
                    value="Yes, once"
                    checked={q4 === "Yes, once"}
                    onChange={(e) => setQ4(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Yes, once</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q4"
                    value="Yes, multiple times"
                    checked={q4 === "Yes, multiple times"}
                    onChange={(e) => setQ4(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Yes, multiple times</span>
                </label>
              </div>
            </div>

            {/* Question 5 */}
            <div className="question-section">
              <h3 className="question-title">
                5. What situations trigger your urge to smoke? (Select all that
                apply)
              </h3>
              <div className="options-container">
                <label className="option-label">
                  <input
                    type="checkbox"
                    name="q5"
                    value="Morning coffee"
                    checked={q5.includes("Morning coffee")}
                    onChange={handleCheckboxChange}
                    className="radio-input"
                  />
                  <span className="option-text">Morning coffee</span>
                </label>
                <label className="option-label">
                  <input
                    type="checkbox"
                    name="q5"
                    value="Stressful situations"
                    checked={q5.includes("Stressful situations")}
                    onChange={handleCheckboxChange}
                    className="radio-input"
                  />
                  <span className="option-text">Stressful situations</span>
                </label>
                <label className="option-label">
                  <input
                    type="checkbox"
                    name="q5"
                    value="Social gatherings"
                    checked={q5.includes("Social gatherings")}
                    onChange={handleCheckboxChange}
                    className="radio-input"
                  />
                  <span className="option-text">Social gatherings</span>
                </label>
                <label className="option-label">
                  <input
                    type="checkbox"
                    name="q5"
                    value="After meals"
                    checked={q5.includes("After meals")}
                    onChange={handleCheckboxChange}
                    className="radio-input"
                  />
                  <span className="option-text">After meals</span>
                </label>
                <label className="option-label">
                  <input
                    type="checkbox"
                    name="q5"
                    value="When bored"
                    checked={q5.includes("When bored")}
                    onChange={handleCheckboxChange}
                    className="radio-input"
                  />
                  <span className="option-text">When bored</span>
                </label>
              </div>
            </div>

            {/* Question 6 */}
            <div className="question-section">
              <h3 className="question-title">
                6. How much do you typically spend on cigarettes per week?
              </h3>
              <div className="options-container">
                <label className="option-label">
                  <input
                    type="radio"
                    name="q6"
                    value="Under $10"
                    checked={q6 === "Under $10"}
                    onChange={(e) => setQ6(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Under $10</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q6"
                    value="$10 - $25"
                    checked={q6 === "$10 - $25"}
                    onChange={(e) => setQ6(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">$10 - $25</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q6"
                    value="$26 - $50"
                    checked={q6 === "$26 - $50"}
                    onChange={(e) => setQ6(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">$26 - $50</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="q6"
                    value="Over $50"
                    checked={q6 === "Over $50"}
                    onChange={(e) => setQ6(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Over $50</span>
                </label>
              </div>
            </div>

            {/* Question 7 - Quit Goal */}
            <div className="question-section">
              <h3 className="question-title">
                7. What is your primary quit goal?
              </h3>
              <div className="options-container">
                <label className="option-label">
                  <input
                    type="radio"
                    name="quitGoal"
                    value="Quit completely"
                    checked={quitGoal === "Quit completely"}
                    onChange={(e) => setQuitGoal(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Quit completely</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="quitGoal"
                    value="Reduce significantly"
                    checked={quitGoal === "Reduce significantly"}
                    onChange={(e) => setQuitGoal(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Reduce significantly</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="quitGoal"
                    value="Gradual reduction"
                    checked={quitGoal === "Gradual reduction"}
                    onChange={(e) => setQuitGoal(e.target.value)}
                    className="radio-input"
                  />
                  <span className="option-text">Gradual reduction</span>
                </label>
              </div>
            </div>

            {/* Question 8 - Target Days */}
            <div className="question-section">
              <h3 className="question-title">
                8. In how many days do you want to achieve your goal?
              </h3>
              <div className="options-container">
                <label className="option-label">
                  <input
                    type="radio"
                    name="targetDays"
                    value={7}
                    checked={targetDays === 7}
                    onChange={(e) => setTargetDays(parseInt(e.target.value))}
                    className="radio-input"
                  />
                  <span className="option-text">1 week (7 days)</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="targetDays"
                    value={30}
                    checked={targetDays === 30}
                    onChange={(e) => setTargetDays(parseInt(e.target.value))}
                    className="radio-input"
                  />
                  <span className="option-text">1 month (30 days)</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="targetDays"
                    value={90}
                    checked={targetDays === 90}
                    onChange={(e) => setTargetDays(parseInt(e.target.value))}
                    className="radio-input"
                  />
                  <span className="option-text">3 months (90 days)</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="targetDays"
                    value={180}
                    checked={targetDays === 180}
                    onChange={(e) => setTargetDays(parseInt(e.target.value))}
                    className="radio-input"
                  />
                  <span className="option-text">6 months (180 days)</span>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  color: "#d32f2f",
                  backgroundColor: "#ffebee",
                  padding: "10px",
                  borderRadius: "5px",
                  margin: "20px 0",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            <button
              className="create-plan-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting
                ? isEditing
                  ? "Updating Plan..."
                  : "Creating Plan..."
                : isEditing
                ? "Update My Quit Plan"
                : "Create My Quit Plan"}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-section-title">NicOff</h4>
            <p className="footer-text">
              We're dedicated to helping you break free from smoking addiction
              through science-backed methods and community support
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-list">
              <li>
                <NavLink to="/about" className="footer-link">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/programs" className="footer-link">
                  Our Programs
                </NavLink>
              </li>
              <li>
                <NavLink to="/success-stories" className="footer-link">
                  Success Stories
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className="footer-link">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="footer-link">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-section-title">Support</h4>
            <ul className="footer-list">
              <li>
                <NavLink to="/faq" className="footer-link">
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/help-center" className="footer-link">
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy-policy" className="footer-link">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms-of-service" className="footer-link">
                  Term Of Service
                </NavLink>
              </li>
              <li>
                <NavLink to="/cookie-policy" className="footer-link">
                  Cookie Policy
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-section-title">Newsletter</h4>
            <input
              type="email"
              placeholder="Your Email Address..."
              className="newsletter-input"
            />
            <button className="subscribe-button">Subscribe</button>
            <p className="newsletter-text">
              Get the latest tips and motivation to stay smoke-free delivered to
              your inbox
            </p>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 NicOff. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default StandardQuestionnaire;
