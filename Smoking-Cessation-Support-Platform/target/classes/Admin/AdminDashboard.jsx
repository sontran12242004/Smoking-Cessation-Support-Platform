import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [showContentsDropdown, setShowContentsDropdown] = useState(false);

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
                  style={activeMenu === 'Dashboard' ? styles.activeMenuItem : styles.menuItem}
                  onClick={() => setActiveMenu('Dashboard')}
                >
                  Dashboard
                </li>
              </Link>
              <Link to="/admin/analytics" style={styles.menuLink}>
                <li 
                  style={activeMenu === 'Analytics' ? styles.activeMenuItem : styles.menuItem}
                  onClick={() => setActiveMenu('Analytics')}
                >
                  Analytics
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
                  style={activeMenu === 'Members' ? styles.activeMenuItem : styles.menuItem}
                  onClick={() => setActiveMenu('Members')}
                >
                  Members
                </li>
              </Link>
              <Link to="/admin/packages" style={styles.menuLink}>
                <li 
                  style={activeMenu === 'Packages' ? styles.activeMenuItem : styles.menuItem}
                  onClick={() => setActiveMenu('Packages')}
                >
                  Packages
                </li>
              </Link>
              <li 
                style={activeMenu.startsWith('Contents') ? styles.activeMenuItem : styles.menuItem} 
                onClick={() => setShowContentsDropdown(!showContentsDropdown)}
              >
                Contents <span style={{ float: 'right' }}>{showContentsDropdown ? '▲' : '▼'}</span>
              </li>
              {showContentsDropdown && (
                <ul style={{...styles.menuList, paddingLeft: '20px'}}>
                  <Link to="/admin/contents/send-notification" style={styles.menuLink}>
                    <li style={activeMenu === 'ContentsSendNotification' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('ContentsSendNotification')}>Send Notification To Members</li>
                  </Link>
                  <Link to="/admin/contents/send-motivation" style={styles.menuLink}>
                    <li style={activeMenu === 'ContentsSendMotivation' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('ContentsSendMotivation')}>Send Motivation To Members</li>
                  </Link>
                  <Link to="/admin/contents/send-email" style={styles.menuLink}>
                    <li style={activeMenu === 'ContentsSendEmail' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('ContentsSendEmail')}>Send Email</li>
                  </Link>
                </ul>
              )}
              <Link to="/admin/coaches" style={styles.menuLink}>
                <li 
                  style={activeMenu === 'Coaches' ? styles.activeMenuItem : styles.menuItem}
                  onClick={() => setActiveMenu('Coaches')}
                >
                  Coaches
                </li>
              </Link>
              <Link to="/admin/ratings" style={styles.menuLink}>
                <li 
                  style={activeMenu === 'Ratings, Feedbacks' ? styles.activeMenuItem : styles.menuItem}
                  onClick={() => setActiveMenu('Ratings, Feedbacks')}
                >
                  Ratings, Feedbacks
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>Welcome to NicOff Admin Dashboard</h1>
          <p style={styles.welcomeText}>
            Manage your smoking cessation platform and help users on their journey to a healthier life.
          </p>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsContainer}>
          {/* Total Users */}
          <div style={styles.statCard}>
            <h3 style={styles.cardTitle}>Total Users</h3>
            <p style={styles.cardNumber}>''</p>
            <p style={styles.cardStatPositive}>+12% from last month</p>
          </div>

          {/* Active Members */}
          <div style={styles.statCard}>
            <h3 style={styles.cardTitle}>Active Members</h3>
            <p style={styles.cardNumber}>''</p>
            <p style={styles.cardStatPositive}>+8% from last month</p>
          </div>

          {/* 30-Day Smoke-Free Rate */}
          <div style={styles.statCard}>
            <h3 style={styles.cardTitle}>30-Day Smoke-Free Rate</h3>
            <p style={styles.cardNumber}>''%</p>
            <p style={styles.cardStatPositive}>+5% from last month</p>
          </div>

          {/* Avg. Response Rate */}
          <div style={styles.statCard}>
            <h3 style={styles.cardTitle}>Avg. Response Rate</h3>
            <p style={styles.cardNumber}>''%</p>
            <p style={styles.cardStatNegative}>-2% from last month</p>
          </div>
        </div>

        {/* Charts */}
        <div style={styles.chartsContainer}>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>User Growth Chart</h3>
            <div style={styles.chartPlaceholder}>USE GROWTH CHART</div>
          </div>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Success Rates</h3>
            <div style={styles.chartPlaceholder}>USE SUCCESS CHART</div>
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
    backgroundColor: '#DFF5DE'
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#DFF5DE',
    padding: '25px',
    borderRight: '15px solid #fff'
  },
  sidebarHeader: {
    marginBottom: '30px'
  },
  sidebarTitle: {
    fontSize: '24px',
    color: '#2E7D32',
    margin: '0 0 5px 0',
    fontWeight: 'bold'
  },
  sidebarSubtitle: {
    fontSize: '14px',
    color: '#666',
    margin: '0',
    fontStyle: 'italic'
  },
  userSection: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  },
  userName: {
    fontSize: '16px',
    color: '#333',
    margin: '0 0 5px 0',
    fontWeight: 'bold'
  },
  userRole: {
    fontSize: '14px',
    color: '#666',
    margin: '0'
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
    transition: 'all 0.2s ease'
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
  welcomeSection: {
    margin: '0 0 30px 0',
    padding: '0'
  },
  welcomeTitle: {
    fontSize: '28px',
    color: '#2E7D32',
    margin: '0 0 10px 0',
    fontWeight: 'bold'
  },
  welcomeText: {
    fontSize: '16px',
    color: '#555',
    margin: '0',
    lineHeight: '1.5'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '20px'
  },
  chartsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  cardTitle: {
    fontSize: '16px',
    color: '#555',
    margin: '0 0 15px 0'
  },
  cardNumber: {
    fontSize: '32px',
    color: '#2E7D32',
    margin: '0 0 5px 0',
    fontWeight: 'bold'
  },
  chartTitle: {
    fontSize: '18px',
    color: '#2E7D32',
    margin: '0 0 15px 0',
    fontWeight: 'bold'
  },
  cardStatPositive: {
    fontSize: '14px',
    color: '#2E7D32',
    margin: '0'
  },
  cardStatNegative: {
    fontSize: '14px',
    color: '#C62828',
    margin: '0'
  },
  chartPlaceholder: {
    height: '200px',
    backgroundColor: '#F5F5F5',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999'
  }
};

export default AdminDashboard;