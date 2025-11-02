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
      
      let allResults = [];
      let pageToken = null;
      
      // Fetch multiple pages of results (up to 3 pages = 60 results)
      for (let page = 0; page < 3; page++) {
        const params = {
          query: query,
          key: this.apiKey,
          type: type,
          radius: 50000 // 50km radius
        };
        
        if (pageToken) {
          params.pagetoken = pageToken;
        }
        
        const response = await axios.get(url, { params });

        if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
          if (page === 0) {
            throw new Error(`Google Places API error: ${response.data.status}`);
          }
          break; // Stop if no more results
        }

        allResults.push(...response.data.results);
        
        // Check if there's a next page
        if (!response.data.next_page_token) {
          break;
        }
        
        pageToken = response.data.next_page_token;
        
        // Wait for next page token to become valid (required by Google API)
        if (page < 2) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      return allResults.slice(0, 40); // Return up to 40 results per interest
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
    const morningTypes = ['museum', 'tourist_attraction', 'park', 'zoo', 'aquarium', 'art_gallery', 'historical'];
    const afternoonTypes = ['shopping_mall', 'store', 'amusement_park', 'spa', 'cafe', 'restaurant'];
    const eveningTypes = ['night_club', 'bar', 'movie_theater', 'casino', 'bowling_alley', 'entertainment'];

    return places.map((place, index) => {
      let timeOfDay = 'afternoon'; // default

      if (place.types.some(type => morningTypes.includes(type))) {
        timeOfDay = 'morning';
      } else if (place.types.some(type => eveningTypes.includes(type))) {
        timeOfDay = 'evening';
      }
      
      // If still not categorized, distribute evenly
      if (timeOfDay === 'afternoon' && !place.types.some(type => afternoonTypes.includes(type))) {
        const mod = index % 3;
        if (mod === 0) timeOfDay = 'morning';
        else if (mod === 1) timeOfDay = 'afternoon';
        else timeOfDay = 'evening';
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