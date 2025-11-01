import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import useToast from '../hooks/useToast';
import Toast from '../components/Toast';
import itineraryService from '../services/itineraryService';
import { 
  User, 
  MapPin, 
  Calendar, 
  Users,
  Star,
  LogIn,
  Plane,
  Settings,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  X
} from 'lucide-react';

const Profile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [userItineraries, setUserItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    name: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const { isDark } = useTheme();
  const { user, isAuthenticated, deleteAccount, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toasts, removeToast, showSuccess, showError } = useToast();

  // Load user itineraries
  useEffect(() => {
    if (isAuthenticated) {
      loadUserItineraries();
    }
  }, [isAuthenticated]);

  const loadUserItineraries = async () => {
    setLoading(true);
    const result = await itineraryService.getUserItineraries();
    if (result.success) {
      setUserItineraries(result.data);
    }
    setLoading(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
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
              Please login to access your profile and manage your travel plans.
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
                  <User className="w-5 h-5" />
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
        ? 'profile-bg-dark' 
        : 'profile-bg-light'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 text-white' 
              : 'bg-gradient-to-br from-white to-blue-50 border border-blue-100'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {user?.name || 'User'}
              </h1>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {user?.email}
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditForm({ 
                      name: user?.name || '', 
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                    setShowEditModal(true);
                  }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* My Itineraries Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-2xl shadow-xl p-8 transition-colors duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 text-white' 
              : 'bg-gradient-to-br from-white to-blue-50 border border-blue-100'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Itineraries</h2>
            <Link to="/itinerary">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
              >
                Create New
              </motion.button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading itineraries...</p>
            </div>
          ) : !userItineraries || userItineraries.length === 0 ? (
            <div className="text-center py-12">
              <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No itineraries yet</h3>
              <p className="text-gray-500 mb-6">Start planning your first adventure!</p>
              <Link to="/itinerary">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Plan Your First Trip
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userItineraries.map((itinerary) => (
                <motion.div
                  key={itinerary._id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedItinerary(itinerary)}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    isDark 
                      ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-gray-500 hover:border-purple-400' 
                      : 'bg-gradient-to-br from-white to-blue-50 border-blue-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{itinerary.destination}</h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
                      </p>
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

          {/* Manage Itineraries Button */}
          {userItineraries && userItineraries.length > 0 && (
            <div className="mt-8 text-center">
              <Link to="/itinerary">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg font-semibold inline-flex items-center space-x-2"
                >
                  <Settings className="w-5 h-5" />
                  <span>Manage Itineraries</span>
                </motion.button>
              </Link>
            </div>
          )}
        </motion.div>

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
                  <p className="text-lg font-semibold capitalize">{selectedItinerary.budget || 'N/A'}</p>
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
              <div className="mt-6 flex justify-end">
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

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl p-8 max-w-md w-full shadow-2xl ${
                isDark ? 'bg-gradient-to-br from-gray-800 to-gray-700 text-white border border-gray-600' : 'bg-gradient-to-br from-white to-blue-50 border border-blue-100'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className={`p-2 rounded-lg ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Your name"
                  />
                </div>

                {/* Password Change Section */}
                <div className={`pt-4 border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                  <h3 className={`font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    Change Password (Optional)
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={editForm.currentPassword}
                        onChange={(e) => setEditForm({ ...editForm, currentPassword: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        New Password
                      </label>
                      <input
                        type="password"
                        value={editForm.newPassword}
                        onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={editForm.confirmPassword}
                        onChange={(e) => setEditForm({ ...editForm, confirmPassword: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      // Validate password fields if user is trying to change password
                      if (editForm.newPassword || editForm.currentPassword || editForm.confirmPassword) {
                        if (!editForm.currentPassword) {
                          showError('Please enter your current password');
                          return;
                        }
                        if (!editForm.newPassword) {
                          showError('Please enter a new password');
                          return;
                        }
                        if (editForm.newPassword !== editForm.confirmPassword) {
                          showError('New passwords do not match');
                          return;
                        }
                        if (editForm.newPassword.length < 6) {
                          showError('New password must be at least 6 characters');
                          return;
                        }
                      }

                      setUpdateLoading(true);
                      const result = await updateProfile(editForm);
                      setUpdateLoading(false);
                      
                      if (result.success) {
                        setShowEditModal(false);
                        showSuccess('Profile updated successfully!');
                        // Reset password fields
                        setEditForm({
                          name: user?.name || '',
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                      } else {
                        showError(result.error || 'Failed to update profile');
                      }
                    }}
                    disabled={updateLoading}
                    className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updateLoading ? 'Saving...' : 'Save Changes'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEditModal(false)}
                    disabled={updateLoading}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium ${
                      isDark
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Cancel
                  </motion.button>
                </div>

                {/* Danger Zone */}
                <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                  <h3 className="font-medium text-red-500 mb-2">Danger Zone</h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowEditModal(false);
                      setShowDeleteConfirm(true);
                    }}
                    className="w-full px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Delete Account
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Account Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl p-8 max-w-md w-full shadow-2xl ${
                isDark ? 'bg-gradient-to-br from-gray-800 to-gray-700 text-white border border-gray-600' : 'bg-gradient-to-br from-white to-red-50 border border-red-100'
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold mb-2">Delete Account</h2>
                <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Are you sure you want to delete your account? This action cannot be undone. 
                  All your data, including trips and preferences, will be permanently deleted.
                </p>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      setDeleteLoading(true);
                      const result = await deleteAccount();
                      setDeleteLoading(false);
                      
                      if (result.success) {
                        // Redirect to home page after deletion
                        navigate('/');
                      } else {
                        alert(result.error || 'Failed to delete account');
                        setShowDeleteConfirm(false);
                      }
                    }}
                    disabled={deleteLoading}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteLoading ? 'Deleting...' : 'Yes, Delete My Account'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={deleteLoading}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium ${
                      isDark
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

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

export default Profile;