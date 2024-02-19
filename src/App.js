import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import LoginPage from './components/LoginPage/LoginPage';
import DataInputPage from './components/DataInputPage/DataInput';
import DataOutputPage from './components/DataOutputPage/DataOutput';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

const App = () => {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Check if the user is authenticated

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Public route (accessible to everyone) */}
          <Route path="/" exact component={LoginPage} />

          {/* Protected routes (require authentication) */}
          <PrivateRoute
            path="/data-input"
            component={DataInputPage}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/data-output"
            component={DataOutputPage}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
