import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');


  useEffect(() => {
    // Check authentication status (e.g., retrieve token from localStorage)
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token); 
    setUsername(localStorage.getItem('username') || '');
    // Set isAuthenticated based on token existence
  }, []); // This effect runs only once on mount

  const login = () => {
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
    // Save access_token to localStorage upon login
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Clear access_token from localStorage upon logout
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
