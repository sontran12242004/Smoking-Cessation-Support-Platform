import React, { useState } from 'react';

const SendEmail = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      recipientEmail,
      subject,
      emailBody,
    });
    alert('Email Sent! Check console for details.');
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
      minHeight: '150px',
      resize: 'vertical',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
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
      <h1 style={styles.header}>Send Email To Members</h1>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Recipient Email</label>
            <input
              type="email"
              style={styles.input}
              placeholder="Enter recipient email address"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Subject</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Body</label>
            <textarea
              style={styles.textarea}
              placeholder="Write your email content here..."
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" style={styles.button}>
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEmail; 