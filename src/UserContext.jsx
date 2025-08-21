import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  const getUserName = () => {
    if (!user) return 'User';
    
    // Try to get full name from different possible fields
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
      return user.firstName;
    }
    if (user.name) {
      return user.name;
    }
    if (user.fullName) {
      return user.fullName;
    }
    
    // Fallback to email or username
    if (user.email) {
      return user.email.split('@')[0];
    }
    if (user.username) {
      return user.username;
    }
    
    return 'User';
  };

  const hasActiveMembership = () => {
    if (!user || !user.membershipInfo) return false;
    return user.membershipInfo.hasActiveMembership && !user.membershipInfo.expired;
  };

  const getMembershipInfo = () => {
    if (!user || !user.membershipInfo) return null;
    return user.membershipInfo;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    getUserName,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 