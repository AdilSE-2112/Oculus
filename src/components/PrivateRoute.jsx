import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, redirectTo }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : (
    <Navigate to={redirectTo} replace />
  );
};

export default PrivateRoute;
