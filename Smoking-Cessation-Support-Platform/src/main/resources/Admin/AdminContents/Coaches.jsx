import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialCoaches = [
  {
    name: 'Christopher C. Ross, M.D.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    ratingCount: 88,
    clients: 124,
    schedule: true,
  },
  {
    name: 'Xiang Gao, M.D., Ph.D.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 4.7,
    ratingCount: 76,
    clients: 87,
    schedule: true,
  },
  {
    name: 'Elizabeth T. Smith, Ph.D.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.9,
    ratingCount: 112,
    clients: 150,
    schedule: true,
  },
  {
    name: 'David B. Lee, M.D.',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    rating: 4.6,
    ratingCount: 55,
    clients: 70,
    schedule: false,
  },
  {
    name: 'Sophia R. Garcia, M.D.',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 4.8,
    ratingCount: 95,
    clients: 130,
    schedule: true,
  },
  {
    name: 'Robert C. Brown, Ph.D.',
    avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
    rating: 4.5,
    ratingCount: 40,
    clients: 60,
    schedule: false,
  },
];

function AddCoachModal({ onClose, onAdd }) {
  // Các state cho form coach mới
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [title, setTitle] = useState('');
  const [specialty, setSpecialty] = useState('Additional Specialist');
  const [years, setYears] = useState('');
  const [rate, setRate] = useState('');
  const [days, setDays] = useState(['Mon', 'Tue', 'Wed']);
  const [slots, setSlots] = useState(['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']);
  const [certs, setCerts] = useState([]);
  const [certInput, setCertInput] = useState('');

  const handleDayToggle = (d) => {
    setDays(days.includes(d) ? days.filter(x => x !== d) : [...days, d]);
  };
  const handleSlotToggle = (s) => {
    setSlots(slots.includes(s) ? slots.filter(x => x !== s) : [...slots, s]);
  };
  const handleAddCert = (e) => {
    e.preventDefault();
    if (certInput.trim()) {
      setCerts([...certs, certInput.trim()]);
      setCertInput('');
    } else {
      alert('Certification cannot be empty.');
    }
  };
  const handleRemoveCert = (idx) => {
    setCerts(certs.filter((_, i) => i !== idx));
  };
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setAvatar(''); // Clear avatar if no file is selected
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !title || !specialty || !years || !rate || days.length === 0 || slots.length === 0) {
      alert('Please fill in all required fields and select availability.');
      return;
    }
    onAdd({
      name,
      avatar: avatar || 'https://randomuser.me/api/api/portraits/lego/1.jpg', // Default avatar if none uploaded
      bio,
      title,
      specialty,
      years: parseInt(years, 10),
      rate: parseFloat(rate),
      days,
      slots,
      certs,
      rating: 5, // Default rating for new coach
      ratingCount: 1,
      clients: 0,
      schedule: days.length > 0 && slots.length > 0, // Schedule based on availability
    });
    onClose(); // Close modal after adding
  };
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.popupLarge}>
        <button style={modalStyles.closeBtn} onClick={onClose}>✖</button>
        <h2 style={modalStyles.titleLarge}>Add New Coach</h2>
        <form style={modalStyles.formLarge} onSubmit={handleSubmit}>
          {/* Main wrapper for two columns */}
          <div style={modalStyles.formTwoColumns}> 
            {/* Left Column */}
            <div style={modalStyles.formColumn}> 
              {/* Avatar Upload */}
              <div style={modalStyles.formSectionFull}> {/* Use full width style within column */}
                <div style={modalStyles.avatarUploadContent}> {/* Wrapper for centering */}
                  <div style={modalStyles.avatarPlaceholder}> {/* Placeholder for avatar */}
                     {avatar ? <img src={avatar} alt="avatar" style={modalStyles.avatarPreview} /> : <span style={{ fontSize: 48, color: '#888' }}>👤</span>}
                  </div>
                  <label style={modalStyles.chooseFileBtn}> {/* Styled label for file input */}
                    Choose file
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatar} />
                  </label>
                  <button type="button" style={modalStyles.uploadBtn}>Upload</button>
                </div> 
              </div>

              {/* Full Name */}
              <div style={modalStyles.formField}> {/* Removed width: '80%' */}
                <label style={modalStyles.label}>Full Name</label>
                <input style={modalStyles.input} value={name} onChange={e => setName(e.target.value)} />
              </div>

              {/* Professional Bio */}
              <div style={modalStyles.formField}> {/* Removed width: '80%' */}
                <label style={modalStyles.label}>Professional Bio</label>
                <textarea style={{ ...modalStyles.input, minHeight: 80 }} value={bio} onChange={e => setBio(e.target.value)} /> 
              </div>

              {/* Certification Section */}
              <div style={modalStyles.formField}> {/* Applied consistent formField style */}
                <label style={modalStyles.label}>Certification</label>
                <div style={modalStyles.featureInputRow}> 
                  <input style={{ ...modalStyles.input, flex: 1, marginBottom: 0 }} placeholder="+ Add Certification" value={certInput} onChange={e => setCertInput(e.target.value)} />
                  <button style={modalStyles.addFeatureBtn} onClick={handleAddCert}>+</button>
                </div>
                <div style={modalStyles.featureList}> 
                  {certs.map((c, idx) => (
                    <span key={idx} style={modalStyles.featureItem}> 
                      {c} <span style={{ color: '#e53935', cursor: 'pointer' }} onClick={() => handleRemoveCert(idx)}>✖</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={modalStyles.formColumn}> 
              {/* Professional Title */}
              <div style={modalStyles.formField}> {/* Applied consistent formField style */}
                <label style={modalStyles.label}>Professional Title</label>
                <input style={modalStyles.input} placeholder="Eg: Additional Specialist" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              {/* Primary Specialty and Years of Experiences */}
              <div style={modalStyles.formFieldRow}> {/* Keep original marginBottom */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={modalStyles.label}>Primary Specialty</label>
                  <select style={modalStyles.input} value={specialty} onChange={e => setSpecialty(e.target.value)}> {/* Revert to input style */}
                    <option>Additional Specialist</option>
                    <option>Cardiology</option>
                    <option>Oncology</option>
                    <option>Psychiatry</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={modalStyles.label}>Years of Experiences</label>
                  <input type="number" style={modalStyles.input} value={years} onChange={e => setYears(e.target.value)} />
                </div>
              </div>

              {/* Hourly Rates */}
              <div style={modalStyles.formField}> {/* Applied consistent formField style */}
                <label style={modalStyles.label}>Hourly Rates $</label>
                <input style={modalStyles.input} placeholder="Eg: 120" value={rate} onChange={e => setRate(e.target.value)} />
              </div>

              {/* Availability Section */}
              <div style={modalStyles.formField}> {/* Applied consistent formField style */}
                <label style={modalStyles.label}>Availability Schedule</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <button key={d} type="button" style={{ ...modalStyles.dayBtn, background: days.includes(d) ? '#A4E087' : '#fff', color: days.includes(d) ? '#357a38' : '#222' }} onClick={() => handleDayToggle(d)}>{d}</button>
                  ))}
                </div>
                <label style={modalStyles.label}>Available Time Slots</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}> 
                  {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map(s => (
                    <button key={s} type="button" style={{ ...modalStyles.slotBtn, background: slots.includes(s) ? '#4d8b3c' : '#fff', color: slots.includes(s) ? '#fff' : '#222' }} onClick={() => handleSlotToggle(s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={modalStyles.btnRowLarge}> 
            <button type="button" style={modalStyles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={modalStyles.saveBtn}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// EditCoachModal component (more complete structure)
function EditCoachModal({ onClose, coach, onSave }) {
  const [name, setName] = useState(coach?.name || '');
  const [avatar, setAvatar] = useState(coach?.avatar || '');
  const [bio, setBio] = useState(coach?.bio || '');
  const [title, setTitle] = useState(coach?.title || '');
  const [specialty, setSpecialty] = useState(coach?.specialty || 'Additional Specialist');
  const [years, setYears] = useState(coach?.years || '');
  const [rate, setRate] = useState(coach?.rate || '');
  const [days, setDays] = useState(coach?.days || ['Mon', 'Tue', 'Wed']);
  const [slots, setSlots] = useState(coach?.slots || ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']);
  const [certs, setCerts] = useState(coach?.certs || []);
  const [certInput, setCertInput] = useState('');

  const handleDayToggle = (d) => {
    setDays(days.includes(d) ? days.filter(x => x !== d) : [...days, d]);
  };
  const handleSlotToggle = (s) => {
    setSlots(slots.includes(s) ? slots.filter(x => x !== s) : [...slots, s]);
  };
  const handleAddCert = (e) => {
    e.preventDefault();
    if (certInput.trim()) {
      setCerts([...certs, certInput.trim()]);
      setCertInput('');
    } else {
      alert('Certification cannot be empty.');
    }
  };
  const handleRemoveCert = (idx) => {
    setCerts(certs.filter((_, i) => i !== idx));
  };
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setAvatar(''); // Clear avatar if no file is selected
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !title || !specialty || !years || !rate || days.length === 0 || slots.length === 0) {
      alert('Please fill in all required fields and select availability.');
      return;
    }
    onSave({
      ...coach, // Keep existing coach properties
      name,
      avatar: avatar || 'https://randomuser.me/api/api/portraits/lego/1.jpg', // Default avatar if none uploaded
      bio,
      title,
      specialty,
      years: parseInt(years, 10),
      rate: parseFloat(rate),
      days,
      slots,
      certs,
      schedule: days.length > 0 && slots.length > 0, // Schedule based on availability
    });
    onClose(); // Close modal after saving
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.popupLarge}> {/* Reuse popupLarge style */}
        <button style={modalStyles.closeBtn} onClick={onClose}>✖</button>
        <h2 style={modalStyles.titleLarge}>Edit Coach</h2>
        <form style={modalStyles.formLarge} onSubmit={handleSubmit}>
          {/* Main wrapper for two columns */}
          <div style={modalStyles.formTwoColumns}> 
            {/* Left Column */}
            <div style={modalStyles.formColumn}> 
              {/* Avatar Upload */}
              <div style={modalStyles.formSectionFull}> {/* Use full width style within column */}
                <div style={modalStyles.avatarUploadContent}> {/* Wrapper for centering */}
                  <div style={modalStyles.avatarPlaceholder}> {/* Placeholder for avatar */}
                    {avatar ? <img src={avatar} alt="avatar" style={modalStyles.avatarPreview} /> : <span style={{ fontSize: 48, color: '#888' }}>👤</span>}
                  </div>
                  <label style={modalStyles.chooseFileBtn}> {/* Styled label for file input */}
                    Choose file
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatar} />
                  </label>
                  <button type="button" style={modalStyles.uploadBtn}>Upload</button>
                </div> 
              </div>

              {/* Full Name */}
              <div style={modalStyles.formField}> {/* Removed width: '80%' */}
                <label style={modalStyles.label}>Full Name</label>
                <input style={modalStyles.input} value={name} onChange={e => setName(e.target.value)} />
              </div>

              {/* Professional Bio */}
              <div style={modalStyles.formField}> {/* Removed width: '80%' */}
                <label style={modalStyles.label}>Professional Bio</label>
                <textarea style={{ ...modalStyles.input, minHeight: 80 }} value={bio} onChange={e => setBio(e.target.value)} /> 
              </div>

              {/* Certification Section */}
              <div style={modalStyles.formField}> {/* Applied consistent formField style */}
                <label style={modalStyles.label}>Certification</label>
                <div style={modalStyles.featureInputRow}> 
                  <input style={{ ...modalStyles.input, flex: 1, marginBottom: 0 }} placeholder="+ Add Certification" value={certInput} onChange={e => setCertInput(e.target.value)} />
                  <button style={modalStyles.addFeatureBtn} onClick={handleAddCert}>+</button>
                </div>
                <div style={modalStyles.featureList}> 
                  {certs.map((c, idx) => (
                    <span key={idx} style={modalStyles.featureItem}> 
                      {c} <span style={{ color: '#e53935', cursor: 'pointer' }} onClick={() => handleRemoveCert(idx)}>✖</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={modalStyles.formColumn}> 
              {/* Professional Title */}
              <div style={modalStyles.formField}> {/* Applied consistent formField style */}
                <label style={modalStyles.label}>Professional Title</label>
                <input style={modalStyles.input} placeholder="Eg: Additional Specialist" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              {/* Primary Specialty and Years of Experiences */}
              <div style={modalStyles.formFieldRow}> {/* Keep original marginBottom */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={modalStyles.label}>Primary Specialty</label>
                  <select style={modalStyles.input} value={specialty} onChange={e => setSpecialty(e.target.value)}> {/* Revert to input style */}
                    <option>Additional Specialist</option>
                    <option>Cardiology</option>
                    <option>Oncology</option>
                    <option>Psychiatry</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={modalStyles.label}>Years of Experiences</label>
                  <input type="number" style={modalStyles.input} value={years} onChange={e => setYears(e.target.value)} />
                </div>
              </div>

              {/* Hourly Rates */}
              <div style={modalStyles.formField}> {/* Applied consistent formField style */}
                <label style={modalStyles.label}>Hourly Rates $</label>
                <input style={modalStyles.input} placeholder="Eg: 120" value={rate} onChange={e => setRate(e.target.value)} />
              </div>

              {/* Availability Section */}
              <div style={modalStyles.formField}> {/* Applied consistent formField style */}
                <label style={modalStyles.label}>Availability Schedule</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <button key={d} type="button" style={{ ...modalStyles.dayBtn, background: days.includes(d) ? '#A4E087' : '#fff', color: days.includes(d) ? '#357a38' : '#222' }} onClick={() => handleDayToggle(d)}>{d}</button>
                  ))}
                </div>
                <label style={modalStyles.label}>Available Time Slots</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}> 
                  {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map(s => (
                    <button key={s} type="button" style={{ ...modalStyles.slotBtn, background: slots.includes(s) ? '#4d8b3c' : '#fff', color: slots.includes(s) ? '#fff' : '#222' }} onClick={() => handleSlotToggle(s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={modalStyles.btnRowLarge}> 
            <button type="button" style={modalStyles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={modalStyles.saveBtn}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Coaches = () => {
  const [activeMenu, setActiveMenu] = useState('Coaches');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingCoachId, setEditingCoachId] = useState(null);
  const [coaches, setCoaches] = useState(initialCoaches);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

  const handleEditClick = (coachId) => {
    setEditingCoachId(coachId);
    setShowEdit(true);
  };

  const handleSaveEdit = (updatedCoach) => {
    setCoaches(coaches.map(coach => coach.name === updatedCoach.name ? updatedCoach : coach));
    setShowEdit(false);
    setEditingCoachId(null);
  };

  const handleAddCoach = (newCoach) => {
    setCoaches([...coaches, newCoach]);
    setShowAdd(false);
  };

  const coachToEdit = coaches.find(coach => coach.name === editingCoachId);

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearchTerm = coach.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = 
      availabilityFilter === 'All' ||
      (availabilityFilter === 'Available' && coach.schedule === true) ||
      (availabilityFilter === 'Unavailable' && coach.schedule === false);
    return matchesSearchTerm && matchesAvailability;
  });

  return (
    <div style={styles.container}>
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
                <li style={activeMenu === 'Dashboard' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('Dashboard')}>Dashboard</li>
              </Link>
              <Link to="/admin/analytics" style={styles.menuLink}>
                <li style={activeMenu === 'Analytics' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('Analytics')}>Analytics</li>
              </Link>
            </ul>
          </div>
          <div style={styles.menuSection}>
            <h4 style={styles.sectionTitle}>MANAGEMENT</h4>
            <ul style={styles.menuList}>
              <Link to="/admin/members" style={styles.menuLink}>
                <li style={activeMenu === 'Members' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('Members')}>Members</li>
              </Link>
              <Link to="/admin/packages" style={styles.menuLink}>
                <li style={activeMenu === 'Packages' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('Packages')}>Packages</li>
              </Link>
              <Link to="/admin/contents" style={styles.menuLink}>
                <li style={activeMenu === 'Contents' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('Contents')}>Contents</li>
              </Link>
              <Link to="/admin/coaches" style={styles.menuLink}>
                <li style={activeMenu === 'Coaches' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('Coaches')}>Coaches</li>
              </Link>
              <Link to="/admin/ratings" style={styles.menuLink}>
                <li style={activeMenu === 'Ratings, Feedbacks' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('Ratings, Feedbacks')}>Ratings, Feedbacks</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div style={styles.mainContent}>
        <div style={showAdd || showEdit ? { filter: 'blur(2px)', pointerEvents: 'none', userSelect: 'none' } : {}}>
          <div style={styles.wrapper}>
            <div style={styles.headerRow}>
              <h1 style={styles.title}>Coaches Management</h1>
              <div style={styles.filterControls}>
                <input
                  type="text"
                  placeholder="Search by name..."
                  style={styles.searchInput}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <select
                  style={styles.dropdown}
                  value={availabilityFilter}
                  onChange={e => setAvailabilityFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
                <button style={styles.addBtn} onClick={() => setShowAdd(true)}>+ Add New Coach</button>
              </div>
            </div>
            <div style={styles.statsRow}>
              <div style={styles.statBox}><div style={styles.statLabel}>Total Coaches</div><div style={styles.statValue}>32</div></div>
              <div style={styles.statBox}><div style={styles.statLabel}>Success Rate</div><div style={styles.statValue}>94%</div></div>
              <div style={styles.statBox}><div style={styles.statLabel}>Active Coaches</div><div style={styles.statValue}>18</div></div>
              <div style={styles.statBox}><div style={styles.statLabel}>Avg. Rating</div><div style={styles.statValue}>4.5%</div></div>
            </div>
            <div style={styles.cardRow}>
              {filteredCoaches.map((c, idx) => (
                <div key={c.name + idx} style={styles.coachCard}>
                  <div style={styles.coachImage}>
                    <img src={c.avatar} alt={c.name} style={styles.coachImageContent} />
                  </div>
                  <div style={styles.coachName}>{c.name}</div>
                  <div style={styles.coachInfoRow}>
                    <span style={styles.coachRating}>★ {c.rating} <span style={{ color: '#888', fontWeight: 400 }}>({c.ratingCount})</span></span>
                    <span style={styles.coachClients}>👤 {c.clients} clients</span>
                  </div>
                  <div style={styles.coachBtnRow}>
                    <button style={styles.editBtn} onClick={() => handleEditClick(c.name)}>Edit</button>
                    <Link to="/confirm-coach-schedule" style={styles.scheduleButtonLink}>
                      <button style={styles.scheduleButton}>Schedule</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {showAdd && <AddCoachModal onClose={() => setShowAdd(false)} onAdd={handleAddCoach} />}
        {showEdit && coachToEdit && <EditCoachModal onClose={() => setShowEdit(false)} coach={coachToEdit} onSave={handleSaveEdit} />}
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
    transition: 'all 0.2s ease',
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
    marginBottom: 30,
    flexWrap: 'wrap',
    gap: '15px',
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: '#406c2b',
    margin: '0',
    letterSpacing: 0.5,
    textShadow: '0 1px 0 #fff',
  },
  filterControls: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchInput: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    width: '200px',
    transition: 'border-color 0.2s ease',
    ':focus': {
      borderColor: '#4d8b3c'
    }
  },
  dropdown: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#fff',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
    ':focus': {
      borderColor: '#4d8b3c'
    }
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
  statsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 40,
    gap: 20,
  },
  statBox: {
    textAlign: 'center',
    background: '#e8f5e9',
    padding: '20px 25px',
    borderRadius: 12,
    flex: 1,
    minWidth: 120,
  },
  statLabel: {
    fontSize: 15,
    color: '#2e7d32',
    marginBottom: 8,
    fontWeight: 600,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 700,
    color: '#1b5e20',
  },
  cardRow: {
    display: 'flex',
    gap: 32,
    overflowX: 'auto',
    paddingBottom: 15,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  coachCard: {
    background: '#fff9c4',
    border: '2px solid #fbc02d',
    borderRadius: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '20px 20px 15px 20px',
    minWidth: 250,
    maxWidth: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  coachName: {
    fontSize: 19,
    fontWeight: 700,
    color: '#222',
    marginBottom: 6,
  },
  coachInfoRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 18,
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  coachRating: {
    color: '#fbc02d',
    fontWeight: 600,
  },
  coachClients: {
    color: '#555',
  },
  coachBtnRow: {
    display: 'flex',
    gap: 12,
    marginTop: 8,
  },
  editBtn: {
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '8px 18px',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  scheduleBtn: {
    background: '#FF9800',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '8px 18px',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  addCoachCard: {
    background: '#fff9c4',
    border: '2px dashed #fbc02d',
    borderRadius: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '20px',
    minWidth: 250,
    maxWidth: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  addCoachPlus: {
    fontSize: 60,
    color: '#fbc02d',
    lineHeight: 1,
  },
  addCoachText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#555',
    marginTop: 5,
  },
  coachImage: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '8px 8px 0 0',
  },
  coachImageContent: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  scheduleButton: {
    padding: '8px 15px',
    backgroundColor: '#FFA726',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#FB8C00'
    }
  },
  scheduleButtonLink: {
    textDecoration: 'none',
  },
  coachCardText: {
    marginBottom: '10px',
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
  popupLarge: {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
    padding: '30px',
    minWidth: 420,
    maxWidth: 800,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
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
  titleLarge: {
    color: '#357a38',
    fontSize: 28,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 0.5,
    padding: '0',
  },
  formLarge: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  formTwoColumns: {
    display: 'flex',
    gap: 30,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 16,
    padding: 0,
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  },
  formFieldRow: {
    display: 'flex',
    gap: 20,
    marginBottom: 16,
  },
  formSectionFull: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 16,
  },
   avatarUploadContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
   avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    background: '#eee',
    marginBottom: 10,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
  },
  avatarPreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  chooseFileBtn: {
    color: '#357a38',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: 10,
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
    marginBottom: 0,
    outline: 'none',
    fontFamily: 'inherit',
    background: '#f8fff8',
    transition: 'border 0.2s',
    width: '100%',
    boxSizing: 'border-box',
  },
  uploadBtn: {
    background: '#4d8b3c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '8px 16px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  featureInputRow: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addFeatureBtn: {
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '8px 15px',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    marginLeft: 8,
  },
  featureList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  featureItem: {
    background: '#eaf7ea',
    borderRadius: 6,
    padding: '3px 8px',
    marginRight: 0,
    display: 'inline-block',
  },
  removeFeatureBtn: {
    background: 'none',
    border: 'none',
    color: '#e53935',
    cursor: 'pointer',
    fontSize: 14,
  },
  dayBtn: {
    padding: '8px 12px',
    border: '1px solid #A4E087',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
  slotBtn: {
    padding: '8px 12px',
    border: '1px solid #4d8b3c',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
  btnRowLarge: {
    display: 'flex',
    gap: 16,
    marginTop: 30,
    justifyContent: 'center',
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

export default Coaches; 