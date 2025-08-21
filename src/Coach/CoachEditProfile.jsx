import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddCertificationModal from "./AddCertificationModal";
import { useUser } from "../UserContext";
import ApiService from "../apiService";

const CoachEditProfile = () => {
  const [activeMenu, setActiveMenu] = useState("My Profile");
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  // Form states
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    specialization: "",
    experience: "",
    title: "",
    bio: "",
    certifications: "",
    hourlyRate: "",
    active: true,
    coachActive: true,
  });

  const [certifications, setCertifications] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");


  useEffect(() => {
    if (user && user.coachId) {
      loadCoachProfile();
    }
  }, [user]);

  const loadCoachProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const profile = await ApiService.getCoachById(user.coachId);

      const coachName = profile.name || user.fullName || "";
      setFormData({
        id: profile.id,
        name: coachName,
        specialization: profile.specialization || "",
        experience: profile.experience || "",
        title: profile.title || "",
        bio: profile.bio || "",
        certifications: profile.certifications || "",
        hourlyRate: profile.hourlyRate || "",
        active: profile.active,
        coachActive: profile.coachActive,
      });

      setDisplayName(coachName);
      setCertifications(
        profile.certifications
          ? profile.certifications.split(",").filter((cert) => cert.trim())
          : []
      );
    } catch (error) {
      console.error("Error loading coach profile:", error);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCertification = (newCert) => {
    const updatedCertifications = [...certifications, newCert];
    setCertifications(updatedCertifications);
    setFormData((prev) => ({
      ...prev,
      certifications: updatedCertifications.join(","),
    }));
  };

  const removeCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
    setFormData((prev) => ({
      ...prev,
      certifications: updatedCertifications.join(","),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // Validate required fields
      if (!formData.name.trim()) {
        setError("Name is required");
        return;
      }

      // Prepare data for API - send all fields with proper values
      const updateData = {
        name: formData.name?.trim() || "",
        specialization: formData.specialization?.trim() || null,
        experience: formData.experience?.trim() || null,
        title: formData.title?.trim() || null,
        bio: formData.bio?.trim() || null,
        certifications: formData.certifications?.trim() || null,
        hourlyRate:
          formData.hourlyRate && formData.hourlyRate !== ""
            ? parseFloat(formData.hourlyRate)
            : null,
        active: Boolean(formData.active),
        coachActive: Boolean(formData.coachActive),
      };

      console.log("Form data before processing:", formData);
      console.log("Final update data:", updateData);

      const response = await ApiService.updateCoachProfile(
        user.coachId,
        updateData
      );
      console.log("Update response:", response);

      setSuccess("Profile updated successfully!");

      // Redirect back to profile after 2 seconds
      setTimeout(() => {
        navigate("/coach/profile");
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      setSaving(true);
      const response = await ApiService.uploadCoachAvatar(user.coachId, formData);
      console.log("Upload success", response);
      setSuccess("Avatar uploaded successfully!");
      loadCoachProfile(); // Tải lại thông tin sau khi upload
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload avatar. Please try again.");
    } finally {
      setSaving(false);
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
          <h2 style={styles.sidebarTitle}>COACH EDIT PROFILE</h2>
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

        {error && <div style={styles.errorMessage}>{error}</div>}

        {success && <div style={styles.successMessage}>{success}</div>}

        {loading ? (
          <div style={styles.loadingMessage}>Loading profile...</div>
        ) : (
          <div style={styles.editProfileCard}>
            <Link to="/coach/profile" style={styles.backButtonInCardContainer}>
              <button style={styles.backButtonInCard}>← Back To Profile</button>
            </Link>
            <h2 style={styles.editProfileTitle}>Edit My Profile</h2>
            <div style={styles.profileAvatarSection}>
  <div style={styles.profileAvatar}>
    <img
      src={
        previewUrl ||
        formData.avatarUrl ||
        "https://via.placeholder.com/100?text=Avatar"
      }
      alt="Profile Avatar"
      style={styles.avatarImage}
    />
  </div>
  <input
    type="file"
    id="choose-file"
    style={{ display: "none" }}
    accept="image/*"
    onChange={handleFileChange}
  />
  <label htmlFor="choose-file" style={styles.chooseFileLabel}>
    Choose File
  </label>
  <button
    style={styles.uploadButton}
    onClick={handleUpload}
    disabled={!selectedFile || saving}
  >
    {saving ? "Uploading..." : "Upload"}
  </button>
</div>


            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Senior Smoking Cessation Specialist"
                />
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Specialization</label>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.specialization}
                  onChange={(e) =>
                    handleInputChange("specialization", e.target.value)
                  }
                  placeholder="e.g., Cognitive Behavioral Therapy, Mindfulness"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Years of Experience</label>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  placeholder="e.g., 5 years"
                />
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Hourly Rate (USD)</label>
                <input
                  type="number"
                  style={styles.input}
                  value={formData.hourlyRate}
                  onChange={(e) =>
                    handleInputChange("hourlyRate", e.target.value)
                  }
                  placeholder="e.g., 50"
                  min="0"
                  step="0.01"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Status</label>
                <div style={styles.checkboxGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) =>
                        handleInputChange("active", e.target.checked)
                      }
                      style={styles.checkbox}
                    />
                    Active Profile
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.coachActive}
                      onChange={(e) =>
                        handleInputChange("coachActive", e.target.checked)
                      }
                      style={styles.checkbox}
                    />
                    Available for Coaching
                  </label>
                </div>
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Professional Bio</label>
                <textarea
                  style={styles.textarea}
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Share your background, experience, and approach to helping people quit smoking..."
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Certifications</label>
                <div style={styles.certificationsContainer}>
                  {certifications.map((cert, index) => (
                    <div key={index} style={styles.certificationItem}>
                      <span style={styles.certificationText}>{cert}</span>
                      <button
                        style={styles.removeCertButton}
                        onClick={() => removeCertification(index)}
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    style={styles.addCertificationButton}
                    onClick={() => setIsModalOpen(true)}
                    type="button"
                  >
                    + Add Certification
                  </button>
                </div>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <Link to="/coach/profile" style={styles.cancelButtonLink}>
                <button style={styles.cancelButton} disabled={saving}>
                  Cancel
                </button>
              </Link>
              <button
                style={{
                  ...styles.saveButton,
                  opacity: saving ? 0.6 : 1,
                  cursor: saving ? "not-allowed" : "pointer",
                }}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>

      <AddCertificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCertification={handleAddCertification}
      />
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
  editProfileCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    padding: "30px",
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    position: "relative",
  },
  editProfileTitle: {
    fontSize: "22px",
    color: "#2E7D32",
    margin: "0 0 20px 0",
    fontWeight: "bold",
    textAlign: "center",
  },
  profileAvatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  },
  profileAvatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: "10px",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  chooseFileLabel: {
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  uploadButton: {
    backgroundColor: "#A5D6A7",
    color: "#2E7D32",
    border: "none",
    padding: "8px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#8BC34A",
    },
  },
  formRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  formGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    minHeight: "100px",
    resize: "vertical",
  },
  certificationText: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 5px 0",
  },
  addCertificationButton: {
    backgroundColor: "transparent",
    color: "#2E7D32",
    border: "1px dashed #A5D6A7",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#E8F5E9",
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
  },
  cancelButton: {
    backgroundColor: "#D32F2F",
    color: "white",
    border: "none",
    padding: "10px 25px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#B71C1C",
    },
  },
  cancelButtonLink: {
    textDecoration: "none",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 25px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#43A047",
    },
  },
  backButtonInCardContainer: {
    position: "absolute",
    top: "20px",
    left: "20px",
    textDecoration: "none",
  },
  backButtonInCard: {
    backgroundColor: "transparent",
    color: "#666",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#E0E0E0",
    },
  },
};

export default CoachEditProfile;
