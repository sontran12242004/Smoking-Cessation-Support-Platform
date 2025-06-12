import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CoachProfile = () => {
  const [activeMenu, setActiveMenu] = useState('My Profile');

  const coachData = {
    fullName: "",
    email: "",
    specialization: "",
    yearOfExperience: "",
    bio: "",
    certifications: [],
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
            <p style={styles.userName}>Coach Name</p>
            <p style={styles.userRole}>Certified Coach</p>
          </div>
        </div>

        {/* Menu Sections */}
        <div style={styles.menuContainer}>
          {/* MAIN Section */}
          <div style={styles.menuSection}>
            <h4 style={styles.sectionTitle}>MAIN</h4>
            <ul style={styles.menuList}>
              <Link to="/coach-schedule" style={styles.menuLink}>
                <li
                  style={activeMenu === 'My Schedule' ? styles.activeMenuItem : styles.menuItem}
                  onClick={() => setActiveMenu('My Schedule')}
                >
                  My Schedule
                </li>
              </Link>
            </ul>
          </div>

          {/* MANAGEMENT Section */}
          <div style={styles.menuSection}>
            <h4 style={styles.sectionTitle}>MANAGEMENT</h4>
            <ul style={styles.menuList}>
              <Link to="/profile" style={styles.menuLink}>
                <li
                  style={activeMenu === 'My Profile' ? styles.activeMenuItem : styles.menuItem}
                  onClick={() => setActiveMenu('My Profile')}
                >
                  My Profile
                </li>
              </Link>
              <Link to="/request-schedule" style={styles.menuLink}>
                <li
                  style={activeMenu === 'Request Schedule' ? styles.activeMenuItem : styles.menuItem}
                  onClick={() => setActiveMenu('Request Schedule')}
                >
                  Request Schedule
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.pageTitle}>Coaches Management</h1>
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <h2 style={styles.profileTitle}>My Profile</h2>
            <Link to="/edit-profile" style={styles.menuLink}>
              <button style={styles.editButton}>
                <span style={styles.editButtonIcon}></span> Edit Profile
              </button>
            </Link>
          </div>
          <div style={styles.profileDetails}>
            <div style={styles.profileAvatar}>
              <img src="https://via.placeholder.com/100" alt="Profile Avatar" style={styles.avatarImage} />
            </div>
            <div style={styles.profileInfo}>
              <p style={styles.detailLabel}>FullName</p>
              <p style={styles.detailValue}>{coachData.fullName || 'N/A'}</p>
              <p style={styles.detailLabel}>Email</p>
              <p style={styles.detailValue}>{coachData.email || 'N/A'}</p>
              <p style={styles.detailLabel}>Specialization</p>
              <p style={styles.detailValue}>{coachData.specialization || 'N/A'}</p>
              <p style={styles.detailLabel}>Year of Experience</p>
              <p style={styles.detailValue}>{coachData.yearOfExperience || 'N/A'}</p>
              <p style={styles.detailLabel}>Bio</p>
              <p style={styles.detailValue}>
                {coachData.bio || 'No bio available.'}
              </p>
              <p style={styles.detailLabel}>Certifications</p>
              {coachData.certifications && coachData.certifications.length > 0 ? (
                coachData.certifications.map((cert, index) => (
                  <p key={index} style={styles.certificationText}>{cert}</p>
                ))
              ) : (
                <p style={styles.certificationText}>No certifications available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#DFF5DE' // Overall background color
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#DFF5DE',
    padding: '25px',
    borderRight: '15px solid #fff'
  },
  sidebarHeader: {
    marginBottom: '30px',
  },
  sidebarTitle: {
    fontSize: '24px',
    color: '#6a6a6a',
    margin: '0 0 5px 0',
    fontWeight: 'bold'
  },
  logoSection: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoTitle: {
    fontSize: '24px',
    color: '#2E7D32',
    margin: '0',
    fontWeight: 'bold'
  },
  logoSubtitle: {
    fontSize: '14px',
    color: '#666',
    margin: '0',
    fontStyle: 'italic'
  },
  userSection: {
    marginTop: '30px',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '16px',
    color: '#333',
    margin: '0',
    fontWeight: 'bold'
  },
  userRole: {
    fontSize: '14px',
    color: '#666',
    margin: '0',
  },
  menuContainer: {
    marginTop: '20px'
  },
  menuSection: {
    marginBottom: '25px'
  },
  sectionTitle: {
    fontSize: '12px',
    color: '#666',
    textTransform: 'uppercase',
    margin: '0 0 10px 0',
    letterSpacing: '1px',
    fontWeight: 'bold'
  },
  menuList: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  menuItem: {
    padding: '10px 15px',
    color: '#555',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '5px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    ':hover': {
      backgroundColor: '#C8E6C9'
    }
  },
  activeMenuItem: {
    padding: '10px 15px',
    color: '#2E7D32',
    backgroundColor: '#A4E087',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '5px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  menuLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  mainContent: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#DFF5DE'
  },
  pageTitle: {
    fontSize: '28px',
    color: '#2E7D32',
    margin: '0 0 20px 0',
    fontWeight: 'bold'
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: '30px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
    marginBottom: '20px',
  },
  profileTitle: {
    fontSize: '22px',
    color: '#2E7D32',
    margin: '0',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    border: '1px solid #A5D6A7',
    padding: '8px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    ':hover': {
      backgroundColor: '#DCEDC8',
    },
  },
  editButtonIcon: {
    fontSize: '16px',
  },
  profileDetails: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '30px',
  },
  profileAvatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#ccc', // Placeholder background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profileInfo: {
    flex: 1,
  },
  detailLabel: {
    fontSize: '16px',
    color: '#333',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
  },
  detailValue: {
    fontSize: '16px',
    color: '#666',
    margin: '0 0 15px 0',
  },
  certificationText: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 5px 0',
  },
};

export default CoachProfile; 