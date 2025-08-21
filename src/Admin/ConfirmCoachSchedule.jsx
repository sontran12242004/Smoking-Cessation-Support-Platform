import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from "../apiService";

const ConfirmCoachSchedule = () => {
  const [activeMenu, setActiveMenu] = useState("Coaches");
  const [showContentsDropdown, setShowContentsDropdown] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    // Initialize to the start of the current week (Monday)
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    return startOfWeek;
  });
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [pendingSchedules, setPendingSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load pending schedules from API
  const loadPendingSchedules = async (startDate, endDate, coachId = null) => {
    try {
      setIsLoading(true);
      setError(null);

      const formatDate = (date) => date.toISOString().split("T")[0];
      const fromDate = formatDate(startDate);
      const toDate = formatDate(endDate);

      console.log("Loading pending schedules:", { fromDate, toDate, coachId });
      const response = await ApiService.getPendingApprovalSchedules(
        fromDate,
        toDate,
        coachId
      );

      console.log("Pending schedules response:", response);
      setPendingSchedules(response || []);
    } catch (error) {
      console.error("Error loading pending schedules:", error);
      setError("Failed to load pending schedules");
      setPendingSchedules([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load schedules when component mounts or date changes
  useEffect(() => {
    const getWeekDates = (date) => {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
      return { startOfWeek, endOfWeek };
    };

    const { startOfWeek, endOfWeek } = getWeekDates(currentDate);
    loadPendingSchedules(startOfWeek, endOfWeek);
  }, [currentDate]);

  // Get unique coaches from API response
  const getUniqueCoaches = () => {
    const coaches = new Set();
    if (
      pendingSchedules &&
      pendingSchedules.days &&
      Array.isArray(pendingSchedules.days)
    ) {
      pendingSchedules.days.forEach((day) => {
        if (day.appointments && Array.isArray(day.appointments)) {
          day.appointments.forEach((appointment) => {
            if (appointment.coachName) {
              coaches.add(appointment.coachName);
            }
          });
        }
      });
    }
    return Array.from(coaches).sort();
  };

  // Convert time slot number to time range string
  const getTimeRange = (timeSlot) => {
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

  // Check if an appointment is in the past
  const isAppointmentInPast = (appointmentDate, timeSlot) => {
    const now = new Date();
    const appointmentDateTime = new Date(appointmentDate);

    // Convert time slot number to exact time (starting from 9:00 AM, 45 min slots)
    const baseMinutes = 9 * 60; // 9:00 AM in minutes
    const slotDurationMinutes = 45;
    const startMinutes = baseMinutes + (timeSlot - 1) * slotDurationMinutes;
    
    const hours = Math.floor(startMinutes / 60);
    const minutes = startMinutes % 60;
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    return appointmentDateTime < now;
  };

  // Group schedules by day of week
  const getSchedulesByDay = () => {
    const schedulesByDay = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    };

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    console.log("Processing pending schedules:", pendingSchedules);

    if (
      pendingSchedules &&
      pendingSchedules.days &&
      Array.isArray(pendingSchedules.days)
    ) {
      pendingSchedules.days.forEach((day) => {
        // Convert date array [2025, 7, 9] to Date object
        const [year, month, dayOfMonth] = day.date;
        const dateObj = new Date(year, month - 1, dayOfMonth); // month is 0-indexed in JS
        const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const dayName = dayNames[dayOfWeek];

        console.log(
          `Processing day: ${dateObj.toDateString()}, Day name: ${dayName}`
        );

        if (day.appointments && Array.isArray(day.appointments)) {
          day.appointments.forEach((appointment) => {
            if (schedulesByDay[dayName]) {
              schedulesByDay[dayName].push({
                id: appointment.id,
                coach: appointment.coachName,
                coachId: appointment.coachId,
                status: appointment.status,
                timeSlot: appointment.time,
                timeRange: getTimeRange(appointment.time),
                appointmentId: appointment.id,
                canApprove: appointment.canApprove,
                canReject: appointment.canReject,
              });
            }
          });
        }
      });
    }

    console.log("Final schedules by day:", schedulesByDay);
    return schedulesByDay;
  };

  const getWeekRange = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

    const options = { month: "short", day: "numeric", year: "numeric" };
    return `${startOfWeek.toLocaleDateString(
      "en-US",
      options
    )} - ${endOfWeek.toLocaleDateString("en-US", options)}`;
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleReject = async (appointmentId) => {
    console.log("Rejecting appointment ID:", appointmentId);
    console.log(
      "API URL will be: POST /api/appointment/" + appointmentId + "/reject"
    );

    try {
      const response = await ApiService.rejectAppointment(appointmentId);
      console.log("Reject response:", response);
      alert("Appointment rejected successfully!");

      // Reload schedules to refresh the view
      const getWeekDates = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay() + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return { startOfWeek, endOfWeek };
      };

      const { startOfWeek, endOfWeek } = getWeekDates(currentDate);
      loadPendingSchedules(startOfWeek, endOfWeek);
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      console.error("Error details:", error.response?.data || error.message);

      if (error.response) {
        alert(
          `Failed to reject appointment: ${error.response.status} - ${
            error.response.data?.message || error.response.statusText
          }`
        );
      } else {
        alert(
          "Failed to reject appointment. Please check your connection and try again."
        );
      }
    }
  };

  // Handle approve all pending appointments
  const handleApproveAll = async () => {
    try {
      // Get all pending appointment IDs
      const pendingIds = [];
      
      console.log("Debug: pendingSchedules structure:", pendingSchedules);
      
      if (pendingSchedules && pendingSchedules.days && Array.isArray(pendingSchedules.days)) {
        pendingSchedules.days.forEach((day) => {
          if (day.appointments && Array.isArray(day.appointments)) {
            day.appointments.forEach((appointment) => {
              console.log("Debug: appointment data:", appointment);
              console.log("Debug: appointment status:", appointment.status);
              console.log("Debug: day.date:", day.date);
              console.log("Debug: appointment.time:", appointment.time);
              
              // Convert day.date array [year, month, day] to Date object
              const [year, month, dayOfMonth] = day.date;
              const dateObj = new Date(year, month - 1, dayOfMonth); // month is 0-indexed
              
              // Check for "WAIT" status (which means pending) and has canApprove permission
              if (appointment.status === "WAIT" && 
                  appointment.canApprove && 
                  appointment.canReject && 
                  !isAppointmentInPast(dateObj, appointment.time)) {
                console.log("Debug: Adding appointment ID:", appointment.id || appointment.appointmentId);
                pendingIds.push(appointment.id || appointment.appointmentId);
              }
            });
          }
        });
      }

      console.log("Debug: Total pending IDs found:", pendingIds);

      if (pendingIds.length === 0) {
        alert("No pending appointments to approve.");
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to approve all ${pendingIds.length} pending appointments?`
      );

      if (!confirmed) return;

      console.log("Approving all appointment IDs:", pendingIds);
      
      // Approve all appointments
      const promises = pendingIds.map(id => ApiService.confirmAppointment(id));
      const results = await Promise.allSettled(promises);
      
      // Check results
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;
      
      if (failed === 0) {
        alert(`Successfully approved all ${successful} appointments!`);
      } else {
        alert(`Approved ${successful} appointments successfully. ${failed} failed to approve.`);
      }

      // Reload schedules to refresh the view
      const getWeekDates = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay() + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return { startOfWeek, endOfWeek };
      };

      const { startOfWeek, endOfWeek } = getWeekDates(currentDate);
      loadPendingSchedules(startOfWeek, endOfWeek);
      
    } catch (error) {
      console.error("Error approving all appointments:", error);
      alert("Failed to approve all appointments. Please try again.");
    }
  };

  const handleConfirm = async (appointmentId) => {
    console.log("Confirming appointment ID:", appointmentId);
    console.log(
      "API URL will be: POST /api/appointment/" + appointmentId + "/confirm"
    );

    try {
      const response = await ApiService.confirmAppointment(appointmentId);
      console.log("Confirm response:", response);
      alert("Appointment confirmed successfully!");

      // Reload schedules to refresh the view
      const getWeekDates = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay() + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return { startOfWeek, endOfWeek };
      };

      const { startOfWeek, endOfWeek } = getWeekDates(currentDate);
      loadPendingSchedules(startOfWeek, endOfWeek);
    } catch (error) {
      console.error("Error confirming appointment:", error);
      console.error("Error details:", error.response?.data || error.message);

      if (error.response) {
        alert(
          `Failed to confirm appointment: ${error.response.status} - ${
            error.response.data?.message || error.response.statusText
          }`
        );
      } else {
        alert(
          "Failed to confirm appointment. Please check your connection and try again."
        );
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.sidebarTitle}>NicOff</h1>
          <p style={styles.sidebarSubtitle}>Turn Off Nicotine, Turn On Life!</p>
        </div>

        <div style={styles.userSection}>
          <p style={styles.userName}>Jason (Admin)</p>
          <p style={styles.userRole}>Super Admin</p>
        </div>

        {/* Menu Sections */}
        <div style={styles.menuContainer}>
          {/* MAIN Section */}
          <div style={styles.menuSection}>
            <h4 style={styles.sectionTitle}>MAIN</h4>
            <ul style={styles.menuList}>
              <Link to="/admin/dashboard" style={styles.menuLink}>
                <li
                  style={
                    activeMenu === "Dashboard"
                      ? styles.activeMenuItem
                      : styles.menuItem
                  }
                  onClick={() => setActiveMenu("Dashboard")}
                >
                  Dashboard
                </li>
              </Link>
            </ul>
          </div>

          {/* MANAGEMENT Section */}
          <div style={styles.menuSection}>
            <h4 style={styles.sectionTitle}>MANAGEMENT</h4>
            <ul style={styles.menuList}>
              <Link to="/admin/members" style={styles.menuLink}>
                <li
                  style={
                    activeMenu === "Members"
                      ? styles.activeMenuItem
                      : styles.menuItem
                  }
                  onClick={() => setActiveMenu("Members")}
                >
                  Members
                </li>
              </Link>
              <Link to="/admin/packages" style={styles.menuLink}>
                <li
                  style={
                    activeMenu === "Packages"
                      ? styles.activeMenuItem
                      : styles.menuItem
                  }
                  onClick={() => setActiveMenu("Packages")}
                >
                  Packages
                </li>
              </Link>
              <li
                style={
                  activeMenu.startsWith("Contents")
                    ? styles.activeMenuItem
                    : styles.menuItem
                }
                onClick={() => setShowContentsDropdown(!showContentsDropdown)}
              >
                Contents{" "}
                <span style={{ float: "right" }}>
                  {showContentsDropdown ? "▲" : "▼"}
                </span>
              </li>
              {showContentsDropdown && (
                <ul style={{ ...styles.menuList, paddingLeft: "20px" }}>
                  <Link
                    to="/admin/contents/send-reminder"
                    style={styles.menuLink}
                  >
                    <li
                      style={
                        activeMenu === "ContentsSendReminder"
                          ? styles.activeMenuItem
                          : styles.menuItem
                      }
                      onClick={() => setActiveMenu("ContentsSendReminder")}
                    >
                      Send Reminder To Members
                    </li>
                  </Link>
                </ul>
              )}
              <Link to="/admin/coaches" style={styles.menuLink}>
                <li
                  style={
                    activeMenu === "Coaches"
                      ? styles.activeMenuItem
                      : styles.menuItem
                  }
                  onClick={() => setActiveMenu("Coaches")}
                >
                  Coaches
                </li>
              </Link>
              <Link to="/admin/ratings" style={styles.menuLink}>
                <li
                  style={
                    activeMenu === "Ratings, Feedbacks"
                      ? styles.activeMenuItem
                      : styles.menuItem
                  }
                  onClick={() => setActiveMenu("Ratings, Feedbacks")}
                >
                  Ratings, Feedbacks
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        <header style={styles.contentHeader}>
          <h1 style={styles.contentTitle}>CONFIRM COACH SCHEDULE</h1>
        </header>

        <div style={styles.scheduleHeader}>
          <h2 style={styles.weeklyScheduleTitle}>Weekly Coach Schedules</h2>
          <p style={styles.weekRange}>{getWeekRange(currentDate)}</p>
          <div style={styles.weekNavigation}>
            <button style={styles.weekNavButton} onClick={handlePreviousWeek}>
              &lt; Previous
            </button>
            <button style={styles.weekNavButton} onClick={handleNextWeek}>
              Next &gt;
            </button>
            <button 
              style={{
                ...styles.weekNavButton,
                backgroundColor: "#4CAF50",
                color: "white",
                fontWeight: "bold",
                marginLeft: "20px"
              }} 
              onClick={handleApproveAll}
            >
              ✅ Approve All
            </button>
          </div>
        </div>

        {/* Coach Selection */}
        <div style={styles.coachSelection}>
          <h3 style={styles.coachSelectionTitle}>Select Coach:</h3>
          <div style={styles.coachList}>
            <button
              style={{
                ...styles.coachButton,
                backgroundColor: !selectedCoach ? "#A4E087" : "#fff",
                color: !selectedCoach ? "#2E7D32" : "#333",
              }}
              onClick={() => setSelectedCoach(null)}
            >
              All Coaches
            </button>
            {getUniqueCoaches().map((coach) => (
              <button
                key={coach}
                style={{
                  ...styles.coachButton,
                  backgroundColor: selectedCoach === coach ? "#A4E087" : "#fff",
                  color: selectedCoach === coach ? "#2E7D32" : "#333",
                }}
                onClick={() => setSelectedCoach(coach)}
              >
                {coach}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div style={styles.loadingContainer}>
            <p style={styles.loadingText}>Loading pending schedules...</p>
          </div>
        )}

        {error && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{error}</p>
            <button
              style={styles.retryButton}
              onClick={() => {
                const getWeekDates = (date) => {
                  const startOfWeek = new Date(date);
                  startOfWeek.setDate(date.getDate() - date.getDay() + 1);
                  const endOfWeek = new Date(startOfWeek);
                  endOfWeek.setDate(startOfWeek.getDate() + 6);
                  return { startOfWeek, endOfWeek };
                };
                const { startOfWeek, endOfWeek } = getWeekDates(currentDate);
                loadPendingSchedules(startOfWeek, endOfWeek);
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div style={styles.scheduleGrid}>
            {daysOfWeek.map((day, index) => {
              // Calculate the actual date for this day in the current week
              const getWeekDates = (date) => {
                const startOfWeek = new Date(date);
                startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
                return startOfWeek;
              };

              const weekStart = getWeekDates(currentDate);
              const currentDay = new Date(weekStart);
              currentDay.setDate(weekStart.getDate() + index); // Add index days from Monday

              // Debug logging
              console.log(
                `Day: ${day}, Index: ${index}, Date: ${currentDay.toDateString()}`
              );

              const allDaySchedules = getSchedulesByDay()[day] || [];
              const daySchedules = selectedCoach
                ? allDaySchedules.filter(
                    (schedule) => schedule.coach === selectedCoach
                  )
                : allDaySchedules;

              console.log(`${day} schedules:`, daySchedules);

              // Check if this day is in the past
              const isToday =
                currentDay.toDateString() === new Date().toDateString();
              const isPastDay = currentDay < new Date() && !isToday;

              return (
                <div key={day} style={styles.dayCard}>
                  <h3
                    style={{
                      ...styles.dayTitle,
                      color: isPastDay ? "#999" : styles.dayTitle.color,
                    }}
                  >
                    {day}
                    <br />
                    {currentDay.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                    {isPastDay && (
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        (Past)
                      </div>
                    )}
                  </h3>
                  {daySchedules.length > 0 ? (
                    daySchedules
                      .sort((a, b) => a.timeSlot - b.timeSlot) // Sort by time slot
                      .map((schedule) => {
                        const isPastAppointment = isAppointmentInPast(
                          currentDay,
                          schedule.timeSlot
                        );
                        return (
                          <div
                            key={schedule.id}
                            style={{
                              ...styles.scheduleCard,
                              backgroundColor: isPastAppointment
                                ? "#F5F5F5"
                                : schedule.status === "WAIT"
                                ? "#FFFBE5"
                                : schedule.status === "REJECTED"
                                ? "#FFEBEE"
                                : schedule.status === "APPROVED"
                                ? "#E8F5E9"
                                : "#F0F0F0",
                              border: isPastAppointment
                                ? "1px solid #CCC"
                                : schedule.status === "WAIT"
                                ? "1px solid #FFECB3"
                                : schedule.status === "REJECTED"
                                ? "1px solid #FFCDD2"
                                : schedule.status === "APPROVED"
                                ? "1px solid #C8E6C9"
                                : "1px solid #CCC",
                              opacity: isPastAppointment ? 0.6 : 1,
                            }}
                          >
                            <span
                              style={{
                                ...styles.scheduleStatus,
                                backgroundColor:
                                  schedule.status === "WAIT"
                                    ? "#FFECB3"
                                    : schedule.status === "REJECTED"
                                    ? "#FFCDD2"
                                    : schedule.status === "APPROVED"
                                    ? "#A4E087"
                                    : "#E0E0E0",
                                color:
                                  schedule.status === "WAIT"
                                    ? "#FF8F00"
                                    : schedule.status === "REJECTED"
                                    ? "#C62828"
                                    : schedule.status === "APPROVED"
                                    ? "#2E7D32"
                                    : "#666",
                              }}
                            >
                              {schedule.status === "WAIT"
                                ? "Pending"
                                : schedule.status === "APPROVED"
                                ? "Approved"
                                : schedule.status}
                            </span>
                            <p style={styles.coachName}>{schedule.coach}</p>
                            <p style={styles.timeRange}>{schedule.timeRange}</p>
                            <p style={styles.timeSlotInfo}>
                              Slot {schedule.timeSlot}
                            </p>
                            {schedule.status === "WAIT" &&
                              schedule.canApprove &&
                              schedule.canReject &&
                              !isPastAppointment && (
                                <div style={styles.scheduleActions}>
                                  <button
                                    style={styles.rejectButton}
                                    onClick={() =>
                                      handleReject(schedule.appointmentId)
                                    }
                                  >
                                    Reject
                                  </button>
                                  <button
                                    style={styles.confirmButton}
                                    onClick={() =>
                                      handleConfirm(schedule.appointmentId)
                                    }
                                  >
                                    Approve
                                  </button>
                                </div>
                              )}
                            {isPastAppointment && (
                              <div style={styles.pastAppointmentLabel}>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "#999",
                                    fontStyle: "italic",
                                  }}
                                >
                                  Past Appointment
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })
                  ) : (
                    <p style={styles.noScheduleText}>No Schedules</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
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
    color: "#2E7D32",
    margin: "0 0 5px 0",
    fontWeight: "bold",
  },
  sidebarSubtitle: {
    fontSize: "14px",
    color: "#666",
    margin: "0",
    fontStyle: "italic",
  },
  userSection: {
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
  },
  userName: {
    fontSize: "16px",
    color: "#333",
    margin: "0 0 5px 0",
    fontWeight: "bold",
  },
  userRole: {
    fontSize: "14px",
    color: "#666",
    margin: "0",
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
    padding: "10px 15px",
    color: "#555",
    cursor: "pointer",
    borderRadius: "6px",
    marginBottom: "5px",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#C8E6C9",
    },
  },
  activeMenuItem: {
    padding: "10px 15px",
    color: "#2E7D32",
    backgroundColor: "#A4E087",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "6px",
    marginBottom: "5px",
    transition: "all 0.2s ease",
  },
  menuLink: {
    textDecoration: "none",
    color: "inherit",
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#F0F5EF",
  },
  contentHeader: {
    marginBottom: "30px",
    paddingBottom: "15px",
    borderBottom: "1px solid #ccc",
  },
  contentTitle: {
    fontSize: "28px",
    color: "#2E7D32",
    margin: "0 0 20px 0",
    fontWeight: "bold",
  },
  scheduleHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  weeklyScheduleTitle: {
    fontSize: "24px",
    color: "#4d8b3c",
    margin: "0",
    fontWeight: "bold",
  },
  weekRange: {
    fontSize: "16px",
    color: "#555",
    margin: "0",
    flexGrow: 1,
    textAlign: "center",
  },
  weekNavigation: {
    display: "flex",
    gap: "10px",
  },
  weekNavButton: {
    padding: "8px 15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    color: "#555",
    transition: "background-color 0.2s, border-color 0.2s",
    ":hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  scheduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    backgroundColor: "#F0F5EF",
    padding: "20px",
    borderRadius: "8px",
  },
  dayCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    padding: "15px",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
  },
  dayTitle: {
    fontSize: "18px",
    color: "#4d8b3c",
    margin: "0 0 15px 0",
    textAlign: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    lineHeight: "1.4",
  },
  scheduleCard: {
    borderRadius: "6px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
  },
  scheduleStatus: {
    fontSize: "12px",
    fontWeight: "bold",
    borderRadius: "4px",
    padding: "3px 8px",
    marginBottom: "5px",
    display: "inline-block",
  },
  coachName: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#333",
    margin: "5px 0",
  },
  scheduleActions: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
  },
  rejectButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#FFEBEE",
    color: "#C62828",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#FFCDD2",
    },
  },
  confirmButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#E8F5E9",
    color: "#2E7D32",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#C8E6C9",
    },
  },
  noScheduleText: {
    textAlign: "center",
    color: "#888",
    marginTop: "20px",
    fontStyle: "italic",
  },
  coachSelection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  coachSelectionTitle: {
    fontSize: "18px",
    color: "#4d8b3c",
    margin: "0 0 15px 0",
    fontWeight: "bold",
  },
  coachList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  coachButton: {
    padding: "8px 16px",
    border: "1px solid #A4E087",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#A4E087",
      color: "#2E7D32",
    },
  },
  loadingContainer: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  loadingText: {
    fontSize: "16px",
    color: "#666",
    margin: "0",
  },
  errorContainer: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    border: "1px solid #ffcdd2",
  },
  errorText: {
    fontSize: "16px",
    color: "#c62828",
    margin: "0 0 15px 0",
  },
  retryButton: {
    padding: "8px 16px",
    backgroundColor: "#2E7D32",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  timeRange: {
    fontSize: "13px",
    color: "#666",
    margin: "5px 0",
    fontWeight: "500",
  },
  timeSlotInfo: {
    fontSize: "12px",
    color: "#888",
    margin: "2px 0",
    fontStyle: "italic",
  },
  pastAppointmentLabel: {
    textAlign: "center",
    marginTop: "10px",
    padding: "5px",
    borderRadius: "4px",
    backgroundColor: "#F5F5F5",
  },
};

export default ConfirmCoachSchedule;
