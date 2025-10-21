// resources/js/components/instructor/CreateCourse.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    level: 'beginner'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');
  
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setMessage('You are not authenticated. Please log in again.');
      setLoading(false);
      return;
    }

    const response = await fetch('/api/instructor/courses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(courseData)
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 422 && data.errors) {
        // Validation errors
        const errorMessages = Object.values(data.errors).flat().join(', ');
        throw new Error(`Validation error: ${errorMessages}`);
      } else {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
    }

    setMessage('Course created successfully!');
    
    // Reset form
    setCourseData({ 
      title: '', 
      description: '', 
      price: 0, 
      category: '', 
      level: 'beginner' 
    });

  } catch (error) {
    console.error('Error creating course:', error);
    
    // Handle different error types
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      setMessage('Network error. Please check your connection and try again.');
    } else if (error.message.includes('Validation error')) {
      setMessage(error.message);
    } else if (error.message.includes('HTTP error')) {
      const status = error.message.split('status: ')[1];
      if (status === '403') {
        setMessage('Access forbidden. You may not have instructor permissions.');
      } else if (status === '401') {
        setMessage('Authentication failed. Please log in again.');
      } else {
        setMessage(error.message);
      }
    } else {
      setMessage(error.message || 'An unexpected error occurred. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  const handleBackToDashboard = () => {
    navigate('/instructor/dashboard');
  };

  const styles = {
    form: {
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '20px',
      textAlign: 'center'
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      minHeight: '120px',
      resize: 'vertical',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    },
    button: {
      flex: 1,
      padding: '12px 30px',
      backgroundColor: '#059669',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600'
    },
    disabledButton: {
      flex: 1,
      padding: '12px 30px',
      backgroundColor: '#9ca3af',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'not-allowed',
      fontSize: '16px',
      fontWeight: '600'
    },
    backButton: {
      flex: 1,
      padding: '12px 30px',
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600'
    },
    buttonContainer: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px'
    },
    message: {
      textAlign: 'center',
      marginTop: '15px',
      padding: '12px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500'
    },
    successMessage: {
      backgroundColor: '#dcfce7',
      color: '#166534',
      border: '1px solid #bbf7d0'
    },
    errorMessage: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fecaca'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '600',
      color: '#374151',
      fontSize: '14px'
    },
    fieldGroup: {
      marginBottom: '15px'
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create New Course</h2>
        
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Course Title *</label>
          <input
            type="text"
            placeholder="Enter course title"
            value={courseData.title}
            onChange={(e) => setCourseData({...courseData, title: e.target.value})}
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Course Description *</label>
          <textarea
            placeholder="Describe what students will learn in this course"
            value={courseData.description}
            onChange={(e) => setCourseData({...courseData, description: e.target.value})}
            style={styles.textarea}
            required
          />
        </div>
        
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Price ($) *</label>
          <input
            type="number"
            placeholder="0.00"
            value={courseData.price}
            onChange={(e) => setCourseData({...courseData, price: parseFloat(e.target.value) || 0})}
            style={styles.input}
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Category *</label>
          <input
            type="text"
            placeholder="e.g., Web Development, Data Science, Digital Marketing"
            value={courseData.category}
            onChange={(e) => setCourseData({...courseData, category: e.target.value})}
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Difficulty Level *</label>
          <select
            value={courseData.level}
            onChange={(e) => setCourseData({...courseData, level: e.target.value})}
            style={styles.input}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        
        <div style={styles.buttonContainer}>
          <button 
            type="button"
            onClick={handleBackToDashboard}
            style={styles.backButton}
            disabled={loading}
          >
            ← Back to Dashboard
          </button>
          
          <button 
            type="submit" 
            style={loading ? styles.disabledButton : styles.button} 
            disabled={loading}
          >
            {loading ? 'Creating Course...' : 'Create Course'}
          </button>
        </div>
        
        {message && (
          <div style={{
            ...styles.message,
            ...(message.includes('success') ? styles.successMessage : styles.errorMessage)
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCourse;