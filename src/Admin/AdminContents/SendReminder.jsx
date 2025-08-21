import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../apiService";

const SendReminder = () => {
  const [activeMenu, setActiveMenu] = useState("ContentsSendReminder");
  const [showContentsDropdown, setShowContentsDropdown] = useState(true);
  const [reminderContent, setReminderContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");

    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      navigate("/login");
    }
  };

  const handleSendReminder = async () => {
    if (!reminderContent.trim()) {
      setMessage("Please enter reminder content");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await ApiService.sendReminderToAllMembers(reminderContent.trim());
      setMessage("Reminder sent successfully to all members!");
      setMessageType("success");
      setReminderContent(""); // Clear the form
    } catch (error) {
      console.error("Error sending reminder:", error);
      setMessage(
        error.response?.data?.message ||
          "Failed to send reminder. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsLoading(false);
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
        <h1 style={styles.header}>SEND REMINDER TO ALL MEMBERS</h1>

        <div style={styles.contentCard}>
          <h2 style={styles.pageTitle}>Send Reminder Message</h2>
          <p style={styles.description}>
            Send a reminder message to all members in the platform. This will
            notify all users about important updates, announcements, or
            motivation messages.
          </p>

          {/* Message Display */}
          {message && (
            <div
              style={{
                ...styles.messageBox,
                backgroundColor:
                  messageType === "success" ? "#E8F5E9" : "#FFEBEE",
                color: messageType === "success" ? "#2E7D32" : "#C62828",
                border: `1px solid ${
                  messageType === "success" ? "#4CAF50" : "#F44336"
                }`,
              }}
            >
              {message}
            </div>
          )}

          {/* Reminder Form */}
          <div style={styles.formContainer}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Reminder Content *</label>
              <textarea
                style={styles.textarea}
                value={reminderContent}
                onChange={(e) => setReminderContent(e.target.value)}
                placeholder="Enter your reminder message here... (e.g., Don't forget to complete your daily check-in today!)"
                rows="6"
                disabled={isLoading}
              />
              <div style={styles.charCount}>
                {reminderContent.length}/500 characters
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <button
                style={{
                  ...styles.sendButton,
                  opacity: isLoading || !reminderContent.trim() ? 0.6 : 1,
                  cursor:
                    isLoading || !reminderContent.trim()
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={handleSendReminder}
                disabled={isLoading || !reminderContent.trim()}
              >
                {isLoading ? "Sending..." : "Send Reminder to All Members"}
              </button>
            </div>
          </div>

          {/* Tips Section */}
          <div style={styles.tipsSection}>
            <h3 style={styles.tipsTitle}>💡 Tips for effective reminders:</h3>
            <ul style={styles.tipsList}>
              <li>Keep messages clear and concise</li>
              <li>Include specific actions you want members to take</li>
              <li>Use encouraging and positive language</li>
              <li>Consider the timing of your reminder</li>
              <li>Make it relevant to their quit journey</li>
            </ul>
          </div>

          {/* Examples Section */}
          <div style={styles.examplesSection}>
            <h3 style={styles.examplesTitle}>📝 Example reminder messages:</h3>
            <div style={styles.exampleCard}>
              <strong>Daily Check-in Reminder:</strong>
              <br />
              "Good morning! 🌅 Don't forget to complete your daily check-in and
              track your smoke-free progress. Every day counts on your journey
              to a healthier you!"
            </div>
            <div style={styles.exampleCard}>
              <strong>Milestone Celebration:</strong>
              <br />
              "Congratulations to all our members who are staying strong! 🎉
              Remember to celebrate your milestones and support each other in
              our community."
            </div>
            <div style={styles.exampleCard}>
              <strong>Weekend Motivation:</strong>
              <br />
              "Weekend vibes! 💪 Weekends can be challenging, but you've got the
              tools and strength to stay smoke-free. Use our coping strategies
              and reach out if you need support!"
            </div>
          </div>
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
  mainContent: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#DFF5DE",
  },
  header: {
    fontSize: "28px",
    color: "#2E7D32",
    margin: "0 0 20px 0",
    fontWeight: "bold",
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    maxWidth: "800px",
  },
  pageTitle: {
    fontSize: "24px",
    color: "#2E7D32",
    margin: "0 0 10px 0",
    fontWeight: "bold",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 30px 0",
    lineHeight: "1.5",
  },
  messageBox: {
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  formContainer: {
    marginBottom: "30px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "8px",
    fontWeight: "bold",
    display: "block",
  },
  textarea: {
    width: "100%",
    padding: "15px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    resize: "vertical",
    minHeight: "120px",
    boxSizing: "border-box",
    "&:focus": {
      borderColor: "#4CAF50",
      outline: "none",
    },
  },
  charCount: {
    fontSize: "12px",
    color: "#999",
    marginTop: "5px",
    textAlign: "right",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "15px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
  tipsSection: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  tipsTitle: {
    fontSize: "18px",
    color: "#2E7D32",
    margin: "0 0 15px 0",
    fontWeight: "bold",
  },
  tipsList: {
    margin: "0",
    paddingLeft: "20px",
    color: "#555",
  },
  examplesSection: {
    backgroundColor: "#f0f8f0",
    padding: "20px",
    borderRadius: "8px",
  },
  examplesTitle: {
    fontSize: "18px",
    color: "#2E7D32",
    margin: "0 0 15px 0",
    fontWeight: "bold",
  },
  exampleCard: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "10px",
    border: "1px solid #e0e0e0",
    fontSize: "14px",
    color: "#333",
    lineHeight: "1.4",
  },
};

export default SendReminder;
