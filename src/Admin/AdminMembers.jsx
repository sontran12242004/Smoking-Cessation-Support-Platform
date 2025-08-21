import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../apiService";

const AdminMembers = () => {
  const [activeMenu, setActiveMenu] = useState("Members");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showContentsDropdown, setShowContentsDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Xoá data mẫu, thay bằng fetch API
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await ApiService.getAdminList();
        setMembersData(data);
      } catch (err) {
        setMembersData([]);
      }
    };
    fetchAdmins();
  }, []);

  // Filter members based on search term
  const filteredMembers = membersData.filter((member) => {
    const searchLower = searchTerm.toLowerCase();
    const username = (member.username || member.name || "").toLowerCase();
    const email = (member.email || "").toLowerCase();
    const role = (member.role || "").toLowerCase();
    const status = (member.status || "").toLowerCase();

    return (
      username.includes(searchLower) ||
      email.includes(searchLower) ||
      role.includes(searchLower) ||
      status.includes(searchLower) ||
      member.id.toString().includes(searchLower)
    );
  });

  // Pagination logic - use filtered data
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getStatusStyle = (status) => {
    return {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "bold",
      backgroundColor: status === "Active" ? "#E8F5E9" : "#FFEBEE",
      color: status === "Active" ? "#2E7D32" : "#C62828",
      display: "inline-block",
    };
  };

  const getRoleStyle = (role) => {
    const roleColors = {
      MEMBERS: { bg: "#E3F2FD", color: "#1976D2" },
      COACH: { bg: "#FFF3E0", color: "#F57C00" },
      ADMIN: { bg: "#E8F5E9", color: "#2E7D32" },
    };

    const colors = roleColors[role] || { bg: "#F5F5F5", color: "#666" };

    return {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "bold",
      backgroundColor: colors.bg,
      color: colors.color,
      display: "inline-block",
    };
  };

  const handleEditClick = (member) => {
    setEditingMember(member);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedMember) => {
    setMembersData(
      membersData.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    setShowEditModal(false);
    setEditingMember(null);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingMember(null);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleSaveAdd = (newMember) => {
    // Logic to add new member data (placeholder)
    console.log("Adding member:", newMember);
    setShowAddModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
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

      {/* Main Content - Members Management */}
      <div style={styles.mainContent}>
        <h1 style={styles.pageTitle}>Members Management</h1>

        {/* Search and Add Member Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search members..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button style={styles.addButton} onClick={handleAddClick}>
            + Add New Member
          </button> */}
        </div>

        {/* Members Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>User Name</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Role</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Registration Date</th>
                {/* <th style={styles.tableHeader}>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {currentMembers.map((member) => (
                <tr key={member.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{member.id}</td>
                  <td style={styles.tableCell}>
                    {member.username || member.name}
                  </td>
                  <td style={styles.tableCell}>{member.email}</td>
                  <td style={styles.tableCell}>
                    <span style={getRoleStyle(member.role)}>{member.role}</span>
                  </td>
                  <td style={styles.tableCell}>
                    <span style={getStatusStyle(member.status)}>
                      {member.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>{member.registrationDate}</td>
                  {/* <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <button
                        style={styles.editButton}
                        onClick={() => handleEditClick(member)}
                      >
                        Edit
                      </button>
                      <button style={styles.deleteButton}>Delete</button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              style={styles.paginationButton}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  style={
                    currentPage === pageNumber
                      ? styles.activePaginationButton
                      : styles.paginationButton
                  }
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
            {totalPages > 5 && (
              <>
                <span style={styles.paginationEllipsis}>...</span>
                <button
                  style={
                    currentPage === totalPages
                      ? styles.activePaginationButton
                      : styles.paginationButton
                  }
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              style={styles.paginationButton}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        )}

        {/* Show message when no results found */}
        {filteredMembers.length === 0 && searchTerm && (
          <div style={styles.noResults}>
            <p>Not found any member with the keyword "{searchTerm}"</p>
          </div>
        )}
      </div>

      {showEditModal && editingMember && (
        <EditMemberModal
          onClose={handleCloseModal}
          member={editingMember}
          onSave={handleSaveEdit}
        />
      )}

      {showAddModal && (
        <AddMemberModal onClose={handleCloseAddModal} onSave={handleSaveAdd} />
      )}
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
  pageTitle: {
    fontSize: "28px",
    color: "#2E7D32",
    margin: "0 0 20px 0",
    fontWeight: "bold",
  },
  tableHeaderSection: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "20px",
    gap: "15px",
  },
  searchContainer: {
    width: "250px",
  },
  searchInput: {
    width: "100%",
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
    ":focus": {
      borderColor: "#4d8b3c",
    },
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  addMemberButton: {
    padding: "10px 20px",
    backgroundColor: "#4d8b3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: "#3d7b2c",
    },
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "15px",
  },
  tableHeaderRow: {
    backgroundColor: "#F5F5F5",
  },
  tableHeader: {
    padding: "15px 20px",
    textAlign: "left",
    color: "#666",
    fontWeight: "600",
    fontSize: "15px",
    backgroundColor: "#F5F5F5",
  },
  tableRow: {
    borderBottom: "1px solid #eee",
  },
  tableCell: {
    padding: "15px 20px",
    color: "#333",
    fontSize: "15px",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "6px 12px",
    backgroundColor: "#4d8b3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  },
  paginationButton: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    color: "#666",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
  },
  activePaginationButton: {
    padding: "8px 12px",
    border: "1px solid #4d8b3c",
    backgroundColor: "#4d8b3c",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
  },
  paginationEllipsis: {
    color: "#666",
    fontSize: "14px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#4d8b3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: "#3d7b2c",
    },
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  formField: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "15px",
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "#F0F5EF",
    transition: "border-color 0.2s ease",
    ":focus": {
      borderColor: "#4d8b3c",
    },
  },
  textarea: {
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    minHeight: "120px",
    resize: "vertical",
    outline: "none",
    backgroundColor: "#F0F5EF",
    transition: "border-color 0.2s ease",
    ":focus": {
      borderColor: "#4d8b3c",
    },
  },
  select: {
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    backgroundColor: "#F0F5EF",
    outline: "none",
    transition: "border-color 0.2s ease",
    ":focus": {
      borderColor: "#4d8b3c",
    },
  },
  btnRow: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
  },
  cancelBtn: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ccc",
    color: "#333",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
  },
  saveBtn: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4d8b3c",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
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
  noResults: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#666",
    fontSize: "16px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    marginTop: "20px",
  },
};

