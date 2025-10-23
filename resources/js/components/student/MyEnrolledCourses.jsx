// resources/js/components/student/MyEnrolledCourses.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyEnrolledCourses = ({ enrollments, onRefresh }) => {
  const navigate = useNavigate();

  const styles = {
    container: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    courseGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px'
    },
    courseCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    courseTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 10px 0'
    },
    progressBar: {
      width: '100%',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      height: '8px',
      margin: '10px 0'
    },
    progressFill: {
      height: '100%',
      borderRadius: '4px',
      transition: 'width 0.3s ease'
    },
    watchButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      marginTop: '10px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px',
      color: '#6b7280'
    }
  };

  // In MyEnrolledCourses.jsx, replace the handleWatchCourse function:
  const handleWatchCourse = (courseId) => {
    navigate(`/student/courses/${courseId}/watch`);
  };

  if (enrollments.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <h3>No courses enrolled yet</h3>
          <p>Browse courses and enroll to start learning!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Enrolled Courses</h2>
        <div style={{ color: '#6b7280', fontSize: '14px' }}>
          {enrollments.length} {enrollments.length === 1 ? 'course' : 'courses'}
        </div>
      </div>

      <div style={styles.courseGrid}>
        {enrollments.map(enrollment => (
          <div key={enrollment.id} style={styles.courseCard}>
            <h3 style={styles.courseTitle}>{enrollment.course.title}</h3>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '10px' }}>
              By {enrollment.course.instructor?.name || 'Unknown Instructor'}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span>Progress:</span>
              <span>{enrollment.video_progress}%</span>
            </div>
            
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${enrollment.video_progress}%`,
                  backgroundColor: enrollment.video_completed ? '#10b981' : '#4f46e5'
                }}
              />
            </div>

            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '15px' }}>
              {enrollment.video_completed ? '✅ Course Completed' : 'In Progress'}
            </div>

            <button 
              style={styles.watchButton}
              onClick={() => handleWatchCourse(enrollment.course.id)}
            >
              {enrollment.video_completed ? 'Watch Again' : 'Watch Video'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;