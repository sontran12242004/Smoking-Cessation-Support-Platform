import React, { useState } from 'react';


const SendEmail = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      day: 1,
      title: `You've Made the Best Decision!`,
      content: `Hello champion,

You marks Day 1 of your smoke-free life! We know it's challenging, but remember: the hardest step is always the first one, and you've already taken it!

When cravings come, remember your "why". We're rooting for you!

The NicOff Team.`,
    },
    {
      id: 2,
      day: 2,
      title: `Your Body is Healing!`,
      content: `Hello fighter,

Did you know? After 24 hours, your risk of heart attack begins to decrease. Your carbon monoxide levels have normalized and your oxygen levels are increasing!

Keep going - you're doing amazing!

The NicOff Team.`,
    },
    {
      id: 3,
      day: 3,
      title: `The 3-Day Milestone!`,
      content: `Hello Warrior,

Congratulations on reaching 3 days nicotine-free! By now, all nicotine has left your body. The craving you feel are psychological - and you stringer than them!

Try our 5-minute meditation in the app when cravings hit.

The NicOff Team.`,
    },
    {
      id: 4,
      day: 4,
      title: `Your Senses Are Improving!`,
      content: `Hello Super-star,

Around now, your sense of smell and taste are beginning to improve! Enjoy rediscovering flavors and aromas you've been missing.

Treat yourself to a nice meal - you've earned it!

The NicOff Team.`,
    },
    {
      id: 5,
      day: 5,
      title: `Halfway Through Week1!`,
      content: `Hello achever,

You're halfway through your first week! This is when many people slip up but not you. You've got this!

Remember: "Ayear from now, you'll wish you had started today." Well, you DID start!

The NicOff Team.`,
    },
    {
      id: 6,
      day: 6,
      title: `Breathing Gets Easier!`,
      content: `Hello Breath-taker,

By today, your bronchial tubes are relaxing and your lung function is improving. Notice how you can take deeper breaths?

Celebrate with some fresh air and a walk!

The NicOff Team.`,
    },
    {
      id: 7,
      day: 7,
      title: `ONE-WEEK SMOKE-FREE!`,
      content: `CHAMPION,

YOU DID IT! One whole week without nicotine! This is a HUGE accomplishment. The first week is the hardest, and you've conquered it!

Check your achievements in the app to see your progress and rewards!

The NicOff Team.`,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);

  const handleAddMessage = (newMessage) => {
    const newId = messages.length > 0 ? Math.max(...messages.map(msg => msg.id)) + 1 : 1;
    setMessages([
      ...messages,
      { ...newMessage, id: newId },
    ]);
  };

  const handleEditMessage = (updatedMessage) => {
    setMessages(messages.map(msg => msg.id === updatedMessage.id ? updatedMessage : msg));
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
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
    pageTitle: {
      fontSize: '24px',
      color: '#2E7D32',
      marginBottom: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
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
    messageItem: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      marginBottom: '15px',
      padding: '15px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      borderLeft: '5px solid #2E7D32',
      display: 'flex',
      flexDirection: 'column',
    },
    messageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px',
      marginBottom: '10px',
    },
    messageInfo: {
      fontSize: '14px',
      color: '#777',
    },
    messageTitle: {
      fontSize: '18px',
      color: '#2E7D32',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    messageContent: {
      fontSize: '15px',
      color: '#333',
      whiteSpace: 'pre-wrap',
      marginBottom: '15px',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '10px',
      alignSelf: 'flex-end',
    },
    editButton: {
      backgroundColor: '#66BB6A',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 15px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#4CAF50',
      },
    },
    deleteButton: {
      backgroundColor: '#EF5350',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 15px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#D32F2F',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>MOTIVATION MESSAGES LIST</h1>
      <div style={styles.contentCard}>
        <h2 style={styles.pageTitle}>7 Days Motivational Messages</h2>
        <button style={styles.addButton} onClick={() => setShowAddModal(true)}>
          + Add Email Motivation
        </button>
        <div>
          {messages.map((msg) => (
            <div key={msg.id} style={styles.messageItem}>
              <div style={styles.messageHeader}>
                <span style={styles.messageInfo}>From: NicOff Team &lt;support@nicoff.com&gt;</span>
                <span style={styles.messageInfo}>To: You</span>
                <span style={styles.messageInfo}>Date: Day {msg.day} of your journey</span>
              </div>
              <h3 style={styles.messageTitle}>{msg.title}</h3>
              <p style={styles.messageContent}>{msg.content}</p>
              <div style={styles.actionButtons}>
                <button 
                  style={styles.editButton}
                  onClick={() => {
                    setCurrentMessage(msg);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button style={styles.deleteButton} onClick={() => handleDeleteMessage(msg.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddEmailMotivationModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddMessage}
          nextDayNumber={messages.length > 0 ? Math.max(...messages.map(msg => msg.id)) + 1 : 1}
        />
      )}

      {showEditModal && (
        <EditEmailMotivationModal
          onClose={() => setShowEditModal(false)}
          onSave={handleEditMessage}
          initialMessage={currentMessage}
        />
      )}
    </div>
  );
};

export default SendEmail; 