import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../apiService";

const initialCoaches = [
  {
    name: "Christopher C. Ross, M.D.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    ratingCount: 88,
    clients: 124,
    schedule: true,
  },
  {
    name: "Xiang Gao, M.D., Ph.D.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 4.7,
    ratingCount: 76,
    clients: 87,
    schedule: true,
  },
  {
    name: "Elizabeth T. Smith, Ph.D.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    ratingCount: 112,
    clients: 150,
    schedule: true,
  },
  {
    name: "David B. Lee, M.D.",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    rating: 4.6,
    ratingCount: 55,
    clients: 70,
    schedule: false,
  },
  {
    name: "Sophia R. Garcia, M.D.",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 4.8,
    ratingCount: 95,
    clients: 130,
    schedule: true,
  },
  {
    name: "Robert C. Brown, Ph.D.",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    rating: 4.5,
    ratingCount: 40,
    clients: 60,
    schedule: false,
  },
];

const initialAppointments = [
  {
    id: 1,
    coach: "Christopher C. Ross, M.D.",
    member: "John Smith",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "Pending",
  },
  {
    id: 2,
    coach: "Xiang Gao, M.D., Ph.D.",
    member: "Alice Johnson",
    date: "2024-01-16",
    time: "2:00 PM",
    status: "Confirmed",
  },
  {
    id: 3,
    coach: "Elizabeth T. Smith, Ph.D.",
    member: "Michael Brown",
    date: "2024-01-17",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    id: 4,
    coach: "David B. Lee, M.D.",
    member: "Sarah Wilson",
    date: "2024-01-18",
    time: "3:00 PM",
    status: "Rejected",
  },
  {
    id: 5,
    coach: "Sophia R. Garcia, M.D.",
    member: "Emma Davis",
    date: "2024-01-19",
    time: "1:00 PM",
    status: "Pending",
  },
  {
    id: 6,
    coach: "Christopher C. Ross, M.D.",
    member: "William Taylor",
    date: "2024-01-20",
    time: "9:00 AM",
    status: "Confirmed",
  },
  {
    id: 7,
    coach: "Robert C. Brown, Ph.D.",
    member: "Olivia Garcia",
    date: "2024-01-21",
    time: "4:00 PM",
    status: "Pending",
  },
];

