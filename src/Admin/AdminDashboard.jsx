import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../apiService";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showContentsDropdown, setShowContentsDropdown] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch dashboard data when component mounts
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Call both APIs
      const [overviewData, dashboardStats] = await Promise.all([
        ApiService.getAdminOverview(),
        ApiService.getAdminDashboard(),
      ]);

      // Combine both data sources
      const combinedData = {
        overview: overviewData,
        dashboard: dashboardStats,
      };

      setDashboardData(combinedData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");

      // Set fallback data to prevent blank display
      setDashboardData({
        overview: {
          totalMembers: 0,
          totalUsers: 0,
          activeMembersThisMonth: 0,
          successRate: 0,
          totalCoaches: 0,
          appointmentsToday: 0,
          completedThisWeek: 0,
        },
        dashboard: null,
      });
    } finally {
      setLoading(false);
    }
  };

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

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>Welcome to NicOff Admin Dashboard</h1>
          <p style={styles.welcomeText}>
            Manage your smoking cessation platform and help users on their
            journey to a healthier life.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorMessage}>
            {error}
            <button style={styles.retryButton} onClick={fetchDashboardData}>
              Retry
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div style={styles.statsContainer}>
          {loading ? (
            // Loading skeleton
            <>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} style={styles.statCard}>
                  <div style={styles.loadingSkeleton}></div>
                </div>
              ))}
            </>
          ) : (
            <>
              {/* Total Users */}
              <div style={styles.statCard}>
                <h3 style={styles.cardTitle}>Total Users</h3>
                <p style={styles.cardNumber}>
                  {dashboardData?.overview?.totalUsers || 0}
                </p>
                <p style={styles.cardStatPositive}>
                  {dashboardData?.dashboard?.users?.growthRate || 0}% growth
                  rate
                </p>
              </div>

              {/* Total Members */}
              <div style={styles.statCard}>
                <h3 style={styles.cardTitle}>Total Members</h3>
                <p style={styles.cardNumber}>
                  {dashboardData?.overview?.totalMembers || 0}
                </p>
                <p style={styles.cardStatPositive}>
                  Active: {dashboardData?.overview?.activeMembersThisMonth || 0}
                </p>
              </div>

              {/* Total Coaches */}
              <div style={styles.statCard}>
                <h3 style={styles.cardTitle}>Total Coaches</h3>
                <p style={styles.cardNumber}>
                  {dashboardData?.overview?.totalCoaches || 0}
                </p>
                <p style={styles.cardStatPositive}>
                  Active:{" "}
                  {dashboardData?.dashboard?.users?.coaches?.active || 0}
                </p>
              </div>

              {/* Success Rate */}
              <div style={styles.statCard}>
                <h3 style={styles.cardTitle}>Success Rate</h3>
                <p style={styles.cardNumber}>
                  {dashboardData?.overview?.successRate?.toFixed(1) || 0}%
                </p>
                <p style={styles.cardStatInfo}>
                  Appointments Today:{" "}
                  {dashboardData?.overview?.appointmentsToday || 0}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Top Performers Section */}
        {!loading && dashboardData?.dashboard?.topPerformers && (
          <div style={styles.topPerformersContainer}>
            {/* Top Active Members */}
            <div style={styles.performerCard}>
              <h3 style={styles.performerTitle}>Top Active Members</h3>
              <div style={styles.performerList}>
                {dashboardData.dashboard.topPerformers.activeMembers
                  .slice(0, 5)
                  .map((member, index) => (
                    <div key={member.id} style={styles.performerItem}>
                      <div style={styles.performerRank}>#{index + 1}</div>
                      <div style={styles.performerInfo}>
                        <div style={styles.performerName}>{member.name}</div>
                        <div style={styles.performerDetail}>
                          {member.daysSmokeFree} days smoke-free
                        </div>
                      </div>
                      <div
                        style={{
                          ...styles.performerStatus,
                          backgroundColor: member.isActive
                            ? "#4CAF50"
                            : "#FF5722",
                        }}
                      >
                        {member.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Top Coaches */}
            <div style={styles.performerCard}>
              <h3 style={styles.performerTitle}>Top Coaches</h3>
              <div style={styles.performerList}>
                {dashboardData.dashboard.topPerformers.topCoaches
                  .slice(0, 5)
                  .map((coach, index) => (
                    <div key={coach.id} style={styles.performerItem}>
                      <div style={styles.performerRank}>#{index + 1}</div>
                      <div style={styles.performerInfo}>
                        <div style={styles.performerName}>{coach.name}</div>
                        <div style={styles.performerDetail}>
                          {coach.completedAppointments} completed appointments
                        </div>
                        <div style={styles.performerSpecialization}>
                          {coach.specialization || "General"}
                        </div>
                      </div>
                      <div
                        style={{
                          ...styles.performerStatus,
                          backgroundColor: coach.isActive
                            ? "#4CAF50"
                            : "#FF5722",
                        }}
                      >
                        {coach.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Summary */}
        {!loading && dashboardData?.dashboard?.appointments && (
          <div style={styles.quickStatsContainer}>
            <h3 style={styles.quickStatsTitle}>Appointment Statistics</h3>
            <div style={styles.quickStatsGrid}>
              <div style={styles.quickStatItem}>
                <div style={styles.quickStatNumber}>
                  {dashboardData.dashboard.appointments.total}
                </div>
                <div style={styles.quickStatLabel}>Total Appointments</div>
              </div>
              <div style={styles.quickStatItem}>
                <div style={styles.quickStatNumber}>
                  {dashboardData.dashboard.appointments.statusBreakdown
                    ?.APPROVED || 0}
                </div>
                <div style={styles.quickStatLabel}>Approved</div>
              </div>
              <div style={styles.quickStatItem}>
                <div style={styles.quickStatNumber}>
                  {dashboardData.dashboard.appointments.statusBreakdown?.WAIT ||
                    0}
                </div>
                <div style={styles.quickStatLabel}>Waiting</div>
              </div>
              <div style={styles.quickStatItem}>
                <div style={styles.quickStatNumber}>
                  {dashboardData?.overview?.completedThisWeek || 0}
                </div>
                <div style={styles.quickStatLabel}>Completed This Week</div>
              </div>
            </div>
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
  welcomeSection: {
    margin: "0 0 30px 0",
    padding: "0",
  },
  welcomeTitle: {
    fontSize: "28px",
    color: "#2E7D32",
    margin: "0 0 10px 0",
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: "16px",
    color: "#555",
    margin: "0",
    lineHeight: "1.5",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "20px",
  },
  topPerformersContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginBottom: "20px",
  },
  performerCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  performerTitle: {
    fontSize: "18px",
    color: "#2E7D32",
    margin: "0 0 15px 0",
    fontWeight: "bold",
  },
  performerList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  performerItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
  },
  performerRank: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#2E7D32",
    minWidth: "30px",
  },
  performerInfo: {
    flex: 1,
    marginLeft: "15px",
  },
  performerName: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 4px 0",
  },
  performerDetail: {
    fontSize: "12px",
    color: "#666",
    margin: "0 0 2px 0",
  },
  performerSpecialization: {
    fontSize: "11px",
    color: "#888",
    fontStyle: "italic",
  },
  performerStatus: {
    fontSize: "11px",
    color: "white",
    padding: "4px 8px",
    borderRadius: "12px",
    fontWeight: "bold",
    textAlign: "center",
    minWidth: "60px",
  },
  quickStatsContainer: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    marginBottom: "20px",
  },
  quickStatsTitle: {
    fontSize: "18px",
    color: "#2E7D32",
    margin: "0 0 15px 0",
    fontWeight: "bold",
  },
  quickStatsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
  },
  quickStatItem: {
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
  },
  quickStatNumber: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2E7D32",
    margin: "0 0 5px 0",
  },
  quickStatLabel: {
    fontSize: "12px",
    color: "#666",
    margin: "0",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  cardTitle: {
    fontSize: "16px",
    color: "#555",
    margin: "0 0 15px 0",
  },
  cardNumber: {
    fontSize: "32px",
    color: "#2E7D32",
    margin: "0 0 5px 0",
    fontWeight: "bold",
  },
  chartTitle: {
    fontSize: "18px",
    color: "#2E7D32",
    margin: "0 0 15px 0",
    fontWeight: "bold",
  },
  cardStatPositive: {
    fontSize: "14px",
    color: "#2E7D32",
    margin: "0",
  },
  cardStatNegative: {
    fontSize: "14px",
    color: "#C62828",
    margin: "0",
  },
  chartPlaceholder: {
    height: "200px",
    backgroundColor: "#F5F5F5",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999",
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
  cardStatInfo: {
    fontSize: "14px",
    color: "#666",
    margin: "5px 0 0 0",
  },
  errorMessage: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #ef5350",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  retryButton: {
    backgroundColor: "#2E7D32",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
  loadingSkeleton: {
    height: "80px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
    animation: "pulse 1.5s ease-in-out infinite",
  },
};

export default AdminDashboard;
