// resources/js/components/student/VideoPlayer.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VideoPlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/student/courses/${courseId}/watch`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load course video');
      }

      const data = await response.json();
      setCourse(data.course);
      setEnrollment(data.enrollment);
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Failed to load video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/student/dashboard');
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    backButton: {
      padding: '10px 20px',
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500'
    },
    videoContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    video: {
      width: '100%',
      height: '500px',
      border: 'none'
    },
    courseInfo: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      margin: '10px 0'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#4f46e5',
      borderRadius: '4px',
      transition: 'width 0.3s ease'
    },
    loading: {
      textAlign: 'center',
      padding: '40px',
      color: '#6b7280'
    },
    error: {
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      borderRadius: '8px',
      margin: '20px 0'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <h3>Loading video...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h3>{error}</h3>
          <button 
            onClick={handleBackToDashboard}
            style={styles.backButton}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button 
          onClick={handleBackToDashboard}
          style={styles.backButton}
        >
          ← Back to Dashboard
        </button>
        <h1 style={{ margin: 0, color: '#1f2937' }}>{course?.title}</h1>
      </div>

      {/* Video Player */}
      <div style={styles.videoContainer}>
        {course?.video_url ? (
          <iframe
            src={course.video_url}
            style={styles.video}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={course.title}
          ></iframe>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            <h3>No video available for this course</h3>
            <p>The instructor hasn't added a video yet.</p>
          </div>
        )}
      </div>

      {/* Course Info */}
      <div style={styles.courseInfo}>
        <h2 style={{ marginBottom: '15px', color: '#1f2937' }}>About This Course</h2>
        <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '20px' }}>
          {course?.description}
        </p>
        
        {/* Progress */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <strong>Your Progress:</strong>
            <span>{enrollment?.video_progress || 0}% Complete</span>
          </div>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${enrollment?.video_progress || 0}%`
              }} 
            />
          </div>
          {enrollment?.video_completed && (
            <div style={{ color: '#10b981', fontWeight: '500', marginTop: '5px' }}>
              ✅ Course Completed
            </div>
          )}
        </div>

        {/* Course Details */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px',
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '6px'
        }}>
          <div>
            <strong style={{ color: '#374151' }}>Duration:</strong>
            <div style={{ color: '#6b7280' }}>{course?.video_duration || 'Not specified'}</div>
          </div>
          <div>
            <strong style={{ color: '#374151' }}>Level:</strong>
            <div style={{ color: '#6b7280', textTransform: 'capitalize' }}>{course?.level}</div>
          </div>
          <div>
            <strong style={{ color: '#374151' }}>Category:</strong>
            <div style={{ color: '#6b7280' }}>{course?.category}</div>
          </div>
          <div>
            <strong style={{ color: '#374151' }}>Instructor:</strong>
            <div style={{ color: '#6b7280' }}>{course?.instructor?.name || 'Unknown'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;