/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { MapPin, Mail, Phone, Facebook, MessageCircle, Instagram, Heart, Plane } from 'lucide-react';

const Footer = () => {
  const { isDark } = useTheme();
  
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white' 
          : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">RoamAura</span>
            </div>
            <p className={`mb-6 max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Your ultimate travel companion for creating personalized itineraries 
              and discovering amazing destinations around the world.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61564244080127"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-blue-500 text-white' 
                    : 'bg-white border border-gray-200 hover:bg-blue-500 text-gray-600 hover:text-white shadow-md'
                }`}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://wa.me/919597293169"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-green-500 text-white' 
                    : 'bg-white border border-gray-200 hover:bg-green-500 text-gray-600 hover:text-white shadow-md'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/_vishalmuthu_/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-pink-500 text-white' 
                    : 'bg-white border border-gray-200 hover:bg-pink-500 text-gray-600 hover:text-white shadow-md'
                }`}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/">
                  <motion.span
                    whileHover={{ x: 5 }}
                    className={`block transition-colors ${
                      isDark 
                        ? 'text-gray-400 hover:text-blue-400' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Home
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link to="/itinerary">
                  <motion.span
                    whileHover={{ x: 5 }}
                    className={`block transition-colors ${
                      isDark 
                        ? 'text-gray-400 hover:text-blue-400' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Itinerary Builder
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <motion.span
                    whileHover={{ x: 5 }}
                    className={`block transition-colors ${
                      isDark 
                        ? 'text-gray-400 hover:text-blue-400' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Profile
                  </motion.span>
                </Link>
              </li>
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=vishal3012006@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.span
                    whileHover={{ x: 5 }}
                    className={`transition-colors ${
                      isDark 
                        ? 'text-gray-400 hover:text-blue-400' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Contact
                  </motion.span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=vishal3012006@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <Mail className={`w-5 h-5 ${isDark ? '!text-blue-300' : '!text-blue-500'}`} />
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>vishal3012006@gmail.com</span>
              </a>
              <div className="flex items-center space-x-3">
                <Phone className={`w-5 h-5 ${isDark ? '!text-blue-300' : '!text-blue-500'}`} />
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>+91 95972 93169</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className={`w-5 h-5 ${isDark ? '!text-blue-300' : '!text-blue-500'}`} />
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Coimbatore, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className={`mt-8 pt-8 text-center ${
            isDark ? 'border-t border-gray-800' : 'border-t border-gray-200'
          }`}
        >
          <p className={`flex items-center justify-center space-x-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>&copy; 2025 RoamAura. All rights reserved. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for travelers.</span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;