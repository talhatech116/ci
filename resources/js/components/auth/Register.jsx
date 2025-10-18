// resources/js/components/auth/Register.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'student',
    specialization: '',
  });
  const [localError, setLocalError] = useState('');
  const [step, setStep] = useState(1);

  const { register, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    return () => setError('');
  }, [setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (localError || error) {
      setLocalError('');
      setError('');
    }
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setLocalError('Please fill in all required fields');
      return false;
    }
    if (formData.password.length < 8) {
      setLocalError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      setLocalError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!validateStep1()) return;

    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      role: formData.role,
      ...(formData.role === 'instructor' && { specialization: formData.specialization })
    };

    const result = await register(submitData);
    
    if (result.success) {
      navigate(result.dashboard, { 
        state: { message: 'Registration successful! Welcome to LearnPro.' } 
      });
    }
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  // Basic CSS styles
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
    buttonSecondary: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#6b7280',
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
    roleCard: {
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    roleCardSelected: {
      border: '2px solid #4f46e5',
      backgroundColor: '#eef2ff'
    },
    link: {
      color: '#4f46e5',
      textDecoration: 'none',
      fontWeight: '600'
    }
  };

  const RoleCard = ({ title, description, value, selected, onClick }) => (
    <div
      style={{
        ...styles.roleCard,
        ...(selected ? styles.roleCardSelected : {})
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          backgroundColor: selected ? '#4f46e5' : '#f3f4f6',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px'
        }}>
          {value === 'student' ? '🎓' : '👨‍🏫'}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 4px 0', 
            fontSize: '16px', 
            fontWeight: '600',
            color: selected ? '#4f46e5' : '#1f2937'
          }}>
            {title}
          </h3>
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            color: '#6b7280'
          }}>
            {description}
          </p>
        </div>
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: selected ? '6px solid #4f46e5' : '2px solid #d1d5db',
          backgroundColor: selected ? '#4f46e5' : 'transparent'
        }} />
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            Create Account
          </h1>
        </div>

        {/* Form Content */}
        <div style={styles.formContainer}>

          {/* Error Messages */}
          {(error || localError) && (
            <div style={styles.error}>
              {error || localError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#374151'
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="John Doe"
                  />

                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#374151'
                  }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="john@example.com"
                  />

                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#374151'
                  }}>
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Minimum 8 characters"
                  />

                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#374151'
                  }}>
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    required
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Confirm your password"
                  />
                </div>

                <button 
                  type="button"
                  onClick={nextStep}
                  style={styles.button}
                >
                  Continue to Role Selection →
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ 
                    textAlign: 'center', 
                    fontSize: '20px', 
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#1f2937'
                  }}>
                    Choose Your Role
                  </h3>
                  <p style={{ 
                    textAlign: 'center', 
                    color: '#6b7280',
                    marginBottom: '24px',
                    fontSize: '14px'
                  }}>
                    Select how you want to experience LearnPro
                  </p>

                  <RoleCard
                    title="Student"
                    description="Join courses, learn new skills, and track your progress"
                    value="student"
                    selected={formData.role === 'student'}
                    onClick={() => handleChange({ target: { name: 'role', value: 'student' } })}
                  />
                  
                  <RoleCard
                    title="Instructor"
                    description="Create courses, share knowledge, and earn money"
                    value="instructor"
                    selected={formData.role === 'instructor'}
                    onClick={() => handleChange({ target: { name: 'role', value: 'instructor' } })}
                  />
                </div>

                {formData.role === 'instructor' && (
                  <div style={{ 
                    backgroundColor: '#eff6ff',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #dbeafe',
                    marginBottom: '20px'
                  }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#374151'
                    }}>
                      Your Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      style={styles.input}
                      placeholder="e.g., Web Development, Data Science, Digital Marketing..."
                    />
                    <p style={{ 
                      margin: '8px 0 0 0',
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      This helps students find your expertise area
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="button"
                    onClick={prevStep}
                    style={styles.buttonSecondary}
                  >
                    ← Back
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    style={{
                      ...styles.button,
                      ...(loading ? { backgroundColor: '#9ca3af', cursor: 'not-allowed' } : {})
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Login Link */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              Already have an account?{' '}
              <Link to="/login" style={styles.link}>
                Sign in here
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
    </div>
  );
};

export default Register;