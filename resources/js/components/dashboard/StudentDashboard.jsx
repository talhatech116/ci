// resources/js/components/dashboard/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CourseCatalog from '../student/CourseCatalog';
import MyEnrolledCourses from '../student/MyEnrolledCourses';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    averageProgress: 0
  });

  useEffect(() => {
    if (activeTab === 'my-courses' || activeTab === 'overview') {
      fetchEnrollments();
    }
  }, [activeTab]);

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/student/enrollments', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEnrollments(data.enrollments || []);
        
        // Calculate stats
        const enrolledCount = data.enrollments.length;
        const completedCount = data.enrollments.filter(e => e.video_completed).length;
        const avgProgress = data.enrollments.length > 0 
          ? data.enrollments.reduce((sum, e) => sum + e.video_progress, 0) / data.enrollments.length 
          : 0;

        setStats({
          enrolledCourses: enrolledCount,
          completedCourses: completedCount,
          averageProgress: Math.round(avgProgress)
        });
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #e5e7eb'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#4f46e5'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    userName: {
      fontWeight: '600',
      color: '#374151'
    },
    logoutBtn: {
      padding: '8px 16px',
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '30px 20px'
    },
    welcomeSection: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    },
    welcomeTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '10px'
    },
    welcomeText: {
      color: '#6b7280',
      fontSize: '16px',
      lineHeight: '1.6'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    card: {
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '15px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px',
      marginTop: '20px'
    },
    statCard: {
      backgroundColor: '#f8fafc',
      padding: '15px',
      borderRadius: '8px',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#4f46e5',
      marginBottom: '5px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280'
    },
    // TAB STYLES
    tabContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '30px',
      borderBottom: '2px solid #e5e7eb',
      paddingBottom: '0',
      overflowX: 'auto',
    },
    tab: {
      padding: '12px 20px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      borderRadius: '8px 8px 0 0',
      fontWeight: '500',
      color: '#6b7280',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      fontSize: '14px',
      borderBottom: '2px solid transparent',
      marginBottom: '-2px'
    },
    activeTab: {
      padding: '12px 20px',
      border: 'none',
      backgroundColor: '#4f46e5',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '8px 8px 0 0',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      fontSize: '14px',
      borderBottom: '2px solid #4f46e5',
      marginBottom: '-2px',
      boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)'
    },
    tabContent: {
      minHeight: '400px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>LearnPro</div>
          <div style={styles.userInfo}>
            <span style={styles.userName}>Welcome, {user?.name}</span>
            <button 
              onClick={handleLogout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>Student Dashboard</h1>
          <p style={styles.welcomeText}>
            Continue your learning journey, track your progress, and discover new courses.
          </p>
        </div>

        {/* TAB NAVIGATION */}
        <div style={styles.tabContainer}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={activeTab === 'overview' ? styles.activeTab : styles.tab}
          >
            📊 Overview
          </button>
          <button 
            onClick={() => setActiveTab('my-courses')}
            style={activeTab === 'my-courses' ? styles.activeTab : styles.tab}
          >
            📚 My Courses
          </button>
          <button 
            onClick={() => setActiveTab('browse')}
            style={activeTab === 'browse' ? styles.activeTab : styles.tab}
          >
            🔍 Browse Courses
          </button>
          <button 
            onClick={() => setActiveTab('progress')}
            style={activeTab === 'progress' ? styles.activeTab : styles.tab}
          >
            📈 My Progress
          </button>
        </div>

        {/* TAB CONTENT */}
        <div style={styles.tabContent}>
          {activeTab === 'overview' && (
            <div>
              {/* Stats Overview */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{stats.enrolledCourses}</div>
                  <div style={styles.statLabel}>Enrolled Courses</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{stats.completedCourses}</div>
                  <div style={styles.statLabel}>Completed Courses</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{stats.averageProgress}%</div>
                  <div style={styles.statLabel}>Average Progress</div>
                </div>
              </div>

              {/* Recent Enrollments */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Recent Courses</h3>
                {enrollments.length === 0 ? (
                  <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                    No courses enrolled yet. Browse courses to get started!
                  </p>
                ) : (
                  <div>
                    {enrollments.slice(0, 3).map(enrollment => (
                      <div key={enrollment.id} style={{ 
                        padding: '10px 0', 
                        borderBottom: '1px solid #e5e7eb',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '500' }}>{enrollment.course.title}</div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>
                            Progress: {enrollment.video_progress}%
                            {enrollment.video_completed && ' ✅ Completed'}
                          </div>
                        </div>
                        <button 
                          onClick={() => setActiveTab('my-courses')}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'my-courses' && (
            <MyEnrolledCourses enrollments={enrollments} onRefresh={fetchEnrollments} />
          )}

          {activeTab === 'browse' && (
            <CourseCatalog onEnrollmentSuccess={fetchEnrollments} />
          )}

          {activeTab === 'progress' && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>My Learning Progress</h3>
              {enrollments.length === 0 ? (
                <p style={{ color: '#6b7280' }}>Enroll in courses to track your progress!</p>
              ) : (
                <div>
                  {enrollments.map(enrollment => (
                    <div key={enrollment.id} style={{ 
                      marginBottom: '15px', 
                      padding: '15px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px'
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                        {enrollment.course.title}
                      </div>
                      <div style={{ 
                        width: '100%', 
                        backgroundColor: '#e5e7eb', 
                        borderRadius: '4px',
                        height: '8px',
                        marginBottom: '5px'
                      }}>
                        <div style={{
                          width: `${enrollment.video_progress}%`,
                          backgroundColor: enrollment.video_completed ? '#10b981' : '#4f46e5',
                          height: '100%',
                          borderRadius: '4px',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        {enrollment.video_progress}% Complete
                        {enrollment.video_completed && ' 🎉'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;