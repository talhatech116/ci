// resources/js/components/dashboard/StudentDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CourseCatalog from '../student/CourseCatalog';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

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
            </div>
          )}

          {activeTab === 'my-courses' && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>My Enrolled Courses</h3>
              <p>Your enrolled courses will appear here. Browse courses to get started!</p>
              <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', marginTop: '15px' }}>
                <h4 style={{ color: '#6b7280', marginBottom: '10px' }}>No courses enrolled yet</h4>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                  Visit the "Browse Courses" tab to discover and enroll in courses.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'browse' && (
            <CourseCatalog />
          )}

          {activeTab === 'progress' && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>My Learning Progress</h3>
              <p>Track your course progress, certificates, and achievements here.</p>
              <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px', marginTop: '15px' }}>
                <h4 style={{ color: '#0369a1', marginBottom: '10px' }}>Learning Analytics</h4>
                <ul style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  <li>📊 Course completion rates</li>
                  <li>⏱️ Time spent learning</li>
                  <li>🏆 Achievements and badges</li>
                  <li>📜 Certificates earned</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;