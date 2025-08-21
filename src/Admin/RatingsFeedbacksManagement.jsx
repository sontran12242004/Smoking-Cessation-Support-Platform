import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../apiService";

const RatingsFeedbacksManagement = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Ratings, Feedbacks");
  const [selectedRatingFilter, setSelectedRatingFilter] =
    useState("All Ratings");
  const [selectedSortFilter, setSelectedSortFilter] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbacksPerPage] = useState(5);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContentsDropdown, setShowContentsDropdown] = useState(false);

  // Sample data as fallback
  const sampleFeedbacks = [
    {
      id: 1,
      member: "Ho Minh Quan",
      rating: 5,
      feedback:
        "The personal training sessions have been amazing! My coach is very knowledgeable and pushes me to achieve my smoke-free goals. I've seen significant improvements in just a few weeks.",
      date: "2025-05-26",
    },
    {
      id: 2,
      member: "Tran Dinh Son",
      rating: 3,
      feedback:
        "Good environment but the coach is good but could be better, the community is friendly.",
      date: "2025-05-12",
    },
    {
      id: 3,
      member: "Duong Thanh Viet Anh",
      rating: 3,
      feedback:
        "Community so funny, enthusiastic in helping each other to quit smoking.",
      date: "2025-05-21",
    },
    {
      id: 4,
      member: "Vo Dong Dang Khoa",
      rating: 5,
      feedback:
        "I was able to quit smoking after that, thanks to this platform.",
      date: "2025-03-30",
    },
    {
      id: 5,
      member: "Tran Le Khoi Nguyen",
      rating: 5,
      feedback:
        "Coach guides enthusiastically, good environment and good support. Highly recommended.",
      date: "2025-01-21",
    },
    {
      id: 6,
      member: "Le Thi My Linh",
      rating: 4,
      feedback: "Very helpful resources, but sometimes the app glitches.",
      date: "2025-02-15",
    },
    {
      id: 7,
      member: "Nguyen Van A",
      rating: 5,
      feedback:
        "This platform changed my life! The support groups are amazing.",
      date: "2024-12-01",
    },
    {
      id: 8,
      member: "Pham Thanh B",
      rating: 2,
      feedback: "Not very satisfied. The coach was not responsive.",
      date: "2024-11-20",
    },
    {
      id: 9,
      member: "Hoang Duc C",
      rating: 5,
      feedback: "Excellent content and motivation. I feel much healthier now.",
      date: "2024-10-05",
    },
    {
      id: 10,
      member: "Tran Thu D",
      rating: 3,
      feedback: "It's okay, but I expected more personalized guidance.",
      date: "2024-09-10",
    },
    {
      id: 11,
      member: "Nguyen Thi E",
      rating: 4,
      feedback: "The daily check-ins kept me accountable. Good app!",
      date: "2024-08-22",
    },
    {
      id: 12,
      member: "Vo Van F",
      rating: 2,
      feedback: "The program is too rigid for my lifestyle.",
      date: "2024-07-18",
    },
    {
      id: 13,
      member: "Le Duc G",
      rating: 5,
      feedback:
        "Truly grateful for this platform. It made quitting smoking possible.",
      date: "2024-06-03",
    },
    {
      id: 14,
      member: "Phan Thi H",
      rating: 3,
      feedback: "Some features are buggy, but overall decent.",
      date: "2024-05-14",
    },
    {
      id: 15,
      member: "Dinh Cong I",
      rating: 4,
      feedback: "The community forum is very active and supportive.",
      date: "2024-04-29",
    },
  ];

  // Fetch ratings from API
  const fetchRatings = async () => {
    try {
      setLoading(true);
      setError(null);
      const ratingsData = await ApiService.getRatingsAdmin();

      // Transform API data to match our component structure
      const transformedRatings = ratingsData.map((rating) => {
        // Format date from array [2025, 7, 3] to dd/mm/yyyy format
        let formattedDate = "";
        if (rating.createdAt && Array.isArray(rating.createdAt)) {
          const [year, month, day] = rating.createdAt;
          formattedDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
        } else if (rating.createdAt) {
          // If it's already a string, try to parse and reformat
          const date = new Date(rating.createdAt);
          if (!isNaN(date.getTime())) {
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            formattedDate = `${day}/${month}/${year}`;
          } else {
            formattedDate = rating.createdAt;
          }
        }

        return {
          id: rating.id,
          member: rating.memberName || "Unknown Member",
          rating: rating.rating || 0,
          feedback: rating.feedback || "No feedback provided",
          date: formattedDate,
          serviceId: rating.serviceId,
        };
      });

      setFeedbacks(transformedRatings);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setError("Failed to load ratings. Using sample data.");
      setFeedbacks(sampleFeedbacks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  // Convert rating number to stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      "⭐".repeat(fullStars) + (hasHalfStar ? "☆" : "") + "☆".repeat(emptyStars)
    );
  };

  // Filter and sort feedbacks
  const getFilteredAndSortedFeedbacks = () => {
    let filtered = [...feedbacks];

    // Apply rating filter
    if (selectedRatingFilter !== "All Ratings") {
      const ratingValue = parseInt(selectedRatingFilter.split(" ")[0]);
      filtered = filtered.filter((feedback) => feedback.rating === ratingValue);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (selectedSortFilter) {
        case "Newest":
          return new Date(b.date) - new Date(a.date);
        case "Oldest":
          return new Date(a.date) - new Date(b.date);
        case "Highest Rating":
          return b.rating - a.rating;
        case "Lowest Rating":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredFeedbacks = getFilteredAndSortedFeedbacks();
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);

  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const handleDelete = (feedbackId, memberName) => {
    if (
      window.confirm(
        `Are you sure you want to delete the feedback from ${memberName}?`
      )
    ) {
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== feedbackId));
      if (currentFeedbacks.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleView = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleBackToList = () => {
    setSelectedFeedback(null);
  };

  const handleRatingFilterChange = (event) => {
    setSelectedRatingFilter(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSortFilterChange = (event) => {
    setSelectedSortFilter(event.target.value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p>Loading ratings...</p>
    </div>
  );

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
          <button onClick={handleLogout} style={styles.logoutButton}>
            <span style={styles.logoutIcon}>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {!selectedFeedback ? (
          <div>
            {/* Header */}
            <div style={styles.header}>
              <h1 style={styles.headerTitle}>Ratings & Feedbacks Management</h1>
              <p style={styles.headerSubtitle}>
                Manage customer ratings and feedback
              </p>
              {error && <div style={styles.errorMessage}>{error}</div>}
            </div>

            {/* Controls */}
            <div style={styles.controlsContainer}>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Filter by Rating:</label>
                <select
                  value={selectedRatingFilter}
                  onChange={handleRatingFilterChange}
                  style={styles.filterSelect}
                >
                  <option value="All Ratings">All Ratings</option>
                  <option value="5 Stars">5 Stars</option>
                  <option value="4 Stars">4 Stars</option>
                  <option value="3 Stars">3 Stars</option>
                  <option value="2 Stars">2 Stars</option>
                  <option value="1 Stars">1 Star</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Sort by:</label>
                <select
                  value={selectedSortFilter}
                  onChange={handleSortFilterChange}
                  style={styles.filterSelect}
                >
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                  <option value="Highest Rating">Highest Rating</option>
                  <option value="Lowest Rating">Lowest Rating</option>
                </select>
              </div>

              <button
                onClick={fetchRatings}
                style={styles.refreshButton}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "🔄 Refresh"}
              </button>
            </div>

            {/* Content */}
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Feedbacks List */}
                <div style={styles.feedbacksList}>
                  {currentFeedbacks.length > 0 ? (
                    currentFeedbacks.map((feedback, index) => (
                      <div key={feedback.id} style={styles.feedbackCard}>
                        <div style={styles.feedbackHeader}>
                          <h3 style={styles.memberName}>{feedback.member}</h3>
                          <div style={styles.feedbackActions}>
                            <button
                              onClick={() => handleView(feedback)}
                              style={styles.viewButton}
                            >
                              View
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(feedback.id, feedback.member)
                              }
                              style={styles.deleteButton}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div style={styles.ratingContainer}>
                          <span style={styles.ratingStars}>
                            {renderStars(feedback.rating)}
                          </span>
                          <span style={styles.ratingNumber}>
                            ({feedback.rating}/5)
                          </span>
                        </div>
                        <p style={styles.feedbackText}>
                          {feedback.feedback.length > 150
                            ? `${feedback.feedback.substring(0, 150)}...`
                            : feedback.feedback}
                        </p>
                        <div style={styles.feedbackFooter}>
                          <span style={styles.feedbackDate}>
                            Date: {feedback.date}
                          </span>
                          {feedback.serviceId && (
                            <span style={styles.serviceId}>
                              Service ID: {feedback.serviceId}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={styles.noFeedbacks}>
                      <p>No ratings found matching your criteria.</p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={styles.pagination}>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      style={{
                        ...styles.paginationButton,
                        ...(currentPage === 1
                          ? styles.paginationButtonDisabled
                          : {}),
                      }}
                    >
                      Previous
                    </button>

                    {getPaginationNumbers().map((number, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          typeof number === "number" && paginate(number)
                        }
                        style={{
                          ...styles.paginationButton,
                          ...(number === currentPage
                            ? styles.paginationButtonActive
                            : {}),
                          ...(typeof number !== "number"
                            ? styles.paginationEllipsis
                            : {}),
                        }}
                        disabled={typeof number !== "number"}
                      >
                        {number}
                      </button>
                    ))}

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      style={{
                        ...styles.paginationButton,
                        ...(currentPage === totalPages
                          ? styles.paginationButtonDisabled
                          : {}),
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          // Detailed view
          <div style={styles.detailView}>
            <button onClick={handleBackToList} style={styles.backButton}>
              ← Back to List
            </button>
            <div style={styles.detailCard}>
              <h2 style={styles.detailMemberName}>{selectedFeedback.member}</h2>
              <div style={styles.detailRating}>
                <span style={styles.detailRatingStars}>
                  {renderStars(selectedFeedback.rating)}
                </span>
                <span style={styles.detailRatingNumber}>
                  ({selectedFeedback.rating}/5)
                </span>
              </div>
              <p style={styles.detailFeedback}>{selectedFeedback.feedback}</p>
              <div style={styles.detailFooter}>
                <span style={styles.detailDate}>
                  Date: {selectedFeedback.date}
                </span>
                {selectedFeedback.serviceId && (
                  <span style={styles.detailServiceId}>
                    Service ID: {selectedFeedback.serviceId}
                  </span>
                )}
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
  menuIcon: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#DFF5DE",
  },
  contentHeader: {
    margin: "0 0 30px 0",
    padding: "0",
  },
  contentTitle: {
    fontSize: "28px",
    color: "#2E7D32",
    margin: "0",
    fontWeight: "bold",
  },
  contentBody: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  },
  filtersAndSort: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
  },
  dropdown: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    color: "#555",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  dataTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "25px",
  },
  tableHeader: {
    textAlign: "left",
    padding: "15px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#f8f8f8",
    color: "#666",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "13px",
  },
  tableRow: {
    ":hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  tableCell: {
    padding: "15px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
    color: "#444",
  },
  viewButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#45a049",
    },
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#da190b",
    },
  },

  activeMenuIndicator: {
    position: "absolute",
    left: "0",
    top: "50%",
    transform: "translateY(-50%)",
    width: "5px",
    height: "20px",
    backgroundColor: "#4CAF50",
    borderRadius: "2.5px",
  },
  feedbackDetailContainer: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  },
  feedbackDetailTitle: {
    fontSize: "24px",
    color: "#2E7D32",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #eee",
  },
  detailFeedbackText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#444",
    marginBottom: "20px",
  },
  errorMessage: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: "500",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    padding: "20px",
  },
  spinner: {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTop: "4px solid #4CAF50",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  },
  header: {
    marginBottom: "30px",
    padding: "0",
  },
  headerTitle: {
    fontSize: "28px",
    color: "#2E7D32",
    margin: "0",
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: "14px",
    color: "#666",
    margin: "0",
  },
  controlsContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    alignItems: "flex-end",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  filterLabel: {
    fontSize: "12px",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "bold",
  },
  filterSelect: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    color: "#555",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  refreshButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  feedbacksList: {
    marginBottom: "25px",
  },
  feedbackCard: {
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
  feedbackHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  memberName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    margin: "0",
  },
  feedbackActions: {
    display: "flex",
    gap: "10px",
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  ratingStars: {
    fontSize: "18px",
    marginRight: "5px",
  },
  ratingNumber: {
    fontSize: "14px",
    color: "#666",
  },
  feedbackText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#444",
    margin: "10px 0",
  },
  feedbackFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  feedbackDate: {
    fontSize: "14px",
    color: "#777",
  },
  serviceId: {
    fontSize: "14px",
    color: "#666",
  },
  noFeedbacks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    padding: "20px",
    textAlign: "center",
    color: "#666",
  },
  detailView: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    padding: "0",
  },
  detailCard: {
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  detailMemberName: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 15px 0",
  },
  detailRating: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  detailRatingStars: {
    fontSize: "24px",
    marginRight: "10px",
  },
  detailRatingNumber: {
    fontSize: "18px",
    color: "#666",
  },
  detailFeedback: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#444",
    marginBottom: "20px",
  },
  detailFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #eee",
    paddingTop: "15px",
  },
  detailDate: {
    fontSize: "14px",
    color: "#777",
  },
  detailServiceId: {
    fontSize: "14px",
    color: "#666",
  },
  backButton: {
    backgroundColor: "#2E7D32",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "20px",
    transition: "background-color 0.2s",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    marginTop: "20px",
  },
  paginationButton: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#555",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
  },
  paginationButtonActive: {
    backgroundColor: "#4CAF50",
    color: "white",
    borderColor: "#4CAF50",
  },
  paginationButtonDisabled: {
    backgroundColor: "#f5f5f5",
    color: "#ccc",
    cursor: "not-allowed",
  },
  paginationEllipsis: {
    padding: "8px 12px",
    border: "none",
    backgroundColor: "transparent",
    color: "#999",
    cursor: "default",
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

// CSS animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);

export default RatingsFeedbacksManagement;
