/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Loader
} from 'lucide-react';

const AuthForm = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { login, register, loading, error } = useAuth();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`max-w-md w-full rounded-2xl shadow-2xl p-8 transition-colors duration-300 backdrop-blur-lg ${
          isDark 
            ? 'modal-bg-dark border border-gray-600 text-white' 
            : 'modal-bg-light border border-blue-100'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {isLogin ? 'Welcome Back' : 'Join TravelPlan'}
          </h2>
          <p className="text-gray-600">
            {isLogin 
              ? 'Sign in to access your travel plans' 
              : 'Create an account to start planning'
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-12 py-3 rounded-lg border transition-colors duration-300 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter your password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Toggle Form */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-semibold hover:text-blue-600 transition-colors mt-1"
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default AuthForm;