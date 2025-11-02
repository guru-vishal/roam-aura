/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Home, MapPin, Compass, ArrowLeft, MapPinOff } from 'lucide-react';

const NotFound = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full text-center"
      >
        {/* Struck-out Location Icon */}
        <motion.div 
          className="flex justify-center items-center mb-8"
          variants={itemVariants}
        >
          <motion.div
            animate={floatingAnimation}
            className="relative"
          >
            <div className={`p-4 rounded-full ${
              isDark 
                ? 'bg-red-500/20 text-red-400' 
                : 'bg-red-100 text-red-600'
            }`}>
              <MapPinOff className="w-12 h-12" />
            </div>
            {/* Diagonal strike-through line */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
              <div 
                className={`w-20 h-1 rotate-45 ${
                  isDark ? 'bg-red-400' : 'bg-red-600'
                }`}
                style={{ transformOrigin: 'center' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* 404 Text */}
        <motion.div variants={itemVariants}>
          <h1 className={`text-9xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.h2 
          variants={itemVariants}
          className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Oops! You seem to be lost
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className={`text-lg md:text-xl mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          The page you're looking for doesn't exist or has been moved to another destination.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </motion.button>
          </Link>

          <Link to="/itinerary">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                isDark
                  ? 'bg-gray-800 text-white hover:bg-gray-700 shadow-lg'
                  : 'bg-white text-gray-900 hover:bg-gray-50 shadow-lg border border-gray-200'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Plan a Trip</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Go Back Link */}
        <motion.div variants={itemVariants} className="mt-8">
          <button
            onClick={() => window.history.back()}
            className={`inline-flex items-center space-x-2 text-sm font-medium transition-colors ${
              isDark
                ? 'text-blue-400 hover:text-blue-300'
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go back to previous page</span>
          </button>
        </motion.div>

        {/* Decorative Quote */}
        <motion.div 
          variants={itemVariants}
          className={`mt-12 p-6 rounded-2xl ${
            isDark
              ? 'bg-white/5 backdrop-blur-sm border border-white/10'
              : 'bg-white/60 backdrop-blur-sm border border-gray-200'
          }`}
        >
          <p className={`text-lg italic ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            "Not all those who wander are lost"
          </p>
          <p className={`text-sm mt-2 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            - J.R.R. Tolkien
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
