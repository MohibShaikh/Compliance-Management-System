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
  CircularProgress,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { trackAuthEvent, trackUserAction } from '../services/mixpanel';
import TermsPreviewDialog from '../components/TermsPreviewDialog';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: '',
    acceptedTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [showTermsDialog, setShowTermsDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
    // Track input changes
    trackUserAction('Register Input Change', { 
      field: name,
      value: e.target.type === 'checkbox' ? checked : value
    });
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
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.company) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = 'You must accept the Terms of Service';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    
    // Log all form data
    console.log('Form Data:', {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      role: formData.role,
      acceptedTerms: formData.acceptedTerms
    });
    
    if (!validateForm()) {
      console.log('Form validation failed', errors);
      return;
    }

    setLoading(true);
    setRegisterError('');

    try {
      // Use Railway production API URL
      const apiUrl = 'https://compliance-management-system-production.up.railway.app';
      const endpoint = `${apiUrl}/api/auth/register`;
      console.log('Making API call to:', endpoint);
      
      // Prepare request body
      const requestBody = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        role: formData.role,
        acceptedTerms: formData.acceptedTerms
      };
      console.log('Request body:', { ...requestBody, password: '***' });
      
      // Call registration API
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
        mode: 'cors',
        credentials: 'include'
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Track successful registration
      trackAuthEvent('Register Success', { 
        email: formData.email,
        company: formData.company,
        role: formData.role,
        termsAccepted: formData.acceptedTerms
      });

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('isAuthenticated', 'true');

      console.log('Registration successful, calling onRegister');
      // Pass user data to parent component
      onRegister(data.user);
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
      // Track registration error
      trackAuthEvent('Register Error', { 
        email: formData.email,
        error: error.message
      });
      setRegisterError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    trackUserAction('Terms Link Click', { source: 'Register Form' });
    setShowTermsDialog(true);
  };

  const handleTermsAccept = () => {
    setFormData(prev => ({ ...prev, acceptedTerms: true }));
    setShowTermsDialog(false);
    trackUserAction('Terms Accepted', { source: 'Preview Dialog' });
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
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <PersonAddIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        
        <Typography component="h1" variant="h5" gutterBottom>
          Create Account
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Register to access the compliance management system
        </Typography>

        {registerError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {registerError}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ width: '100%' }}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
                error={!!errors.company}
                helperText={errors.company}
                autoComplete="organization"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={!!errors.role}
                helperText={errors.role}
                autoComplete="organization-title"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I accept the{' '}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={handleTermsClick}
                      sx={{ textDecoration: 'none' }}
                    >
                      Terms of Service
                    </Link>
                  </Typography>
                }
              />
              {errors.acceptedTerms && (
                <Typography color="error" variant="caption">
                  {errors.acceptedTerms}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <TermsPreviewDialog
        open={showTermsDialog}
        onClose={() => setShowTermsDialog(false)}
        onAccept={handleTermsAccept}
      />
    </Box>
  );
};

export default Register; 