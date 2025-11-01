import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ItineraryService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
    });

    // Add token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async generateItinerary(itineraryData) {
    try {
      const response = await this.api.post('/itinerary', itineraryData);
      return { success: true, data: response.data.itinerary };
    } catch (error) {
      console.error('❌ Generate itinerary error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to generate itinerary'
      };
    }
  }

  async getUserItineraries() {
    try {
      const response = await this.api.get('/itinerary');
      return { success: true, data: response.data.itineraries };
    } catch (error) {
      console.error('❌ Get itineraries error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch itineraries'
      };
    }
  }

  async getItinerary(id) {
    try {
      const response = await this.api.get(`/itinerary/${id}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch itinerary'
      };
    }
  }

  async updateItinerary(id, updateData) {
    try {
      const response = await this.api.put(`/itinerary/${id}`, updateData);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update itinerary'
      };
    }
  }

  async deleteItinerary(id) {
    try {
      await this.api.delete(`/itinerary/${id}`);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete itinerary'
      };
    }
  }

  async getSharedItinerary(shareId) {
    try {
      const response = await this.api.get(`/itinerary/share/${shareId}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch shared itinerary'
      };
    }
  }

  async searchCities(query) {
    try {
      const response = await this.api.get('/itinerary/search/cities', {
        params: { query }
      });
      return { success: true, cities: response.data.cities };
    } catch (error) {
      console.error('❌ City search error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to search cities'
      };
    }
  }
}

export default new ItineraryService();
