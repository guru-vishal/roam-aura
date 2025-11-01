import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import useToast from '../hooks/useToast';
import Toast from '../components/Toast';
import itineraryService from '../services/itineraryService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Plus, 
  X, 
  Star,
  Camera,
  Utensils,
  Bed,
  Plane,
  Loader,
  Check,
  Edit,
  Trash2,
  LogIn,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  List,
  ShoppingBag,
  Download
} from 'lucide-react';

const ItineraryBuilder = () => {
  const { isDark } = useTheme();
  const { isAuthenticated } = useAuth();
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [userItineraries, setUserItineraries] = useState([]);
  const [showItineraries, setShowItineraries] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 2000,
    interests: []
  });

  // Debounce function for city search
  const debounceTimer = React.useRef(null);

  const searchCities = async (query) => {
    if (query.length < 2) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoadingCities(true);
    const result = await itineraryService.searchCities(query);
    setLoadingCities(false);

    if (result.success) {
      setCitySuggestions(result.cities);
      setShowSuggestions(result.cities.length > 0);
    } else {
      setCitySuggestions([]);
      setShowSuggestions(false);
    }
  };

  const interests = [
    { id: 'culture', name: 'Culture & History', icon: Camera },
    { id: 'food', name: 'Food & Dining', icon: Utensils },
    { id: 'adventure', name: 'Adventure', icon: MapPin },
    { id: 'relaxation', name: 'Relaxation', icon: Bed },
    { id: 'nightlife', name: 'Nightlife', icon: Star },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag }
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget (₹4000-8000/day)' },
    { value: 'mid-range', label: 'Mid-range (₹8000-16000/day)' },
    { value: 'luxury', label: 'Luxury (₹16000+/day)' }
  ];

  // Load user itineraries on component mount
  useEffect(() => {
    if (isAuthenticated) {
      loadUserItineraries();
    }
  }, [isAuthenticated]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSuggestions && !event.target.closest('.destination-input-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSuggestions]);

  const loadUserItineraries = async () => {
    const result = await itineraryService.getUserItineraries();
    if (result.success) {
      setUserItineraries(result.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interests: checked 
          ? [...prev.interests, name]
          : prev.interests.filter(interest => interest !== name)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Handle city search for destination field with debouncing
      if (name === 'destination') {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }

        if (value.length >= 2) {
          debounceTimer.current = setTimeout(() => {
            searchCities(value);
          }, 500); // 500ms debounce
        } else {
          setCitySuggestions([]);
          setShowSuggestions(false);
        }
      }
    }
  };

  const handleCitySelect = (city) => {
    setFormData(prev => ({
      ...prev,
      destination: city.description
    }));
    setShowSuggestions(false);
    setCitySuggestions([]);
  };

  const handleGenerateItinerary = async () => {
    if (!isAuthenticated) {
      setError('Please login to generate itineraries');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await itineraryService.generateItinerary(formData);
      
      if (result.success) {
        setGeneratedItinerary(result.data);
        setStep(3);
        await loadUserItineraries(); // Refresh the list
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItinerary = async (id) => {
    const result = await itineraryService.deleteItinerary(id);
    if (result.success) {
      showSuccess('Itinerary deleted successfully');
      setDeleteConfirmId(null);
      await loadUserItineraries();
    } else {
      showError(result.error || 'Failed to delete itinerary');
      setError(result.error);
    }
  };

  const handleExportPDF = (itinerary) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const margin = 14;
      let yPos = 20;

      // Title
      doc.setFontSize(22);
      doc.setTextColor(59, 130, 246); // Blue color
      doc.text('Travel Itinerary', pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;

      // Destination
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text(itinerary.destination, pageWidth / 2, yPos, { align: 'center' });
      yPos += 12;

      // Trip Info Box
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const startDate = new Date(itinerary.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      const endDate = new Date(itinerary.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      const duration = Math.ceil((new Date(itinerary.endDate) - new Date(itinerary.startDate)) / (1000 * 60 * 60 * 24)) + 1;
      
      doc.text(`${startDate} - ${endDate}`, pageWidth / 2, yPos, { align: 'center' });
      yPos += 6;
      doc.text(`${duration} Days | ${itinerary.travelers || 1} Traveler${(itinerary.travelers || 1) > 1 ? 's' : ''} | ${itinerary.budget || 'Moderate'} Budget`, pageWidth / 2, yPos, { align: 'center' });
      yPos += 10;

      // Interests
      if (itinerary.interests && itinerary.interests.length > 0) {
        doc.setFontSize(9);
        doc.setTextColor(147, 51, 234); // Purple color
        doc.text(`Interests: ${itinerary.interests.join(', ')}`, pageWidth / 2, yPos, { align: 'center' });
        yPos += 12;
      } else {
        yPos += 8;
      }

      // Daily Itinerary
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Daily Itinerary', margin, yPos);
      yPos += 8;

      // Days
      itinerary.days.forEach((day, index) => {
        // Check if we need a new page
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }

        // Day Header
        doc.setFillColor(59, 130, 246);
        doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 10, 'F');
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text(`Day ${day.day || index + 1}`, margin + 3, yPos + 2);
        
        // Weather info
        if (day.weather) {
          const weatherText = `${day.weather.temp}°C | ${day.weather.condition}`;
          doc.text(weatherText, pageWidth - margin - 3, yPos + 2, { align: 'right' });
        }
        yPos += 12;

        // Places
        if (day.places && day.places.length > 0) {
          day.places.forEach((place, placeIndex) => {
            // Check if we need a new page
            if (yPos > 260) {
              doc.addPage();
              yPos = 20;
            }

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            
            // Place name
            doc.setFont(undefined, 'bold');
            doc.text(`${placeIndex + 1}. ${place.name}`, margin + 5, yPos);
            yPos += 5;

            // Place details
            doc.setFont(undefined, 'normal');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            
            if (place.description) {
              const lines = doc.splitTextToSize(place.description, pageWidth - 2 * margin - 10);
              doc.text(lines, margin + 5, yPos);
              yPos += lines.length * 4;
            }

            if (place.duration) {
              doc.text(`Duration: ${place.duration}`, margin + 5, yPos);
              yPos += 4;
            }

            if (place.bestTime) {
              doc.text(`Best Time: ${place.bestTime}`, margin + 5, yPos);
              yPos += 4;
            }

            if (place.tips) {
              doc.setTextColor(147, 51, 234);
              doc.text(`Tip: ${place.tips}`, margin + 5, yPos);
              yPos += 4;
            }

            yPos += 3;
          });
        }

        yPos += 5;
      });

      // Footer
      const totalPages = doc.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Generated by Travel Planner | Page ${i} of ${totalPages}`, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      }

      // Save the PDF
      const fileName = `${itinerary.destination.replace(/[^a-z0-9]/gi, '_')}_Itinerary.pdf`;
      doc.save(fileName);
      showSuccess('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      showError('Failed to export PDF');
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'clear': Sun,
      'clouds': Cloud,
      'rain': CloudRain,
      'snow': CloudSnow
    };
    return icons[condition] || Sun;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900' 
          : 'bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl shadow-2xl p-12 text-center transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-800/90 text-white border border-gray-700' 
              : 'bg-white/90 border border-gray-200'
          }`}>
            <LogIn className="w-20 h-20 text-blue-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Login Required</h1>
            <p className={`mb-8 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Please login to create and manage your travel itineraries.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg ${
                    isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Sign Up</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 transition-colors duration-300 ${
      isDark 
        ? 'itinerary-bg-dark' 
        : 'itinerary-bg-light'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Smart Itinerary Builder
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Create personalized travel plans with weather-based recommendations
          </p>
          
          {/* Toggle View Button */}
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowItineraries(!showItineraries)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg mr-4"
            >
              {showItineraries ? 'Create New Itinerary' : 'View My Itineraries'}
            </motion.button>
          </div>
        </motion.div>

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

        {/* Show existing itineraries */}
        {showItineraries ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-2xl shadow-xl p-8 transition-colors duration-300 ${
              isDark ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 text-white' : 'bg-gradient-to-br from-white to-yellow-50 border border-yellow-100'
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">My Itineraries</h2>
            
            {!userItineraries || userItineraries.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No itineraries yet</h3>
                <p className="text-gray-500 mb-6">Create your first personalized travel plan!</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowItineraries(false)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create Itinerary
                </motion.button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userItineraries.map((itinerary) => (
                  <motion.div
                    key={itinerary._id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedItinerary(itinerary)}
                    className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] cursor-pointer ${
                      isDark 
                        ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-gray-500 hover:border-purple-500 hover:shadow-purple-500/50' 
                        : 'bg-gradient-to-br from-white to-blue-50 border-blue-200 hover:border-purple-400 hover:shadow-purple-400/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{itinerary.destination}</h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExportPDF(itinerary);
                          }}
                          className={`p-2 rounded-full transition-colors ${
                            isDark 
                              ? 'text-green-400 hover:bg-green-500/20 hover:text-green-300' 
                              : 'text-green-600 hover:bg-green-600 hover:text-white'
                          }`}
                          title="Export PDF"
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(itinerary._id);
                          }}
                          className={`p-2 rounded-full transition-colors ${
                            isDark 
                              ? 'text-red-400 hover:bg-red-500/20 hover:text-red-300' 
                              : 'text-red-500 hover:bg-red-500 hover:text-white'
                          }`}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{itinerary.travelers} traveler{itinerary.travelers > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{itinerary.days?.length || 0} days planned</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {itinerary.interests?.map((interest) => (
                          <span
                            key={interest}
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              isDark 
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                                : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'
                            }`}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* Create New Itinerary Form */
          <div className={`rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${
            isDark ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 text-white' : 'bg-gradient-to-br from-white to-indigo-50 border border-indigo-100'
          }`}>
            
            {/* Progress Bar */}
            <div className={`h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <motion.div
                className={`h-full ${isDark ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}
                initial={{ width: '33.33%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-2">Tell us about your trip</h2>
                      <p className="text-gray-600">Where would you like to go and when?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="destination-input-container">
                        <label className="block text-sm font-medium mb-2">Destination</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                          <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            onFocus={() => {
                              if (formData.destination && citySuggestions.length > 0) {
                                setShowSuggestions(true);
                              }
                            }}
                            className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                              isDark
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-gray-50 border-gray-300'
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="e.g., Mumbai, Goa, Delhi"
                            required
                            autoComplete="off"
                          />
                          
                          {/* City Suggestions Dropdown */}
                          {showSuggestions && (
                            <div className={`absolute z-20 w-full mt-1 rounded-lg shadow-lg border max-h-60 overflow-y-auto ${
                              isDark 
                                ? 'bg-gray-700 border-gray-600' 
                                : 'bg-white border-gray-200'
                            }`}>
                              {loadingCities ? (
                                <div className="px-4 py-3 flex items-center justify-center">
                                  <Loader className="w-5 h-5 animate-spin text-blue-500 mr-2" />
                                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                    Searching...
                                  </span>
                                </div>
                              ) : citySuggestions.length > 0 ? (
                                citySuggestions.map((city, index) => (
                                  <div
                                    key={index}
                                    onClick={() => handleCitySelect(city)}
                                    className={`px-4 py-3 cursor-pointer transition-colors flex items-center ${
                                      isDark 
                                        ? 'hover:bg-gray-600 text-white' 
                                        : 'hover:bg-blue-50 text-gray-900'
                                    }`}
                                  >
                                    <MapPin className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                                    <span className="text-sm">{city.description}</span>
                                  </div>
                                ))
                              ) : (
                                <div className={`px-4 py-3 text-center text-sm ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  No cities found
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            name="travelers"
                            value={formData.travelers}
                            onChange={handleInputChange}
                            min="1"
                            max="20"
                            className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                              isDark
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-gray-50 border-gray-300'
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Start Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            max={formData.endDate || undefined}
                            className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                              isDark
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-gray-50 border-gray-300'
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">End Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            min={formData.startDate || new Date().toISOString().split('T')[0]}
                            className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                              isDark
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-gray-50 border-gray-300'
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Budget per Day: ₹{formData.budget}
                      </label>
                      <div className="space-y-3">
                        <input
                          type="range"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          min="2000"
                          max="40000"
                          step="1000"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, 
                              ${isDark ? '#10b981' : '#10b981'} 0%, 
                              ${isDark ? '#3b82f6' : '#3b82f6'} ${((formData.budget - 2000) / (40000 - 2000)) * 50}%, 
                              ${isDark ? '#8b5cf6' : '#8b5cf6'} ${((formData.budget - 2000) / (40000 - 2000)) * 75}%, 
                              ${isDark ? '#f59e0b' : '#f59e0b'} ${((formData.budget - 2000) / (40000 - 2000)) * 100}%, 
                              ${isDark ? '#374151' : '#e5e7eb'} ${((formData.budget - 2000) / (40000 - 2000)) * 100}%, 
                              ${isDark ? '#374151' : '#e5e7eb'} 100%)`
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>₹2000</span>
                          <span className={`font-semibold text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            {formData.budget < 8000 ? 'Budget' : formData.budget < 16000 ? 'Mid-range' : formData.budget < 25000 ? 'Comfortable' : 'Luxury'}
                          </span>
                          <span>₹40000</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const start = new Date(formData.startDate);
                          const end = new Date(formData.endDate);
                          if (end < start) {
                            showError('End date cannot be earlier than start date');
                            return;
                          }
                          setStep(2);
                        }}
                        disabled={!formData.destination || !formData.startDate || !formData.endDate || !formData.budget}
                        className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next Step
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Interests & Preferences */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-2">What interests you?</h2>
                      <p className="text-gray-600">Select your travel preferences to get personalized recommendations</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {interests.map((interest) => {
                        const Icon = interest.icon;
                        const isSelected = formData.interests.includes(interest.id);
                        
                        return (
                          <motion.label
                            key={interest.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                              isSelected
                                ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg'
                                : isDark
                                ? 'border-gray-600 bg-gradient-to-br from-gray-700 to-gray-600 hover:border-gray-500 hover:from-gray-650 hover:to-gray-550'
                                : 'border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:border-gray-300 hover:from-gray-50 hover:to-gray-100'
                            }`}
                          >
                            <input
                              type="checkbox"
                              name={interest.id}
                              checked={isSelected}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <Icon className={`w-8 h-8 mx-auto mb-3 ${
                              isSelected ? 'text-white' : 'text-gray-400'
                            }`} />
                            <div className="text-center">
                              <div className={`font-medium ${isSelected ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'}`}>
                                {interest.name}
                              </div>
                            </div>
                          </motion.label>
                        );
                      })}
                    </div>

                    <div className="flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(1)}
                        className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                          isDark
                            ? 'bg-gray-700 text-white hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                        }`}
                      >
                        Previous
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGenerateItinerary}
                        disabled={loading || formData.interests.length === 0}
                        className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {loading ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Plane className="w-5 h-5" />
                            <span>Generate Itinerary</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Generated Itinerary */}
                {step === 3 && generatedItinerary && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <Check className="w-8 h-8 text-green-500" />
                        <h2 className="text-2xl font-bold">Your Itinerary is Ready!</h2>
                      </div>
                      <p className="text-gray-600">
                        Here's your personalized travel plan for {generatedItinerary.destination}
                      </p>
                    </div>

                    {/* Itinerary Header */}
                    <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{generatedItinerary.destination}</h3>
                          <p className="text-gray-600">
                            {formatDate(generatedItinerary.startDate)} - {formatDate(generatedItinerary.endDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Share ID</div>
                          <div className="font-mono text-sm">{generatedItinerary.shareId}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {generatedItinerary.interests?.map((interest) => (
                          <span
                            key={interest}
                            className={`px-3 py-1 text-sm rounded-full font-medium ${
                              isDark 
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            }`}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Daily Itinerary */}
                    <div className="space-y-4">
                      {generatedItinerary.days?.map((day, index) => {
                        const WeatherIcon = getWeatherIcon(day.weather?.condition?.toLowerCase());
                        
                        return (
                          <div
                            key={index}
                            className={`p-6 rounded-xl border transition-colors duration-300 ${
                              isDark 
                                ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-gray-500' 
                                : 'bg-gradient-to-br from-white to-green-50 border-green-200'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-lg font-semibold">
                                Day {day.day || (index + 1)} - {formatDate(day.date)}
                              </h4>
                              {day.weather && (
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <WeatherIcon className="w-5 h-5" />
                                  <span>{day.weather.condition}</span>
                                  <span>{day.weather.temp}°C</span>
                                </div>
                              )}
                            </div>

                            {day.places && day.places.length > 0 && (
                              <div className="space-y-3">
                                {day.places.map((place, placeIndex) => (
                                  <div
                                    key={placeIndex}
                                    className={`p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                                      isDark 
                                        ? 'bg-gray-700 hover:bg-gray-650 border border-gray-600' 
                                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-300'
                                    }`}
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <h5 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {place.name}
                                      </h5>
                                      {place.rating && (
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                          <span className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {place.rating}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    {place.address && (
                                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                        {place.address}
                                      </p>
                                    )}
                                    <div className="flex items-center justify-between">
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                        place.timeCategory === 'morning' ? 'bg-yellow-100 text-yellow-700' :
                                        place.timeCategory === 'afternoon' ? 'bg-orange-100 text-orange-700' :
                                        'bg-purple-100 text-purple-700'
                                      }`}>
                                        {place.timeCategory}
                                      </span>
                                      {place.priceLevel && (
                                        <span className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                                          {'$'.repeat(place.priceLevel)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between flex-wrap gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setStep(1);
                          setGeneratedItinerary(null);
                          setFormData({
                            destination: '',
                            startDate: '',
                            endDate: '',
                            travelers: 1,
                            budget: '',
                            interests: []
                          });
                        }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                      >
                        Create Another
                      </motion.button>
                      <div className="flex gap-4 flex-wrap">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleExportPDF(generatedItinerary)}
                          className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2"
                        >
                          <Download className="w-5 h-5" />
                          <span>Export PDF</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setShowItineraries(true);
                            loadUserItineraries();
                          }}
                          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center space-x-2"
                        >
                          <List className="w-5 h-5" />
                          <span>View All Itineraries</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Itinerary Details Modal */}
      {selectedItinerary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 text-white border border-gray-600' 
                : 'bg-gradient-to-br from-white to-blue-50 border border-blue-100'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedItinerary.destination}</h2>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {formatDate(selectedItinerary.startDate)} - {formatDate(selectedItinerary.endDate)}
                </p>
              </div>
              <button
                onClick={() => setSelectedItinerary(null)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Trip Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <Users className="w-5 h-5 text-blue-500 mb-2" />
                <p className="text-sm opacity-70">Travelers</p>
                <p className="text-lg font-semibold">{selectedItinerary.travelers}</p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-green-50'}`}>
                <Calendar className="w-5 h-5 text-green-500 mb-2" />
                <p className="text-sm opacity-70">Duration</p>
                <p className="text-lg font-semibold">{selectedItinerary.days?.length || 0} days</p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <Star className="w-5 h-5 text-purple-500 mb-2" />
                <p className="text-sm opacity-70">Budget</p>
                <p className="text-lg font-semibold">₹{selectedItinerary.budget || 'N/A'}</p>
              </div>
            </div>

            {/* Interests */}
            {selectedItinerary.interests && selectedItinerary.interests.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItinerary.interests.map((interest) => (
                    <span
                      key={interest}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                          : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'
                      }`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Itinerary */}
            {selectedItinerary.days && selectedItinerary.days.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Daily Itinerary</h3>
                <div className="space-y-6">
                  {selectedItinerary.days.map((day, dayIndex) => (
                    <motion.div
                      key={dayIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dayIndex * 0.1 }}
                      className={`p-6 rounded-xl border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                          Day {day.day} - {formatDate(day.date)}
                        </h4>
                        {day.weather && (
                          <div className="flex items-center space-x-2 text-sm">
                            {day.weather.condition === 'sunny' && <Sun className="w-4 h-4 text-yellow-500" />}
                            {day.weather.condition === 'cloudy' && <Cloud className="w-4 h-4 text-gray-400" />}
                            {day.weather.condition === 'rainy' && <CloudRain className="w-4 h-4 text-blue-400" />}
                            {day.weather.condition === 'snowy' && <CloudSnow className="w-4 h-4 text-blue-300" />}
                            <span>{day.weather.temp}°C</span>
                          </div>
                        )}
                      </div>

                      {/* Places */}
                      {day.places && day.places.length > 0 && (
                        <div className="space-y-3">
                          {day.places.map((place, placeIndex) => (
                            <div
                              key={placeIndex}
                              className={`p-4 rounded-lg border ${
                                isDark 
                                  ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 text-white' 
                                  : 'bg-gradient-to-r from-white to-blue-50 border-blue-100 text-gray-900'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-base mb-1">{place.name}</h5>
                                  {place.address && (
                                    <p className={`text-sm flex items-start ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                      <MapPin className="w-3 h-3 mr-1 mt-1 flex-shrink-0" />
                                      {place.address}
                                    </p>
                                  )}
                                </div>
                                {place.rating && (
                                  <div className="flex items-center space-x-1 ml-2">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-medium">{place.rating}</span>
                                  </div>
                                )}
                              </div>
                              {place.timeOfDay && (
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {place.timeOfDay}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="mt-6 flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleExportPDF(selectedItinerary)}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Export PDF</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedItinerary(null)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-8 max-w-md w-full shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 text-white border border-gray-600' 
                : 'bg-gradient-to-br from-white to-red-50 border border-red-100'
            }`}
          >
            <div className="text-center mb-6">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                isDark ? 'bg-red-500/20' : 'bg-red-100'
              }`}>
                <Trash2 className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Delete Itinerary?</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Are you sure you want to delete this itinerary? This action cannot be undone.
              </p>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDeleteConfirmId(null)}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDark 
                    ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDeleteItinerary(deleteConfirmId)}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  );
};

export default ItineraryBuilder;