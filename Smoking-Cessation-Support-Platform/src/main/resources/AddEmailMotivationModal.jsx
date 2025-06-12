import React, { useState, useEffect } from 'react';

const AddEmailMotivationModal = ({ onClose, onSave, nextDayNumber }) => {
  const [dayNo, setDayNo] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (nextDayNumber) {
      setDayNo(`Day ${nextDayNumber} (Auto Generate)`);
    }
  }, [nextDayNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content, day: nextDayNumber });
    onClose();
  };

  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: '#F0F7F0',
      borderRadius: '10px',
      padding: '30px',
      width: '500px', 
      minHeight: '400px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '1px solid #ccc',
    },
    modalTitle: {
      fontSize: '22px',
      color: '#2E7D32',
      margin: '0',
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#666',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      fontSize: '16px',
      color: '#2E7D32',
      marginBottom: '8px',
      display: 'block',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '15px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '15px',
      minHeight: '150px',
      resize: 'vertical',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
    },
    saveButton: {
      backgroundColor: '#66BB6A',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '20px',
      display: 'block',
      margin: '0 auto',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#4CAF50',
      },
    },
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Add New Email Reminder</h2>
          <button style={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Day No.</label>
            <input type="text" style={styles.input} value={dayNo} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Content:</label>
            <textarea
              style={styles.textarea}
              placeholder="Enter reminder Content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" style={styles.saveButton}>
            Save Reminder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmailMotivationModal; 