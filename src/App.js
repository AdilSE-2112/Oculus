import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import DataInputPage from './components/DataInputPage/DataInput';
import DataShowPage from './components/DataShowPage/DataShow';
import DataOutputPage from './components/DataOutputPage/DataOutput';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { AuthProvider } from './components/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path='/data-input' element={<DataInputPage />} />
            <Route path='/data-show' element={<DataShowPage />} />
            <Route path='/data-output' element={<DataOutputPage />} />
            <Route path='/admin-panel' element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
