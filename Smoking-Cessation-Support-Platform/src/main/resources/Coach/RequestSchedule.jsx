import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RequestSchedule = () => {
  const [activeMenu, setActiveMenu] = useState('Request Schedule');
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentWeekDateRange, setCurrentWeekDateRange] = useState(''); // State for the date range
  const [noteToAdmin, setNoteToAdmin] = useState('');

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    const getWeekDateRange = () => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
      const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to get Monday

      const firstDayOfWeek = new Date(today.setDate(diff));
      const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));

      const formatDate = (date) => {
        const d = date.getDate();
        const m = date.getMonth() + 1; // Months are 0-indexed
        const y = date.getFullYear();
        return `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`;
      };

      return `${formatDate(firstDayOfWeek)} - ${formatDate(lastDayOfWeek)}`;
    };

    setCurrentWeekDateRange(getWeekDateRange());
  }, []); // Run once on component mount

  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmitRequest = () => {
    // Here you would handle the submission of the request
    // This includes the date, selected days, and note to admin
    // The working hours are implicitly 9 AM to 4 PM for the selected days
    console.log({
      date: currentWeekDateRange,
      selectedDays,
      noteToAdmin,
      workingHours: '9 AM - 4 PM' // Fixed working hours
    });
    alert('Request Submitted! (Check console for details)');
    // Optionally navigate back to another page or clear the form
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>COACH REQUEST SCHEDULE</h2>
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
              <Link to="/coach/dashboard" style={styles.menuLink}>
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
              <Link to="/coach/profile" style={styles.menuLink}>
                <li 
                  style={activeMenu === 'My Profile' ? styles.activeMenuItem : styles.menuItem}
                  onClick={() => setActiveMenu('My Profile')}
                >
                  My Profile
                </li>
              </Link>
              <Link to="/coach/request-schedule" style={styles.menuLink}>
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
        <div style={styles.requestScheduleCard}>
          <h2 style={styles.cardTitle}>Request New Schedule</h2>
          <div style={styles.formSection}>
            <label style={styles.label}>Date</label>
            <input 
              type="text" 
              style={styles.input}
              value={currentWeekDateRange}
              readOnly // Make it read-only as it's automatically calculated
            />
          </div>

          <div style={styles.formSection}>
            <label style={styles.label}>Availability Schedule</label>
            <div style={styles.dayButtonsContainer}>
              {daysOfWeek.map(day => (
                <button
                  key={day}
                  style={selectedDays.includes(day) ? styles.selectedDayButton : styles.dayButton}
                  onClick={() => handleDayToggle(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.formSection}>
            <label style={styles.label}>Note to Admin</label>
            <textarea 
              style={styles.textarea}
              value={noteToAdmin}
              onChange={(e) => setNoteToAdmin(e.target.value)}
            ></textarea>
          </div>

          <div style={styles.buttonGroup}>
            <Link to="/coach/profile" style={styles.cancelButtonLink}>
              <button style={styles.cancelButton}>Cancel</button>
            </Link>
            <button style={styles.submitButton} onClick={handleSubmitRequest}>Submit Request</button>
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
  requestScheduleCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: '30px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  cardTitle: {
    fontSize: '22px',
    color: '#2E7D32',
    marginBottom: '20px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
  },
  formSection: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '8px',
    fontWeight: 'bold',
    display: 'block',
  },
  input: {
    width: 'calc(100% - 22px)', // Account for padding and border
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  dayButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  dayButton: {
    backgroundColor: '#f0f0f0',
    color: '#666',
    border: '1px solid #ddd',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  },
  selectedDayButton: {
    backgroundColor: '#A5D6A7',
    color: '#2E7D32',
    border: '1px solid #A5D6A7',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#8BC34A',
    },
  },
  textarea: {
    width: 'calc(100% - 22px)', // Account for padding and border
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
  },
  cancelButtonLink: {
    textDecoration: 'none',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #CCC',
    padding: '10px 25px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#E0E0E0',
    },
  },
  submitButton: {
    backgroundColor: '#A5D6A7',
    color: '#2E7D32',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#8BC34A',
    },
  },
};

export default RequestSchedule; 