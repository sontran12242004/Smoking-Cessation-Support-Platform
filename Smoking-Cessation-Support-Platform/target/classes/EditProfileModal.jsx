import React, { useState } from 'react';

function EditProfileModal({ open, onClose, onSave, initialData = {} }) {
  const [form, setForm] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    quitDate: initialData.quitDate || '',
    dailyUsage: initialData.dailyUsage || '',
    motivation: initialData.motivation || '',
  });

  if (!open) return null;

  const styles = `
    .edit-profile-modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.18);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .edit-profile-modal {
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 8px 32px rgba(56,70,60,0.18);
      padding: 40px 30px 30px 30px;
      min-width: 340px;
      max-width: 480px;
      width: 100%;
      position: relative;
      animation: popIn 0.3s;
    }
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }
    .edit-profile-title {
      text-align: center;
      font-size: 2rem;
      color: #388E3C;
      font-weight: bold;
      margin-bottom: 32px;
    }
    .edit-profile-form {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .edit-profile-row {
      display: flex;
      gap: 18px;
    }
    .edit-profile-field {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .edit-profile-label {
      font-size: 1rem;
      color: #388E3C;
      font-weight: 600;
      margin-bottom: 2px;
    }
    .edit-profile-input, .edit-profile-select {
      padding: 8px 12px;
      border: 1.5px solid #bbb;
      border-radius: 7px;
      font-size: 1rem;
      background: #fafafa;
      color: #333;
      outline: none;
      transition: border 0.2s;
    }
    .edit-profile-input:focus, .edit-profile-select:focus {
      border: 1.5px solid #4CAF50;
    }
    .edit-profile-note {
      font-size: 12px;
      color: #888;
      margin-top: 2px;
      margin-left: 2px;
    }
    .edit-profile-actions {
      display: flex;
      justify-content: center;
      gap: 18px;
      margin-top: 28px;
    }
    .edit-profile-cancel {
      background: #aaa;
      color: #fff;
      border: none;
      border-radius: 7px;
      padding: 10px 28px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }
    .edit-profile-cancel:hover {
      background: #888;
      transform: translateY(-2px);
    }
    .edit-profile-save {
      background: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 7px;
      padding: 10px 28px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }
    .edit-profile-save:hover {
      background: #388E3C;
      transform: translateY(-2px);
    }
  `;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <div className="edit-profile-modal-overlay">
      <style>{styles}</style>
      <div className="edit-profile-modal">
        <div className="edit-profile-title">Edit Your Profile</div>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="edit-profile-row">
            <div className="edit-profile-field">
              <label className="edit-profile-label">First Name</label>
              <input className="edit-profile-input" name="firstName" value={form.firstName} onChange={handleChange} />
            </div>
            <div className="edit-profile-field">
              <label className="edit-profile-label">Last Name</label>
              <input className="edit-profile-input" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="edit-profile-field">
            <label className="edit-profile-label">Email Address</label>
            <input className="edit-profile-input" name="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="edit-profile-row">
            <div className="edit-profile-field">
              <label className="edit-profile-label">Quit Date</label>
              <input className="edit-profile-input" name="quitDate" value={form.quitDate} onChange={handleChange} placeholder="DD/MM/YYYY" />
            </div>
            <div className="edit-profile-field">
              <label className="edit-profile-label">Former Daily Usage</label>
              <select className="edit-profile-select" name="dailyUsage" value={form.dailyUsage} onChange={handleChange}>
                {[...Array(31).keys()].slice(1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="edit-profile-note">cigarettes per day</span>
            </div>
          </div>
          <div className="edit-profile-field">
            <label className="edit-profile-label">Primary Motivation</label>
            <select className="edit-profile-select" name="motivation" value={form.motivation} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="Better Health">Better Health</option>
              <option value="Save Money">Save Money</option>
              <option value="Family">Family</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="edit-profile-actions">
            <button type="button" className="edit-profile-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="edit-profile-save">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal; 