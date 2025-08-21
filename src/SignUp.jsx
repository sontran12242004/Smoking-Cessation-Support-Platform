import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      const registrationData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone || null,
        role: "MEMBERS ", // Default role for new users
      };

      const response = await axios.post(
        "http://localhost:8080/api/register",
        registrationData
      );

      if (response.status === 200 || response.status === 201) {
        // Registration successful
        alert("Registration successful! Please login with your credentials.");
        navigate("/login");
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
              Begin your
              <br />
              transformation
              <br />
              today
            </div>
            <div style={styles.desc}>
              Our proven system has helped thousands quit smoking for good.
              You're just 3 steps away from a healthier life.
            </div>
            <div style={styles.stats}>
              <div style={styles.stat}>
                <span style={styles.statNumber}>87%</span>
                Success Rate
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>24/7</span>
                Support
              </div>
            </div>
          </div>
          <div style={styles.rightPanel}>
            <h2 style={styles.title}>Create Account</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="fullName" style={styles.label}>
                  Full Name
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
                  Email Address
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
              <div style={styles.formGroup}>
                <label htmlFor="phone" style={styles.label}>
                  Phone Number (Optional)
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
                <label htmlFor="password" style={styles.label}>
                  Password
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
                  Confirm Password
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
                {loading ? "Creating Account..." : "Sign up"}
              </button>
            </form>
            <div style={styles.loginLink}>
              Already have an account?{" "}
              <Link to="/login" style={styles.loginLinkText}>
                Login
              </Link>
            </div>
            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>or</span>
              <div style={styles.dividerLine}></div>
            </div>
            <div style={styles.coachSignupSection}>
              <p style={styles.coachText}>
                Want to become a coach and help others quit smoking?
              </p>
              <Link to="/coach-signup" style={styles.coachSignupBtn}>
                Join as Coach
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
    height: "100vh",
    width: "100%",
  },
  signupWrapper: {
    display: "flex",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
    overflow: "hidden",
    minWidth: "800px",
    minHeight: "520px",
  },
  leftPanel: {
    background: "#4d8b3c",
    color: "#fff",
    padding: "40px 36px 40px 40px",
    width: "370px",
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
    width: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    color: "#4d8b3c",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "8px",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  formGroup: {
    marginBottom: "16px",
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
    transition: "background 0.2s",
  },
  loginLink: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#222",
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
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "20px 0 15px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e0e0e0",
  },
  dividerText: {
    padding: "0 15px",
    color: "#666",
    fontSize: "0.9rem",
  },
  coachSignupSection: {
    textAlign: "center",
    marginTop: "15px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
  },
  coachText: {
    margin: "0 0 15px 0",
    color: "#666",
    fontSize: "0.95rem",
    lineHeight: "1.4",
  },
  coachSignupBtn: {
    display: "inline-block",
    background: "#FF9800",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "background 0.2s",
    border: "none",
    cursor: "pointer",
  },
};

export default Signup;
