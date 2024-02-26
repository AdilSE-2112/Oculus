import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import DataInputPage from './components/DataInputPage/DataInput';
import DataOutputPage from './components/DataOutputPage/DataOutput';
import AdminPanel from './components/AdminPanel/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';

const App = () => {
  useEffect(() => {
    // Check authentication status (e.g., retrieve token from localStorage)
    // const token = ;
    // console.log(token)
    // setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route 
            path='/data-input' 
            element={
              <PrivateRoute
                element={<DataInputPage />}
                redirectTo="/" // Redirect to "/" if not authenticated
              />
            } />
          <Route 
            path='/data-output'
            element={
              <PrivateRoute
                element={<DataOutputPage />}
                redirectTo="/" // Redirect to "/" if not authenticated
              />
            } />
          <Route 
            path='/admin-panel'
            element={
              <PrivateRoute
                element={<AdminPanel />}
                redirectTo="/" // Redirect to "/" if not authenticated
              />
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
