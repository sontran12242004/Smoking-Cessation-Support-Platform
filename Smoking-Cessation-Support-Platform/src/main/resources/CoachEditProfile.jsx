import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddCertificationModal from './AddCertificationModal';

const CoachEditProfile = () => {
  const [activeMenu, setActiveMenu] = useState('My Profile');
  const location = useLocation();
  const { coachData } = location.state || {};

  const [fullName, setFullName] = useState(coachData?.fullName || '');
  const [professionalBio, setProfessionalBio] = useState(coachData?.bio || '');
  const [certifications, setCertifications] = useState(coachData?.certifications || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCertification = (newCert) => {
    setCertifications([...certifications, newCert]);
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
            <p style={styles.userName}>John Doe</p>
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
        <div style={styles.editProfileCard}>
          <Link to="/profile" style={styles.backButtonInCardContainer}>
            <button style={styles.backButtonInCard}>← Back To Profile</button>
          </Link>
          <h2 style={styles.editProfileTitle}>Edit My Profile</h2>
          <div style={styles.profileAvatarSection}>
            <div style={styles.profileAvatar}>
              <img src="https://via.placeholder.com/100" alt="Profile Avatar" style={styles.avatarImage} />
            </div>
            <input type="file" id="choose-file" style={{ display: 'none' }} />
            <label htmlFor="choose-file" style={styles.chooseFileLabel}>Choose File</label>
            <button style={styles.uploadButton}>Upload</button>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" 
                style={styles.input} 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Certification</label>
              {certifications.map((cert, index) => (
                <p key={index} style={styles.certificationText}>{cert}</p>
              ))}
              <button 
                style={styles.addCertificationButton}
                onClick={() => setIsModalOpen(true)}
              >
                + Add Certification
              </button>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Professional Bio</label>
              <textarea 
                style={styles.textarea}
                value={professionalBio}
                onChange={(e) => setProfessionalBio(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <Link to="/profile" style={styles.cancelButtonLink}>
              <button style={styles.cancelButton}>Cancel</button>
            </Link>
            <button style={styles.saveButton}>Save</button>
          </div>
        </div>
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
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#DFF5DE'
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
  editProfileCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: '30px',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative',
  },
  editProfileTitle: {
    fontSize: '22px',
    color: '#2E7D32',
    margin: '0 0 20px 0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileAvatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
  },
  profileAvatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  chooseFileLabel: {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  uploadButton: {
    backgroundColor: '#A5D6A7',
    color: '#2E7D32',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#8BC34A',
    },
  },
  formRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  formGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
  },
  certificationText: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 5px 0',
  },
  addCertificationButton: {
    backgroundColor: 'transparent',
    color: '#2E7D32',
    border: '1px dashed #A5D6A7',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#E8F5E9',
    },
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
  },
  cancelButton: {
    backgroundColor: '#D32F2F',
    color: 'white',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#B71C1C',
    },
  },
  cancelButtonLink: {
    textDecoration: 'none',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#43A047',
    },
  },
  backButtonInCardContainer: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    textDecoration: 'none',
  },
  backButtonInCard: {
    backgroundColor: 'transparent',
    color: '#666',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#E0E0E0',
    },
  },
};

export default CoachEditProfile; 