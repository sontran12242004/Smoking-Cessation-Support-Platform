import React, { useState } from 'react';

const AddCertificationModal = ({ isOpen, onClose, onAddCertification }) => {
  const [certificationName, setCertificationName] = useState('');

  const handleAdd = () => {
    if (certificationName.trim() !== '') {
      onAddCertification(certificationName.trim());
      setCertificationName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalTitle}>Add New Certification</h2>
        <input
          type="text"
          style={styles.input}
          placeholder="Certification Name"
          value={certificationName}
          onChange={(e) => setCertificationName(e.target.value)}
        />
        <div style={styles.buttonGroup}>
          <button style={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button style={styles.addButton} onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
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
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: '24px',
    color: '#2E7D32',
    marginBottom: '20px',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#43A047',
    },
  },
  cancelButton: {
    backgroundColor: '#D32F2F',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#B71C1C',
    },
  },
};

export default AddCertificationModal; 