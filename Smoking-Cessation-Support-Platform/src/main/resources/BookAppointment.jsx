import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [unavailableDates] = useState([
    new Date(2025, 4, 23).toDateString(), // May 23, 2025
    new Date(2025, 4, 24).toDateString(), // May 24, 2025
    new Date(2025, 4, 25).toDateString(), // May 25, 2025
    new Date(2025, 4, 26).toDateString(), // May 26, 2025
    new Date(2025, 4, 27).toDateString(), // May 27, 2025
    new Date(2025, 4, 28).toDateString(), // May 28, 2025
    new Date(2025, 5, 2).toDateString(),  // June 2, 2025
  ]);

  // Placeholder coach data
  const coachData = {
    name: "Dr. Sarah Johnson",
    specialization: "Certified Smoking Cessation Specialist - 5 years experience",
    bio: "Specializing in cognitive behavioral therapy for smoking cessation. Sarah has helped over 200 clients successfully quit nicotine and develop healthier habits. Her approach combines evidence-based techniques with personalized support.",
  };

  // Dummy time slots for a selected date
  const dummyTimeSlots = [
    { time: "9:00 AM - 9:45 AM", available: true },
    { time: "10:00 AM - 10:45 AM", available: true },
    { time: "11:00 AM - 11:45 AM", available: false },
    { time: "1:00 PM - 1:45 PM", available: true },
    { time: "3:00 PM - 3:45 PM", available: true },
    { time: "4:00 PM - 4:45 PM", available: false },
  ];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(<td key={`empty-start-${i}`} style={styles.calendarCellEmpty}></td>);
    }

    for (let day = 1; day <= numDays; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isSelected = currentDate.toDateString() === selectedDate.toDateString();
      const isUnavailable = unavailableDates.includes(currentDate.toDateString());
      const isPast = currentDate < new Date().setHours(0, 0, 0, 0);

      const cellStyle = {
        ...styles.calendarCell,
        ...(isToday && styles.calendarCellToday),
        ...(isSelected && styles.calendarCellSelected),
        ...(isUnavailable && styles.calendarCellUnavailable),
        ...(isPast && styles.calendarCellPast),
      };

      calendarDays.push(
        <td
          key={day}
          style={cellStyle}
          onClick={() => !isUnavailable && !isPast && setSelectedDate(currentDate)}
        >
          {day}
        </td>
      );
    }

    const rows = [];
    let cells = [];
    calendarDays.forEach((day, i) => {
      cells.push(day);
      if (i % 7 === 6 || i === calendarDays.length - 1) {
        rows.push(<tr key={rows.length}>{cells}</tr>);
        cells = [];
      }
    });
    return rows;
  };

  const handleMonthChange = (direction) => {
    setSelectedDate(prev => {
      const newMonth = prev.getMonth() + direction;
      const newDate = new Date(prev.getFullYear(), newMonth, 1);
      return newDate;
    });
  };

  const formatSelectedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.standardMember}>
            <span style={styles.standardMemberIcon}></span> Standard Member
          </div>
        </div>
        <div style={styles.headerCenter}>
          <div style={styles.logoSection}>
            <span style={styles.logoText}>LOGO</span>
            <div style={styles.nicOffTitleSection}>
              <h1 style={styles.nicOffTitle}>NicOff</h1>
              <p style={styles.nicOffSubtitle}>Turn Off Nicotine, Turn On Life!</p>
            </div>
          </div>
        </div>
        <div style={styles.headerRight}>
          <ul style={styles.navLinks}>
            <li><Link to="/" style={styles.navLink}>Home</Link></li>
            <li><Link to="/dashboard" style={styles.navLink}>Dashboard</Link></li>
            <li><Link to="/achievements" style={styles.navLink}>Achievement</Link></li>
            <li><Link to="/coach" style={styles.navLink}>Coach</Link></li>
            <li><Link to="/community" style={styles.navLink}>Community</Link></li>
            <li><Link to="/feedback" style={styles.navLink}>Feedback</Link></li>
          </ul>
          <span style={styles.notificationIcon}>&#128276;</span>
          <button style={styles.logoutButton}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <Link to="/coach" style={styles.backButton}>← Back To Coach</Link>

        {/* Coach Profile Section */}
        <div style={styles.coachProfileCard}>
          <div style={styles.coachAvatar}>
            <img src="https://via.placeholder.com/100" alt="Coach Avatar" style={styles.avatarImage} />
          </div>
          <div style={styles.coachInfo}>
            <h2 style={styles.coachName}>{coachData.name}</h2>
            <p style={styles.coachSpecialization}>{coachData.specialization}</p>
            <p style={styles.coachBio}>{coachData.bio}</p>
          </div>
        </div>

        {/* Calendar and Time Slots Section */}
        <div style={styles.scheduleContainer}>
          {/* Calendar */}
          <div style={styles.calendarCard}>
            <h3 style={styles.calendarTitle}>Select a Date</h3>
            <div style={styles.calendarNav}>
              <button onClick={() => handleMonthChange(-1)} style={styles.calendarNavButton}>&lt;</button>
              <span style={styles.calendarMonthYear}>{selectedDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
              <button onClick={() => handleMonthChange(1)} style={styles.calendarNavButton}>&gt;</button>
            </div>
            <table style={styles.calendarTable}>
              <thead>
                <tr style={styles.calendarHeaderRow}>
                  <th style={styles.calendarHeaderCell}>Sun</th>
                  <th style={styles.calendarHeaderCell}>Mon</th>
                  <th style={styles.calendarHeaderCell}>Tue</th>
                  <th style={styles.calendarHeaderCell}>Wed</th>
                  <th style={styles.calendarHeaderCell}>Thu</th>
                  <th style={styles.calendarHeaderCell}>Fri</th>
                  <th style={styles.calendarHeaderCell}>Sat</th>
                </tr>
              </thead>
              <tbody>
                {renderCalendar()}
              </tbody>
            </table>
          </div>

          {/* Available Time Slots */}
          <div style={styles.timeSlotsCard}>
            <h3 style={styles.timeSlotsTitle}>Available Time Slots</h3>
            <p style={styles.selectedDateText}>{formatSelectedDate(selectedDate)}</p>
            <div style={styles.slotsContainer}>
              {dummyTimeSlots.map((slot, index) => (
                <button
                  key={index}
                  style={slot.available ? (selectedTimeSlot === slot.time ? styles.timeSlotButtonActive : styles.timeSlotButton) : styles.timeSlotButtonDisabled}
                  onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                  disabled={!slot.available}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          {/* Session Summary */}
          <div style={styles.sessionSummaryCard}>
            <h3 style={styles.sessionSummaryTitle}>Session Summary</h3>
            <p style={styles.summaryDetail}>Date: {formatSelectedDate(selectedDate)}</p>
            <p style={styles.summaryDetail}>Time: {selectedTimeSlot || 'N/A'}</p>
            <p style={styles.summaryDetail}>Duration: 45 minutes</p>
            <p style={styles.summaryDetail}>Type: Video Consultation</p>
            <button style={styles.confirmButton}>Confirm</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerSectionTitle}>NicOff</h4>
            <p style={styles.footerText}>
              We're dedicated to helping you break free from smoking addiction through science-backed methods and community support
            </p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerSectionTitle}>Quick Links</h4>
            <ul style={styles.footerList}>
              <li><Link to="/about" style={styles.footerLink}>About Us</Link></li>
              <li><Link to="/programs" style={styles.footerLink}>Our Programs</Link></li>
              <li><Link to="/success-stories" style={styles.footerLink}>Success Stories</Link></li>
              <li><Link to="/blog" style={styles.footerLink}>Blog</Link></li>
              <li><Link to="/contact" style={styles.footerLink}>Contact</Link></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerSectionTitle}>Support</h4>
            <ul style={styles.footerList}>
              <li><Link to="/faq" style={styles.footerLink}>FAQ</Link></li>
              <li><Link to="/help-center" style={styles.footerLink}>Help Center</Link></li>
              <li><Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" style={styles.footerLink}>Term Of Service</Link></li>
              <li><Link to="/cookie-policy" style={styles.footerLink}>Cookie Policy</Link></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerSectionTitle}>Newsletter</h4>
            <input type="email" placeholder="Your Email Address..." style={styles.newsletterInput} />
            <button style={styles.subscribeButton}>Subscribe</button>
            <p style={styles.newsletterText}>Get the latest tips and motivation to stay smoke-free delivered to your inbox</p>
          </div>
        </div>
        <div style={styles.copyright}>
          <p>© 2025 NicOff. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#F0F0F0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '15px 30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  standardMember: {
    backgroundColor: '#A4E087',
    color: '#2E7D32',
    padding: '8px 15px',
    borderRadius: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  standardMemberIcon: {
    width: '16px',
    height: '16px',
    backgroundColor: '#2E7D32',
    borderRadius: '50%',
  },
  headerCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  nicOffTitleSection: {
    textAlign: 'left',
  },
  nicOffTitle: {
    fontSize: '24px',
    color: '#2E7D32',
    margin: '0',
    fontWeight: 'bold',
  },
  nicOffSubtitle: {
    fontSize: '12px',
    color: '#666',
    margin: '0',
    fontStyle: 'italic',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  navLinks: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#555',
    fontWeight: 'bold',
    ':hover': {
      color: '#2E7D32',
    },
  },
  notificationIcon: {
    fontSize: '24px',
    color: '#FFD700',
    marginRight: '10px',
    cursor: 'pointer',
  },
  logoutButton: {
    backgroundColor: '#2E7D32',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    ':hover': {
      backgroundColor: '#388E3C',
    },
  },
  mainContent: {
    flex: 1,
    width: '100%',
    maxWidth: '900px',
    padding: '30px',
    margin: '30px 0',
  },
  backButton: {
    display: 'inline-block',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#2E7D32',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '20px',
    textDecoration: 'none',
  },
  coachProfileCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '30px',
  },
  coachAvatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: '24px',
    color: '#333',
    margin: '0 0 5px 0',
  },
  coachSpecialization: {
    fontSize: '16px',
    color: '#2E7D32',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
  },
  coachBio: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.6',
    margin: '0',
  },
  scheduleContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
  },
  calendarCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: '20px',
  },
  calendarTitle: {
    fontSize: '20px',
    color: '#333',
    margin: '0 0 20px 0',
    textAlign: 'center',
  },
  calendarNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  calendarNavButton: {
    backgroundColor: '#2E7D32',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  calendarMonthYear: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  calendarTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  calendarHeaderRow: {
    backgroundColor: '#E8F5E9',
  },
  calendarHeaderCell: {
    padding: '10px',
    textAlign: 'center',
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  calendarCell: {
    padding: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#DCEDC8',
    },
  },
  calendarCellEmpty: {
    padding: '10px',
    textAlign: 'center',
    color: '#ccc',
  },
  calendarCellToday: {
    border: '1px solid #2E7D32',
    fontWeight: 'bold',
  },
  calendarCellSelected: {
    backgroundColor: '#2E7D32',
    color: '#fff',
    fontWeight: 'bold',
  },
  calendarCellUnavailable: {
    color: '#C62828',
    textDecoration: 'line-through',
    cursor: 'not-allowed',
  },
  calendarCellPast: {
    color: '#ccc',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  timeSlotsCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: '20px',
  },
  timeSlotsTitle: {
    fontSize: '20px',
    color: '#333',
    margin: '0 0 20px 0',
    textAlign: 'center',
  },
  selectedDateText: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  slotsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  timeSlotButton: {
    backgroundColor: '#E8F5E9',
    border: '1px solid #A4E087',
    color: '#2E7D32',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease, border-color 0.2s ease',
    ':hover': {
      backgroundColor: '#DCEDC8',
      borderColor: '#2E7D32',
    },
  },
  timeSlotButtonActive: {
    backgroundColor: '#2E7D32',
    border: '1px solid #2E7D32',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  timeSlotButtonDisabled: {
    backgroundColor: '#F5F5F5',
    border: '1px solid #E0E0E0',
    color: '#999',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'not-allowed',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'line-through',
  },
  sessionSummaryCard: {
    backgroundColor: '#2E7D32',
    color: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: '20px',
    gridColumn: '2 / 3', // Places it in the second column
    gridRow: '1 / span 2', // Spans two rows
  },
  sessionSummaryTitle: {
    fontSize: '20px',
    margin: '0 0 20px 0',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  summaryDetail: {
    fontSize: '16px',
    margin: '0 0 10px 0',
    lineHeight: '1.5',
  },
  confirmButton: {
    backgroundColor: '#A4E087',
    color: '#2E7D32',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    ':hover': {
      backgroundColor: '#C8E6C9',
    },
  },
  footer: {
    width: '100%',
    maxWidth: '1440px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '40px 30px 20px 30px',
    marginTop: 'auto',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '30px',
    marginBottom: '30px',
  },
  footerSection: {
    flex: '1 1 200px',
    minWidth: '180px',
  },
  footerSectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#A4E087',
  },
  footerText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#ccc',
  },
  footerList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  footerLink: {
    textDecoration: 'none',
    color: '#ccc',
    fontSize: '14px',
    marginBottom: '8px',
    display: 'block',
    ':hover': {
      color: '#fff',
    },
  },
  newsletterInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #555',
    backgroundColor: '#444',
    color: '#fff',
    marginBottom: '10px',
  },
  subscribeButton: {
    backgroundColor: '#2E7D32',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    ':hover': {
      backgroundColor: '#388E3C',
    },
  },
  newsletterText: {
    fontSize: '12px',
    color: '#ccc',
    marginTop: '10px',
  },
  copyright: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#888',
    paddingTop: '20px',
    borderTop: '1px solid #444',
  },
};

export default BookAppointment; 