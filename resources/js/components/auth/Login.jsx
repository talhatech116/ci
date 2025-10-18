// resources/js/components/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get success message from registration redirect
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  // Clear errors when component unmounts or form changes
  useEffect(() => {
    return () => setError('');
  }, [setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (localError || error) {
      setLocalError('');
      setError('');
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Redirect to appropriate dashboard
      navigate(result.dashboard);
    }
  };

  // Basic CSS styles (same as register)
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    card: {
      maxWidth: '400px',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '30px',
      color: 'white',
      textAlign: 'center'
    },
    formContainer: {
      padding: '30px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      marginBottom: '16px',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '16px'
    },
    socialButton: {
      width: '100%',
      padding: '12px 16px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    twitterButton: {
      backgroundColor: '#1da1f2',
      color: 'white'
    },
    facebookButton: {
      backgroundColor: '#1877f2',
      color: 'white'
    },
    error: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px'
    },
    success: {
      backgroundColor: '#f0fdf4',
      border: '1px solid #bbf7d0',
      color: '#166534',
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px'
    },
    link: {
      color: '#4f46e5',
      textDecoration: 'none',
      fontWeight: '600'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '2px solid #ffffff',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            Sign In
          </h1>
        </div>

        {/* Form Content */}
        <div style={styles.formContainer}>
    
          {/* Success Message */}
          {successMessage && (
            <div style={styles.success}>
              {successMessage}
            </div>
          )}

          {/* Error Messages */}
          {(error || localError) && (
            <div style={styles.error}>
              {error || localError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600',
                marginBottom: '8px',
                color: '#374151'
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your email"
              />

              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600',
                marginBottom: '8px',
                color: '#374151'
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? { backgroundColor: '#9ca3af', cursor: 'not-allowed' } : {})
              }}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={styles.loadingSpinner}></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Register Link */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              Don't have an account?{' '}
              <Link to="/register" style={styles.link}>
                Create new account
              </Link>
            </p>
          </div>

          {/* Website URL */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p style={{ margin: 0, color: '#9ca3af', fontSize: '12px' }}>
              www.learnpro.com
            </p>
          </div>
        </div>
      </div>

      {/* Add CSS for spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;