const Itinerary = require('../models/Itinerary');
const User = require('../models/User');
const googlePlacesAPI = require('../utils/googleApi');
const weatherAPI = require('../utils/weatherApi');

const itineraryController = {
  // Generate new itinerary
  async generateItinerary(req, res) {
    try {
      const { destination, startDate, endDate, interests, budget, travelers } = req.body;
      const userId = req.userId;

      // Validate input
      if (!destination || !startDate || !endDate || !interests || interests.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide destination, dates, and interests'
        });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

      if (days > 7) {
        return res.status(400).json({
          success: false,
          message: 'Maximum trip duration is 7 days'
        });
      }

      // Get weather forecast
      const weatherForecast = await weatherAPI.getForecast(destination, days);

      // Get places for each interest
      const allPlaces = [];
      for (const interest of interests) {
        try {
          const places = await googlePlacesAPI.searchPlaces(destination, interest);
          const categorizedPlaces = googlePlacesAPI.categorizePlacesByTime(places);
          allPlaces.push(...categorizedPlaces);
        } catch (error) {
          console.error(`Error fetching places for ${interest}:`, error.message);
        }
      }

      // Remove duplicates and sort by rating
      const uniquePlaces = allPlaces.filter((place, index, self) =>
        index === self.findIndex(p => p.place_id === place.place_id)
      ).sort((a, b) => (b.rating || 0) - (a.rating || 0));

      // Generate daily itinerary
      const itineraryDays = [];
      for (let i = 0; i < days && i < weatherForecast.length; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        
        const dayWeather = weatherForecast[i];
        
        // Select places based on weather and time of day
        const isGoodWeather = weatherAPI.isGoodWeatherForOutdoor(dayWeather);
        const suggestedTypes = weatherAPI.suggestActivitiesByWeather(dayWeather);
        
        // Filter places suitable for the weather
        const suitablePlaces = uniquePlaces.filter(place => {
          if (!isGoodWeather) {
            // Indoor activities for bad weather
            return place.types.some(type => 
              ['museum', 'shopping_mall', 'restaurant', 'art_gallery', 'movie_theater'].includes(type)
            );
          }
          return true;
        });

        // Select 3-5 places for the day
        const dayPlaces = [];
        const placesPerDay = Math.min(5, Math.max(3, Math.floor(suitablePlaces.length / days)));
        
        // Morning places (1-2)
        const morningPlaces = suitablePlaces
          .filter(p => p.timeOfDay === 'morning')
          .slice(i * 2, (i * 2) + 2);
        
        // Afternoon places (1-2)
        const afternoonPlaces = suitablePlaces
          .filter(p => p.timeOfDay === 'afternoon')
          .slice(i * 2, (i * 2) + 2);
        
        // Evening places (1)
        const eveningPlaces = suitablePlaces
          .filter(p => p.timeOfDay === 'evening')
          .slice(i, i + 1);

        dayPlaces.push(...morningPlaces, ...afternoonPlaces, ...eveningPlaces);

        // If not enough places, fill with remaining places
        if (dayPlaces.length < placesPerDay) {
          const remainingPlaces = suitablePlaces
            .filter(p => !dayPlaces.find(dp => dp.place_id === p.place_id))
            .slice(0, placesPerDay - dayPlaces.length);
          dayPlaces.push(...remainingPlaces);
        }

        // Format places for response
        const formattedPlaces = dayPlaces.slice(0, placesPerDay).map(place => ({
          name: place.name,
          address: place.formatted_address || place.vicinity,
          placeId: place.place_id,
          rating: place.rating || 0,
          types: place.types || [],
          photoReference: place.photos && place.photos[0] ? place.photos[0].photo_reference : null,
          timeOfDay: place.timeOfDay
        }));

        itineraryDays.push({
          day: i + 1,
          date: currentDate,
          weather: {
            condition: dayWeather.condition,
            temp: dayWeather.temperature,
            description: dayWeather.description,
            icon: dayWeather.icon
          },
          places: formattedPlaces
        });
      }

      // Convert numeric budget to category
      let budgetCategory = budget;
      if (typeof budget === 'number') {
        if (budget < 6000) {
          budgetCategory = 'Budget';
        } else if (budget < 16000) {
          budgetCategory = 'Mid-range';
        } else if (budget < 25000) {
          budgetCategory = 'Comfortable';
        } else {
          budgetCategory = 'Luxury';
        }
      }

      // Create and save itinerary
      const itinerary = new Itinerary({
        user: userId,
        destination,
        startDate: start,
        endDate: end,
        budget: budgetCategory,
        travelers: travelers || 1,
        interests,
        days: itineraryDays
      });

      await itinerary.save();

      // Add to user's itineraries
      await User.findByIdAndUpdate(userId, {
        $push: { itineraries: itinerary._id }
      });

      res.status(201).json({
        success: true,
        message: 'Itinerary generated successfully',
        itinerary
      });

    } catch (error) {
      console.error('Generate itinerary error:', error);
      res.status(500).json({
        success: false,
        message: 'Error generating itinerary',
        error: error.message
      });
    }
  },

  // Get user's itineraries
  async getUserItineraries(req, res) {
    try {
      const userId = req.params.id || req.userId;
      
      const itineraries = await Itinerary.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate('user', 'name email');

      res.json({
        success: true,
        itineraries
      });
    } catch (error) {
      console.error('Get user itineraries error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching itineraries'
      });
    }
  },

  // Get single itinerary (for sharing)
  async getItinerary(req, res) {
    try {
      const { id } = req.params;
      
      const itinerary = await Itinerary.findById(id).populate('user', 'name');
      
      if (!itinerary) {
        return res.status(404).json({
          success: false,
          message: 'Itinerary not found'
        });
      }

      res.json({
        success: true,
        itinerary
      });
    } catch (error) {
      console.error('Get itinerary error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching itinerary'
      });
    }
  },

  // Get shared itinerary by shareId
  async getSharedItinerary(req, res) {
    try {
      const { shareId } = req.params;
      
      const itinerary = await Itinerary.findOne({ shareId, isPublic: true })
        .populate('user', 'name');
      
      if (!itinerary) {
        return res.status(404).json({
          success: false,
          message: 'Shared itinerary not found'
        });
      }

      res.json({
        success: true,
        itinerary
      });
    } catch (error) {
      console.error('Get shared itinerary error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching shared itinerary'
      });
    }
  },

  // Make itinerary public and generate share link
  async shareItinerary(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      
      const itinerary = await Itinerary.findOne({ _id: id, user: userId });
      
      if (!itinerary) {
        return res.status(404).json({
          success: false,
          message: 'Itinerary not found'
        });
      }

      itinerary.isPublic = true;
      await itinerary.save(); // This will trigger the pre-save hook to generate shareId

      res.json({
        success: true,
        message: 'Itinerary shared successfully',
        shareUrl: `${process.env.FRONTEND_URL}/shared/${itinerary.shareId}`,
        shareId: itinerary.shareId
      });
    } catch (error) {
      console.error('Share itinerary error:', error);
      res.status(500).json({
        success: false,
        message: 'Error sharing itinerary'
      });
    }
  },

  // Update itinerary
  async updateItinerary(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const updateData = req.body;

      // Find and update the itinerary
      const itinerary = await Itinerary.findOneAndUpdate(
        { _id: id, user: userId },
        { ...updateData, updatedAt: new Date() },
        { new: true }
      );

      if (!itinerary) {
        return res.status(404).json({
          success: false,
          message: 'Itinerary not found'
        });
      }

      res.json({
        success: true,
        message: 'Itinerary updated successfully',
        data: itinerary
      });
    } catch (error) {
      console.error('Update itinerary error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating itinerary'
      });
    }
  },

  // Delete itinerary
  async deleteItinerary(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      
      const itinerary = await Itinerary.findOneAndDelete({ _id: id, user: userId });
      
      if (!itinerary) {
        return res.status(404).json({
          success: false,
          message: 'Itinerary not found'
        });
      }

      // Remove from user's itineraries
      await User.findByIdAndUpdate(userId, {
        $pull: { itineraries: id }
      });

      res.json({
        success: true,
        message: 'Itinerary deleted successfully'
      });
    } catch (error) {
      console.error('Delete itinerary error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting itinerary'
      });
    }
  },

  // Search cities for autocomplete
  async searchCities(req, res) {
    try {
      const { query } = req.query;

      if (!query || query.length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Query must be at least 2 characters'
        });
      }

      const cities = await googlePlacesAPI.searchCities(query);

      res.json({
        success: true,
        cities
      });
    } catch (error) {
      console.error('Search cities error:', error);
      res.status(500).json({
        success: false,
        message: 'Error searching cities'
      });
    }
  }
};

module.exports = itineraryController;