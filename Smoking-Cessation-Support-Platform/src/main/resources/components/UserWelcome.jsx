import React from 'react';
import { useUser } from '../UserContext';

const UserWelcome = ({ className = "", showEmoji = true }) => {
  const { getUserName } = useUser();
  const userName = getUserName();

  return (
    <span className={className}>
      Welcome back, <span className="welcome-name">{userName}!</span>
      {showEmoji && " 👋"}
    </span>
  );
};

export default UserWelcome; 