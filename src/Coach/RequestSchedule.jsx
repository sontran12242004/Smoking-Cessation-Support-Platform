import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import ApiService from "../apiService";

// Translation function for Vietnamese appointment status to English
const translateAppointmentStatus = (vietnameseStatus) => {
  const translations = {
    "Đã hủy": "Cancelled",
    "Đã hoàn thành": "Completed", 
    "Bị từ chối": "Rejected",
    "Đang chờ": "Pending",
    "Đã xác nhận": "Confirmed",
    "Đã đặt": "Booked",
    "Có sẵn": "Available"
  };
  
  return translations[vietnameseStatus] || vietnameseStatus;
};

const RequestSchedule = () => {
  const [activeMenu, setActiveMenu] = useState("Request Schedule");
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentWeekDateRange, setCurrentWeekDateRange] = useState(""); // State for the date range
  const [noteToAdmin, setNoteToAdmin] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [hasRegisteredSchedule, setHasRegisteredSchedule] = useState(false);
  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    const initializeWeekData = () => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
      const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to get Monday

      const firstDayOfWeek = new Date(today.setDate(diff));
      const lastDayOfWeek = new Date(firstDayOfWeek.getTime());
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

      const formatDisplayDate = (date) => {
        const d = date.getDate();
        const m = date.getMonth() + 1; // Months are 0-indexed
        const y = date.getFullYear();
        return `${d < 10 ? "0" + d : d}/${m < 10 ? "0" + m : m}/${y}`;
      };

      const formatApiDate = (date) => {
        return date.toISOString().split("T")[0]; // YYYY-MM-DD format for API
      };

      const weekRange = `${formatDisplayDate(
        firstDayOfWeek
      )} - ${formatDisplayDate(lastDayOfWeek)}`;
      const startDate = formatApiDate(firstDayOfWeek);
      const endDate = formatApiDate(lastDayOfWeek);

      setCurrentWeekDateRange(weekRange);
      setWeekStartDate(startDate);
      setWeekEndDate(endDate);

      return { startDate, endDate };
    };

    const { startDate, endDate } = initializeWeekData();

    // Load coach name and schedule status
    if (user && user.coachId) {
      loadCoachName();
      loadScheduleStatus(startDate, endDate, user.coachId);
    }
  }, [user]); // Add user dependency

  const loadCoachName = async () => {
    try {
      const profile = await ApiService.getCoachById(user.coachId);
      const coachName = profile.name || user.fullName || "";
      setDisplayName(coachName);
    } catch (error) {
      console.error("Error loading coach name:", error);
      setDisplayName(user.fullName || "");
    }
  };

  const loadScheduleStatus = async (startDate, endDate, coachId) => {
    try {
      setIsLoadingStatus(true);
      const response = await ApiService.getCoachScheduleStatus(
        startDate,
        endDate,
        coachId
      );
      setScheduleStatus(response);

      // Check if coach has already registered any schedule for this week
      let hasRegistered = false;
      if (response && response.days) {
        hasRegistered = response.days.some(
          (day) =>
            day.slots && day.slots.some((slot) => slot.registered === true)
        );
      }

      setHasRegisteredSchedule(hasRegistered);
      console.log("Schedule status loaded:", response);
      console.log("Has registered schedule:", hasRegistered);
    } catch (error) {
      console.error("Error loading schedule status:", error);
      // If error, allow registration (assume no existing schedule)
      setHasRegisteredSchedule(false);
      setScheduleStatus(null);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmitRequest = async () => {
    if (hasRegisteredSchedule) {
      alert("You have already registered a schedule for this week!");
      return;
    }

    if (selectedDays.length === 0) {
      alert("Please select at least one day of the week");
      return;
    }

    if (isSubmitting) {
      return; // Prevent double submission
    }

    setIsSubmitting(true);

    try {
      // Map short day names to full day names expected by backend
      const dayMapping = {
        Mon: "MONDAY",
        Tue: "TUESDAY",
        Wed: "WEDNESDAY",
        Thu: "THURSDAY",
        Fri: "FRIDAY",
        Sat: "SATURDAY",
        Sun: "SUNDAY",
      };

      const mappedDays = selectedDays.map((day) => dayMapping[day]);

      const scheduleData = {
        date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
        daysOfWeek: mappedDays,
      };

      console.log("Submitting schedule request:", scheduleData);
      const response = await ApiService.registerWeekSchedule(scheduleData);

      alert("Schedule request submitted successfully!");
      console.log("Response:", response);

      // Clear the form
      setSelectedDays([]);
      setNoteToAdmin("");

      // Optionally navigate to coach dashboard
      navigate("/coach/dashboard");
    } catch (error) {
      console.error("Error submitting schedule request:", error);

      // Check if it's a network error or server error
      if (error.response) {
        // Server responded with error status
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Server error occurred";
        alert(`Failed to submit schedule request: ${errorMessage}`);
      } else if (error.request) {
        // Network error
        alert("Network error. Please check your connection and try again.");
      } else {
        // Other error
        alert("Failed to submit schedule request. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await ApiService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout API fails, clear local data and redirect
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>COACH REQUEST SCHEDULE</h2>
          <div style={styles.logoSection}>
            <h3 style={styles.logoTitle}>NicOff</h3>
            <p style={styles.logoSubtitle}>Turn Off Nicotine, Turn On Life!</p>
          </div>
        </div>

        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <p style={styles.userName}>{displayName || "Loading..."}</p>
            <p style={styles.userRole}>Certified Coach</p>
          </div>
        </div>

        {/* Menu Sections */}
        <div style={styles.menuContainer}>
          {/* MAIN Section */}
          <div style={styles.menuSection}>
            <h4 style={styles.sectionTitle}>MAIN</h4>
            <ul style={styles.menuList}>
              <Link to="/coach/dashboard" style={styles.menuLink}>
                <li
                  style={
                    activeMenu === "Booked Appointments"
                      ? styles.activeMenuItem
                      : styles.menuItem
                  }
                  onClick={() => setActiveMenu("Booked Appointments")}
                >
                  Booked Appointments
                </li>
              </Link>
            </ul>
          </div>

          {/* MANAGEMENT Section */}
          <div style={styles.menuSection}>
            <h4 style={styles.sectionTitle}>MANAGEMENT</h4>
            <ul style={styles.menuList}>
              <Link to="/coach/profile" style={styles.menuLink}>
                <li
                  style={
                    activeMenu === "My Profile"
                      ? styles.activeMenuItem
                      : styles.menuItem
                  }
                  onClick={() => setActiveMenu("My Profile")}
                >
                  My Profile
                </li>
              </Link>
              <Link to="/coach/request-schedule" style={styles.menuLink}>
                <li
                  style={
                    activeMenu === "Request Schedule"
                      ? styles.activeMenuItem
                      : styles.menuItem
                  }
                  onClick={() => setActiveMenu("Request Schedule")}
                >
                  Request Schedule
                </li>
              </Link>
            </ul>
          </div>
        </div>

        {/* Logout Section */}
        <div style={styles.logoutSection}>
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
          >
            <span style={styles.logoutIcon}>🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>📅 Request Schedule</h1>
          <p style={styles.pageSubtitle}>
            Request your availability schedule for coaching sessions
          </p>
        </div>

        <div style={styles.requestScheduleCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              {hasRegisteredSchedule
                ? "✅ Schedule Already Registered"
                : "📝 Request New Schedule"}
            </h2>
            <p style={styles.cardDescription}>
              {hasRegisteredSchedule
                ? "You have an active schedule for this week"
                : "Set your availability for the upcoming week"}
            </p>
          </div>

          {isLoadingStatus && (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingText}>Loading schedule status...</p>
            </div>
          )}

          {hasRegisteredSchedule && scheduleStatus && (
            <div style={styles.statusContainer}>
              <div style={styles.statusHeader}>
                <h3 style={styles.statusTitle}>📋 Current Schedule Status</h3>
                <span style={styles.statusBadge}>Registered</span>
              </div>
              <p style={styles.statusText}>
                You have already registered a schedule for the week{" "}
                {scheduleStatus.week}. You cannot register another schedule for
                this week.
              </p>

              {scheduleStatus.days && scheduleStatus.days.length > 0 && (
                <div style={styles.registeredDaysContainer}>
                  <h4 style={styles.registeredDaysTitle}>
                    📅 Registered Days:
                  </h4>
                  <div style={styles.registeredDaysList}>
                    {scheduleStatus.days
                      .filter(
                        (day) =>
                          day.slots && day.slots.some((slot) => slot.registered)
                      )
                      .map((day) => (
                        <div key={day.date} style={styles.registeredDayItem}>
                          <div style={styles.dayHeader}>
                            <span style={styles.dayName}>{day.dayOfWeek}</span>
                            <span style={styles.dayDate}>{day.date}</span>
                          </div>
                          <div style={styles.slotsInfo}>
                            {day.slots
                              .filter((slot) => slot.registered)
                              .map((slot) => (
                                <span key={slot.slotId} style={styles.slotInfo}>
                                  ⏰ {slot.timeRange} ({translateAppointmentStatus(slot.statusText)})
                                </span>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!hasRegisteredSchedule && !isLoadingStatus && (
            <div style={styles.formContainer}>
              <div style={styles.formSection}>
                <label style={styles.label}>📅 Week Range</label>
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    style={styles.input}
                    value={currentWeekDateRange}
                    readOnly
                  />
                  <span style={styles.inputIcon}>🔒</span>
                </div>
                <p style={styles.dateHelpText}>
                  💡 You are requesting schedule for the current week
                </p>
              </div>

              <div style={styles.formSection}>
                <label style={styles.label}>
                  ⏰ Select Your Available Days
                </label>
                <div style={styles.dayButtonsContainer}>
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      style={
                        selectedDays.includes(day)
                          ? styles.selectedDayButton
                          : styles.dayButton
                      }
                      onClick={() => handleDayToggle(day)}
                      disabled={hasRegisteredSchedule}
                    >
                      <span style={styles.dayButtonText}>{day}</span>
                      {selectedDays.includes(day) && (
                        <span style={styles.checkIcon}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
                {selectedDays.length > 0 && (
                  <div style={styles.selectedDaysInfo}>
                    <div style={styles.selectionCard}>
                      <div style={styles.selectionIcon}>✅</div>
                      <div style={styles.selectionContent}>
                        <p style={styles.selectedDaysText}>
                          <strong>Selected days:</strong>{" "}
                          {selectedDays.join(", ")}
                        </p>
                        <p style={styles.workingHoursText}>
                          <strong>Working hours:</strong> 9:00 AM - 4:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.formSection}>
                <label style={styles.label}>💬 Note to Admin</label>
                <textarea
                  style={styles.textarea}
                  value={noteToAdmin}
                  onChange={(e) => setNoteToAdmin(e.target.value)}
                  disabled={hasRegisteredSchedule}
                  placeholder="Add any special notes or requirements for the admin..."
                />
              </div>

              <div style={styles.buttonGroup}>
                <Link to="/coach/profile" style={styles.cancelButtonLink}>
                  <button style={styles.cancelButton}>
                    <span style={styles.buttonIcon}>←</span>
                    Cancel
                  </button>
                </Link>
                <button
                  style={{
                    ...styles.submitButton,
                    opacity: isSubmitting || hasRegisteredSchedule ? 0.6 : 1,
                    cursor:
                      isSubmitting || hasRegisteredSchedule
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={handleSubmitRequest}
                  disabled={isSubmitting || hasRegisteredSchedule}
                >
                  <span style={styles.buttonIcon}>
                    {isSubmitting ? "⏳" : "📤"}
                  </span>
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#DFF5DE",
  },
  sidebar: {
    width: "280px",
    backgroundColor: "#DFF5DE",
    padding: "25px",
    borderRight: "15px solid #fff",
  },
  sidebarHeader: {
    marginBottom: "30px",
  },
  sidebarTitle: {
    fontSize: "24px",
    color: "#6a6a6a",
    margin: "0 0 5px 0",
    fontWeight: "bold",
  },
  logoSection: {
    marginTop: "30px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoTitle: {
    fontSize: "24px",
    color: "#2E7D32",
    margin: "0",
    fontWeight: "bold",
  },
  logoSubtitle: {
    fontSize: "14px",
    color: "#666",
    margin: "0",
    fontStyle: "italic",
  },
  userSection: {
    marginTop: "30px",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    fontSize: "16px",
    color: "#333",
    margin: "0",
    fontWeight: "bold",
  },
  userRole: {
    fontSize: "14px",
    color: "#666",
    margin: "0",
  },
  logoutSection: {
    marginTop: "auto",
    paddingTop: "20px",
    borderTop: "1px solid rgba(0,0,0,0.1)",
  },
  logoutButton: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logoutIcon: {
    fontSize: "16px",
  },
  menuContainer: {
    marginTop: "20px",
  },
  menuSection: {
    marginBottom: "25px",
  },
  sectionTitle: {
    fontSize: "12px",
    color: "#666",
    textTransform: "uppercase",
    margin: "0 0 10px 0",
    letterSpacing: "1px",
    fontWeight: "bold",
  },
  menuList: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  menuItem: {
    padding: "12px 15px",
    color: "#555",
    cursor: "pointer",
    borderRadius: "8px",
    marginBottom: "5px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "500",
  },
  activeMenuItem: {
    padding: "12px 15px",
    color: "#2E7D32",
    backgroundColor: "#A4E087",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "8px",
    marginBottom: "5px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  menuLink: {
    textDecoration: "none",
    color: "inherit",
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#DFF5DE",
  },
  pageHeader: {
    textAlign: "center",
    marginBottom: "30px",
  },
  pageTitle: {
    fontSize: "32px",
    color: "#2E7D32",
    margin: "0 0 10px 0",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  pageSubtitle: {
    fontSize: "16px",
    color: "#666",
    margin: "0",
    fontStyle: "italic",
  },
  requestScheduleCard: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    padding: "35px",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    border: "2px solid #A5D6A7",
  },
  cardHeader: {
    marginBottom: "25px",
    paddingBottom: "20px",
    borderBottom: "2px solid #E8F5E8",
  },
  cardTitle: {
    fontSize: "24px",
    color: "#2E7D32",
    marginBottom: "8px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  cardDescription: {
    fontSize: "16px",
    color: "#666",
    margin: "0",
    lineHeight: "1.5",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  formSection: {
    marginBottom: "25px",
  },
  label: {
    fontSize: "18px",
    color: "#2E7D32",
    marginBottom: "10px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "15px 50px 15px 15px",
    border: "2px solid #A5D6A7",
    borderRadius: "10px",
    fontSize: "16px",
    backgroundColor: "#F8F9FA",
    color: "#666",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  inputIcon: {
    position: "absolute",
    right: "15px",
    fontSize: "18px",
    color: "#A5D6A7",
  },
  dayButtonsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
    gap: "12px",
    marginBottom: "20px",
  },
  dayButton: {
    backgroundColor: "#f8f9fa",
    color: "#666",
    border: "2px solid #ddd",
    padding: "15px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    minHeight: "70px",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  selectedDayButton: {
    backgroundColor: "#A5D6A7",
    color: "#2E7D32",
    border: "2px solid #2E7D32",
    padding: "15px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    minHeight: "70px",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(46, 125, 50, 0.2)",
    transform: "translateY(-2px)",
  },
  dayButtonText: {
    fontSize: "14px",
    fontWeight: "inherit",
  },
  checkIcon: {
    fontSize: "18px",
    color: "#2E7D32",
  },
  selectedDaysInfo: {
    marginTop: "15px",
  },
  selectionCard: {
    padding: "20px",
    backgroundColor: "#E8F5E8",
    borderRadius: "10px",
    border: "2px solid #A5D6A7",
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
  },
  selectionIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  selectionContent: {
    flex: 1,
  },
  selectedDaysText: {
    margin: "0 0 8px 0",
    fontSize: "15px",
    color: "#2E7D32",
    lineHeight: "1.4",
  },
  workingHoursText: {
    margin: "0",
    fontSize: "15px",
    color: "#2E7D32",
    lineHeight: "1.4",
  },
  textarea: {
    width: "100%",
    padding: "15px",
    border: "2px solid #A5D6A7",
    borderRadius: "10px",
    fontSize: "16px",
    minHeight: "120px",
    resize: "vertical",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
    lineHeight: "1.5",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
  cancelButtonLink: {
    textDecoration: "none",
  },
  cancelButton: {
    backgroundColor: "transparent",
    color: "#666",
    border: "2px solid #CCC",
    padding: "12px 25px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minWidth: "130px",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: "#A5D6A7",
    color: "#2E7D32",
    border: "2px solid #2E7D32",
    padding: "12px 25px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minWidth: "170px",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(46, 125, 50, 0.2)",
  },
  buttonIcon: {
    fontSize: "16px",
  },
  dateHelpText: {
    margin: "8px 0 0 0",
    fontSize: "14px",
    color: "#666",
    fontStyle: "italic",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  loadingSpinner: {
    width: "30px",
    height: "30px",
    border: "3px solid #E8F5E8",
    borderTop: "3px solid #2E7D32",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    fontSize: "16px",
    color: "#666",
    margin: "0",
    fontWeight: "500",
  },
  statusContainer: {
    backgroundColor: "#fff3cd",
    border: "2px solid #ffeaa7",
    borderRadius: "10px",
    padding: "25px",
    marginBottom: "25px",
  },
  statusHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  statusTitle: {
    fontSize: "20px",
    color: "#856404",
    margin: "0",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statusBadge: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "6px 15px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  statusText: {
    fontSize: "14px",
    color: "#856404",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  registeredDaysContainer: {
    marginTop: "20px",
  },
  registeredDaysTitle: {
    fontSize: "18px",
    color: "#856404",
    margin: "0 0 15px 0",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  registeredDaysList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
  },
  registeredDayItem: {
    backgroundColor: "#f8f9fa",
    border: "2px solid #dee2e6",
    borderRadius: "10px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  dayHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "8px",
    borderBottom: "1px solid #dee2e6",
  },
  dayName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#2E7D32",
  },
  dayDate: {
    fontSize: "14px",
    color: "#666",
  },
  slotsInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  slotInfo: {
    fontSize: "14px",
    color: "#495057",
    backgroundColor: "#e9ecef",
    padding: "8px 12px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
};

// Add CSS animation for loading spinner
const spinAnimation = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject the animation styles
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = spinAnimation;
  document.head.appendChild(style);
}

export default RequestSchedule;
