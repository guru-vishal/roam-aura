/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configure axios defaults
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_BASE_URL;

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

  // Set axios interceptor for token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get('/auth/profile');
      setUser(response.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);

      const response = await axios.post('/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setError('');
      setLoading(true);

      const response = await axios.post('/auth/register', {
        name,
        email,
        password
      });

      const { token, user } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setError('');
  };

  const deleteAccount = async () => {
    try {
      setError('');
      setLoading(true);

      await axios.delete('/auth/account');
      
      // Clear everything and logout
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete account';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setError('');
      setLoading(true);

      const response = await axios.put('/auth/profile', profileData);
      
      // Update user state with new data
      setUser(response.data.user);
      
      return { success: true, user: response.data.user };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    deleteAccount,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};