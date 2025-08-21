import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import ApiService from "../apiService";

const CoachProfile = () => {
  const [activeMenu, setActiveMenu] = useState("My Profile");
  const [coachData, setCoachData] = useState({
    id: null,
    fullName: "",
    email: "",
    specialization: "",
    yearOfExperience: "",
    title: "",
    bio: "",
    certifications: [],
    hourlyRate: "",
    active: true,
    coachActive: true,
    createdAt: null,
    avatarUrl: "",
  });
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.coachId) {
      loadCoachProfile();
    }
  }, [user]);

  const loadCoachProfile = async () => {
    try {
      setLoading(true);
      setError("");

      // Load coach profile from API
      const profile = await ApiService.getCoachById(user.coachId);

      const coachName = profile.name || user.fullName || "";
      setCoachData({
        id: profile.id,
        fullName: coachName,
        email: user.email || "", // Email comes from user context
        specialization: profile.specialization || "",
        yearOfExperience: profile.experience || "",
        title: profile.title || "",
        bio: profile.bio || "",
        certifications: profile.certifications
          ? profile.certifications.split(",").filter((cert) => cert.trim())
          : [],
        hourlyRate: profile.hourlyRate || "",
        active: profile.active,
        coachActive: profile.coachActive,
        createdAt: profile.createdAt,
        avatarUrl: profile.avatarUrl || "",
      });
      setDisplayName(coachName);
    } catch (error) {
      console.error("Error loading coach profile:", error);
      setError("Failed to load profile. Please try again.");
      // Use basic user data if API fails
      const fallbackName = user.fullName || "";
      setCoachData({
        id: user.coachId,
        fullName: fallbackName,
        email: user.email || "",
        specialization: "",
        yearOfExperience: "",
        title: "",
        bio: "",
        certifications: [],
        hourlyRate: "",
        active: true,
        coachActive: true,
      });
      setDisplayName(fallbackName);
    } finally {
      setLoading(false);
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
          <h2 style={styles.sidebarTitle}>COACH PROFILE</h2>
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
        <h1 style={styles.pageTitle}>Coaches Management</h1>
        {error && (
          <div style={styles.errorMessage}>
            {error}
            <button onClick={loadCoachProfile} style={styles.retryButton}>
              Retry
            </button>
          </div>
        )}
        {loading ? (
          <div style={styles.loadingMessage}>Loading profile...</div>
        ) : (
          <div style={styles.profileCard}>
            <div style={styles.profileHeader}>
              <h2 style={styles.profileTitle}>My Profile</h2>
              <Link to="/coach/edit-profile" style={styles.menuLink}>
                <button style={styles.editButton}>
                  <span style={styles.editButtonIcon}></span> Edit Profile
                </button>
              </Link>
            </div>
            <div style={styles.profileDetails}>
              <div style={styles.profileAvatar}>
                <img
                  src={
                    coachData.avatarUrl
                      ? `http://localhost:8080${coachData.avatarUrl}`
                      : "https://via.placeholder.com/100x100/4CAF50/white?text=Coach"
                  }
                  alt="Profile Avatar"
                  style={styles.avatarImage}
                />
              </div>
              <div style={styles.profileInfo}>
                <div style={styles.infoGrid}>
                  <div style={styles.infoColumn}>
                    <p style={styles.detailLabel}>Full Name</p>
                    <p style={styles.detailValue}>
                      {coachData.fullName || "N/A"}
                    </p>

                    <p style={styles.detailLabel}>Email</p>
                    <p style={styles.detailValue}>{coachData.email || "N/A"}</p>

                    <p style={styles.detailLabel}>Title</p>
                    <p style={styles.detailValue}>
                      {coachData.title || "Not specified"}
                    </p>

                    <p style={styles.detailLabel}>Specialization</p>
                    <p style={styles.detailValue}>
                      {coachData.specialization || "Not specified"}
                    </p>
                  </div>

                  <div style={styles.infoColumn}>
                    <p style={styles.detailLabel}>Years of Experience</p>
                    <p style={styles.detailValue}>
                      {coachData.yearOfExperience || "Not specified"}
                    </p>

                    <p style={styles.detailLabel}>Hourly Rate</p>
                    <p style={styles.detailValue}>
                      {coachData.hourlyRate
                        ? `$${coachData.hourlyRate}/hour`
                        : "Not specified"}
                    </p>

                    <p style={styles.detailLabel}>Status</p>
                    <p style={styles.detailValue}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: coachData.active
                            ? "#e8f5e8"
                            : "#ffebee",
                          color: coachData.active ? "#2e7d32" : "#d32f2f",
                        }}
                      >
                        {coachData.active ? "Active" : "Inactive"}
                      </span>
                      {coachData.coachActive && (
                        <span
                          style={{
                            ...styles.statusBadge,
                            backgroundColor: "#e3f2fd",
                            color: "#1976d2",
                            marginLeft: "8px",
                          }}
                        >
                          Available for Coaching
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div style={styles.fullWidthSection}>
                  <p style={styles.detailLabel}>Bio</p>
                  <p
                    style={{
                      ...styles.bioText,
                      fontStyle: coachData.bio ? "normal" : "italic",
                    }}
                  >
                    {coachData.bio ||
                      "No bio available. Add a bio to help members learn about your background and expertise."}
                  </p>

                  <p style={styles.detailLabel}>Certifications</p>
                  {coachData.certifications &&
                  coachData.certifications.length > 0 ? (
                    <div style={styles.certificationsGrid}>
                      {coachData.certifications.map((cert, index) => (
                        <span key={index} style={styles.certificationBadge}>
                          {cert}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.certificationText}>
                      No certifications added. Add your certifications to build
                      trust with members.
                    </p>
                  )}
                </div>
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
    backgroundColor: "#DFF5DE", // Overall background color
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
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    padding: "30px",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
  },
  profileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
    marginBottom: "20px",
  },
  profileTitle: {
    fontSize: "22px",
    color: "#2E7D32",
    margin: "0",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#E8F5E9",
    color: "#2E7D32",
    border: "1px solid #A5D6A7",
    padding: "8px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    ":hover": {
      backgroundColor: "#DCEDC8",
    },
  },
  editButtonIcon: {
    fontSize: "16px",
  },
  profileDetails: {
    display: "flex",
    alignItems: "flex-start",
    gap: "30px",
  },
  profileAvatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#ccc", // Placeholder background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profileInfo: {
    flex: 1,
  },
  detailLabel: {
    fontSize: "16px",
    color: "#333",
    fontWeight: "bold",
    margin: "0 0 5px 0",
  },
  detailValue: {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 15px 0",
  },
  certificationText: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 5px 0",
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
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column",
  },
  fullWidthSection: {
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },
  bioText: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    margin: "0 0 20px 0",
    padding: "12px",
    backgroundColor: "#f9f9f9",
    borderRadius: "6px",
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  certificationsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    margin: "0",
  },
  certificationBadge: {
    display: "inline-block",
    padding: "6px 12px",
    backgroundColor: "#e8f5e8",
    color: "#2e7d32",
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: "bold",
    border: "1px solid #a5d6a7",
  },
};

export default CoachProfile;
