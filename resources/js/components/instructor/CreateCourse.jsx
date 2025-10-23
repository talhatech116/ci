// resources/js/components/instructor/CreateCourse.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    level: 'beginner',
    video_url: '', // ← ADD THIS
    video_duration: '' // ← ADD THIS
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
        },
        body: JSON.stringify(courseData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create course');
      }

      setMessage('✅ Course created successfully!');
      
      // Reset form
      setCourseData({ 
        title: '', 
        description: '', 
        price: 0, 
        category: '', 
        level: 'beginner',
        video_url: '', // ← Reset
        video_duration: '' // ← Reset
      });

    } catch (error) {
      console.error('Error creating course:', error);
      setMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Add these styles for the new fields
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
    },
    helpText: {
      color: '#6b7280',
      fontSize: '12px',
      marginTop: '5px',
      fontStyle: 'italic'
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

        {/* ✅ VIDEO URL FIELD */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Video URL *</label>
          <input
            type="url"
            placeholder="https://www.youtube.com/embed/VIDEO_ID or https://example.com/video.mp4"
            value={courseData.video_url}
            onChange={(e) => setCourseData({...courseData, video_url: e.target.value})}
            style={styles.input}
            required
          />
          <div style={styles.helpText}>
            For YouTube: Use embed URL format: https://www.youtube.com/embed/VIDEO_ID
          </div>
        </div>

        {/* ✅ VIDEO DURATION FIELD */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Video Duration *</label>
          <input
            type="text"
            placeholder="e.g., 2:30, 1 hour 15 min, 45 minutes"
            value={courseData.video_duration}
            onChange={(e) => setCourseData({...courseData, video_duration: e.target.value})}
            style={styles.input}
            required
          />
          <div style={styles.helpText}>
            Enter duration in any format: "2:30", "1 hour 15 min", "45 minutes"
          </div>
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
            onClick={() => navigate('/instructor/dashboard')}
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