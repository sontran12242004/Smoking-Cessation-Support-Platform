import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Questionnaire = () => {
  const [q1, setQ1] = useState(''); // Question 1: How many cigarettes do you typically smoke per day?
  const [q2, setQ2] = useState(''); // Question 2: How soon after waking up do you smoke your first cigarette?
  const [q3, setQ3] = useState(''); // Question 3: What's your main motivation for quitting?
  const [q4, setQ4] = useState(''); // Question 4: Have you tried quitting before?
  const [q5, setQ5] = useState([]); // Question 5: What situations trigger your urge to smoke? (Select all that apply)
  const [q6, setQ6] = useState(''); // Question 6: How much do you typically spend on cigarettes per week?

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setQ5(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
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
        <div style={styles.questionnaireCard}>
          <h1 style={styles.mainTitle}>Answer Questions, <span style={styles.highlightText}>Build Your Plan</span></h1>
          <p style={styles.mainSubtitle}>Help us understand your smoking habits to create a personalized quit plan</p>

          {/* Question 1 */}
          <div style={styles.questionSection}>
            <h3 style={styles.questionTitle}>1. How many cigarettes do you typically smoke per day?</h3>
            <div style={styles.optionsContainer}>
              <label style={styles.optionLabel}>
                <input type="radio" name="q1" value="1-5" checked={q1 === '1-5'} onChange={(e) => setQ1(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>1-5</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q1" value="6-10" checked={q1 === '6-10'} onChange={(e) => setQ1(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>6-10</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q1" value="11-20" checked={q1 === '11-20'} onChange={(e) => setQ1(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>11-20</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q1" value="More than 20" checked={q1 === 'More than 20'} onChange={(e) => setQ1(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>More than 20</span>
              </label>
            </div>
          </div>

          {/* Question 2 */}
          <div style={styles.questionSection}>
            <h3 style={styles.questionTitle}>2. How soon after waking up do you smoke your first cigarette?</h3>
            <div style={styles.optionsContainer}>
              <label style={styles.optionLabel}>
                <input type="radio" name="q2" value="Within 5 minutes" checked={q2 === 'Within 5 minutes'} onChange={(e) => setQ2(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>Within 5 minutes</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q2" value="6-30 minutes" checked={q2 === '6-30 minutes'} onChange={(e) => setQ2(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>6-30 minutes</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q2" value="31-60 minutes" checked={q2 === '31-60 minutes'} onChange={(e) => setQ2(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>31-60 minutes</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q2" value="After 60 minutes" checked={q2 === 'After 60 minutes'} onChange={(e) => setQ2(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>After 60 minutes</span>
              </label>
            </div>
          </div>

          {/* Question 3 */}
          <div style={styles.questionSection}>
            <h3 style={styles.questionTitle}>3. What's your main motivation for quitting?</h3>
            <div style={styles.optionsContainer}>
              <label style={styles.optionLabel}>
                <input type="radio" name="q3" value="Health reasons" checked={q3 === 'Health reasons'} onChange={(e) => setQ3(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>Health reasons</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q3" value="Family/relationships" checked={q3 === 'Family/relationships'} onChange={(e) => setQ3(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>Family/relationships</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q3" value="Financial savings" checked={q3 === 'Financial savings'} onChange={(e) => setQ3(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>Financial savings</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q3" value="Appearance/smell" checked={q3 === 'Appearance/smell'} onChange={(e) => setQ3(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>Appearance/smell</span>
              </label>
            </div>
          </div>

          {/* Question 4 */}
          <div style={styles.questionSection}>
            <h3 style={styles.questionTitle}>4. Have you tried quitting before?</h3>
            <div style={styles.optionsContainer}>
              <label style={styles.optionLabel}>
                <input type="radio" name="q4" value="No, this is my first time" checked={q4 === 'No, this is my first time'} onChange={(e) => setQ4(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>No, this is my first time</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q4" value="Yes, once" checked={q4 === 'Yes, once'} onChange={(e) => setQ4(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>Yes, once</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q4" value="Yes, multiple times" checked={q4 === 'Yes, multiple times'} onChange={(e) => setQ4(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>Yes, multiple times</span>
              </label>
            </div>
          </div>

          {/* Question 5 */}
          <div style={styles.questionSection}>
            <h3 style={styles.questionTitle}>5. What situations trigger your urge to smoke? (Select all that apply)</h3>
            <div style={styles.optionsContainer}>
              <label style={styles.optionLabel}>
                <input type="checkbox" name="q5" value="Morning coffee" checked={q5.includes('Morning coffee')} onChange={handleCheckboxChange} style={styles.radioInput} />
                <span style={styles.optionText}>Morning coffee</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="checkbox" name="q5" value="Stressful situations" checked={q5.includes('Stressful situations')} onChange={handleCheckboxChange} style={styles.radioInput} />
                <span style={styles.optionText}>Stressful situations</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="checkbox" name="q5" value="Social gatherings" checked={q5.includes('Social gatherings')} onChange={handleCheckboxChange} style={styles.radioInput} />
                <span style={styles.optionText}>Social gatherings</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="checkbox" name="q5" value="After meals" checked={q5.includes('After meals')} onChange={handleCheckboxChange} style={styles.radioInput} />
                <span style={styles.optionText}>After meals</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="checkbox" name="q5" value="When bored" checked={q5.includes('When bored')} onChange={handleCheckboxChange} style={styles.radioInput} />
                <span style={styles.optionText}>When bored</span>
              </label>
            </div>
          </div>

          {/* Question 6 */}
          <div style={styles.questionSection}>
            <h3 style={styles.questionTitle}>6. How much do you typically spend on cigarettes per week?</h3>
            <div style={styles.optionsContainer}>
              <label style={styles.optionLabel}>
                <input type="radio" name="q6" value="Under $10" checked={q6 === 'Under $10'} onChange={(e) => setQ6(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>Under $10</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q6" value="$10 - $25" checked={q6 === '$10 - $25'} onChange={(e) => setQ6(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>$10 - $25</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q6" value="$26 - $50" checked={q6 === '$26 - $50'} onChange={(e) => setQ6(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>$26 - $50</span>
              </label>
              <label style={styles.optionLabel}>
                <input type="radio" name="q6" value="Over $50" checked={q6 === 'Over $50'} onChange={(e) => setQ6(e.target.value)} style={styles.radioInput} />
                <span style={styles.optionText}>Over $50</span>
              </label>
            </div>
          </div>

          <button style={styles.createPlanButton}>Create My Quit Plan</button>
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
    // Placeholder for actual icon
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
  questionnaireCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: '40px',
  },
  mainTitle: {
    fontSize: '32px',
    color: '#333',
    margin: '0 0 10px 0',
    textAlign: 'center',
  },
  highlightText: {
    color: '#2E7D32',
  },
  mainSubtitle: {
    fontSize: '16px',
    color: '#666',
    margin: '0 0 40px 0',
    textAlign: 'center',
  },
  questionSection: {
    marginBottom: '30px',
  },
  questionTitle: {
    fontSize: '18px',
    color: '#333',
    margin: '0 0 15px 0',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  optionLabel: {
    backgroundColor: '#E8F5E9',
    padding: '12px 20px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#DCEDC8',
    },
  },
  radioInput: {
    marginRight: '15px',
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  optionText: {
    fontSize: '16px',
    color: '#333',
  },
  createPlanButton: {
    backgroundColor: '#2E7D32',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'block',
    margin: '40px auto 0 auto',
    ':hover': {
      backgroundColor: '#388E3C',
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

export default Questionnaire; 