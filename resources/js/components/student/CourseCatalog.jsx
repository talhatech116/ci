// resources/js/components/student/CourseCatalog.jsx
import React, { useState, useEffect } from 'react';

const CourseCatalog = ({ onEnrollmentSuccess }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

    const handleEnroll = async (courseId) => {
    try {
        setEnrolling(courseId);
        const token = localStorage.getItem('token');
        
        console.log('🔍 DEBUG: Starting enrollment process...');
        console.log('🔍 DEBUG: Course ID:', courseId);
        console.log('🔍 DEBUG: Token exists:', !!token);
        
        if (!token) {
        alert('Please log in to enroll in courses.');
        return;
        }

        console.log('🔍 DEBUG: Making API call to:', `/api/student/courses/${courseId}/enroll`);
        
        const response = await fetch(`/api/student/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        });

        console.log('🔍 DEBUG: Response status:', response.status);
        console.log('🔍 DEBUG: Response ok:', response.ok);

        const data = await response.json();
        console.log('🔍 DEBUG: Response data:', data);

        if (response.ok) {
        console.log('🔍 DEBUG: Enrollment successful!');
        alert('🎉 Successfully enrolled! You can now watch the course video.');
        
        // Update the course to show enrolled status
        setCourses(courses.map(course => 
            course.id === courseId ? { ...course, is_enrolled: true } : course
        ));
        
        // Notify parent component to refresh enrollments
        if (onEnrollmentSuccess) {
            onEnrollmentSuccess();
        }
        } else {
        console.log('🔍 DEBUG: Enrollment failed with message:', data.message);
        alert(data.message || 'Failed to enroll in the course.');
        }
    } catch (error) {
        console.error('🔍 DEBUG: Error in catch block:', error);
        console.error('🔍 DEBUG: Error message:', error.message);
        alert('Error enrolling in course. Please try again.');
    } finally {
        setEnrolling(null);
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
    instructor: {
      color: '#6b7280',
      fontSize: '14px',
      marginBottom: '10px'
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
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#059669',
      marginBottom: '15px'
    },
    enrollButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    enrolledButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'default'
    },
    disabledButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#9ca3af',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'not-allowed'
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
      borderRadius: '8px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px',
      color: '#6b7280'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <h3>Loading available courses...</h3>
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
            onClick={fetchCourses}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4f46e5',
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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Course Catalog</h2>
        <div style={{ color: '#6b7280', fontSize: '14px' }}>
          {courses.length} {courses.length === 1 ? 'course' : 'courses'} available
        </div>
      </div>

      {courses.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>No courses available</h3>
          <p>Check back later for new courses!</p>
        </div>
      ) : (
        <div style={styles.courseGrid}>
          {courses.map(course => (
            <div key={course.id} style={styles.courseCard}>
              <div style={styles.courseHeader}>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.courseTitle}>{course.title}</h3>
                  <div style={styles.instructor}>
                    By {course.instructor?.name || 'Unknown Instructor'}
                  </div>
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
                {course.video_url && (
                  <span style={{
                    ...styles.badge,
                    backgroundColor: '#fef3c7',
                    color: '#92400e'
                  }}>
                    🎥 Video Course
                  </span>
                )}
              </div>

              <div style={styles.price}>
                {course.price > 0 ? `$${course.price}` : 'Free'}
              </div>
              
              <button 
                style={
                  course.is_enrolled ? styles.enrolledButton :
                  enrolling === course.id ? styles.disabledButton : 
                  styles.enrollButton
                }
                onClick={() => handleEnroll(course.id)}
                disabled={course.is_enrolled || enrolling === course.id}
              >
                {course.is_enrolled ? '✅ Enrolled' : 
                 enrolling === course.id ? 'Enrolling...' : 
                 'Enroll Now'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;