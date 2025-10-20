// resources/js/components/dashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Simulate API call - replace with actual API
      setTimeout(() => {
        setUsers([
          { id: 1, name: 'John Student', email: 'john@example.com', role: 'student', status: 'active' },
          { id: 2, name: 'Sarah Instructor', email: 'sarah@example.com', role: 'instructor', status: 'active' },
          { id: 3, name: 'Mike Student', email: 'mike@example.com', role: 'student', status: 'inactive' },
          { id: 4, name: 'Emily Instructor', email: 'emily@example.com', role: 'instructor', status: 'active' },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleUserStatus = async (userId) => {
    // Simulate API call
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#fef2f2',
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
      color: '#dc2626'
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
      backgroundColor: '#dc2626',
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
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '15px',
      marginBottom: '30px'
    },
    statCard: {
      backgroundColor: '#fef2f2',
      padding: '15px',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #fecaca'
    },
    statNumber: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#dc2626',
      marginBottom: '5px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280'
    },
    usersSection: {
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '20px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      backgroundColor: '#f8fafc',
      borderBottom: '2px solid #e5e7eb'
    },
    tableHeaderCell: {
      padding: '12px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#374151'
    },
    tableCell: {
      padding: '12px',
      borderBottom: '1px solid #e5e7eb'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    statusActive: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    statusInactive: {
      backgroundColor: '#fecaca',
      color: '#dc2626'
    },
    toggleBtn: {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500'
    },
    toggleActivate: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    toggleDeactivate: {
      backgroundColor: '#059669',
      color: 'white'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>LearnPro Admin</div>
          <div style={styles.userInfo}>
            <span style={styles.userName}>Admin: {user?.name}</span>
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
          <h1 style={styles.welcomeTitle}>Admin Dashboard</h1>
          <p style={styles.welcomeText}>
            Manage platform users, monitor system health, and oversee platform operations.
          </p>
        </div>

        {/* Stats Overview */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>1,847</div>
            <div style={styles.statLabel}>Total Users</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>156</div>
            <div style={styles.statLabel}>Instructors</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>89</div>
            <div style={styles.statLabel}>Total Courses</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>98.7%</div>
            <div style={styles.statLabel}>System Uptime</div>
          </div>
        </div>

        {/* Users Management */}
        <div style={styles.usersSection}>
          <h3 style={styles.sectionTitle}>User Management</h3>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Name</th>
                <th style={styles.tableHeaderCell}>Email</th>
                <th style={styles.tableHeaderCell}>Role</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={styles.tableCell}>{user.name}</td>
                  <td style={styles.tableCell}>{user.email}</td>
                  <td style={styles.tableCell}>{user.role}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.statusBadge,
                      ...(user.status === 'active' ? styles.statusActive : styles.statusInactive)
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      style={{
                        ...styles.toggleBtn,
                        ...(user.status === 'active' ? styles.toggleActivate : styles.toggleDeactivate)
                      }}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={styles.usersSection}>
            <h3 style={styles.sectionTitle}>Platform Analytics</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Daily Active Users: 1,243
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                New Registrations Today: 47
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Course Completion Rate: 72%
              </li>
            </ul>
          </div>

          <div style={styles.usersSection}>
            <h3 style={styles.sectionTitle}>System Health</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Server Load: 45%
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Database Performance: Optimal
              </li>
              <li style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>
                Last Backup: 2 hours ago
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;