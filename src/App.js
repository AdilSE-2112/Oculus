import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import DataInputPage from './components/DataInputPage/DataInput';
import DataShowPage from './components/DataShowPage/DataShow';
import DataOutputPage from './components/DataOutputPage/DataOutput';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { AuthProvider } from './components/Context/AuthContext';
import PrivateRoute from './components/Context/PrivateRoute';
import './global/global.css';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<LoginPage />} />
            <Route path='/data-input' element={<DataInputPage />} />
            <Route path='/data-output' element={<PrivateRoute element={<DataOutputPage />} redirectTo="/" />} />
            <Route path='/admin-panel' element={<PrivateRoute element={<AdminPanel />} redirectTo="/" />} />
            <Route path='/data-show' element={<DataShowPage />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