function AppointmentsModal({ coach, appointments, onClose, onStatusChange }) {
  if (!coach) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={{ ...modalStyles.popup, width: "60%", maxWidth: "800px" }}>
        <button style={modalStyles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <h2 style={{ ...modalStyles.title, marginBottom: "25px" }}>
          Appointments for {coach.name}
        </h2>
        {appointments.length > 0 ? (
          <table style={tableStyles.table}>
            <thead>
              <tr>
                <th style={tableStyles.th}>Member</th>
                <th style={tableStyles.th}>Date</th>
                <th style={tableStyles.th}>Time</th>
                <th style={tableStyles.th}>Status</th>
                <th style={tableStyles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app.id}>
                  <td style={tableStyles.td}>{app.member}</td>
                  <td style={tableStyles.td}>{app.date}</td>
                  <td style={tableStyles.td}>{app.time}</td>
                  <td style={tableStyles.td}>
                    <span
                      style={{
                        ...tableStyles.status,
                        ...(app.status === "Confirmed"
                          ? tableStyles.statusConfirmed
                          : {}),
                        ...(app.status === "Rejected"
                          ? tableStyles.statusRejected
                          : {}),
                        ...(app.status === "Pending"
                          ? tableStyles.statusPending
                          : {}),
                      }}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td style={tableStyles.td}>
                    {app.status === "Pending" ? (
                      <>
                        <button
                          style={{
                            ...tableStyles.button,
                            ...tableStyles.confirmButton,
                          }}
                          onClick={() => onStatusChange(app.id, "Confirmed")}
                        >
                          Confirm
                        </button>
                        <button
                          style={{
                            ...tableStyles.button,
                            ...tableStyles.rejectButton,
                          }}
                          onClick={() => onStatusChange(app.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found for this coach.</p>
        )}
      </div>
    </div>
  );
}

function WeeklyScheduleModal({
  show,
  onClose,
  scheduleData,
  loading,
  error,
  fromDate,
  toDate,
  selectedCoachId,
  onFromDateChange,
  onToDateChange,
  onCoachIdChange,
  onFetchSchedule,
  coaches,
  onAppointmentUpdate,
}) {
  if (!show) return null;

  // Local state for managing individual appointment loading states
  const [processingAppointments, setProcessingAppointments] = useState(
    new Set()
  );

  // Helper function to convert date array to readable format
  const formatDateArray = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 3) return "N/A";
    const [year, month, day] = dateArray;
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  };

  // Helper function to convert time number to readable format
  const formatTime = (timeNumber) => {
    if (typeof timeNumber !== "number") return "N/A";
    const hour = Math.floor(timeNumber);
    const minute = (timeNumber % 1) * 60;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${Math.round(minute)
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  // Function to handle appointment confirmation
  const handleConfirmAppointment = async (appointmentId) => {
    try {
      setProcessingAppointments((prev) => new Set(prev).add(appointmentId));

      await ApiService.confirmAppointment(appointmentId);

      // Notify parent component about the update
      if (onAppointmentUpdate) {
        onAppointmentUpdate(appointmentId, "CONFIRMED");
      }

      // Refresh the schedule data
      onFetchSchedule();
    } catch (error) {
      console.error("Error confirming appointment:", error);
      alert("Failed to confirm appointment. Please try again.");
    } finally {
      setProcessingAppointments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(appointmentId);
        return newSet;
      });
    }
  };

  // Function to handle appointment rejection
  const handleRejectAppointment = async (appointmentId) => {
    try {
      setProcessingAppointments((prev) => new Set(prev).add(appointmentId));

      await ApiService.rejectAppointment(appointmentId);

      // Notify parent component about the update
      if (onAppointmentUpdate) {
        onAppointmentUpdate(appointmentId, "REJECTED");
      }

      // Refresh the schedule data
      onFetchSchedule();
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      alert("Failed to reject appointment. Please try again.");
    } finally {
      setProcessingAppointments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(appointmentId);
        return newSet;
      });
    }
  };

  // Flatten appointments from all days for table display
  const flattenedAppointments = [];
  if (scheduleData && scheduleData.days) {
    scheduleData.days.forEach((day) => {
      if (day.appointments && day.appointments.length > 0) {
        day.appointments.forEach((appointment) => {
          flattenedAppointments.push({
            ...appointment,
            formattedDate: formatDateArray(day.date),
            formattedTime: formatTime(appointment.time),
            originalDate: day.date,
          });
        });
      }
    });
  }

  // Debug logging
  console.log("scheduleData:", scheduleData);
  console.log("flattenedAppointments:", flattenedAppointments);

  return (
    <div style={modalStyles.overlay}>
      <div
        style={{
          ...modalStyles.popup,
          width: "90%",
          maxWidth: "1200px",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <button style={modalStyles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <h2 style={{ ...modalStyles.title, marginBottom: "25px" }}>
          Weekly Schedule{" "}
          {scheduleData && scheduleData.week ? `(${scheduleData.week})` : ""}
        </h2>

        {/* Date and Coach Selection */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
            alignItems: "end",
            flexWrap: "wrap",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              From Date:
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => onFromDateChange(e.target.value)}
              style={modalStyles.input}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              To Date:
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => onToDateChange(e.target.value)}
              style={modalStyles.input}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Coach (Optional):
            </label>
            <select
              value={selectedCoachId}
              onChange={(e) => onCoachIdChange(e.target.value)}
              style={modalStyles.select}
            >
              <option value="">All Coaches</option>
              {coaches.map((coach, index) => (
                <option key={index} value={index + 1}>
                  {coach.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={onFetchSchedule}
            style={modalStyles.fetchButton}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Schedule"}
          </button>
        </div>

        {/* Error Display */}
        {error && <div style={modalStyles.error}>{error}</div>}

        {/* Debug Info */}
        {scheduleData && (
          <div
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            <strong>Debug Info:</strong>
            Has scheduleData: {scheduleData ? "Yes" : "No"}, Has days:{" "}
            {scheduleData.days ? "Yes" : "No"}, Days count:{" "}
            {scheduleData.days ? scheduleData.days.length : 0}, Flattened
            appointments: {flattenedAppointments.length}
          </div>
        )}

        {/* Schedule Data Display */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>Loading weekly schedule...</p>
          </div>
        ) : scheduleData &&
          scheduleData.days &&
          flattenedAppointments.length > 0 ? (
          <div>
            {/* Summary Info */}
            <div
              style={{
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#2E7D32" }}>
                Schedule Summary
              </h3>
              <p style={{ margin: "5px 0" }}>
                <strong>Week:</strong> {scheduleData.week || "N/A"}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Total Appointments:</strong>{" "}
                {flattenedAppointments.length}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Pending Appointments:</strong>{" "}
                {
                  flattenedAppointments.filter((a) => a.status === "PENDING")
                    .length
                }
              </p>
            </div>

            {/* Appointments Table */}
            <table style={tableStyles.table}>
              <thead>
                <tr>
                  <th style={tableStyles.th}>Date</th>
                  <th style={tableStyles.th}>Time</th>
                  <th style={tableStyles.th}>Coach</th>
                  <th style={tableStyles.th}>Member</th>
                  <th style={tableStyles.th}>Status</th>
                  <th style={tableStyles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {flattenedAppointments.map((appointment, index) => (
                  <tr key={`${appointment.id}-${index}`}>
                    <td style={tableStyles.td}>{appointment.formattedDate}</td>
                    <td style={tableStyles.td}>{appointment.formattedTime}</td>
                    <td style={tableStyles.td}>
                      {appointment.coachName || "N/A"}
                    </td>
                    <td style={tableStyles.td}>
                      {appointment.memberName || "Not Assigned"}
                    </td>
                    <td style={tableStyles.td}>
                      <span
                        style={{
                          ...tableStyles.status,
                          ...(appointment.status === "CONFIRMED"
                            ? tableStyles.statusConfirmed
                            : {}),
                          ...(appointment.status === "CANCELLED" ||
                          appointment.status === "REJECTED"
                            ? tableStyles.statusRejected
                            : {}),
                          ...(appointment.status === "PENDING"
                            ? tableStyles.statusPending
                            : {}),
                        }}
                      >
                        {appointment.status || "N/A"}
                      </span>
                    </td>
                    <td style={tableStyles.td}>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexWrap: "wrap",
                        }}
                      >
                        {appointment.canConfirm &&
                          appointment.status === "PENDING" && (
                            <button
                              style={{
                                ...tableStyles.button,
                                ...tableStyles.confirmButton,
                                opacity: processingAppointments.has(
                                  appointment.id
                                )
                                  ? 0.6
                                  : 1,
                                cursor: processingAppointments.has(
                                  appointment.id
                                )
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                              onClick={() =>
                                handleConfirmAppointment(appointment.id)
                              }
                              disabled={processingAppointments.has(
                                appointment.id
                              )}
                            >
                              {processingAppointments.has(appointment.id)
                                ? "Processing..."
                                : "Confirm"}
                            </button>
                          )}
                        {appointment.canReject &&
                          appointment.status === "PENDING" && (
                            <button
                              style={{
                                ...tableStyles.button,
                                ...tableStyles.rejectButton,
                                opacity: processingAppointments.has(
                                  appointment.id
                                )
                                  ? 0.6
                                  : 1,
                                cursor: processingAppointments.has(
                                  appointment.id
                                )
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                              onClick={() =>
                                handleRejectAppointment(appointment.id)
                              }
                              disabled={processingAppointments.has(
                                appointment.id
                              )}
                            >
                              {processingAppointments.has(appointment.id)
                                ? "Processing..."
                                : "Reject"}
                            </button>
                          )}
                        {appointment.status !== "PENDING" && (
                          <span style={{ color: "#666", fontStyle: "italic" }}>
                            No actions available
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : scheduleData && scheduleData.days ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h3 style={{ color: "#666", marginBottom: "10px" }}>
              No Appointments Found
            </h3>
            <p style={{ color: "#888" }}>
              No appointments scheduled for the week:{" "}
              {scheduleData.week || "N/A"}
            </p>
            <p style={{ color: "#888", fontSize: "12px", marginTop: "10px" }}>
              Total days checked: {scheduleData.days.length}
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ color: "#888" }}>
              Click "Fetch Schedule" to load weekly schedule data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const Coaches = () => {
  const [activeMenu, setActiveMenu] = useState("Coaches");
  const [coaches, setCoaches] = useState(initialCoaches);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isAppointmentsModalOpen, setAppointmentsModalOpen] = useState(false);
  const [viewingCoach, setViewingCoach] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [showContentsDropdown, setShowContentsDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication tokens/data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");

    // Show confirmation
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Redirect to login page
      navigate("/login");
    }
  };

  // Weekly Schedule States
  const [weeklySchedule, setWeeklySchedule] = useState({});
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCoachId, setSelectedCoachId] = useState("");
  const [showWeeklySchedule, setShowWeeklySchedule] = useState(false);

  // Loading and error states for coaches
  const [coachesLoading, setCoachesLoading] = useState(true);
  const [coachesError, setCoachesError] = useState("");

  // Dashboard data states
  const [dashboardData, setDashboardData] = useState({});
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  // Initialize date range to current week
  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    ); // Monday
    const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6)); // Sunday

    setFromDate(startOfWeek.toISOString().split("T")[0]);
    setToDate(endOfWeek.toISOString().split("T")[0]);
  }, []);

  // Fetch dashboard data when component mounts
  useEffect(() => {
    fetchCoachesDashboard();
  }, []);

  const fetchCoachesDashboard = async () => {
    try {
      setDashboardLoading(true);
      setCoachesLoading(true);
      setDashboardError("");
      setCoachesError("");

      const data = await ApiService.getCoachesDashboard();

      // Set dashboard statistics
      setDashboardData({
        totalCoaches: data.totalCoaches || 0,
        activeCoaches: data.activeCoaches || 0,
        avgRating: data.avgRating || 0,
        successRate: data.successRate || 0,
      });

      // Transform coach cards data to match current component structure
      const transformedCoaches = (data.coachCards || []).map((coach) => ({
        id: coach.id,
        name: coach.name || "Unknown Coach",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Default avatar
        rating: coach.rating || 0,
        ratingCount: coach.ratingCount || 0,
        clients: coach.clientCount || 0,
        successRate: coach.successRate || 0,
        schedule: true, // Default to available
      }));

      setCoaches(transformedCoaches);
    } catch (error) {
      console.error("Error fetching coaches dashboard:", error);
      setDashboardError("Failed to load dashboard data.");
      setCoachesError("Failed to load coaches data.");
      setDashboardData({});
      // Keep initial coaches as fallback
      setCoaches(initialCoaches);
    } finally {
      setDashboardLoading(false);
      setCoachesLoading(false);
    }
  };

  const handleAppointmentStatus = (id, status) => {
    setAppointments(
      appointments.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const handleViewAppointmentsClick = (coach) => {
    setViewingCoach(coach);
    setAppointmentsModalOpen(true);
  };

  const handleCloseAppointmentsModal = () => {
    setAppointmentsModalOpen(false);
    setViewingCoach(null);
  };

  const filteredCoaches = coaches.filter((coach) => {
    const matchesSearchTerm = coach.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesAvailability =
      availabilityFilter === "All" ||
      (availabilityFilter === "Available" && coach.schedule === true) ||
      (availabilityFilter === "Unavailable" && coach.schedule === false);
    return matchesSearchTerm && matchesAvailability;
  });

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

        {/* Logout Button */}
        <div style={styles.logoutSection}>
          <button style={styles.logoutButton} onClick={handleLogout}>
            <span style={styles.logoutIcon}>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content - Coaches Management */}
      <div style={styles.mainContent}>
        <div
          style={
            isAppointmentsModalOpen
              ? {
                  filter: "blur(2px)",
                  pointerEvents: "none",
                  userSelect: "none",
                }
              : {}
          }
        >
          <div style={styles.wrapper}>
            <div style={styles.headerRow}>
              <h1 style={styles.title}>Coaches Management</h1>
              <div style={styles.filterControls}>
                <input
                  type="text"
                  placeholder="Search by name..."
                  style={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  style={styles.dropdown}
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
                <Link
                  to="/confirm-coach-schedule"
                  style={{ textDecoration: "none" }}
                >
                  <button style={styles.weeklyScheduleBtn}>
                    📅 Weekly Schedule
                  </button>
                </Link>
              </div>
            </div>
            <div style={styles.statsRow}>
              {dashboardLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#666",
                      marginRight: "10px",
                    }}
                  >
                    Loading dashboard stats...
                  </div>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid #f3f3f3",
                      borderTop: "2px solid #4caf50",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                </div>
              ) : dashboardError ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#f44336",
                      marginRight: "10px",
                    }}
                  >
                    ⚠️ {dashboardError}
                  </div>
                  <button
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={fetchCoachesDashboard}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>Total Coaches</div>
                    <div style={styles.statValue}>
                      {dashboardData.totalCoaches || 0}
                    </div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>Success Rate</div>
                    <div style={styles.statValue}>
                      {dashboardData.successRate || 0}%
                    </div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>Active Coaches</div>
                    <div style={styles.statValue}>
                      {dashboardData.activeCoaches || 0}
                    </div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>Avg. Rating</div>
                    <div style={styles.statValue}>
                      {dashboardData.avgRating || 0}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div style={styles.cardRow}>
              {coachesLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "200px",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      color: "#666",
                      marginBottom: "10px",
                    }}
                  >
                    Loading coaches...
                  </div>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "3px solid #f3f3f3",
                      borderTop: "3px solid #4caf50",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                </div>
              ) : coachesError ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "200px",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      color: "#f44336",
                      marginBottom: "10px",
                    }}
                  >
                    ⚠️ {coachesError}
                  </div>
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={fetchCoachesDashboard}
                  >
                    Retry
                  </button>
                </div>
              ) : filteredCoaches.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "200px",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      color: "#666",
                      marginBottom: "10px",
                    }}
                  >
                    No coaches found
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    Try adjusting your search or filters
                  </div>
                </div>
              ) : (
                filteredCoaches.map((c, idx) => {
                  const pendingCount = appointments.filter(
                    (a) => a.coach === c.name && a.status === "Pending"
                  ).length;
                  const totalCount = appointments.filter(
                    (a) => a.coach === c.name
                  ).length;
                  return (
                    <div key={c.name + idx} style={styles.coachCard}>
                      <div style={styles.coachImage}>
                        <img
                          src={c.avatar}
                          alt={c.name}
                          style={styles.coachImageContent}
                        />
                      </div>
                      <div style={styles.coachName}>{c.name}</div>
                      <div style={styles.coachInfoRow}>
                        <span style={styles.coachRating}>
                          ★ {c.rating}{" "}
                          <span style={{ color: "#888", fontWeight: 400 }}>
                            ({c.ratingCount})
                          </span>
                        </span>
                        <span style={styles.coachClients}>
                          👤 {c.clients} clients
                        </span>
                      </div>
                      <div style={styles.coachInfoRow}>
                        <span style={styles.successRate}>
                          📈 {c.successRate.toFixed(1)}% success rate
                        </span>
                      </div>
                      <div style={styles.coachBtnRow}>
                        <Link
                          to="/confirm-coach-schedule"
                          style={styles.scheduleButtonLink}
                        >
                          <button style={styles.scheduleButton}>
                            Schedule
                          </button>
                        </Link>
                        {totalCount > 0 && (
                          <button
                            style={
                              pendingCount > 0
                                ? styles.pendingBtn
                                : styles.appointmentsBtn
                            }
                            onClick={() => handleViewAppointmentsClick(c)}
                          >
                            {pendingCount > 0
                              ? `Pending (${pendingCount})`
                              : `Appointments (${totalCount})`}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {isAppointmentsModalOpen && (
          <AppointmentsModal
            coach={viewingCoach}
            appointments={appointments.filter(
              (a) => a.coach === viewingCoach?.name
            )}
            onClose={handleCloseAppointmentsModal}
            onStatusChange={handleAppointmentStatus}
          />
        )}
      </div>
    </div>
  );
};

const tableStyles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  button: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
    marginRight: "5px",
  },
  confirmButton: {
    backgroundColor: "#4caf50",
  },
  rejectButton: {
    backgroundColor: "#f44336",
  },
  status: {
    padding: "4px 8px",
    borderRadius: "12px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "12px",
    textTransform: "uppercase",
    display: "inline-block",
  },
  statusConfirmed: {
    backgroundColor: "#4CAF50",
  },
  statusRejected: {
    backgroundColor: "#f44336",
  },
  statusPending: {
    backgroundColor: "#ffc107",
    color: "#000",
  },
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
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
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
    backgroundColor: "#DFF5DE",
  },
  wrapper: {
    maxWidth: 1100,
    margin: "0 auto",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    padding: 36,
    position: "relative",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    flexWrap: "wrap",
    gap: "15px",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: "#406c2b",
    margin: "0",
    letterSpacing: 0.5,
    textShadow: "0 1px 0 #fff",
  },
  filterControls: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  searchInput: {
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    width: "200px",
    transition: "border-color 0.2s ease",
    ":focus": {
      borderColor: "#4d8b3c",
    },
  },
  dropdown: {
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#fff",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.2s ease",
    ":focus": {
      borderColor: "#4d8b3c",
    },
  },
  weeklyScheduleBtn: {
    background: "#FF9800",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    fontWeight: 600,
    fontSize: 16,
    boxShadow: "0 2px 4px rgba(255,152,0,0.12)",
    cursor: "pointer",
    transition: "background 0.2s",
    marginRight: "10px",
    ":hover": {
      backgroundColor: "#FB8C00",
    },
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: 40,
    gap: 20,
  },
  statBox: {
    textAlign: "center",
    background: "#e8f5e9",
    padding: "20px 25px",
    borderRadius: 12,
    flex: 1,
    minWidth: 120,
  },
  statLabel: {
    fontSize: 15,
    color: "#2e7d32",
    marginBottom: 8,
    fontWeight: 600,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 700,
    color: "#1b5e20",
  },
  cardRow: {
    display: "flex",
    gap: 32,
    overflowX: "auto",
    paddingBottom: 15,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  coachCard: {
    background: "#fff9c4",
    border: "2px solid #fbc02d",
    borderRadius: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: "20px 20px 15px 20px",
    minWidth: 250,
    maxWidth: 280,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  coachName: {
    fontSize: 19,
    fontWeight: 700,
    color: "#222",
    marginBottom: 6,
  },
  coachInfoRow: {
    display: "flex",
    justifyContent: "center",
    gap: 18,
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  coachRating: {
    color: "#fbc02d",
    fontWeight: 600,
  },
  coachClients: {
    color: "#555",
  },
  successRate: {
    color: "#4caf50",
    fontWeight: 600,
    fontSize: "13px",
  },
  coachBtnRow: {
    display: "flex",
    gap: 12,
    marginTop: 8,
  },
  scheduleBtn: {
    background: "#FF9800",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 18px",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  coachImage: {
    width: "100%",
    height: "300px",
    overflow: "hidden",
    borderRadius: "8px 8px 0 0",
  },
  coachImageContent: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  scheduleButton: {
    padding: "8px 15px",
    backgroundColor: "#FFA726",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: "#FB8C00",
    },
  },
  scheduleButtonLink: {
    textDecoration: "none",
  },
  pendingBtn: {
    background: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: 8,
    padding: "8px 12px",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  appointmentsBtn: {
    background: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 12px",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  logoutSection: {
    marginTop: "auto",
    paddingTop: "20px",
    borderTop: "1px solid rgba(0,0,0,0.1)",
  },
  logoutButton: {
    width: "100%",
    padding: "12px 15px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  logoutIcon: {
    fontSize: "18px",
  },
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "550px",
    maxWidth: "95%",
    position: "relative",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  closeBtn: {
    position: "absolute",
    right: "15px",
    top: "15px",
    border: "none",
    background: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#dc3545",
  },
  title: {
    margin: "0 0 25px 0",
    color: "#4d8b3c",
    fontSize: "28px",
    textAlign: "center",
  },
};

// Add CSS animation for spinner
const spinnerStyles = document.createElement("style");
spinnerStyles.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyles);

export default Coaches;
