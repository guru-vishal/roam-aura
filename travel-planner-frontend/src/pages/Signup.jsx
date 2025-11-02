/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';
import { 
  Mail, 
  Lock, 
  User,
  Eye, 
  EyeOff, 
  ArrowRight,
  Loader,
  Plane,
  Check
} from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    match: false
  });

  const { register, loading, error } = useAuth();
  const { isDark } = useTheme();
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match!', 4000);
      return;
    }
    
    const result = await register(formData.name, formData.email, formData.password);
    if (result.success) {
      showSuccess('Account created successfully! Welcome aboard.', 3000);
      setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      showError(result.error || 'Registration failed. Please try again.', 4000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Password validation
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordValidation({
        length: (name === 'password' ? value : formData.password).length >= 6,
        match: (name === 'password' ? value : formData.password) === (name === 'confirmPassword' ? value : formData.confirmPassword)
      });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 backdrop-blur-md ${isDark ? 'home-bg-dark' : 'home-bg-light'}`}>
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-white/30'} backdrop-blur-sm`}></div>
        {/* Animated background shapes */}
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${isDark ? 'bg-green-800/30' : 'bg-purple-300/30'} blur-3xl`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${isDark ? 'bg-pink-800/30' : 'bg-blue-300/30'} blur-3xl`}></div>
          <div className={`absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${isDark ? 'bg-yellow-800/20' : 'bg-green-300/20'} blur-3xl`}></div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative max-w-md w-full rounded-2xl shadow-2xl p-8 backdrop-blur-lg ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 border border-gray-700 text-white' 
            : 'bg-gradient-to-br from-white/90 via-purple-50/90 to-pink-50/90 border border-purple-100'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-3"
          >
            <Plane className="w-8 h-8 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold mb-2">Join RoamAura</h1>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Create an account to start planning amazing trips
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50/50 border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50/50 border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-12 py-3 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50/50 border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Create a password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50/50 border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Password Validation */}
          {(formData.password || formData.confirmPassword) && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Check className={`w-4 h-4 ${passwordValidation.length ? '!text-green-500' : 'text-gray-400'}`} />
                <span className={passwordValidation.length ? (isDark ? 'text-green-400' : 'text-green-600') : (isDark ? 'text-gray-400' : 'text-gray-500')}>
                  At least 6 characters
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className={`w-4 h-4 ${passwordValidation.match && formData.confirmPassword ? '!text-green-500' : 'text-gray-400'}`} />
                <span className={passwordValidation.match && formData.confirmPassword ? (isDark ? 'text-green-400' : 'text-green-600') : (isDark ? 'text-gray-400' : 'text-gray-500')}>
                  Passwords match
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading || !passwordValidation.length || !passwordValidation.match}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-green-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-3 text-center">
          <Link
            to="/"
            className={`inline-flex items-center space-x-2 text-sm px-4 py-2 rounded-lg transition-all duration-300 ${
              isDark 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;