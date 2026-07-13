import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context
export const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  // State to hold the current user. null means not logged in.
  const [user, setUser] = useState(null);
  
  // State to handle the initial loading (e.g., checking local storage or verifying a token)
  const [loading, setLoading] = useState(true);

  // Simulated effect to check if a user is already logged in when the app loads
  useEffect(() => {
    // In a real app, you would check localStorage for a token and validate it with the backend here.
    const storedUser = localStorage.getItem('skillhub_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData, token) => {
    // In production, you would save the token securely and set the user
    setUser(userData);
    localStorage.setItem('skillhub_user', JSON.stringify(userData));
    localStorage.setItem('skillhub_token', token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillhub_user');
    localStorage.removeItem('skillhub_token');
  };

  // Sync profile edits to local storage and state
  const updateUserLocal = (newUserData) => {
    const updated = { ...user, ...newUserData };
    setUser(updated);
    localStorage.setItem('skillhub_user', JSON.stringify(updated));
  };

  // 3. Expose the state and functions to the rest of the app
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUserLocal }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