function EditMemberModal({ onClose, member, onSave }) {
  const [userName, setUserName] = useState(member?.name || "");
  const [email, setEmail] = useState(member?.email || "");
  const [packageType, setPackageType] = useState(member?.package || "");
  const [status, setStatus] = useState(member?.status || "Active");
  const [registrationDate, setRegistrationDate] = useState(
    member?.registrationDate || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation (can add more)
    if (!userName || !email || !packageType || !status || !registrationDate) {
      alert("Please fill in all fields.");
      return;
    }
    onSave({
      ...member, // Keep existing member properties
      name: userName,
      email,
      package: packageType,
      status,
      registrationDate: registrationDate,
    });
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.popup}>
        <button style={modalStyles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <h2 style={modalStyles.title}>Edit Member</h2>
        <form style={modalStyles.form} onSubmit={handleSubmit}>
          <div style={modalStyles.formField}>
            <label style={modalStyles.label}>User Name</label>
            <input
              type="text"
              style={modalStyles.input}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div style={modalStyles.formField}>
            <label style={modalStyles.label}>Email</label>
            <input
              type="email"
              style={modalStyles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={modalStyles.formField}>
            <label style={modalStyles.label}>Package</label>
            <select
              style={modalStyles.select}
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
            >
              <option value="">Select package</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Elite">Elite</option>
            </select>
          </div>
          <div style={modalStyles.formField}>
            <label style={modalStyles.label}>Status</label>
            <select
              style={modalStyles.select}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div style={modalStyles.formField}>
            <label style={modalStyles.label}>Registration Date</label>
            <input
              type="text"
              style={modalStyles.input}
              value={registrationDate}
              onChange={(e) => setRegistrationDate(e.target.value)}
              placeholder="dd/mm/yy"
            />
          </div>
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

function AddMemberModal({ onClose, onSave }) {
  const [newMemberData, setNewMemberData] = useState({
    name: "",
    email: "",
    package: "",
    status: "Active",
    registrationDate: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewMemberData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (
      !newMemberData.name ||
      !newMemberData.email ||
      !newMemberData.package ||
      !newMemberData.status ||
      !newMemberData.registrationDate
    ) {
      alert("Please fill in all fields.");
      return;
    }
    onSave(newMemberData);
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.popup}>
        <button style={modalStyles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <h3 style={modalStyles.title}>Add New Member</h3>

        <form style={modalStyles.form}>
          <div style={modalStyles.formField}>
            <label htmlFor="name" style={modalStyles.label}>
              User Name
            </label>
            <input
              type="text"
              id="name"
              style={modalStyles.input}
              value={newMemberData.name}
              onChange={handleChange}
            />
          </div>

          <div style={modalStyles.formField}>
            <label htmlFor="email" style={modalStyles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              style={modalStyles.input}
              value={newMemberData.email}
              onChange={handleChange}
            />
          </div>

          <div style={modalStyles.formField}>
            <label htmlFor="package" style={modalStyles.label}>
              Package
            </label>
            <select
              id="package"
              style={modalStyles.select}
              value={newMemberData.package}
              onChange={handleChange}
            >
              <option value="">Select package</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Elite">Elite</option>
            </select>
          </div>

          <div style={modalStyles.formField}>
            <label htmlFor="status" style={modalStyles.label}>
              Status
            </label>
            <select
              id="status"
              style={modalStyles.select}
              value={newMemberData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          <div style={modalStyles.formField}>
            <label htmlFor="registrationDate" style={modalStyles.label}>
              Registration Date
            </label>
            <input
              type="text"
              id="registrationDate"
              style={modalStyles.input}
              value={newMemberData.registrationDate}
              onChange={handleChange}
              placeholder="dd/mm/yy"
            />
          </div>

          <div style={modalStyles.btnRow}>
            <button
              type="button"
              style={modalStyles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" style={modalStyles.saveBtn}>
              + Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminMembers;
