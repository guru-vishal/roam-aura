const axios = require('axios');

class GooglePlacesAPI {
  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY;
    this.baseUrl = 'https://maps.googleapis.com/maps/api/place';
  }

  async searchPlaces(destination, interest, type = '') {
    try {
      const query = `${interest} in ${destination}`;
      const url = `${this.baseUrl}/textsearch/json`;
      
      const response = await axios.get(url, {
        params: {
          query: query,
          key: this.apiKey,
          type: type,
          radius: 50000 // 50km radius
        }
      });

      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      return response.data.results.slice(0, 10); // Limit to top 10 results
    } catch (error) {
      console.error('Error fetching places:', error.message);
      throw error;
    }
  }

  async getNearbyPlaces(destination, type, radius = 20000) {
    try {
      // First get the destination coordinates
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
      const geocodeResponse = await axios.get(geocodeUrl, {
        params: {
          address: destination,
          key: this.apiKey
        }
      });

      if (geocodeResponse.data.results.length === 0) {
        throw new Error('Destination not found');
      }

      const location = geocodeResponse.data.results[0].geometry.location;
      
      // Now search for nearby places
      const nearbyUrl = `${this.baseUrl}/nearbysearch/json`;
      const response = await axios.get(nearbyUrl, {
        params: {
          location: `${location.lat},${location.lng}`,
          radius: radius,
          type: type,
          key: this.apiKey
        }
      });

      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      return response.data.results;
    } catch (error) {
      console.error('Error fetching nearby places:', error.message);
      throw error;
    }
  }

  async getPlaceDetails(placeId) {
    try {
      const url = `${this.baseUrl}/details/json`;
      const response = await axios.get(url, {
        params: {
          place_id: placeId,
          fields: 'name,formatted_address,rating,opening_hours,photos,types,price_level',
          key: this.apiKey
        }
      });

      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      return response.data.result;
    } catch (error) {
      console.error('Error fetching place details:', error.message);
      throw error;
    }
  }

  // Helper function to categorize places by time of day
  categorizePlacesByTime(places) {
    const morningTypes = ['museum', 'tourist_attraction', 'park', 'zoo'];
    const afternoonTypes = ['restaurant', 'shopping_mall', 'store', 'amusement_park'];
    const eveningTypes = ['night_club', 'bar', 'movie_theater', 'casino'];

    return places.map(place => {
      let timeOfDay = 'afternoon'; // default

      if (place.types.some(type => morningTypes.includes(type))) {
        timeOfDay = 'morning';
      } else if (place.types.some(type => eveningTypes.includes(type))) {
        timeOfDay = 'evening';
      }

      return {
        ...place,
        timeOfDay
      };
    });
  }

  // Search for cities using Google Places Autocomplete
  async searchCities(query) {
    try {
      const url = `${this.baseUrl}/autocomplete/json`;
      const response = await axios.get(url, {
        params: {
          input: query,
          types: '(cities)',
          key: this.apiKey
        }
      });

      if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      return response.data.predictions.map(prediction => ({
        description: prediction.description,
        placeId: prediction.place_id
      }));
    } catch (error) {
      console.error('Error searching cities:', error.message);
      throw error;
    }
  }
}

module.exports = new GooglePlacesAPI();