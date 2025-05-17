import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Compliance from './pages/Compliance';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Register from './pages/Register';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { Box } from '@mui/material';
import { trackUserAction } from './services/mixpanel';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserData(userData);
    trackUserAction('User Login', { method: 'email', ...userData });
  };

  const handleRegister = (userData) => {
    setIsAuthenticated(true);
    setUserData(userData);
    trackUserAction('User Registration', { method: 'email', ...userData });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    trackUserAction('User Logout');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    trackUserAction('Sidebar Toggle', { state: !isSidebarOpen });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              !isAuthenticated ? (
                <Register onRegister={handleRegister} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <div style={{ display: 'flex' }}>
                  <Navbar 
                    onMenuClick={toggleSidebar} 
                    onLogout={handleLogout}
                  />
                  <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      p: 3,
                      width: { sm: `calc(100% - ${isSidebarOpen ? 240 : 0}px)` },
                      ml: { sm: isSidebarOpen ? '240px' : 0 },
                      transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                      }),
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/compliance" element={<Compliance />} />
                      <Route path="/documents" element={<Documents />} />
                      <Route path="/reports" element={<Reports />} />
                    </Routes>
                  </Box>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 