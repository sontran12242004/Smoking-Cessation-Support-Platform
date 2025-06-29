import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ConfirmCoachSchedule = () => {
  const [activeMenu, setActiveMenu] = useState('Coaches');
  const [showContentsDropdown, setShowContentsDropdown] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date('2025-06-03')); // Start date from the image
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [schedules, setSchedules] = useState({
    Mon: [
      { id: 1, coach: 'Christopher C. Ross', status: 'Pending' },
      { id: 2, coach: 'Xiang Gao', status: 'Confirmed' },
    ],
    Tue: [
      { id: 3, coach: 'Christopher C. Ross', status: 'Pending' },
      { id: 4, coach: 'Xiang Gao', status: 'Confirmed' },
    ],
    Wed: [
      { id: 5, coach: 'Christopher C. Ross', status: 'Confirmed' },
      { id: 6, coach: 'Xiang Gao', status: 'Confirmed' },
    ],
    Thu: [
      { id: 7, coach: 'Christopher C. Ross', status: 'Pending' },
      { id: 8, coach: 'Xiang Gao', status: 'Confirmed' },
    ],
    Fri: [],
    Sat: [],
    Sun: [
      { id: 9, coach: 'Christopher C. Ross', status: 'Pending' },
      { id: 10, coach: 'Xiang Gao', status: 'Confirmed' },
    ],
  });

  // Get unique coaches and sort them
  const getUniqueCoaches = () => {
    const coaches = new Set();
    Object.values(schedules).forEach(daySchedules => {
      daySchedules.forEach(schedule => {
        coaches.add(schedule.coach);
      });
    });
    return Array.from(coaches).sort();
  };

  // Filter schedules by selected coach
  const getFilteredSchedules = () => {
    if (!selectedCoach) return schedules;
    
    const filteredSchedules = {};
    Object.keys(schedules).forEach(day => {
      filteredSchedules[day] = schedules[day].filter(
        schedule => schedule.coach === selectedCoach
      );
    });
    return filteredSchedules;
  };

  // Add useEffect to monitor state changes
  useEffect(() => {
    console.log('Schedules state updated:', schedules);
  }, [schedules]);

  const getWeekRange = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${startOfWeek.toLocaleDateString('en-US', options)} - ${endOfWeek.toLocaleDateString('en-US', options)}`;
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleReject = (id) => {
    console.log('Rejecting schedule:', id);
    setSchedules(prevSchedules => {
      const newSchedules = { ...prevSchedules };
      let updated = false;

      Object.keys(newSchedules).forEach(day => {
        newSchedules[day] = newSchedules[day].map(schedule => {
          if (schedule.id === id && schedule.status === 'Pending') {
            updated = true;
            return { ...schedule, status: 'Rejected' };
          }
          return schedule;
        });
      });

      if (!updated) {
        console.log('No pending schedule found with id:', id);
      }

      return newSchedules;
    });
  };

  const handleConfirm = (id) => {
    console.log('Confirming schedule:', id);
    setSchedules(prevSchedules => {
      const newSchedules = { ...prevSchedules };
      let updated = false;

      Object.keys(newSchedules).forEach(day => {
        newSchedules[day] = newSchedules[day].map(schedule => {
          if (schedule.id === id && schedule.status === 'Pending') {
            updated = true;
            return { ...schedule, status: 'Confirmed' };
          }
          return schedule;
        });
      });

      if (!updated) {
        console.log('No pending schedule found with id:', id);
      }

      return newSchedules;
    });
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

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        <header style={styles.contentHeader}>
          <h1 style={styles.contentTitle}>CONFIRM COACH SCHEDULE</h1>
        </header>

        <div style={styles.scheduleHeader}>
          <h2 style={styles.weeklyScheduleTitle}>Weekly Coach Schedules</h2>
          <p style={styles.weekRange}>{getWeekRange(currentDate)}</p>
          <div style={styles.weekNavigation}>
            <button style={styles.weekNavButton} onClick={handlePreviousWeek}>&lt; Previous</button>
            <button style={styles.weekNavButton} onClick={handleNextWeek}>Next &gt;</button>
          </div>
        </div>

        {/* Coach Selection */}
        <div style={styles.coachSelection}>
          <h3 style={styles.coachSelectionTitle}>Select Coach:</h3>
          <div style={styles.coachList}>
            <button
              style={{
                ...styles.coachButton,
                backgroundColor: !selectedCoach ? '#A4E087' : '#fff',
                color: !selectedCoach ? '#2E7D32' : '#333'
              }}
              onClick={() => setSelectedCoach(null)}
            >
              All Coaches
            </button>
            {getUniqueCoaches().map(coach => (
              <button
                key={coach}
                style={{
                  ...styles.coachButton,
                  backgroundColor: selectedCoach === coach ? '#A4E087' : '#fff',
                  color: selectedCoach === coach ? '#2E7D32' : '#333'
                }}
                onClick={() => setSelectedCoach(coach)}
              >
                {coach}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.scheduleGrid}>
          {daysOfWeek.map((day, index) => {
            const currentDay = new Date(currentDate);
            currentDay.setDate(currentDate.getDate() + index);
            const daySchedules = getFilteredSchedules()[day] || [];

            return (
              <div key={day} style={styles.dayCard}>
                <h3 style={styles.dayTitle}>{day}<br/>{currentDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</h3>
                {daySchedules.length > 0 ? (
                  daySchedules.map((schedule) => (
                    <div key={schedule.id} style={{ 
                      ...styles.scheduleCard, 
                      backgroundColor: schedule.status === 'Pending' ? '#FFFBE5' : 
                                     schedule.status === 'Rejected' ? '#FFEBEE' : '#E8F5E9',
                      border: schedule.status === 'Pending' ? '1px solid #FFECB3' : 
                             schedule.status === 'Rejected' ? '1px solid #FFCDD2' : '1px solid #C8E6C9'
                    }}>
                      <span style={{ 
                        ...styles.scheduleStatus, 
                        backgroundColor: schedule.status === 'Pending' ? '#FFECB3' : 
                                       schedule.status === 'Rejected' ? '#FFCDD2' : '#A4E087',
                        color: schedule.status === 'Pending' ? '#FF8F00' : 
                              schedule.status === 'Rejected' ? '#C62828' : '#2E7D32'
                      }}>
                        {schedule.status}
                      </span>
                      <p style={styles.coachName}>{schedule.coach}</p>
                      {schedule.status === 'Pending' && (
                        <div style={styles.scheduleActions}>
                          <button 
                            style={styles.rejectButton} 
                            onClick={() => handleReject(schedule.id)}
                          >
                            Reject
                          </button>
                          <button 
                            style={styles.confirmButton} 
                            onClick={() => handleConfirm(schedule.id)}
                          >
                            Confirm
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p style={styles.noScheduleText}>No Schedules</p>
                )}
              </div>
            );
          })}
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
    backgroundColor: '#F0F5EF'
  },
  contentHeader: {
    marginBottom: '30px',
    paddingBottom: '15px',
    borderBottom: '1px solid #ccc'
  },
  contentTitle: {
    fontSize: '28px',
    color: '#2E7D32',
    margin: '0 0 20px 0',
    fontWeight: 'bold'
  },
  scheduleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  weeklyScheduleTitle: {
    fontSize: '24px',
    color: '#4d8b3c',
    margin: '0',
    fontWeight: 'bold'
  },
  weekRange: {
    fontSize: '16px',
    color: '#555',
    margin: '0',
    flexGrow: 1,
    textAlign: 'center'
  },
  weekNavigation: {
    display: 'flex',
    gap: '10px'
  },
  weekNavButton: {
    padding: '8px 15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#555',
    transition: 'background-color 0.2s, border-color 0.2s',
    ':hover': {
      backgroundColor: '#f0f0f0'
    }
  },
  scheduleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    backgroundColor: '#F0F5EF',
    padding: '20px',
    borderRadius: '8px'
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    padding: '15px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
  },
  dayTitle: {
    fontSize: '18px',
    color: '#4d8b3c',
    margin: '0 0 15px 0',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    lineHeight: '1.4'
  },
  scheduleCard: {
    borderRadius: '6px',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
  },
  scheduleStatus: {
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '4px',
    padding: '3px 8px',
    marginBottom: '5px',
    display: 'inline-block'
  },
  coachName: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#333',
    margin: '5px 0'
  },
  scheduleActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '10px'
  },
  rejectButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#FFEBEE',
    color: '#C62828',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#FFCDD2'
    }
  },
  confirmButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#C8E6C9'
    }
  },
  noScheduleText: {
    textAlign: 'center',
    color: '#888',
    marginTop: '20px',
    fontStyle: 'italic'
  },
  coachSelection: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  coachSelectionTitle: {
    fontSize: '18px',
    color: '#4d8b3c',
    margin: '0 0 15px 0',
    fontWeight: 'bold'
  },
  coachList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  coachButton: {
    padding: '8px 16px',
    border: '1px solid #A4E087',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#A4E087',
      color: '#2E7D32'
    }
  }
};

export default ConfirmCoachSchedule; 