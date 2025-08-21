import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CoachSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    title: "",
    bio: "",
    specialization: "",
    experience: "",
    hourlyRate: "",
    certifications: [],
  });
  const [certificationInput, setCertificationInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCertification = () => {
    if (
      certificationInput.trim() &&
      !formData.certifications.includes(certificationInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, certificationInput.trim()],
      }));
      setCertificationInput("");
    }
  };

  const handleRemoveCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.fullName
    ) {
      setError("Please fill in all required fields.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (
      formData.hourlyRate &&
      (isNaN(formData.hourlyRate) || parseFloat(formData.hourlyRate) <= 0)
    ) {
      setError("Please enter a valid hourly rate.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // First register the user with COACH role
      const registrationData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone || "",
        role: "COACH",
        enabled: true,
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
      };

      console.log("Registering coach with data:", registrationData);

      const response = await axios.post(
        "http://localhost:8080/api/register",
        registrationData
      );

      if (response.status === 200 || response.status === 201) {
        // Registration successful - create coach profile
        const coachProfileData = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone || "",
          password: formData.password, // Include password for coach creation
          title: formData.title || "",
          bio: formData.bio || "",
          hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : 0,
          specialization: formData.specialization || "",
          certifications: formData.certifications.join(", "),
          experience: formData.experience || "",
          active: true,
          coachActive: true,
        };

        console.log("Creating coach profile with data:", coachProfileData);

        // Create coach profile
        try {
          await axios.post(
            "http://localhost:8080/api/coaches",
            coachProfileData
          );

          alert(
            "Coach registration successful! Please login with your credentials."
          );
          navigate("/login");
        } catch (coachErr) {
          console.error("Coach profile creation error:", coachErr);
          setError(
            "Registration completed but failed to create coach profile. Please contact support."
          );
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 409) {
        setError("Email already exists. Please use a different email.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.signupWrapper}>
          <div style={styles.leftPanel}>
            <div style={styles.logo}></div>
            <div style={styles.brand}>NicOff</div>
            <div style={styles.slogan}>Turn Off Nicotine, Turn On Life!</div>
            <div style={styles.welcome}>
              Join as a<br />
              Professional
              <br />
              Coach
            </div>
            <div style={styles.desc}>
              Help others on their journey to quit smoking. Share your expertise
              and make a meaningful impact in people's lives.
            </div>
            <div style={styles.stats}>
              <div style={styles.stat}>
                <span style={styles.statNumber}>500+</span>
                Coaches
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>95%</span>
                Satisfaction
              </div>
            </div>
          </div>
          <div style={styles.rightPanel}>
            <h2 style={styles.title}>Coach Registration</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div style={styles.sectionTitle}>Personal Information</div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="fullName" style={styles.label}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    style={styles.input}
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    style={styles.input}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="phone" style={styles.label}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    style={styles.input}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="hourlyRate" style={styles.label}>
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    id="hourlyRate"
                    name="hourlyRate"
                    placeholder="e.g., 75"
                    min="0"
                    step="0.01"
                    style={styles.input}
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="password" style={styles.label}>
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    style={styles.input}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="confirmPassword" style={styles.label}>
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div style={styles.sectionTitle}>Professional Information</div>

              <div style={styles.formGroup}>
                <label htmlFor="title" style={styles.label}>
                  Professional Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g., Licensed Therapist, Addiction Specialist"
                  style={styles.input}
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="specialization" style={styles.label}>
                    Specialization
                  </label>
                  <select
                    id="specialization"
                    name="specialization"
                    style={styles.input}
                    value={formData.specialization}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Specialization</option>
                    <option value="Addiction Specialist">
                      Addiction Specialist
                    </option>
                    <option value="Behavioral Therapy">
                      Behavioral Therapy
                    </option>
                    <option value="Cognitive Behavioral Therapy">
                      Cognitive Behavioral Therapy
                    </option>
                    <option value="Mindfulness Coach">Mindfulness Coach</option>
                    <option value="Health Coach">Health Coach</option>
                    <option value="Counseling Psychology">
                      Counseling Psychology
                    </option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="experience" style={styles.label}>
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    placeholder="e.g., 5 years"
                    style={styles.input}
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="bio" style={styles.label}>
                  Professional Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about your background and approach to helping clients quit smoking..."
                  style={{
                    ...styles.input,
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>

              {/* Certifications */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Certifications</label>
                <div style={styles.certificationInput}>
                  <input
                    type="text"
                    placeholder="Add a certification"
                    style={{ ...styles.input, flex: 1, marginBottom: 0 }}
                    value={certificationInput}
                    onChange={(e) => setCertificationInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddCertification())
                    }
                  />
                  <button
                    type="button"
                    onClick={handleAddCertification}
                    style={styles.addButton}
                  >
                    Add
                  </button>
                </div>
                {formData.certifications.length > 0 && (
                  <div style={styles.certificationList}>
                    {formData.certifications.map((cert, index) => (
                      <span key={index} style={styles.certificationTag}>
                        {cert}
                        <button
                          type="button"
                          onClick={() => handleRemoveCertification(index)}
                          style={styles.removeButton}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {error && <div style={styles.error}>{error}</div>}

              <button
                type="submit"
                style={{
                  ...styles.signupBtn,
                  backgroundColor: loading ? "#cccccc" : "#4d8b3c",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register as Coach"}
              </button>
            </form>
            <div style={styles.loginLink}>
              Already have an account?{" "}
              <Link to="/login" style={styles.loginLinkText}>
                Login
              </Link>
            </div>
            <div style={styles.loginLink}>
              Looking to join as a member?{" "}
              <Link to="/signup" style={styles.loginLinkText}>
                Member Signup
              </Link>
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
    backgroundColor: "#f5f5f5",
    fontFamily: "Inter, Segoe UI, Arial, sans-serif",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    padding: "20px",
  },
  signupWrapper: {
    display: "flex",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
    overflow: "hidden",
    minWidth: "1000px",
    minHeight: "700px",
  },
  leftPanel: {
    background: "#4d8b3c",
    color: "#fff",
    padding: "40px 36px 40px 40px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "400",
    color: "#222",
    marginBottom: "8px",
  },
  brand: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "0",
  },
  slogan: {
    fontStyle: "italic",
    fontSize: "1rem",
    color: "#e0e0e0",
    marginBottom: "32px",
  },
  welcome: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "16px",
  },
  desc: {
    fontSize: "1rem",
    marginBottom: "32px",
    color: "#e0e0e0",
  },
  stats: {
    display: "flex",
    gap: "32px",
  },
  stat: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#fff",
  },
  statNumber: {
    display: "block",
    fontSize: "1.2rem",
    fontWeight: "900",
    color: "#b6ffb6",
  },
  rightPanel: {
    padding: "40px 36px 40px 36px",
    width: "650px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxHeight: "700px",
    overflowY: "auto",
  },
  title: {
    color: "#4d8b3c",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#4d8b3c",
    marginBottom: "15px",
    marginTop: "20px",
    borderBottom: "2px solid #e0e0e0",
    paddingBottom: "5px",
  },
  formRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "16px",
  },
  formGroup: {
    marginBottom: "16px",
    flex: 1,
  },
  label: {
    display: "block",
    fontWeight: "600",
    marginBottom: "4px",
    color: "#222",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1.5px solid #b6d7b6",
    borderRadius: "6px",
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.2s",
    boxSizing: "border-box",
  },
  certificationInput: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#4d8b3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  certificationList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  certificationTag: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  removeButton: {
    marginLeft: "6px",
    background: "none",
    border: "none",
    color: "#d32f2f",
    cursor: "pointer",
    fontSize: "1.2rem",
    lineHeight: 1,
  },
  signupBtn: {
    width: "100%",
    background: "#4d8b3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "12px 0",
    fontSize: "1.1rem",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "10px",
    marginTop: "20px",
    transition: "background 0.2s",
  },
  loginLink: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#222",
    marginBottom: "10px",
  },
  loginLinkText: {
    color: "#4d8b3c",
    fontWeight: "700",
    textDecoration: "none",
  },
  error: {
    color: "#d32f2f",
    fontSize: "0.9rem",
    marginBottom: "10px",
    textAlign: "center",
    padding: "8px",
    backgroundColor: "#ffebee",
    border: "1px solid #ffcdd2",
    borderRadius: "4px",
  },
};

export default CoachSignUp;
