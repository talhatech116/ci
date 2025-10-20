// resources/js/components/dashboard/InstructorDashboard.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    }
  };

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

        {/* Stats Overview */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>8</div>
            <div style={styles.statLabel}>Published Courses</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>1,247</div>
            <div style={styles.statLabel}>Total Students</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>4.8</div>
            <div style={styles.statLabel}>Average Rating</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>$3,458</div>
            <div style={styles.statLabel}>Total Earnings</div>
          </div>
        </div>

        {/* Content Grid */}
        <div style={styles.grid}>
          {/* Course Management */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Course Management</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                Web Development Bootcamp (1,042 students)
              </li>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                React Masterclass (892 students)
              </li>
              <li style={{ padding: '10px 0' }}>
                Node.js Advanced Patterns (315 students)
              </li>
            </ul>
            <button style={styles.createBtn}>+ Create New Course</button>
          </div>

          {/* Student Engagement */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Student Engagement</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                15 new enrollments today
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                23 pending assignments to grade
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                5 student questions awaiting response
              </li>
            </ul>
          </div>

          {/* Performance Metrics */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Performance Metrics</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Completion Rate: 78%
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Student Satisfaction: 96%
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Monthly Growth: +15%
              </li>
            </ul>
          </div>

          {/* Recent Reviews */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Recent Reviews</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                "Excellent course content!" ★★★★★
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                "Great instructor, very helpful" ★★★★★
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                "Learned so much, thank you!" ★★★★☆
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;