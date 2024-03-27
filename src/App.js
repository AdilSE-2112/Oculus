import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import DataInputPage from './components/DataInputPage/DataInput';
import DataOutputPage from './components/DataOutputPage/DataOutput';
import AdminPanel from './components/AdminPanel/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path='/data-input' element={<PrivateRoute element={<DataInputPage />} redirectTo="/" />} />
            <Route path='/data-output' element={<PrivateRoute element={<DataOutputPage />} redirectTo="/" />} />
            <Route path='/admin-panel' element={<PrivateRoute element={<AdminPanel />} redirectTo="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
