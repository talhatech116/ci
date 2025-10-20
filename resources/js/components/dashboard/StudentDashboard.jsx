// resources/js/components/dashboard/StudentDashboard.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

        {/* Stats Overview */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>5</div>
            <div style={styles.statLabel}>Enrolled Courses</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>12</div>
            <div style={styles.statLabel}>Completed Lessons</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>85%</div>
            <div style={styles.statLabel}>Average Progress</div>
          </div>
        </div>

        {/* Content Grid */}
        <div style={styles.grid}>
          {/* Current Courses */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Current Courses</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                Web Development Fundamentals
              </li>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                Data Science Basics
              </li>
              <li style={{ padding: '10px 0' }}>
                Digital Marketing Mastery
              </li>
            </ul>
          </div>

          {/* Recent Activity */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Recent Activity</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Completed: Introduction to HTML
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Started: CSS Fundamentals
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Quiz passed: JavaScript Basics
              </li>
            </ul>
          </div>

          {/* Upcoming Deadlines */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Upcoming Deadlines</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Assignment: CSS Project - Due in 3 days
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Quiz: JavaScript Functions - Due in 5 days
              </li>
            </ul>
          </div>

          {/* Recommended Courses */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Recommended For You</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Advanced React Patterns
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Node.js Backend Development
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Database Design Principles
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;