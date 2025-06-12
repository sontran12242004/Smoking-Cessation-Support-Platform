import React, { useState } from 'react';

const SendNotificationToMembers = () => {
  const [notificationTitle, setNotificationTitle] = useState('');
  const [recipients, setRecipients] = useState('allMembers');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [postToFeed, setPostToFeed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      notificationTitle,
      recipients,
      selectedPackage,
      message,
      priority,
      postToFeed,
    });
    // Add logic to send notification here
    alert('Notification Sent! Check console for details.');
  };

  const styles = {
    container: {
      padding: '30px',
      backgroundColor: '#DFF5DE',
      flexGrow: 1,
    },
    header: {
      fontSize: '28px',
      color: '#2E7D32',
      marginBottom: '30px',
      fontWeight: 'bold',
    },
    formContainer: {
      backgroundColor: '#F0F7F0',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      fontSize: '18px',
      color: '#2E7D32',
      marginBottom: '10px',
      display: 'block',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      minHeight: '120px',
      resize: 'vertical',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
    },
    radioGroup: {
      display: 'flex',
      gap: '20px',
      marginBottom: '10px',
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
      color: '#555',
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '20px',
    },
    checkboxLabel: {
      fontSize: '16px',
      color: '#555',
      marginLeft: '8px',
    },
    button: {
      padding: '12px 30px',
      backgroundColor: '#66BB6A',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '30px',
      display: 'block',
      margin: '0 auto',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#4CAF50',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Send Notification To Members Management</h1>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Notification Title</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter Notification Title"
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Recipients</label>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="recipients"
                  value="allMembers"
                  checked={recipients === 'allMembers'}
                  onChange={(e) => setRecipients(e.target.value)}
                />
                All Members
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="recipients"
                  value="specificPackage"
                  checked={recipients === 'specificPackage'}
                  onChange={(e) => setRecipients(e.target.value)}
                />
                Specific Package
              </label>
            </div>
            {recipients === 'specificPackage' && (
              <select
                style={styles.select}
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                <option value="">Select Package</option>
                <option value="basic">Basic Package</option>
                <option value="premium">Premium Package</option>
                <option value="vip">VIP Package</option>
              </select>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Message</label>
            <textarea
              style={styles.textarea}
              placeholder="Enter Your Notification Message Here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Priority</label>
            <select
              style={styles.select}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="postToFeed"
              checked={postToFeed}
              onChange={(e) => setPostToFeed(e.target.checked)}
            />
            <label htmlFor="postToFeed" style={styles.checkboxLabel}>Also post this to Customers feed</label>
          </div>

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendNotificationToMembers; 