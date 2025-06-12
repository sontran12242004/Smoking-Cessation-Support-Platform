import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialFeatures = [
  'Premium Progress Tracking',
  'Community access',
  'Weekly tips',
  'Personal coach',
  'Advanced analytics',
];

const EditPackage = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState(initialFeatures);
  const [featureInput, setFeatureInput] = useState('');

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };
  const handleRemoveFeature = (idx) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  return (
    <div style={styles.bg}>
      <div style={styles.popup}>
        <h2 style={styles.title}>Edit Package</h2>
        <form style={styles.form}>
          <label style={styles.label}>Package Name</label>
          <input style={styles.input} defaultValue="Premium Package" />

          <label style={styles.label}>Price</label>
          <input style={styles.input} defaultValue="$199" />

          <label style={styles.label}>Duration</label>
          <input style={styles.input} defaultValue="6 months" />

          <label style={styles.label}>Features</label>
          <div style={styles.featureInputRow}>
            <input
              style={{ ...styles.input, flex: 1, marginBottom: 0 }}
              placeholder="Enter Feature"
              value={featureInput}
              onChange={e => setFeatureInput(e.target.value)}
            />
            <button style={styles.addFeatureBtn} onClick={handleAddFeature}>+ Add Feature</button>
          </div>
          <div style={styles.featureList}>
            {features.map((f, idx) => (
              <div key={idx} style={styles.featureItem}>
                <span>{f}</span>
                <button type="button" style={styles.removeFeatureBtn} onClick={() => handleRemoveFeature(idx)}>✖</button>
              </div>
            ))}
          </div>

          <label style={styles.label}>Description</label>
          <textarea style={{ ...styles.input, minHeight: 60 }} defaultValue="" placeholder="Description" />

          <div style={styles.btnRow}>
            <button type="button" style={styles.cancelBtn} onClick={() => navigate('/packages')}>Cancel</button>
            <button type="submit" style={styles.saveBtn}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  bg: {
    minHeight: '100vh',
    background: 'rgba(234,247,234,0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
  },
  popup: {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
    padding: '36px 40px',
    minWidth: 420,
    maxWidth: 480,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  title: {
    color: '#357a38',
    fontSize: 28,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontWeight: 600,
    marginBottom: 2,
    color: '#222',
    fontSize: 16,
  },
  input: {
    border: '1.5px solid #4d8b3c',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 16,
    marginBottom: 10,
    outline: 'none',
    fontFamily: 'inherit',
    background: '#f8fff8',
    transition: 'border 0.2s',
  },
  featureInputRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 8,
  },
  addFeatureBtn: {
    background: '#4d8b3c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '0 16px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    height: 40,
    marginLeft: 4,
    transition: 'background 0.2s',
  },
  featureList: {
    marginBottom: 10,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#f8fff8',
    border: '1.5px solid #b6d7b6',
    borderRadius: 8,
    padding: '7px 12px',
    marginBottom: 6,
    fontSize: 15,
    fontWeight: 500,
    color: '#222',
  },
  removeFeatureBtn: {
    background: 'none',
    border: 'none',
    color: '#e53935',
    fontSize: 20,
    fontWeight: 700,
    cursor: 'pointer',
    marginLeft: 8,
    lineHeight: 1,
  },
  btnRow: {
    display: 'flex',
    gap: 16,
    marginTop: 18,
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    background: '#888',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 24px',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  saveBtn: {
    background: '#4d8b3c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 24px',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};

export default EditPackage; 