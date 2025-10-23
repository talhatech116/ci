import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  // Helper for authorized requests
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token
      ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      : { 'Content-Type': 'application/json' };
  };

  // ✅ Check if user is logged in
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/user', {
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error('Not authenticated');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Login failed');
      }

      const data = await res.json();
      const { user: userData, token } = data;

      localStorage.setItem('token', token);
      setUser(userData);

      return { success: true, dashboard: data.dashboard_route };
    } catch (err) {
      const message = err.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register
  const register = async (userData) => {
    try {
      setError('');
      setLoading(true);

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (errData.errors) {
          const message = Object.values(errData.errors).flat().join(', ');
          throw new Error(message);
        }
        throw new Error('Registration failed');
      }

      const data = await res.json();
      const { user: newUser, token } = data;

      localStorage.setItem('token', token);
      setUser(newUser);

      return { success: true, dashboard: data.dashboard_route };
    } catch (err) {
      const message = err.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error('Logout failed');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    setError,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isInstructor: user?.role === 'instructor',
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


