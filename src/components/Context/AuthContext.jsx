import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const expirationTime = localStorage.getItem('token_expiration');
    if (token && expirationTime && Date.now() < Number(expirationTime)) {
      setIsAuthenticated(true);
    }



  }, []);

  const handleBeforeUnload = () => {
    const token = localStorage.getItem('access_token');
    if (checkTokenValidity(token)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
    }
  };

  const login = (username, token) => {
    const expirationTime = new Date().getTime() + 8 * 60 * 60 * 1000; // 8 hours
    localStorage.setItem('username', username);
    localStorage.setItem('access_token', token);
    localStorage.setItem('token_expiration', expirationTime);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
  };

  const checkTokenValidity = (token) => {
    if (!token) return false;
    const expirationTime = localStorage.getItem('token_expiration');
    return Date.now() < Number(expirationTime);
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