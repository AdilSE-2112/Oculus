import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import DataInputPage from './components/DataInputPage/DataInput';
import DataOutputPage from './components/DataOutputPage/DataOutput';
import AdminPanel from './components/AdminPanel/AdminPanel';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/data-input"
            element={isAuthenticated ? <DataInputPage /> : <Navigate to="/" />}
          />
          <Route
            path="/data-output"
            element={isAuthenticated ? <DataOutputPage /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-panel"
            element={isAuthenticated ? <AdminPanel /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
