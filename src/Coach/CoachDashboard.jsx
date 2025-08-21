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

const CoachDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Booked Appointments");
  const [sessions, setSessions] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookedLoading, setBookedLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookedError, setBookedError] = useState("");
  const [actionLoading, setActionLoading] = useState({}); // Track loading state for individual appointments
  const [fromDate, setFromDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek.toISOString().split("T")[0];
  });
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CoachDashboard useEffect - user:", user);
    if (user) {
      if (user.coachId) {
        console.log("Loading appointments for coachId:", user.coachId);
        loadCoachName();
        loadBookedAppointments(); // Load booked appointments by default
      } else {
        console.log("User has no coachId:", user);
        setLoading(false);
        setError("User does not have coach permissions. CoachId not found.");
      }
    } else {
      console.log("No user found");
      setLoading(false);
      setError("User not authenticated. Please login.");
    }
  }, [user]);

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

  const loadCoachAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      console.log(
        "Making API call to getUpcomingAppointments with coachId:",
        user.coachId
      );

      // Get upcoming appointments for this coach
      const appointments = await ApiService.getUpcomingAppointments(
        user.coachId
      );

      console.log("API Response:", appointments);
      console.log(
        "Appointments type:",
        typeof appointments,
        "Length:",
        appointments?.length
      );

      // Handle different response formats
      let appointmentsArray = appointments;
      if (
        appointments &&
        typeof appointments === "object" &&
        !Array.isArray(appointments)
      ) {
        // If response is an object with data property
        appointmentsArray =
          appointments.data || appointments.appointments || [];
      }

      if (!Array.isArray(appointmentsArray)) {
        console.log(
          "Appointments is not an array, treating as empty:",
          appointmentsArray
        );
        appointmentsArray = [];
      }

      console.log("Processing appointments array:", appointmentsArray);

      // Transform API data to match our session format
      const formattedSessions = appointmentsArray.map((appointment) => ({
        id: appointment.id,
        dateTime: `${appointment.appointmentDate}, ${
          appointment.timeSlot || "TBD"
        }`,
        member: appointment.memberName || "Unknown Member",
        type: "Elite Session", // Default type, can be dynamic based on API
        status: appointment.status?.toLowerCase() || "pending",
      }));

      console.log("Formatted sessions:", formattedSessions);
      setSessions(formattedSessions);
    } catch (error) {
      console.error("Error loading coach appointments:", error);
      console.error("Error details:", error.response?.data || error.message);
      setError(
        `Failed to load appointments: ${
          error.response?.data?.message || error.message
        }`
      );
      // Keep some sample data for demo purposes if API fails
      setSessions([
        {
          id: "sample1",
          dateTime: "No appointments scheduled",
          member: "-",
          type: "-",
          status: "pending",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert date array to readable format
  const convertDateArrayToDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length !== 3) return null;
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day); // month is 0-indexed in JS Date
  };

  // Helper function to get time slot display
  const getTimeSlotFromNumber = (slotNumber) => {
    const timeSlots = {
      1: "8:00-9:00 AM",
      2: "9:00-10:00 AM",
      3: "10:00-11:00 AM",
      4: "11:00-12:00 PM",
      5: "12:00-1:00 PM",
      6: "1:00-2:00 PM",
      7: "2:00-3:00 PM",
      8: "3:00-4:00 PM",
      9: "4:00-5:00 PM",
      10: "5:00-6:00 PM",
    };
    return timeSlots[slotNumber] || `Slot ${slotNumber}`;
  };

  const loadBookedAppointments = async () => {
    try {
      setBookedLoading(true);
      setBookedError("");

      console.log(
        "Making API call to getBookedAppointments with coachId:",
        user.coachId,
        "from:",
        fromDate,
        "to:",
        toDate
      );

      // Get booked appointments for this coach
      const response = await ApiService.getBookedAppointments(
        user.coachId,
        fromDate,
        toDate
      );

      console.log("Booked appointments API Response:", response);

      // Parse the new response format with week and days structure
      if (response && response.days && Array.isArray(response.days)) {
        // Flatten all appointments from all days
        const allAppointments = response.days.flatMap((day) => {
          if (!day.appointments || !Array.isArray(day.appointments)) {
            return [];
          }

          // Add date information to each appointment
          return day.appointments.map((appointment) => ({
            ...appointment,
            appointmentDate: convertDateArrayToDate(day.date),
            bookedAtDate: convertDateArrayToDate(appointment.bookedAt),
          }));
        });

        console.log("Flattened appointments:", allAppointments);

        // Transform API data to match our display format
        const formattedBookedAppointments = allAppointments.map(
          (appointment) => ({
            id: appointment.id,
            dateTime: `${appointment.appointmentDate?.toLocaleDateString(
              "en-US",
              {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}, ${getTimeSlotFromNumber(appointment.time)}`,
            member: appointment.memberName || "Unknown Member",
            type: "Elite Session", // Default type
            status: appointment.status?.toLowerCase() || "pending",
            bookingDate:
              appointment.bookedAtDate?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }) || "N/A",
            canComplete: appointment.canComplete || false,
            memberId: appointment.memberId,
            timeSlot: appointment.time,
          })
        );

        console.log(
          "Formatted booked appointments:",
          formattedBookedAppointments
        );
        setBookedAppointments(formattedBookedAppointments);

        // Display week information if available
        if (response.week) {
          console.log("Week range:", response.week);
        }
      } else {
        console.log("Invalid response format, treating as empty");
        setBookedAppointments([]);
      }
    } catch (error) {
      console.error("Error loading booked appointments:", error);
      console.error("Error details:", error.response?.data || error.message);
      setBookedError(
        `Failed to load booked appointments: ${
          error.response?.data?.message || error.message
        }`
      );
      setBookedAppointments([]);
    } finally {
      setBookedLoading(false);
    }
  };

  const handleStatusChange = (sessionId, newStatus) => {
    setSessions((currentSessions) =>
      currentSessions.map((session) =>
        session.id === sessionId ? { ...session, status: newStatus } : session
      )
    );
  };

  const renderActionButtons = (session) => {
    switch (session.status) {
      case "pending":
        return (
          <>
            <button
              style={styles.confirmButton}
              onClick={() => handleStatusChange(session.id, "confirmed")}
            >
              Confirm
            </button>
            <button
              style={styles.cancelButton}
              onClick={() => handleStatusChange(session.id, "rejected")}
            >
              Reject
            </button>
          </>
        );
      case "confirmed":
        return (
          <>
            <button
              style={{
                ...styles.confirmButton,
                backgroundColor: "#66BB6A",
                cursor: "not-allowed",
              }}
              disabled
            >
              Confirmed
            </button>
            <button
              style={{ ...styles.confirmButton, backgroundColor: "#2979FF" }}
              onClick={() => handleStatusChange(session.id, "completed")}
            >
              Completed
            </button>
          </>
        );
      case "rejected":
        return (
          <span
            style={{
              color: styles.cancelButton.backgroundColor,
              fontWeight: "bold",
            }}
          >
            Rejected
          </span>
        );
      case "completed":
        return (
          <span
            style={{
              color: styles.confirmButton.backgroundColor,
              fontWeight: "bold",
            }}
          >
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  // Render simple status badge
  const renderBookedStatusBadge = (appointment) => {
    const translatedStatus = translateAppointmentStatus(appointment.status);
    
    const getStatusColor = (status) => {
      const normalizedStatus = status?.toLowerCase();
      switch (normalizedStatus) {
        case "pending":
        case "đang chờ":
          return "#ff9800";
        case "confirmed":
        case "đã xác nhận":
          return "#4CAF50";
        case "completed":
        case "đã hoàn thành":
          return "#2196F3";
        case "cancelled":
        case "đã hủy":
          return "#f44336";
        case "rejected":
        case "bị từ chối":
          return "#f44336";
        default:
          return "#9E9E9E";
      }
    };

    return (
      <span
        style={{
          ...styles.statusBadge,
          backgroundColor: getStatusColor(appointment.status),
          color: "white",
        }}
      >
        {translatedStatus?.toUpperCase()}
      </span>
    );
  };

  // Render action buttons separately
  const renderBookedActionButtons = (appointment) => {
    const isLoading = actionLoading[appointment.id];
    const normalizedStatus = appointment.status?.toLowerCase();

    // If already completed or cancelled, no actions available
    if (
      normalizedStatus === "completed" ||
      normalizedStatus === "cancelled" ||
      normalizedStatus === "đã hoàn thành" ||
      normalizedStatus === "đã hủy" ||
      normalizedStatus === "bị từ chối" ||
      normalizedStatus === "rejected"
    ) {
      return (
        <span style={{ color: "#9E9E9E", fontStyle: "italic" }}>
          No actions available
        </span>
      );
    }

    return (
      <div style={styles.actionButtonGroup}>
        {/* Show Complete button if canComplete is true */}
        {appointment.canComplete && (
          <button
            style={{ ...styles.confirmButton, backgroundColor: "#2979FF" }}
            onClick={() =>
              handleBookedStatusChange(appointment.id, "completed")
            }
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Complete"}
          </button>
        )}

        {/* Show Cancel button for pending and confirmed appointments */}
        {(normalizedStatus === "pending" ||
          normalizedStatus === "confirmed" ||
          normalizedStatus === "đang chờ" ||
          normalizedStatus === "đã xác nhận") && (
          <button
            style={styles.cancelButton}
            onClick={() =>
              handleBookedStatusChange(appointment.id, "cancelled")
            }
            disabled={isLoading}
          >
            {isLoading ? "..." : "Cancel"}
          </button>
        )}
      </div>
    );
  };

  const handleBookedStatusChange = async (appointmentId, newStatus) => {
    try {
      // Set loading state for this specific appointment
      setActionLoading((prev) => ({ ...prev, [appointmentId]: true }));

      console.log(
        `Updating appointment ${appointmentId} to status: ${newStatus}`
      );

      // Call the appropriate API based on the new status
      if (newStatus === "completed") {
        await ApiService.completeAppointment(appointmentId);
      } else if (newStatus === "cancelled") {
        await ApiService.cancelAppointment(appointmentId);
      }

      // Update the local state after successful API call
      setBookedAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: newStatus, canComplete: false }
            : appointment
        )
      );

      console.log(
        `Successfully updated appointment ${appointmentId} to ${newStatus}`
      );
    } catch (error) {
      console.error(`Error updating appointment ${appointmentId}:`, error);

      // Show error message to user
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update appointment status";
      setBookedError(`Failed to update appointment: ${errorMessage}`);

      // Clear error after 5 seconds
      setTimeout(() => {
        setBookedError("");
      }, 5000);
    } finally {
      // Clear loading state for this appointment
      setActionLoading((prev) => ({ ...prev, [appointmentId]: false }));
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
          <h2 style={styles.sidebarTitle}>COACH SCHEDULE</h2>
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
              <li
                style={
                  activeMenu === "Booked Appointments"
                    ? styles.activeMenuItem
                    : styles.menuItem
                }
                onClick={() => {
                  setActiveMenu("Booked Appointments");
                  loadBookedAppointments();
                }}
              >
                Booked Appointments
              </li>
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
        <h1 style={styles.pageTitle}>Booked Appointments</h1>
        {/* Booked Appointments Content */}
        {/* Date Range Controls */}
        <div style={styles.dateRangeContainer}>
          <div style={styles.dateRangeControls}>
            <div style={styles.dateInputGroup}>
              <label style={styles.dateLabel}>From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={styles.dateInput}
              />
            </div>
            <div style={styles.dateInputGroup}>
              <label style={styles.dateLabel}>To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={styles.dateInput}
              />
            </div>
            <button
              onClick={loadBookedAppointments}
              style={styles.searchButton}
              disabled={bookedLoading}
            >
              {bookedLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </div>

        {bookedError && (
          <div style={styles.errorMessage}>
            {bookedError}
            <button onClick={loadBookedAppointments} style={styles.retryButton}>
              Retry
            </button>
          </div>
        )}

        <div style={styles.tableContainer}>
          <h2 style={styles.tableTitle}>
            Booked Appointments ({fromDate} to {toDate})
          </h2>
          {bookedLoading ? (
            <div style={styles.loadingMessage}>
              Loading booked appointments...
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Date & Time</th>
                  <th style={styles.tableHeader}>Member</th>
                  <th style={styles.tableHeader}>Session Type</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Booking Date</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookedAppointments.length > 0 ? (
                  bookedAppointments.map((appointment) => (
                    <tr key={appointment.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{appointment.dateTime}</td>
                      <td style={styles.tableCell}>{appointment.member}</td>
                      <td style={styles.tableCell}>{appointment.type}</td>
                      <td style={styles.tableCell}>
                        {renderBookedStatusBadge(appointment)}
                      </td>
                      <td style={styles.tableCell}>
                        {appointment.bookingDate}
                      </td>
                      <td style={styles.tableCell}>
                        {renderBookedActionButtons(appointment)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell} colSpan="6">
                      No booked appointments found for the selected date range
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#DFF5DE", // Màu nền tổng thể
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
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background-color 0.2s ease",
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
    padding: "10px 15px",
    color: "#555",
    cursor: "pointer",
    borderRadius: "6px",
    marginBottom: "5px",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
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
    display: "flex",
    alignItems: "center",
    gap: "10px",
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
  pageTitle: {
    fontSize: "28px",
    color: "#2E7D32",
    margin: "0 0 20px 0",
    fontWeight: "bold",
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    overflow: "hidden",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto 20px auto",
  },
  tableTitle: {
    fontSize: "22px",
    color: "#333",
    margin: "20px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "15px",
  },
  tableHeaderRow: {
    backgroundColor: "#aed581",
    color: "#fff",
  },
  tableHeader: {
    padding: "15px 20px",
    textAlign: "left",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
  },
  tableRow: {
    borderBottom: "1px solid #eee",
  },
  tableCell: {
    padding: "15px 20px",
    color: "#333",
    fontSize: "15px",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#388E3C",
    },
  },
  cancelButton: {
    backgroundColor: "#D32F2F",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#B71C1C",
    },
  },
  rejectedButton: {
    backgroundColor: "#9E9E9E",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "default",
    marginRight: "8px",
    fontWeight: "bold",
    opacity: "0.8",
  },
  errorMessage: {
    backgroundColor: "#ffebee",
    color: "#d32f2f",
    padding: "16px",
    borderRadius: "8px",
    margin: "16px 0",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  retryButton: {
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  loadingMessage: {
    padding: "40px",
    textAlign: "center",
    fontSize: "16px",
    color: "#666",
  },
  dateRangeContainer: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  dateRangeControls: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  dateInputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  dateLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  dateInput: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "20px",
    transition: "background-color 0.2s ease",
  },
  statusBadge: {
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  actionButtonGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
};

export default CoachDashboard;
