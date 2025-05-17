import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { trackAuthEvent, trackUserAction } from '../services/mixpanel';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Track input changes
    trackUserAction('Login Input Change', { field: name });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setLoginError('');

    try {
      // Track login attempt
      trackAuthEvent('Login Attempt', { email: formData.email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid email/password
      if (formData.email && formData.password) {
        // Track successful login
        trackAuthEvent('Login Success', { email: formData.email });
        onLogin();
      } else {
        // Track failed login
        trackAuthEvent('Login Failed', { 
          email: formData.email,
          reason: 'Invalid credentials'
        });
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      // Track login error
      trackAuthEvent('Login Error', { 
        email: formData.email,
        error: error.message
      });
      setLoginError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <LockIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        
        <Typography component="h1" variant="h5" gutterBottom>
          Compliance Management System
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to access the compliance dashboard
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {loginError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link 
                href="#" 
                variant="body2"
                onClick={() => trackUserAction('Forgot Password Click')}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link 
                href="/register" 
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login; 