import React, { useState } from 'react';
import AddNewReminderModal from './AddNewReminderModal';
import EditReminderModal from './EditReminderModal';

const MotivationMessagesList = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Reminder #1',
      text: 'Drink a glass of water when cravings hit - It helps flush nicotine from your system.',
    },
    {
      id: 2,
      title: 'Reminder #2',
      text: 'Your lungs are already repairing themselves. Keep going!',
    },
    {
      id: 3,
      title: 'Reminder #3',
      text: 'Take deep breathes for 2 minutes when your crave a cigarette.',
    },
    {
      id: 4,
      title: 'Reminder #4',
      text: 'Remember why you started this journey. Write it down if needed.',
    },
    {
      id: 5,
      title: 'Reminder #5',
      text: 'Chew sugar-Free gum or snack on healthy options like nuts or carrot sticks.',
    },
    {
      id: 6,
      title: 'Reminder #6',
      text: 'Avoid triggers like coffee or alcohol if they make you crave nicotine.',
    },
    {
      id: 7,
      title: 'Reminder #7',
      text: 'Your risk of heart disease if already decreasing. Stay strong!',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);

  const handleAddReminder = (newReminder) => {
    const newId = reminders.length > 0 ? Math.max(...reminders.map(r => r.id)) + 1 : 1;
    setReminders([
      ...reminders,
      { ...newReminder, id: newId, title: `Reminder #${newId}` },
    ]);
  };

  const handleEditReminder = (updatedReminder) => {
    setReminders(reminders.map(r => r.id === updatedReminder.id ? updatedReminder : r));
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
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
    contentCard: {
      backgroundColor: '#F0F7F0',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    },
    motivationTitle: {
      fontSize: '24px',
      color: '#2E7D32',
      marginBottom: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: '20px',
      color: '#555',
      marginBottom: '20px',
      borderBottom: '1px solid #ccc',
      paddingBottom: '10px',
    },
    addButton: {
      backgroundColor: '#66BB6A',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#4CAF50',
      },
    },
    reminderItem: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#E0E0E0',
      borderRadius: '8px',
      marginBottom: '15px',
      padding: '15px',
      borderLeft: '5px solid #66BB6A',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    reminderText: {
      flexGrow: 1,
      fontSize: '16px',
      color: '#333',
    },
    actionButtons: {
      display: 'flex',
      gap: '10px',
      marginLeft: '20px',
    },
    editButton: {
      backgroundColor: '#BDBDBD',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 15px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#9E9E9E',
      },
    },
    deleteButton: {
      backgroundColor: '#EF9A9A',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 15px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#E57373',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Contents</h1>
      <div style={styles.contentCard}>
        <h2 style={styles.motivationTitle}>NicOff Motivation System</h2>
        <h3 style={styles.sectionTitle}>Smoking Cessation Reminders</h3>
        <button style={styles.addButton} onClick={() => setShowAddModal(true)}>
          + Add Regular Reminder
        </button>
        <div>
          {reminders.map((reminder) => (
            <div key={reminder.id} style={styles.reminderItem}>
              <p style={styles.reminderText}>
                <strong >{reminder.title}:</strong> {reminder.text}
              </p>
              <div style={styles.actionButtons}>
                <button 
                  style={styles.editButton}
                  onClick={() => {
                    setCurrentReminder(reminder);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button style={styles.deleteButton} onClick={() => handleDeleteReminder(reminder.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddNewReminderModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddReminder}
          nextReminderNumber={reminders.length > 0 ? Math.max(...reminders.map(r => r.id)) + 1 : 1}
        />
      )}

      {showEditModal && (
        <EditReminderModal
          onClose={() => setShowEditModal(false)}
          onSave={handleEditReminder}
          initialReminder={currentReminder}
        />
      )}
    </div>
  );
};

export default MotivationMessagesList; 