import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status (e.g., retrieve token from localStorage)
    const token = localStorage.getItem('access_token');
    console.log('Token from localStorage:', token);
    setIsAuthenticated(!!token);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    // Save access_token to localStorage upon login
    localStorage.setItem('access_token', 'your_access_token_here');
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Clear access_token from localStorage upon logout
    localStorage.removeItem('access_token');
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
