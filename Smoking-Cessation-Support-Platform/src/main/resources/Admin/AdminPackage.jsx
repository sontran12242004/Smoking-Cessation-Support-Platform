import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialPackages = [
  {
    name: 'Standard',
    price: '$ 0',
    duration: 'month',
    features: [
      { text: 'Basic progress tracking', ok: true },
      { text: 'Community access', ok: false },
      { text: 'Weekly tips', ok: true },
      { text: 'Personal coach', ok: false },
      { text: 'Advanced analytics', ok: false },
      { text: 'Email reminders', ok: false },
    ],
  },
  {
    name: 'Elite Package',
    price: '$ 299',
    duration: 'year',
    features: [
      { text: 'Premium progress tracking', ok: true },
      { text: 'Community access', ok: true },
      { text: 'Daily tips', ok: true },
      { text: 'Personal coach', ok: true },
      { text: 'Advanced analytics', ok: true },
      { text: 'Email reminders', ok: true },
    ],
  },
];

function AddPackageModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState('');
  const [featureType, setFeatureType] = useState(true); // true: tick, false: x
  const [desc, setDesc] = useState('');

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureInput.trim()) {
      setFeatures([...features, { text: featureInput.trim(), ok: featureType }]);
      setFeatureInput('');
      setFeatureType(true);
    }
  };
  const handleRemoveFeature = (idx) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !duration) return;
    onAdd({ name, price, duration, features, desc });
    onClose();
  };
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.popup}>
        <button style={modalStyles.closeBtn} onClick={onClose}>✖</button>
        <h2 style={modalStyles.title}>Add New Package</h2>
        <form style={modalStyles.form} onSubmit={handleSubmit}>
          <label style={modalStyles.label}>Package Name</label>
          <input style={modalStyles.input} placeholder="Package Name" value={name} onChange={e => setName(e.target.value)} />
          <label style={modalStyles.label}>Price</label>
          <input style={modalStyles.input} placeholder="Eg: $39" value={price} onChange={e => setPrice(e.target.value)} />
          <label style={modalStyles.label}>Duration</label>
          <input style={modalStyles.input} placeholder="Eg: 2 months, 3 months ..." value={duration} onChange={e => setDuration(e.target.value)} />
          <label style={modalStyles.label}>Features</label>
          <div style={modalStyles.featureInputRow}>
            <input
              style={{ ...modalStyles.input, flex: 1, marginBottom: 0 }}
              placeholder="Enter Feature"
              value={featureInput}
              onChange={e => setFeatureInput(e.target.value)}
            />
            <select style={{ height: 40, marginLeft: 4, borderRadius: 8 }} value={featureType ? 'tick' : 'x'} onChange={e => setFeatureType(e.target.value === 'tick')}>
              <option value="tick">✔</option>
              <option value="x">✖</option>
            </select>
            <button style={modalStyles.addFeatureBtn} onClick={handleAddFeature}>+ Add Feature</button>
          </div>
          <div style={modalStyles.featureList}>
            {features.map((f, idx) => (
              <div key={idx} style={modalStyles.featureItem}>
                <span>{f.text} {f.ok ? '✔' : '✖'}</span>
                <button type="button" style={modalStyles.removeFeatureBtn} onClick={() => handleRemoveFeature(idx)}>✖</button>
              </div>
            ))}
          </div>
          <label style={modalStyles.label}>Description</label>
          <textarea style={{ ...modalStyles.input, minHeight: 60 }} placeholder="Eg: This is our newest Package" value={desc} onChange={e => setDesc(e.target.value)} />
          <div style={modalStyles.btnRow}>
            <button type="button" style={modalStyles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={modalStyles.addBtn}>+ Add Package</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditPackageModal({ onClose, pkg, onSave }) {
  const [name, setName] = useState(pkg?.name || '');
  const [price, setPrice] = useState(pkg?.price || '');
  const [duration, setDuration] = useState(pkg?.duration || '');
  const [features, setFeatures] = useState(pkg?.features ? pkg.features.map(f => ({ ...f })) : []);
  const [featureInput, setFeatureInput] = useState('');
  const [featureType, setFeatureType] = useState(true);
  const [desc, setDesc] = useState(pkg?.desc || '');

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureInput.trim()) {
      setFeatures([...features, { text: featureInput.trim(), ok: featureType }]);
      setFeatureInput('');
      setFeatureType(true);
    }
  };
  const handleRemoveFeature = (idx) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !duration) return;
    onSave({ name, price, duration, features, desc });
    onClose();
  };
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.popup}>
        <button style={modalStyles.closeBtn} onClick={onClose}>✖</button>
        <h2 style={modalStyles.title}>Edit Package</h2>
        <form style={modalStyles.form} onSubmit={handleSubmit}>
          <label style={modalStyles.label}>Package Name</label>
          <input style={modalStyles.input} value={name} onChange={e => setName(e.target.value)} />
          <label style={modalStyles.label}>Price</label>
          <input style={modalStyles.input} value={price} onChange={e => setPrice(e.target.value)} />
          <label style={modalStyles.label}>Duration</label>
          <input style={modalStyles.input} value={duration} onChange={e => setDuration(e.target.value)} />
          <label style={modalStyles.label}>Features</label>
          <div style={modalStyles.featureInputRow}>
            <input
              style={{ ...modalStyles.input, flex: 1, marginBottom: 0 }}
              placeholder="Enter Feature"
              value={featureInput}
              onChange={e => setFeatureInput(e.target.value)}
            />
            <select style={{ height: 40, marginLeft: 4, borderRadius: 8 }} value={featureType ? 'tick' : 'x'} onChange={e => setFeatureType(e.target.value === 'tick')}>
              <option value="tick">✔</option>
              <option value="x">✖</option>
            </select>
            <button style={modalStyles.addFeatureBtn} onClick={handleAddFeature}>+ Add Feature</button>
          </div>
          <div style={modalStyles.featureList}>
            {features.map((f, idx) => (
              <div key={idx} style={modalStyles.featureItem}>
                <span>{f.text} {f.ok ? '✔' : '✖'}</span>
                <button type="button" style={modalStyles.removeFeatureBtn} onClick={() => handleRemoveFeature(idx)}>✖</button>
              </div>
            ))}
          </div>
          <label style={modalStyles.label}>Description</label>
          <textarea style={{ ...modalStyles.input, minHeight: 60 }} value={desc} onChange={e => setDesc(e.target.value)} />
          <div style={modalStyles.btnRow}>
            <button type="button" style={modalStyles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={modalStyles.saveBtn}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const AdminPackage = () => {
  const [activeMenu, setActiveMenu] = useState('Packages');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [packages, setPackages] = useState(initialPackages);
  const [showContentsDropdown, setShowContentsDropdown] = useState(false);
  const navigate = useNavigate();

  // Tách 3 card mặc định và các card custom
  const defaultPackages = packages.slice(0, 3);
  const customPackages = packages.slice(3);

  // Hàm mở popup edit và truyền index
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setShowEdit(true);
  };
  // Hàm lưu lại package đã chỉnh sửa
  const handleSaveEdit = (pkg) => {
    setPackages(
      packages.map((p, i) => (i === editIdx ? pkg : p))
    );
  };

  return (
    <div style={styles.container}>
      {/* Sidebar giống Dashboard */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.sidebarTitle}>NicOff</h1>
          <p style={styles.sidebarSubtitle}>Turn Off Nicotine, Turn On Life!</p>
        </div>
        <div style={styles.userSection}>
          <p style={styles.userName}>Jason (Admin)</p>
          <p style={styles.userRole}>Super Admin</p>
        </div>
        <div style={styles.menuContainer}>
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
      {/* Main Content Packages Management */}
      <div style={styles.mainContent}>
        <div style={showAdd || showEdit ? { filter: 'blur(2px)', pointerEvents: 'none', userSelect: 'none' } : {}}>
          <div style={styles.wrapper}>
            <div style={styles.headerRow}>
              <h1 style={styles.title}>Packages Management</h1>
              <button style={styles.addBtn} onClick={() => setShowAdd(true)}>+ Add New Package</button>
            </div>
            {/* Hàng trên: 3 card mặc định */}
            <div style={styles.cardRow}>
              {defaultPackages.map((pkg, idx) => {
                const sortedFeatures = [...pkg.features].sort((a, b) => b.ok - a.ok);
                return (
                  <div key={pkg.name + idx} style={styles.card}>
                    <div style={styles.cardTitle}>{pkg.name}</div>
                    <div style={styles.priceRow}>
                      <span style={styles.price}>{pkg.price}</span>
                      <span style={styles.duration}>/{pkg.duration}</span>
                    </div>
                    <ul style={styles.featureList}>
                      {sortedFeatures.map((f, i) => (
                        <li key={i} style={styles.featureItem}>
                          {f.ok ? (
                            <span style={styles.checkIcon}>✔️</span>
                          ) : (
                            <span style={styles.xIcon}>✖️</span>
                          )}
                          <span style={{ color: f.ok ? '#222' : '#c62828' }}>{f.text}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={styles.cardBtnRow}>
                      <button style={styles.editBtn} onClick={() => handleEdit(idx)}>Edit</button>
                      <button style={styles.deleteBtn}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Hàng dưới: các card mới thêm */}
            {customPackages.length > 0 && (
              <div style={{ ...styles.cardRow, marginTop: 32 }}>
                {customPackages.map((pkg, idx) => {
                  const sortedFeatures = [...pkg.features].sort((a, b) => b.ok - a.ok);
                  const realIdx = idx + 3;
                  return (
                    <div key={pkg.name + realIdx} style={styles.card}>
                      <div style={styles.cardTitle}>{pkg.name}</div>
                      <div style={styles.priceRow}>
                        <span style={styles.price}>{pkg.price}</span>
                        <span style={styles.duration}>/{pkg.duration}</span>
                      </div>
                      <ul style={styles.featureList}>
                        {sortedFeatures.map((f, i) => (
                          <li key={i} style={styles.featureItem}>
                            {f.ok ? (
                              <span style={styles.checkIcon}>✔️</span>
                            ) : (
                              <span style={styles.xIcon}>✖️</span>
                            )}
                            <span style={{ color: f.ok ? '#222' : '#c62828' }}>{f.text}</span>
                          </li>
                        ))}
                      </ul>
                      <div style={styles.cardBtnRow}>
                        <button style={styles.editBtn} onClick={() => handleEdit(realIdx)}>Edit</button>
                        <button style={styles.deleteBtn}>Delete</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {showAdd && <AddPackageModal onClose={() => setShowAdd(false)} onAdd={pkg => setPackages([...packages, pkg])} />}
        {showEdit && <EditPackageModal onClose={() => setShowEdit(false)} pkg={packages[editIdx]} onSave={handleSaveEdit} />}
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
  wrapper: {
    maxWidth: 1100,
    margin: '0 auto',
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    padding: 36,
    position: 'relative',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: '#406c2b',
    margin: 0,
    letterSpacing: 0.5,
    textShadow: '0 1px 0 #fff',
  },
  addBtn: {
    background: '#4d8b3c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 18px',
    fontWeight: 600,
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(77,139,60,0.12)',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  cardRow: {
    display: 'flex',
    gap: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  card: {
    background: '#eaf7ea',
    border: '2px solid #b6d7b6',
    borderRadius: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '28px 32px',
    minWidth: 260,
    maxWidth: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#4d8b3c',
    marginBottom: 8,
    textAlign: 'center',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 12,
    gap: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: 700,
    color: '#222',
  },
  duration: {
    fontSize: 16,
    color: '#222',
    marginLeft: 2,
    fontWeight: 400,
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '12px 0 18px 0',
    width: '100%',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 16,
    marginBottom: 4,
  },
  checkIcon: {
    color: '#4d8b3c',
    fontWeight: 700,
    fontSize: 18,
  },
  xIcon: {
    color: '#c62828',
    fontWeight: 700,
    fontSize: 18,
  },
  cardBtnRow: {
    display: 'flex',
    gap: 12,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
  },
  editBtn: {
    background: '#888',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '7px 22px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    transition: 'background 0.2s',
  },
  deleteBtn: {
    background: '#f77b8a',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '7px 22px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    transition: 'background 0.2s',
  },
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.18)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
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
  addBtn: {
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
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'none',
    border: 'none',
    fontSize: 28,
    color: '#e53935',
    cursor: 'pointer',
    zIndex: 10,
    fontWeight: 700,
    transition: 'color 0.2s',
  },
};

export default AdminPackage; 