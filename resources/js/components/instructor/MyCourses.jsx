// resources/js/components/instructor/MyCourses.jsx
import React, { useState, useEffect } from 'react';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      console.log('Fetching courses...'); // Debug

      const response = await fetch('/api/instructor/courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      console.log('Response status:', response.status); // Debug

      if (response.status === 403) {
        throw new Error('You do not have instructor permissions.');
      }

      if (response.status === 401) {
        throw new Error('Please log in again.');
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Courses data:', data); // Debug
      
      setCourses(data.courses || []);
      
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/instructor/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove course from local state
      setCourses(courses.filter(course => course.id !== courseId));
      
      alert('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    }
  };

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
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px',
      marginBottom: '30px'
    },
    statCard: {
      backgroundColor: '#f0fdf4',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #bbf7d0'
    },
    statNumber: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#059669',
      marginBottom: '5px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280'
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
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease'
    },
    courseHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px'
    },
    courseTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0,
      marginBottom: '5px'
    },
    courseDescription: {
      color: '#6b7280',
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '15px'
    },
    courseMeta: {
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
      flexWrap: 'wrap'
    },
    badge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    levelBeginner: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    levelIntermediate: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    levelAdvanced: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    price: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#059669'
    },
    actions: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px'
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      flex: 1
    },
    editButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    viewButton: {
      backgroundColor: '#059669',
      color: 'white'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px',
      color: '#6b7280'
    },
    loading: {
      textAlign: 'center',
      padding: '40px',
      color: '#6b7280'
    },
    error: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      borderRadius: '8px',
      marginBottom: '20px'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <h3>Loading your courses...</h3>
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
            onClick={fetchMyCourses}
            style={{
              padding: '10px 20px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Calculate totals - CORRECTED: This counts enrollments, not unique students
  const totalEnrollments = courses.reduce((sum, course) => sum + (course.students_count || 0), 0);
  const totalRevenue = courses.reduce((sum, course) => {
    return sum + (course.price * (course.students_count || 0));
  }, 0);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>My Courses</h2>
        <div style={{ color: '#6b7280', fontSize: '14px' }}>
          {courses.length} {courses.length === 1 ? 'course' : 'courses'} total
        </div>
      </div>

      {/* Stats Overview - CORRECTED LABELS */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{courses.length}</div>
          <div style={styles.statLabel}>Total Courses</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{totalEnrollments}</div>
          <div style={styles.statLabel}>Total Enrollments</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>${totalRevenue}</div>
          <div style={styles.statLabel}>Total Revenue</div>
        </div>
      </div>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>No courses yet</h3>
          <p>Create your first course to start teaching!</p>
        </div>
      ) : (
        <div style={styles.courseGrid}>
          {courses.map(course => (
            <div key={course.id} style={styles.courseCard}>
              <div style={styles.courseHeader}>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.courseTitle}>{course.title}</h3>
                  <div style={styles.price}>${course.price}</div>
                </div>
                <span style={{
                  ...styles.badge,
                  ...(course.level === 'beginner' ? styles.levelBeginner : 
                      course.level === 'intermediate' ? styles.levelIntermediate : 
                      styles.levelAdvanced)
                }}>
                  {course.level}
                </span>
              </div>
              
              <p style={styles.courseDescription}>
                {course.description.length > 120 
                  ? `${course.description.substring(0, 120)}...` 
                  : course.description}
              </p>
              
              <div style={styles.courseMeta}>
                <span style={{
                  ...styles.badge,
                  backgroundColor: '#eff6ff',
                  color: '#1d4ed8'
                }}>
                  {course.category}
                </span>
                <span style={{
                  ...styles.badge,
                  backgroundColor: course.status === 'published' ? '#dcfce7' : '#fef3c7',
                  color: course.status === 'published' ? '#166534' : '#92400e'
                }}>
                  {course.status}
                </span>
                <span style={{
                  ...styles.badge,
                  backgroundColor: '#f3e8ff',
                  color: '#7c3aed'
                }}>
                  {course.students_count || 0} enrollments
                </span>
              </div>

              <div style={styles.actions}>
                <button style={{...styles.button, ...styles.viewButton}}>
                  View
                </button>
                <button style={{...styles.button, ...styles.editButton}}>
                  Edit
                </button>
                <button 
                  style={{...styles.button, ...styles.deleteButton}}
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;