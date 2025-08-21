import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../apiService";

function AddPackageModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [featureType, setFeatureType] = useState(true); // true: tick, false: x
  const [desc, setDesc] = useState("");

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureInput.trim()) {
      setFeatures([
        ...features,
        { text: featureInput.trim(), ok: featureType },
      ]);
      setFeatureInput("");
      setFeatureType(true);
    }
  };
  const handleRemoveFeature = (idx) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !duration) return;
    onAdd({ name, price, duration, features, desc });
    onClose();
  };
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.popup}>
        <button style={modalStyles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <h2 style={modalStyles.title}>Add New Package</h2>
        <form style={modalStyles.form} onSubmit={handleSubmit}>
          <label style={modalStyles.label}>Package Name</label>
          <input
            style={modalStyles.input}
            placeholder="Package Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label style={modalStyles.label}>Price</label>
          <input
            style={modalStyles.input}
            placeholder="Eg: $39"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label style={modalStyles.label}>Duration</label>
          <input
            style={modalStyles.input}
            placeholder="Eg: 2 months, 3 months ..."
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <label style={modalStyles.label}>Features</label>
          <div style={modalStyles.featureInputRow}>
            <input
              style={{ ...modalStyles.input, flex: 1, marginBottom: 0 }}
              placeholder="Enter Feature"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
            />
            <select
              style={{ height: 40, marginLeft: 4, borderRadius: 8 }}
              value={featureType ? "tick" : "x"}
              onChange={(e) => setFeatureType(e.target.value === "tick")}
            >
              <option value="tick">✔</option>
              <option value="x">✖</option>
            </select>
            <button
              style={modalStyles.addFeatureBtn}
              onClick={handleAddFeature}
            >
              + Add Feature
            </button>
          </div>
          <div style={modalStyles.featureList}>
            {features.map((f, idx) => (
              <div key={idx} style={modalStyles.featureItem}>
                <span>
                  {f.text} {f.ok ? "✔" : "✖"}
                </span>
                <button
                  type="button"
                  style={modalStyles.removeFeatureBtn}
                  onClick={() => handleRemoveFeature(idx)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
          <label style={modalStyles.label}>Description</label>
          <textarea
            style={{ ...modalStyles.input, minHeight: 60 }}
            placeholder="Eg: This is our newest Package"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div style={modalStyles.btnRow}>
            <button
              type="button"
              style={modalStyles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" style={modalStyles.addBtn}>
              + Add Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditPackageModal({ onClose, pkg, onSave }) {
  const [name, setName] = useState(pkg?.name || "");
  const [price, setPrice] = useState(pkg?.price || "");
  const [duration, setDuration] = useState(pkg?.duration || "");
  const [features, setFeatures] = useState(
    pkg?.features ? pkg.features.map((f) => ({ ...f })) : []
  );
  const [featureInput, setFeatureInput] = useState("");
  const [featureType, setFeatureType] = useState(true);
  const [desc, setDesc] = useState(pkg?.desc || "");

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureInput.trim()) {
      setFeatures([
        ...features,
        { text: featureInput.trim(), ok: featureType },
      ]);
      setFeatureInput("");
      setFeatureType(true);
    }
  };
  const handleRemoveFeature = (idx) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !duration) return;
    onSave({ name, price, duration, features, desc });
    onClose();
  };
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.popup}>
        <button style={modalStyles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <h2 style={modalStyles.title}>Edit Package</h2>
        <form style={modalStyles.form} onSubmit={handleSubmit}>
          <label style={modalStyles.label}>Package Name</label>
          <input
            style={modalStyles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label style={modalStyles.label}>Price</label>
          <input
            style={modalStyles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label style={modalStyles.label}>Duration</label>
          <input
            style={modalStyles.input}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <label style={modalStyles.label}>Features</label>
          <div style={modalStyles.featureInputRow}>
            <input
              style={{ ...modalStyles.input, flex: 1, marginBottom: 0 }}
              placeholder="Enter Feature"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
            />
            <select
              style={{ height: 40, marginLeft: 4, borderRadius: 8 }}
              value={featureType ? "tick" : "x"}
              onChange={(e) => setFeatureType(e.target.value === "tick")}
            >
              <option value="tick">✔</option>
              <option value="x">✖</option>
            </select>
            <button
              style={modalStyles.addFeatureBtn}
              onClick={handleAddFeature}
            >
              + Add Feature
            </button>
          </div>
          <div style={modalStyles.featureList}>
            {features.map((f, idx) => (
              <div key={idx} style={modalStyles.featureItem}>
                <span>
                  {f.text} {f.ok ? "✔" : "✖"}
                </span>
                <button
                  type="button"
                  style={modalStyles.removeFeatureBtn}
                  onClick={() => handleRemoveFeature(idx)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
          <label style={modalStyles.label}>Description</label>
          <textarea
            style={{ ...modalStyles.input, minHeight: 60 }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div style={modalStyles.btnRow}>
            <button
              type="button"
              style={modalStyles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" style={modalStyles.saveBtn}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const AdminPackage = () => {
  const [activeMenu, setActiveMenu] = useState("Packages");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [packages, setPackages] = useState([]);
  const [showContentsDropdown, setShowContentsDropdown] = useState(false);
  const navigate = useNavigate();

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  // Function to fetch packages from API
  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError("");

      const packagesData = await ApiService.getMembershipPlans();
      console.log("Packages data received:", packagesData);

      // Transform API data to match current component structure
      const transformedPackages = packagesData.map((plan) => {
        // Parse features from description field
        let features = [];
        if (plan.description) {
          // Split by newlines and parse each feature
          const featureLines = plan.description.split('\n').filter(line => line.trim());
          features = featureLines.map(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('+')) {
              return { text: trimmed.substring(1).trim(), ok: true };
            } else if (trimmed.startsWith('-')) {
              return { text: trimmed.substring(1).trim(), ok: false };
            } else {
              return { text: trimmed, ok: true };
            }
          });
        }
        
        // Fallback features if no description or empty features
        if (features.length === 0) {
          features = [
            { text: "Basic progress tracking", ok: true },
            { text: "Community access", ok: plan.price > 0 },
            { text: "Weekly tips", ok: true },
            { text: "Personal coach", ok: plan.price > 50 },
            { text: "Advanced analytics", ok: plan.price > 100 },
            { text: "Email reminders", ok: plan.price > 0 },
          ];
        }

        return {
          planID: plan.planID,
          name: plan.name,
          price: plan.price === 0 ? "Free" : new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(plan.price),
          duration: plan.duration >= 365 ? `${Math.floor(plan.duration / 365)} year${Math.floor(plan.duration / 365) > 1 ? 's' : ''}` : `${plan.duration} day${plan.duration > 1 ? 's' : ''}`,
          description: plan.description,
          active: plan.active,
          createdAt: plan.createdAt,
          features: features,
        };
      });

      setPackages(transformedPackages);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setError("Failed to load packages. Please try again.");
      // Remove fallback to initialPackages - keep packages empty
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding new package
  const handleAddPackage = async (newPackageData) => {
    try {
      setLoading(true);

      // Parse duration from string input
      let durationInDays = 30; // default
      const durationStr = newPackageData.duration.toLowerCase();
      
      if (durationStr.includes('year')) {
        const years = parseInt(durationStr.replace(/\D/g, "")) || 1;
        durationInDays = years * 365;
      } else if (durationStr.includes('month')) {
        const months = parseInt(durationStr.replace(/\D/g, "")) || 1;
        durationInDays = months * 30;
      } else if (durationStr.includes('day')) {
        durationInDays = parseInt(durationStr.replace(/\D/g, "")) || 30;
      } else {
        // Just extract number and assume days
        durationInDays = parseInt(durationStr.replace(/\D/g, "")) || 30;
      }

      // Parse price from string input (handle $ prefix)
      const priceValue = parseFloat(newPackageData.price.replace(/[^0-9.]/g, "")) || 0;

      // Convert features array to description string
      let description = newPackageData.desc || newPackageData.description || "";
      if (newPackageData.features && newPackageData.features.length > 0) {
        const featureDescriptions = newPackageData.features.map(feature => {
          const prefix = feature.ok ? '+' : '-';
          return `${prefix}${feature.text}`;
        });
        
        if (description) {
          description += '\n' + featureDescriptions.join('\n');
        } else {
          description = featureDescriptions.join('\n');
        }
      }

      // Transform form data to API format matching the expected schema
      const apiPackageData = {
        name: newPackageData.name,
        duration: durationInDays,
        price: priceValue,
        description: description,
        is_active: true
      };

      console.log("Creating package with data:", apiPackageData);

      // Call API to create package
      const createdPackage = await ApiService.createMembershipPlan(
        apiPackageData
      );

      console.log("Package created successfully:", createdPackage);

      // Refresh packages list
      await fetchPackages();

      alert("Package created successfully!");
    } catch (error) {
      console.error("Error creating package:", error);
      console.error("Error details:", error.response?.data || error.message);
      
      if (error.response?.data?.message) {
        alert(`Failed to create package: ${error.response.data.message}`);
      } else {
        alert("Failed to create package. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle updating package
  const handleUpdatePackage = async (packageData) => {
    try {
      if (editIdx === null) return;

      setLoading(true);

      const currentPackage = packages[editIdx];
      const planId = currentPackage.planID;

      // Parse duration from string input (same logic as create)
      let durationInDays = 30; // default
      const durationStr = packageData.duration.toLowerCase();
      
      if (durationStr.includes('year')) {
        const years = parseInt(durationStr.replace(/\D/g, "")) || 1;
        durationInDays = years * 365;
      } else if (durationStr.includes('month')) {
        const months = parseInt(durationStr.replace(/\D/g, "")) || 1;
        durationInDays = months * 30;
      } else if (durationStr.includes('day')) {
        durationInDays = parseInt(durationStr.replace(/\D/g, "")) || 30;
      } else {
        // Just extract number and assume days
        durationInDays = parseInt(durationStr.replace(/\D/g, "")) || 30;
      }

      // Parse price from string input (handle $ prefix)
      const priceValue = parseFloat(packageData.price.replace(/[^0-9.]/g, "")) || 0;

      // Convert features array to description string
      let description = packageData.desc || packageData.description || "";
      if (packageData.features && packageData.features.length > 0) {
        const featureDescriptions = packageData.features.map(feature => {
          const prefix = feature.ok ? '+' : '-';
          return `${prefix}${feature.text}`;
        });
        
        if (description) {
          description += '\n' + featureDescriptions.join('\n');
        } else {
          description = featureDescriptions.join('\n');
        }
      }

      // Transform form data to API format matching the expected schema
      const apiPackageData = {
        name: packageData.name,
        duration: durationInDays,
        price: priceValue,
        description: description,
        is_active: currentPackage.active
      };

      console.log("Updating package with data:", apiPackageData);

      // Call API to update package
      const updatedPackage = await ApiService.updateMembershipPlan(
        planId,
        apiPackageData
      );

      console.log("Package updated successfully:", updatedPackage);

      // Refresh packages list
      await fetchPackages();

      alert("Package updated successfully!");
    } catch (error) {
      console.error("Error updating package:", error);
      alert("Failed to update package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle deleting package
  const handleDeletePackage = async (idx) => {
    try {
      const packageToDelete = packages[idx];
      const planId = packageToDelete.planID;

      const confirmDelete = window.confirm(
        `Are you sure you want to delete "${packageToDelete.name}"?`
      );
      if (!confirmDelete) return;

      setLoading(true);

      console.log("Deleting package with ID:", planId);

      // Call API to delete package
      await ApiService.deleteMembershipPlan(planId);

      console.log("Package deleted successfully");

      // Refresh packages list
      await fetchPackages();

      alert("Package deleted successfully!");
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("Failed to delete package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");

    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      navigate("/login");
    }
  };

  // Hàm mở popup edit và truyền index
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setShowEdit(true);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar giống Dashboard */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.sidebarTitle}>NicOff</h1>
          <p style={styles.sidebarSubtitle}>Turn Off Nicotine, Turn On Life!</p>
        </div>
        <div style={styles.userSection}>
          <p style={styles.userName}>Jason (Admin)</p>
          <p style={styles.userRole}>Super Admin</p>
        </div>
        <div style={styles.menuContainer}>
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
      {/* Main Content Packages Management */}
      <div style={styles.mainContent}>
        <div
          style={
            showAdd || showEdit
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
              <h1 style={styles.title}>Packages Management</h1>
              <button
                style={styles.addBtn}
                onClick={() => setShowAdd(true)}
                disabled={loading}
              >
                {loading ? "Loading..." : "+ Add New Package"}
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "300px",
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
                  Loading packages...
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
            )}

            {/* Error State */}
            {error && !loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "300px",
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
                  ⚠️ {error}
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
                  onClick={fetchPackages}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Packages Display */}
            {!loading && !error && (
              <>
                {packages.length === 0 && (
                  <div style={{ textAlign: "center", padding: "50px 0", color: "#666" }}>
                    No packages available. Please add a new package.
                  </div>
                )}
                                 {packages.length > 0 && (
                   <>
                     {/* Display all packages from API */}
                <div style={styles.cardRow}>
                      {packages.map((pkg, idx) => {
                    const sortedFeatures = [...pkg.features].sort(
                      (a, b) => b.ok - a.ok
                    );
                    return (
                      <div key={pkg.name + idx} style={styles.card}>
                        <div style={styles.cardTitle}>{pkg.name}</div>
                        <div style={styles.priceRow}>
                          <span style={styles.price}>{pkg.price}</span>
                          <span style={styles.duration}>/{pkg.duration}</span>
                        </div>
                        <ul style={styles.featureList}>
                          {sortedFeatures.map((f, i) => (
                            <li key={i} style={styles.featureItem}>
                              {f.ok ? (
                                <span style={styles.checkIcon}>✔️</span>
                              ) : (
                                <span style={styles.xIcon}>✖️</span>
                              )}
                              <span
                                style={{ color: f.ok ? "#222" : "#c62828" }}
                              >
                                {f.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div style={styles.cardBtnRow}>
                          <button
                            style={styles.editBtn}
                            onClick={() => handleEdit(idx)}
                          >
                            Edit
                          </button>
                          <button
                            style={styles.deleteBtn}
                            onClick={() => handleDeletePackage(idx)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {showAdd && (
          <AddPackageModal
            onClose={() => setShowAdd(false)}
            onAdd={handleAddPackage}
          />
        )}
        {showEdit && (
          <EditPackageModal
            onClose={() => {
              setShowEdit(false);
              setEditIdx(null);
            }}
            pkg={packages[editIdx]}
            onSave={handleUpdatePackage}
          />
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
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: "#406c2b",
    margin: 0,
    letterSpacing: 0.5,
    textShadow: "0 1px 0 #fff",
  },
  addBtn: {
    background: "#4d8b3c",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    fontWeight: 600,
    fontSize: 16,
    boxShadow: "0 2px 4px rgba(77,139,60,0.12)",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  cardRow: {
    display: "flex",
    gap: 32,
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap", // Changed to wrap for flexible layout
    overflowX: "auto",
  },
  card: {
    background: "#eaf7ea",
    border: "2px solid #b6d7b6",
    borderRadius: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: "28px 32px",
    minWidth: 260,
    maxWidth: 280,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#4d8b3c",
    marginBottom: 8,
    textAlign: "center",
  },
  priceRow: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 12,
    gap: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: 700,
    color: "#222",
  },
  duration: {
    fontSize: 16,
    color: "#222",
    marginLeft: 2,
    fontWeight: 400,
  },
  featureList: {
    listStyle: "none",
    padding: 0,
    margin: "12px 0 18px 0",
    width: "100%",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 16,
    marginBottom: 4,
  },
  checkIcon: {
    color: "#4d8b3c",
    fontWeight: 700,
    fontSize: 18,
  },
  xIcon: {
    color: "#c62828",
    fontWeight: 700,
    fontSize: 18,
  },
  cardBtnRow: {
    display: "flex",
    gap: 12,
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
  },
  editBtn: {
    background: "#888",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "7px 22px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
    transition: "background 0.2s",
  },
  deleteBtn: {
    background: "#f77b8a",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "7px 22px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
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
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.18)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
    padding: "36px 40px",
    minWidth: 420,
    maxWidth: 480,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
  },
  title: {
    color: "#357a38",
    fontSize: 28,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontWeight: 600,
    marginBottom: 2,
    color: "#222",
    fontSize: 16,
  },
  input: {
    border: "1.5px solid #4d8b3c",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 16,
    marginBottom: 10,
    outline: "none",
    fontFamily: "inherit",
    background: "#f8fff8",
    transition: "border 0.2s",
  },
  featureInputRow: {
    display: "flex",
    gap: 8,
    marginBottom: 8,
  },
  addFeatureBtn: {
    background: "#4d8b3c",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "0 16px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    height: 40,
    marginLeft: 4,
    transition: "background 0.2s",
  },
  featureList: {
    marginBottom: 10,
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f8fff8",
    border: "1.5px solid #b6d7b6",
    borderRadius: 8,
    padding: "7px 12px",
    marginBottom: 6,
    fontSize: 15,
    fontWeight: 500,
    color: "#222",
  },
  removeFeatureBtn: {
    background: "none",
    border: "none",
    color: "#e53935",
    fontSize: 20,
    fontWeight: 700,
    cursor: "pointer",
    marginLeft: 8,
    lineHeight: 1,
  },
  btnRow: {
    display: "flex",
    gap: 16,
    marginTop: 18,
    justifyContent: "flex-end",
  },
  cancelBtn: {
    background: "#888",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 24px",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  addBtn: {
    background: "#4d8b3c",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 24px",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  saveBtn: {
    background: "#4d8b3c",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 24px",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "none",
    border: "none",
    fontSize: 28,
    color: "#e53935",
    cursor: "pointer",
    zIndex: 10,
    fontWeight: 700,
    transition: "color 0.2s",
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

export default AdminPackage;
