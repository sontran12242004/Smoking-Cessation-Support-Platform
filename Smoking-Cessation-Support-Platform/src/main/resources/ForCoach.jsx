import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForCoach = () => {
  const [activeMenu, setActiveMenu] = useState('My Schedule');
  const [sessionStatus, setSessionStatus] = useState({
    'session1': null, // pending, confirmed, rejected
    'session2': null,
    'session3': null
  });

  const handleConfirm = (sessionId) => {
    setSessionStatus(prev => ({
      ...prev,
      [sessionId]: 'confirmed'
    }));
  };

  const handleReject = (sessionId) => {
    setSessionStatus(prev => ({
      ...prev,
      [sessionId]: 'rejected'
    }));
  };

  const renderActionButtons = (sessionId) => {
    const status = sessionStatus[sessionId];
    
    if (!status) {
      return null;
    }
    
    if (status === 'confirmed') {
      return (
        <button 
          style={styles.cancelButton}
          onClick={() => handleReject(sessionId)}
        >
          Reject
        </button>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <button style={styles.rejectedButton}>Rejected</button>
          <button 
            style={styles.confirmButton}
            onClick={() => handleConfirm(sessionId)}
          >
            Confirm
          </button>
        </>
      );
    }
    
    return (
      <>
        <button 
          style={styles.confirmButton}
          onClick={() => handleConfirm(sessionId)}
        >
          Confirm
        </button>
        <button 
          style={styles.cancelButton}
          onClick={() => handleReject(sessionId)}
        >
          Reject
        </button>
      </>
    );
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>COACH SCHEDULE</h2>
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
        <div style={styles.tableContainer}>
          <h2 style={styles.tableTitle}>Upcoming Session</h2>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Date & time</th>
                <th style={styles.tableHeader}>Member</th>
                <th style={styles.tableHeader}>Session Type</th>
                <th style={styles.tableHeader}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}></td>
                <td style={styles.tableCell}></td>
                <td style={styles.tableCell}></td>
                <td style={styles.tableCell}>
                  {renderActionButtons('session1')}
                </td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}></td>
                <td style={styles.tableCell}></td>
                <td style={styles.tableCell}></td>
                <td style={styles.tableCell}>
                  {renderActionButtons('session2')}
                </td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}></td>
                <td style={styles.tableCell}></td>
                <td style={styles.tableCell}></td>
                <td style={styles.tableCell}>
                  {renderActionButtons('session3')}
                </td>
              </tr>
            </tbody>
          </table>
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
    backgroundColor: '#DFF5DE' // Màu nền tổng thể
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
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto 20px auto'
  },
  tableTitle: {
    fontSize: '22px',
    color: '#333',
    margin: '20px',
    fontWeight: 'bold'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '15px'
  },
  tableHeaderRow: {
    backgroundColor: '#aed581',
    color: '#fff'
  },
  tableHeader: {
    padding: '15px 20px',
    textAlign: 'left',
    color: '#fff',
    fontWeight: '600',
    fontSize: '15px',
  },
  tableRow: {
    borderBottom: '1px solid #eee'
  },
  tableCell: {
    padding: '15px 20px',
    color: '#333',
    fontSize: '15px'
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#388E3C'
    }
  },
  cancelButton: {
    backgroundColor: '#D32F2F',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#B71C1C'
    }
  },
  rejectedButton: {
    backgroundColor: '#9E9E9E',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'default',
    marginRight: '8px',
    fontWeight: 'bold',
    opacity: '0.8'
  },
};

export default ForCoach; 