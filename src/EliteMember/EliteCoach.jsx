import React, { useState, useEffect } from "react";
import EditProfileModal from "../editprofilemodal";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import ApiService from "../apiService";
import journeyPath from "../assets/journey_path.jpg";

function EliteCoach({ progress = {}, onMessageCoach = () => {} }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Coach ratings state
  const [coachRatings, setCoachRatings] = useState([]);
  const [ratingsLoading, setRatingsLoading] = useState(false);
  const [ratingsError, setRatingsError] = useState(null);

  // Available schedules state
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [schedulesError, setSchedulesError] = useState(null);
  const [fromDate, setFromDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(() => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return nextWeek.toISOString().split("T")[0];
  });

  // Lấy lịch sử đặt lịch từ localStorage
  const [bookingHistory, setBookingHistory] = useState(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("elite_booking_history");
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {}
      }
    }
    return null;
  });

  // Fetch coaches data from API
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setLoading(true);
        const coachesData = await ApiService.getCoaches();

        if (Array.isArray(coachesData) && coachesData.length > 0) {
          setCoaches(coachesData);
          // Select first active coach or first coach if no active coach
          const activeCoach = coachesData.find(
            (coach) => coach.active && coach.coachActive
          );
          setSelectedCoach(activeCoach || coachesData[0]);
        } else {
          setError("No coaches available");
        }
      } catch (err) {
        console.error("Error fetching coaches:", err);
        setError("Failed to load coaches");
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  // Fetch available schedules for selected coach
  const fetchAvailableSchedules = async (coachId) => {
    if (!coachId) return;

    try {
      setSchedulesLoading(true);
      setSchedulesError(null);

      const response = await ApiService.getAvailableSchedules(
        fromDate,
        toDate,
        coachId
      );

      // Parse the new API response format
      let parsedSchedules = [];
      if (response && response.days && Array.isArray(response.days)) {
        parsedSchedules = response.days.flatMap((day) => {
          if (!day.appointments || !Array.isArray(day.appointments)) {
            return [];
          }

          return day.appointments.map((appointment) => ({
            id: appointment.id,
            date: convertDateArrayToDate(day.date),
            timeSlot: appointment.time,
            time: appointment.time,
            coachId: appointment.coachId,
            coachName: appointment.coachName,
            specialization: appointment.specialization,
            status: appointment.canBook ? "AVAILABLE" : "UNAVAILABLE",
            canBook: appointment.canBook,
            originalStatus: appointment.status,
            week: response.week,
          }));
        });
      }

      setAvailableSchedules(parsedSchedules);
    } catch (error) {
      console.error("Error fetching available schedules:", error);
      setSchedulesError("Failed to load available schedules");
    } finally {
      setSchedulesLoading(false);
    }
  };

  // Helper function to convert date array [2025, 7, 9] to Date object
  const convertDateArrayToDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 3) {
      return new Date();
    }
    const [year, month, day] = dateArray;
    // Month in Date constructor is 0-based, but API seems to provide 1-based
    return new Date(year, month - 1, day);
  };

  // Fetch coach ratings
  const fetchCoachRatings = async (coachId) => {
    if (!coachId) return;

    try {
      setRatingsLoading(true);
      setRatingsError(null);

      const ratings = await ApiService.getCoachRatings(coachId);
      setCoachRatings(ratings || []);
    } catch (error) {
      console.error("Error fetching coach ratings:", error);
      setRatingsError("Failed to load coach ratings");
      setCoachRatings([]);
    } finally {
      setRatingsLoading(false);
    }
  };

  // Fetch schedules when coach or date range changes
  useEffect(() => {
    if (selectedCoach && selectedCoach.id) {
      fetchAvailableSchedules(selectedCoach.id);
      fetchCoachRatings(selectedCoach.id);
    }
  }, [selectedCoach, fromDate, toDate]);

  // Helper function to format date to dd/mm/yyyy
  const formatDate = (dateInput) => {
    if (!dateInput) return "";

    let date;
    if (Array.isArray(dateInput)) {
      // Handle array format [2025, 7, 3]
      const [year, month, day] = dateInput;
      date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    } else {
      // Handle string format
      date = new Date(dateInput);
    }

    if (isNaN(date.getTime())) return new Date().toLocaleDateString();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Helper function to get experience years
  const getExperienceYears = (experience) => {
    if (!experience) return "New";
    // Try to extract number from experience string
    const match = experience.match(/(\d+)/);
    return match ? `${match[1]} years` : experience;
  };

  // Helper function to convert time slot to readable format
  const getTimeSlot = (timeSlot) => {
    // Starting from 9:00 AM, each slot is 45 minutes
    const baseMinutes = 9 * 60; // 9:00 AM in minutes
    const slotDurationMinutes = 45;

    const startMinutes = baseMinutes + (timeSlot - 1) * slotDurationMinutes;
    const endMinutes = startMinutes + slotDurationMinutes;

    const formatTime = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const period = hours >= 12 ? "PM" : "AM";
      const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    return `${formatTime(startMinutes)} - ${formatTime(endMinutes)}`;
  };

  // Helper function to check if a schedule is in the past
  const isScheduleInPast = (scheduleDate, timeSlot) => {
    const now = new Date();
    const slotDateTime = new Date(scheduleDate);

    // Convert time slot number to exact time (starting from 9:00 AM, 45 min slots)
    const baseMinutes = 9 * 60; // 9:00 AM in minutes
    const slotDurationMinutes = 45;
    const startMinutes = baseMinutes + (timeSlot - 1) * slotDurationMinutes;

    const hours = Math.floor(startMinutes / 60);
    const minutes = startMinutes % 60;
    slotDateTime.setHours(hours, minutes, 0, 0);

    return slotDateTime < now;
  };

  // Helper function to calculate average rating
  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

  // Helper function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} style={{ color: "#FFD700" }}>
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" style={{ color: "#FFD700" }}>
          ☆
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: "#E0E0E0" }}>
          ★
        </span>
      );
    }

    return stars;
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    setActivities([...activities, { ...form, completed: false }]);
    setForm({ title: "", description: "" });
  };

  const handleMarkActivity = (idx) => {
    setActivities((acts) =>
      acts.map((a, i) => (i === idx ? { ...a, completed: true } : a))
    );
  };

  const handleClearBooking = () => {
    localStorage.removeItem("elite_booking_history");
    setBookingHistory(null);
  };

  const handleNotificationClick = () => {
    navigate("/elite/notification");
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
    .main-content-elite {
        flex-grow: 1;
        padding: 20px;
    }
    .elite-footer {
        background-color: #333; 
        color: #fff;
        padding: 30px 20px;
        text-align: center;
        font-size: 14px;
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
      color: #4CAF50; /* Keep green color */
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
  `;
  return (
    <div className="elite-home-container">
      <style>{styles}</style>
      <EditProfileModal
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={() => setShowEditProfile(false)}
      />
      <header className="welcome-header">
        <div className="header-left">
          <button className="profile-btn">Elite Member</button>
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
          <span className="notification-icon" onClick={handleNotificationClick}>
            🔔
          </span>
          <button className="logout-button" onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
      </header>
      <nav className="elite-nav">
        <ul>
          <li>
            <a href="/elite/home">Home</a>
          </li>
          <li>
            <a href="/elite/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/elite/achievement">Achievement</a>
          </li>
          <li>
            <a href="/elite/coach" className="active">
              Coach
            </a>
          </li>
          <li>
            <a href="/elite/community">Community</a>
          </li>
          <li>
            <a href="/elite/feedback">Feedback</a>
          </li>
        </ul>
      </nav>
      <main
        className="main-content-elite"
        style={{
          background: `linear-gradient(rgba(223,245,222,0.85), rgba(223,245,222,0.85)), url(${journeyPath}) center/cover no-repeat`,
          minHeight: "calc(100vh - 220px)",
          padding: "40px 0 0 0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              color: "#388E3C",
              fontWeight: 700,
              marginBottom: 28,
              fontSize: 32,
            }}
          >
            Your Personal Coach
          </h2>

          {loading && (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              <div>Loading coaches...</div>
            </div>
          )}

          {error && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#d32f2f",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 2px 12px rgba(56,70,60,0.10)",
                marginBottom: 40,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                ⚠️ Error
              </div>
              <div>{error}</div>
            </div>
          )}

          {!loading && !error && coaches.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 40,
              }}
            >
              {/* Coach Selection */}
              {coaches.length > 1 && (
                <div
                  style={{
                    width: "100%",
                    maxWidth: 800,
                    marginBottom: 30,
                    textAlign: "center",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: 12,
                      fontWeight: 700,
                      color: "#2E7D32",
                      fontSize: 20,
                    }}
                  >
                    Choose your coach:
                  </label>
                  <select
                    value={selectedCoach?.id || ""}
                    onChange={(e) => {
                      const coachId = parseInt(e.target.value);
                      const coach = coaches.find((c) => c.id === coachId);
                      setSelectedCoach(coach);
                    }}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "3px solid #61bb46",
                      backgroundColor: "#fff",
                      fontSize: 18,
                      minWidth: 300,
                      fontWeight: 600,
                      color: "#2E7D32",
                      boxShadow: "0 2px 8px rgba(97, 187, 70, 0.2)",
                    }}
                  >
                    {coaches.map((coach) => (
                      <option key={coach.id} value={coach.id}>
                        {coach.name} - {coach.specialization}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Coach Card */}
              {selectedCoach && (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    boxShadow: "0 8px 32px rgba(56,70,60,0.15)",
                    border: "3px solid #61bb46",
                    minWidth: 300,
                    maxWidth: 700,
                    width: "calc(100% - 60px)",
                    padding: 30,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    margin: "0 auto",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                      marginBottom: 20,
                      width: "100%",
                    }}
                  >
                    <img
                      src={
                        selectedCoach?.avatar
                          ? `http://localhost:8080${selectedCoach.avatar}`
                          : `https://randomuser.me/api/portraits/${
                              selectedCoach?.id % 2 === 0 ? "women" : "men"
                            }/${(selectedCoach?.id * 7) % 99}.jpg`
                      }
                      alt="Coach Avatar"
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        border: "4px solid #61bb46",
                        background: "#fff",
                        objectFit: "cover",
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 28,
                          color: "#2E7D32",
                          marginBottom: 4,
                        }}
                      >
                        {selectedCoach.name || "Coach"}
                      </div>
                      <div
                        style={{
                          color: "#61bb46",
                          fontSize: 18,
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {selectedCoach.title ||
                          selectedCoach.specialization ||
                          "Smoking Cessation Specialist"}
                      </div>
                      <div
                        style={{ color: "#555", fontSize: 16, marginBottom: 2 }}
                      >
                        {getExperienceYears(selectedCoach.experience)}{" "}
                        experience
                      </div>
                      {selectedCoach.hourlyRate && (
                        <div
                          style={{
                            color: "#61bb46",
                            fontSize: 16,
                            marginTop: 4,
                            fontWeight: 600,
                          }}
                        >
                          ${selectedCoach.hourlyRate}/hour
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedCoach.bio && (
                    <div
                      style={{
                        marginBottom: 20,
                        fontSize: 16,
                        color: "#555",
                        lineHeight: 1.5,
                        padding: 16,
                        backgroundColor: "#f8f9fa",
                        borderRadius: 12,
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      <strong style={{ color: "#2E7D32", fontSize: 18 }}>
                        About:
                      </strong>
                      <br />
                      {selectedCoach.bio}
                    </div>
                  )}

                  {selectedCoach.certifications && (
                    <div
                      style={{
                        marginBottom: 20,
                        fontSize: 16,
                        color: "#555",
                        padding: 16,
                        backgroundColor: "#e8f5e9",
                        borderRadius: 12,
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      <strong style={{ color: "#2E7D32", fontSize: 18 }}>
                        Certifications:
                      </strong>
                      <br />
                      {selectedCoach.certifications}
                    </div>
                  )}

                  {/* Coach Ratings Section */}
                  <div
                    style={{
                      marginBottom: 20,
                      fontSize: 16,
                      color: "#555",
                      padding: 16,
                      backgroundColor: "#fff3e0",
                      borderRadius: 12,
                      width: "100%",
                      boxSizing: "border-box",
                      border: "2px solid #FFB74D",
                    }}
                  >
                    <strong style={{ color: "#2E7D32", fontSize: 18 }}>
                      Client Feedback:
                    </strong>

                    {ratingsLoading && (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          color: "#666",
                        }}
                      >
                        Loading ratings...
                      </div>
                    )}

                    {ratingsError && (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          color: "#d32f2f",
                        }}
                      >
                        {ratingsError}
                      </div>
                    )}

                    {!ratingsLoading && !ratingsError && (
                      <>
                        {coachRatings.length > 0 ? (
                          <>
                            {/* Average Rating Display */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginTop: "12px",
                                marginBottom: "16px",
                              }}
                            >
                              <div style={{ fontSize: "20px" }}>
                                {renderStars(
                                  parseFloat(getAverageRating(coachRatings))
                                )}
                              </div>
                              <span
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  color: "#2E7D32",
                                }}
                              >
                                {getAverageRating(coachRatings)} (
                                {coachRatings.length} reviews)
                              </span>
                            </div>

                            {/* Individual Reviews */}
                            <div
                              style={{
                                maxHeight: "300px",
                                overflowY: "auto",
                                border: "1px solid #E0E0E0",
                                borderRadius: "8px",
                                padding: "12px",
                              }}
                            >
                              {coachRatings.map((rating) => (
                                <div
                                  key={rating.id}
                                  style={{
                                    padding: "12px",
                                    marginBottom: "12px",
                                    backgroundColor: "#f9f9f9",
                                    borderRadius: "8px",
                                    border: "1px solid #E0E0E0",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      marginBottom: "8px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "#2E7D32",
                                      }}
                                    >
                                      {rating.memberName}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        color: "#666",
                                      }}
                                    >
                                      {formatDate(rating.createdAt)}
                                    </div>
                                  </div>

                                  <div style={{ marginBottom: "8px" }}>
                                    {renderStars(rating.rating)}
                                    <span
                                      style={{
                                        marginLeft: "8px",
                                        fontSize: "14px",
                                        color: "#666",
                                      }}
                                    >
                                      ({rating.rating}/5)
                                    </span>
                                  </div>

                                  {rating.feedback && (
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        color: "#555",
                                        fontStyle: "italic",
                                        lineHeight: "1.4",
                                      }}
                                    >
                                      "{rating.feedback}"
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div
                            style={{
                              textAlign: "center",
                              padding: "20px",
                              color: "#666",
                              fontStyle: "italic",
                            }}
                          >
                            No reviews yet. Be the first to leave feedback for
                            this coach!
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Available Schedules Section */}
                  <div
                    style={{
                      fontWeight: 700,
                      margin: "20px 0 12px 0",
                      fontSize: 20,
                      color: "#2E7D32",
                    }}
                  >
                    Available Schedules
                  </div>

                  {/* Date Range Controls */}
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginBottom: "16px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          fontSize: "14px",
                          color: "#555",
                          marginRight: "8px",
                        }}
                      >
                        From:
                      </label>
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{
                          padding: "8px 12px",
                          border: "2px solid #61bb46",
                          borderRadius: "8px",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: "14px",
                          color: "#555",
                          marginRight: "8px",
                        }}
                      >
                        To:
                      </label>
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={{
                          padding: "8px 12px",
                          border: "2px solid #61bb46",
                          borderRadius: "8px",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Available Schedules Display */}
                  <div
                    style={{
                      marginBottom: "20px",
                      border: "2px solid #61bb46",
                      borderRadius: "12px",
                      padding: "16px",
                      backgroundColor: "#f8f9fa",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    {schedulesLoading && (
                      <div
                        style={{
                          textAlign: "center",
                          color: "#666",
                          padding: "20px",
                        }}
                      >
                        Loading available schedules...
                      </div>
                    )}

                    {schedulesError && (
                      <div
                        style={{
                          textAlign: "center",
                          color: "#d32f2f",
                          padding: "20px",
                          backgroundColor: "#ffebee",
                          borderRadius: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{ fontWeight: "bold", marginBottom: "8px" }}
                        >
                          ⚠️ Error
                        </div>
                        <div>{schedulesError}</div>
                        <button
                          onClick={() =>
                            fetchAvailableSchedules(selectedCoach.id)
                          }
                          style={{
                            marginTop: "12px",
                            padding: "8px 16px",
                            backgroundColor: "#2E7D32",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Retry
                        </button>
                      </div>
                    )}

                    {!schedulesLoading && !schedulesError && (
                      <>
                        {availableSchedules && availableSchedules.length > 0 ? (
                          <div>
                            <div
                              style={{
                                fontWeight: "bold",
                                color: "#2E7D32",
                                marginBottom: "12px",
                                fontSize: "16px",
                              }}
                            >
                              📅 Available Time Slots (
                              {
                                availableSchedules.filter(
                                  (schedule) =>
                                    !isScheduleInPast(
                                      schedule.date,
                                      schedule.timeSlot
                                    )
                                ).length
                              }{" "}
                              slots)
                            </div>

                            {/* Group schedules by date */}
                            {(() => {
                              const groupedByDate = availableSchedules
                                .filter((schedule) => {
                                  // Filter out past schedules
                                  return !isScheduleInPast(
                                    schedule.date,
                                    schedule.timeSlot
                                  );
                                })
                                .reduce((groups, schedule) => {
                                  const dateKey = schedule.date
                                    ? schedule.date.toDateString()
                                    : "No Date";
                                  if (!groups[dateKey]) {
                                    groups[dateKey] = [];
                                  }
                                  groups[dateKey].push(schedule);
                                  return groups;
                                }, {});

                              return Object.entries(groupedByDate).map(
                                ([dateKey, schedules]) => (
                                  <div
                                    key={dateKey}
                                    style={{ marginBottom: "20px" }}
                                  >
                                    <div
                                      style={{
                                        fontWeight: "bold",
                                        color: "#2E7D32",
                                        marginBottom: "8px",
                                        fontSize: "14px",
                                        padding: "8px",
                                        backgroundColor: "#f0f8f0",
                                        borderRadius: "6px",
                                      }}
                                    >
                                      📅{" "}
                                      {dateKey !== "No Date"
                                        ? new Date(dateKey).toLocaleDateString(
                                            "en-US",
                                            {
                                              weekday: "long",
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            }
                                          )
                                        : "Date TBD"}
                                    </div>
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                          "repeat(auto-fill, minmax(180px, 1fr))",
                                        gap: "8px",
                                      }}
                                    >
                                      {schedules
                                        .sort(
                                          (a, b) =>
                                            (a.timeSlot || 0) -
                                            (b.timeSlot || 0)
                                        )
                                        .map((schedule, index) => (
                                          <div
                                            key={schedule.id || index}
                                            style={{
                                              backgroundColor: schedule.canBook
                                                ? "#e8f5e9"
                                                : "#ffebee",
                                              border: `1px solid ${
                                                schedule.canBook
                                                  ? "#4caf50"
                                                  : "#f44336"
                                              }`,
                                              borderRadius: "8px",
                                              padding: "12px",
                                              textAlign: "center",
                                            }}
                                          >
                                            <div
                                              style={{
                                                fontWeight: "bold",
                                                color: schedule.canBook
                                                  ? "#2E7D32"
                                                  : "#d32f2f",
                                                marginBottom: "4px",
                                                fontSize: "14px",
                                              }}
                                            >
                                              {schedule.timeSlot
                                                ? getTimeSlot(schedule.timeSlot)
                                                : "Time TBD"}
                                            </div>
                                            <div
                                              style={{
                                                fontSize: "11px",
                                                color: "#666",
                                                marginBottom: "2px",
                                              }}
                                            >
                                              Slot #{schedule.timeSlot || "N/A"}
                                            </div>
                                            <div
                                              style={{
                                                fontSize: "10px",
                                                color: schedule.canBook
                                                  ? "#4caf50"
                                                  : "#f44336",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              {schedule.canBook
                                                ? "✅ Available"
                                                : "❌ Unavailable"}
                                            </div>
                                            {schedule.originalStatus && (
                                              <div
                                                style={{
                                                  fontSize: "9px",
                                                  color: "#999",
                                                  marginTop: "2px",
                                                }}
                                              >
                                                Status:{" "}
                                                {schedule.originalStatus}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                )
                              );
                            })()}
                          </div>
                        ) : (
                          <div
                            style={{
                              textAlign: "center",
                              color: "#666",
                              padding: "20px",
                              fontStyle: "italic",
                            }}
                          >
                            No available schedules found for the selected date
                            range.
                            <br />
                            <span
                              style={{
                                fontSize: "14px",
                                marginTop: "8px",
                                display: "block",
                              }}
                            >
                              Try selecting a different date range or check back
                              later.
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      fontWeight: 700,
                      margin: "20px 0 12px 0",
                      fontSize: 20,
                      color: "#2E7D32",
                    }}
                  >
                    Book Your Session
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #61bb46 0%, #4CAF50 100%)",
                      borderRadius: 16,
                      color: "#fff",
                      padding: "24px",
                      margin: "0 0 20px 0",
                      fontWeight: 500,
                      fontSize: 18,
                      width: "100%",
                      boxShadow: "0 4px 16px rgba(97, 187, 70, 0.3)",
                      boxSizing: "border-box",
                    }}
                  >
                    <div style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 22,
                          marginBottom: 4,
                          textAlign: "center",
                        }}
                      >
                        Available for booking
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          opacity: 0.9,
                          textAlign: "center",
                        }}
                      >
                        Select your preferred time and start your journey
                      </div>
                    </div>
                    <button
                      style={{
                        background: "#fff",
                        color: "#61bb46",
                        border: "none",
                        borderRadius: 12,
                        padding: "16px 24px",
                        fontWeight: 700,
                        fontSize: 18,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                          "0 4px 12px rgba(0,0,0,0.15)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                      }}
                      onClick={() =>
                        navigate("/elite/book-appointment", {
                          state: {
                            selectedCoach: selectedCoach,
                            coachId: selectedCoach.id,
                          },
                        })
                      }
                    >
                      📅 Book Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Booking History section below Personal Coach */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            {bookingHistory ? (
              <div
                style={{
                  background: "#fff",
                  border: "2px solid #61bb46",
                  borderRadius: 12,
                  padding: 20,
                  maxWidth: 500,
                  boxShadow: "0 2px 8px rgba(56,70,60,0.10)",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "#388E3C",
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 8,
                  }}
                >
                  Booking History
                </div>
                <div>
                  <b>Date:</b> {bookingHistory.date}
                </div>
                <div>
                  <b>Time:</b> {bookingHistory.time}
                </div>
                {bookingHistory.coach && bookingHistory.coach.name && (
                  <div>
                    <b>Coach:</b> {bookingHistory.coach.name}
                  </div>
                )}
                <button
                  onClick={handleClearBooking}
                  style={{
                    marginTop: 16,
                    background: "#eee",
                    color: "#388E3C",
                    border: "1px solid #61bb46",
                    borderRadius: 6,
                    padding: "8px 18px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Clear booking history
                </button>
              </div>
            ) : (
              <div
                style={{
                  background: "#fff",
                  border: "2px solid #ccc",
                  borderRadius: 12,
                  padding: 20,
                  maxWidth: 500,
                  boxShadow: "0 2px 8px rgba(56,70,60,0.06)",
                  color: "#888",
                  fontWeight: 500,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                No booking yet.
              </div>
            )}
          </div>
          {/* Activities */}
          <div
            style={{
              fontWeight: 700,
              color: "#388E3C",
              fontSize: 24,
              margin: "30px 0 18px 8px",
            }}
          >
            Recommended Activities
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {/* Activity 1 */}
            <div
              style={{
                background: "#fff",
                border: "2px solid #61bb46",
                borderRadius: 14,
                boxShadow: "0 2px 8px rgba(56,70,60,0.10)",
                padding: "22px 20px 18px 20px",
                minWidth: 260,
                maxWidth: 320,
                flex: "1 1 260px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8, color: "#61bb46" }}>
                🚶‍♂️
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
                15 min walk
              </div>
              <div style={{ fontSize: 15, color: "#222", marginBottom: 12 }}>
                When craving hit, take a brisk walk outside to distract
                yourself.
              </div>
              <button
                style={{
                  background: "#e8f5e9",
                  color: "#61bb46",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 18px",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  marginTop: "auto",
                }}
              >
                Mark as Complete
              </button>
            </div>
            {/* Activity 2 */}
            <div
              style={{
                background: "#fff",
                border: "2px solid #61bb46",
                borderRadius: 14,
                boxShadow: "0 2px 8px rgba(56,70,60,0.10)",
                padding: "22px 20px 18px 20px",
                minWidth: 260,
                maxWidth: 320,
                flex: "1 1 260px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8, color: "#444" }}>
                🥤
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
                Hydration Reminder
              </div>
              <div style={{ fontSize: 15, color: "#222", marginBottom: 12 }}>
                Drink a glass of water when you make up and before meals.
              </div>
              <button
                style={{
                  background: "#e8f5e9",
                  color: "#61bb46",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 18px",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  marginTop: "auto",
                }}
              >
                Mark as Complete
              </button>
            </div>
            {/* Activity 3 */}
            <div
              style={{
                background: "#fff",
                border: "2px solid #61bb46",
                borderRadius: 14,
                boxShadow: "0 2px 8px rgba(56,70,60,0.10)",
                padding: "22px 20px 18px 20px",
                minWidth: 260,
                maxWidth: 320,
                flex: "1 1 260px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8, color: "#222" }}>
                📖
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
                Journey Entry
              </div>
              <div style={{ fontSize: 15, color: "#222", marginBottom: 12 }}>
                Write about your smoke-free journey and how feel today.
              </div>
              <button
                style={{
                  background: "#e8f5e9",
                  color: "#61bb46",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 18px",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  marginTop: "auto",
                }}
              >
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="elite-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>NicOff</h3>
            <p>
              We're dedicated to helping you break free from smoking addiction
              through science-backed methods and community support
            </p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <a href="/about-us">About Us</a>
            <a href="/our-programs">Our Programs</a>
            <a href="/success-stories">Success Stories</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <a href="/faq">FAQ</a>
            <a href="/help-center">Help Center</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Term Of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>
          <div className="footer-column">
            <h3>NewsLetter</h3>
            <input
              type="email"
              placeholder="Your Email Address..."
              className="newsletter-input"
            />
            <button className="newsletter-button">Subscribe</button>
            <p style={{ fontSize: "0.8em", color: "#ccc", marginTop: "10px" }}>
              Get the latest tips and motivation to stay smoke-free delivered to
              your inbox
            </p>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 NicOff. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default EliteCoach;
