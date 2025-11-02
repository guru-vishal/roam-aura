/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  ArrowRight, 
  Plane, 
  Camera, 
  Coffee,
  Mountain,
  Waves,
  Building
} from 'lucide-react';

const Home = () => {
  const { isDark } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const destinations = [
    {
      name: 'Explore Destinations',
      description: 'Discover Amazing Places',
      icon: MapPin,
      color: 'from-rose-400 to-pink-600'
    },
    {
      name: 'City Adventures',
      description: 'Urban Exploration',
      icon: Building,
      color: 'from-blue-400 to-cyan-600'
    },
    {
      name: 'Beach Getaways',
      description: 'Tropical Paradise',
      icon: Waves,
      color: 'from-green-400 to-teal-600'
    },
    {
      name: 'Mountain Escapes',
      description: 'Natural Wonders',
      icon: Mountain,
      color: 'from-purple-400 to-indigo-600'
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: 'Smart Itinerary Builder',
      description: 'Create personalized travel plans with smart recommendations',
      color: 'bg-blue-500'
    },
    {
      icon: MapPin,
      title: 'Destination Discovery',
      description: 'Explore hidden gems and popular attractions worldwide',
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'Group Planning',
      description: 'Collaborate with friends and family on travel plans',
      color: 'bg-purple-500'
    },
    {
      icon: Star,
      title: 'Reviews & Ratings',
      description: 'Get insights from fellow travelers and local experts',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'home-bg-dark' : 'home-bg-light'}`}>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className={`absolute inset-0 ${isDark ? 
          'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 
          'bg-gradient-to-br from-blue-400 via-purple-500 to-teal-400'
        }`}>
          <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-black/20'}`}></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-40 -left-40 w-80 h-80 rounded-full ${isDark ? 'bg-purple-800/30' : 'bg-yellow-300/30'} blur-3xl animate-pulse`}></div>
            <div className={`absolute -bottom-40 -right-40 w-80 h-80 rounded-full ${isDark ? 'bg-blue-800/30' : 'bg-pink-300/30'} blur-3xl animate-pulse`} style={{animationDelay: '2s'}}></div>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${isDark ? 'bg-indigo-800/20' : 'bg-green-300/20'} blur-3xl animate-pulse`} style={{animationDelay: '4s'}}></div>
          </div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            // Enhanced layout with more left-side icons
            const margin = 130;
            const availableWidth = typeof window !== 'undefined' ? window.innerWidth - (margin * 2) : 1300;
            const availableHeight = typeof window !== 'undefined' ? window.innerHeight - (margin * 2) : 750;
            
            // Natural distribution with moderate spread
            const positions = [
              // Left side spread
              [0.05, 0.1],
              [0.15, 0.2],
              [0.08, 0.35],
              [0.18, 0.48],
              [0.1, 0.62],
              [0.05, 0.82],
              [0.18, 0.88],
              // Center-left area
              [0.32, 0.12],
              [0.42, 0.08],
              [0.38, 0.52],
              // Center-right area
              [0.58, 0.15],
              [0.62, 0.42],
              [0.55, 0.75],
              // Right side spread
              [0.75, 0.05],
              [0.82, 0.18],
              [0.88, 0.28],
              [0.78, 0.45],
              [0.85, 0.58],
              [0.92, 0.68],
              [0.8, 0.78],
              [0.92, 0.88],
              // Top spread - added more
              [0.25, 0.02],
              [0.35, 0.04],
              [0.48, 0.02],
              [0.62, 0.05],
              [0.68, 0.08],
              // Bottom spread
              [0.25, 0.92],
              [0.72, 0.85],
              [0.5, 0.95],
              [0.35, 0.9]
            ];
            
            const position = positions[i];
            
            // Use custom positions for optimal 5-icon spacing
            const initialX = margin + (position[0] * availableWidth);
            const initialY = margin + (position[1] * availableHeight);
            
            return (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: initialX,
                  y: initialY,
                  scale: 0
                }}
                animate={{
                  y: [initialY, initialY - 20, initialY],
                  scale: [0.8, 1, 0.8],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: 0
                }}
              >
                {i % 3 === 0 && <Plane className="w-8 h-8 text-white/30" />}
                {i % 3 === 1 && <Camera className="w-8 h-8 text-white/30" />}
                {i % 3 === 2 && <Coffee className="w-8 h-8 text-white/30" />}
              </motion.div>
            );
          })}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            Plan Your
            <span className="block" style={{ color: '#facc15' }}>Dream Trip</span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 opacity-90 text-white"
          >
            Discover amazing destinations and create personalized itineraries
            with our smart travel planner
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/itinerary">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 shadow-xl hover:bg-yellow-300 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span>Start Planning</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const destinationsSection = document.getElementById('destinations-section');
                if (destinationsSection) {
                  destinationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              Explore Destinations
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`py-20 ${isDark ? 
          'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900' : 
          'bg-gradient-to-r from-white via-blue-50 to-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose RoamAura?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make travel planning effortless with cutting-edge technology
              and personalized recommendations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 hover:border-blue-500/50' 
                      : 'bg-gradient-to-br from-white to-blue-50 border border-blue-100 hover:border-blue-300'
                  }`}
                >
                  <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="destinations-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`py-20 ${isDark ? 
          'bg-gradient-to-br from-slate-800 via-gray-900 to-slate-800' : 
          'bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the world's most amazing places with our curated collection
              of destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => {
              const Icon = destination.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <div className={`h-64 bg-gradient-to-br ${destination.color} flex items-center justify-center`}>
                      <Icon className="w-16 h-16 text-white opacity-50" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                      <p className="text-white/80">{destination.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`py-20 text-white ${isDark ? 
          'bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900' : 
          'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-6"
          >
            Ready to Start Your Adventure?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl mb-8 opacity-90"
          >
            Join thousands of travelers who have discovered their perfect trips
            with RoamAura
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link to="/itinerary">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Create Your Itinerary Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;