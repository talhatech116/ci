// resources/js/components/dashboard/InstructorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateCourse from '../instructor/CreateCourse';
import MyCourses from '../instructor/MyCourses';

const InstructorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    publishedCourses: 0,
    totalStudents: 0,
    averageRating: 0,
    totalEarnings: 0
  });
  const [courses, setCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchDashboardData();
    }
  }, [activeTab]);

  const fetchDashboardData = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    console.log('🔍 Starting dashboard data fetch...');

    // Fetch instructor stats from the dedicated API
    const statsResponse = await fetch('/api/instructor/dashboard/stats', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    console.log('🔍 Stats response status:', statsResponse.status);
    console.log('🔍 Stats response ok:', statsResponse.ok);

    if (statsResponse.ok) {
      const statsData = await statsResponse.json();
      console.log('🔍 Stats data received:', statsData);
      setStats(statsData);
    } else {
      console.log('❌ Stats API failed with status:', statsResponse.status);
      // Check what the error response is
      const errorText = await statsResponse.text();
      console.log('❌ Stats API error response:', errorText);
    }

    // Fetch instructor courses for the course list
    const coursesResponse = await fetch('/api/instructor/courses', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    console.log('🔍 Courses response status:', coursesResponse.status);

    if (coursesResponse.ok) {
      const coursesData = await coursesResponse.json();
      console.log('🔍 Courses data received:', coursesData);
      const courses = coursesData.courses || [];
      setCourses(courses);
      
      // Get top 3 courses by student count for the overview
      const topCourses = courses
        .sort((a, b) => (b.students_count || 0) - (a.students_count || 0))
        .slice(0, 3);
      
      setRecentActivity(topCourses);
    }

  } catch (error) {
    console.error('❌ Error fetching dashboard data:', error);
  } finally {
    setLoading(false);
  }
};

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0fdf4',
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
      color: '#059669'
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
    specialization: {
      color: '#059669',
      fontSize: '14px',
      fontStyle: 'italic'
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
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '15px',
      marginTop: '20px'
    },
    statCard: {
      backgroundColor: '#f0fdf4',
      padding: '15px',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #bbf7d0'
    },
    statNumber: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#059669',
      marginBottom: '5px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280'
    },
    createBtn: {
      padding: '10px 20px',
      backgroundColor: '#059669',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      marginTop: '15px'
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
      backgroundColor: '#059669',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '8px 8px 0 0',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      fontSize: '14px',
      borderBottom: '2px solid #059669',
      marginBottom: '-2px',
      boxShadow: '0 2px 4px rgba(5, 150, 105, 0.2)'
    },
    tabContent: {
      minHeight: '400px'
    },
    loading: {
      textAlign: 'center',
      padding: '40px',
      color: '#6b7280'
    },
    emptyState: {
      textAlign: 'center',
      padding: '20px',
      color: '#6b7280',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      margin: '10px 0'
    }
  };

  if (loading && activeTab === 'overview') {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <nav style={styles.nav}>
            <div style={styles.logo}>LearnPro Instructor</div>
            <div style={styles.userInfo}>
              <div>
                <div style={styles.userName}>{user?.name}</div>
                {user?.specialization && (
                  <div style={styles.specialization}>{user.specialization}</div>
                )}
              </div>
              <button 
                onClick={handleLogout}
                style={styles.logoutBtn}
              >
                Logout
              </button>
            </div>
          </nav>
        </header>
        <main style={styles.main}>
          <div style={styles.loading}>
            <h3>Loading dashboard data...</h3>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>LearnPro Instructor</div>
          <div style={styles.userInfo}>
            <div>
              <div style={styles.userName}>{user?.name}</div>
              {user?.specialization && (
                <div style={styles.specialization}>{user.specialization}</div>
              )}
            </div>
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
          <h1 style={styles.welcomeTitle}>Instructor Dashboard</h1>
          <p style={styles.welcomeText}>
            Manage your courses, track student progress, and grow your teaching business.
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
            onClick={() => setActiveTab('create-course')}
            style={activeTab === 'create-course' ? styles.activeTab : styles.tab}
          >
            ➕ Create Course
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            style={activeTab === 'analytics' ? styles.activeTab : styles.tab}
          >
            📈 Analytics
          </button>
        </div>

        {/* TAB CONTENT */}
        <div style={styles.tabContent}>
          {activeTab === 'overview' && (
            <div>
              {/* Stats Overview */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{stats.publishedCourses}</div>
                  <div style={styles.statLabel}>Published Courses</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{stats.totalStudents}</div>
                  <div style={styles.statLabel}>Total Students</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{stats.averageRating}</div>
                  <div style={styles.statLabel}>Average Rating</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>${stats.totalEarnings}</div>
                  <div style={styles.statLabel}>Total Earnings</div>
                </div>
              </div>

              {/* Content Grid */}
              <div style={styles.grid}>
                {/* Course Management */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Your Courses</h3>
                  {recentActivity.length === 0 ? (
                    <div style={styles.emptyState}>
                      <p>No courses yet. Create your first course to get started!</p>
                    </div>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {recentActivity.map(course => (
                        <li key={course.id} style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                          {course.title} ({course.students_count || 0} students)
                        </li>
                      ))}
                    </ul>
                  )}
                  <button 
                    style={styles.createBtn}
                    onClick={() => setActiveTab('create-course')}
                  >
                    + Create New Course
                  </button>
                </div>

                {/* Recent Activity */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Recent Activity</h3>
                  {courses.length === 0 ? (
                    <div style={styles.emptyState}>
                      <p>No recent activity</p>
                    </div>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {courses.slice(0, 3).map(course => (
                        <li key={course.id} style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                          {course.title} - {course.status}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Quick Stats */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Quick Stats</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                      Total Courses: {courses.length}
                    </li>
                    <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                      Published: {courses.filter(c => c.status === 'published').length}
                    </li>
                    <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                      Draft: {courses.filter(c => c.status === 'draft').length}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'my-courses' && (
            <MyCourses />
          )}

          {activeTab === 'create-course' && (
            <CreateCourse />
          )}

          {activeTab === 'analytics' && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Detailed Analytics</h3>
              {courses.length === 0 ? (
                <div style={styles.emptyState}>
                  <p>Create courses to see analytics data</p>
                </div>
              ) : (
                <div>
                  <p>Course performance, student progress, revenue reports will appear here.</p>
                  <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <h4 style={{ marginBottom: '10px' }}>Your Course Analytics:</h4>
                    <ul style={{ color: '#6b7280', lineHeight: '1.6' }}>
                      <li>📊 Total Courses: {courses.length}</li>
                      <li>👥 Total Students: {stats.totalStudents}</li>
                      <li>💰 Total Earnings: ${stats.totalEarnings}</li>
                      <li>⭐ Average Rating: {stats.averageRating}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;