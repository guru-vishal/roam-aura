const axios = require('axios');

class WeatherAPI {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getForecast(city, days = 5) {
    try {
      const url = `${this.baseUrl}/forecast`;
      const response = await axios.get(url, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
          cnt: days * 8 // 8 forecasts per day (3-hour intervals)
        }
      });

      if (response.data.cod !== '200') {
        throw new Error(`Weather API error: ${response.data.message}`);
      }

      // Group forecasts by date
      const forecastsByDate = this.groupForecastsByDate(response.data.list);
      
      return forecastsByDate;
    } catch (error) {
      console.error('Error fetching weather forecast:', error.message);
      throw error;
    }
  }

  groupForecastsByDate(forecasts) {
    const grouped = {};

    forecasts.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toDateString();
      
      if (!grouped[date]) {
        grouped[date] = {
          date: new Date(forecast.dt * 1000),
          forecasts: []
        };
      }
      
      grouped[date].forecasts.push({
        time: new Date(forecast.dt * 1000),
        temperature: Math.round(forecast.main.temp),
        condition: forecast.weather[0].main,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
        humidity: forecast.main.humidity,
        windSpeed: forecast.wind.speed,
        precipitation: forecast.rain ? forecast.rain['3h'] || 0 : 0
      });
    });

    // Convert to array and get daily summary
    return Object.values(grouped).map(day => {
      const dayForecasts = day.forecasts;
      const avgTemp = Math.round(dayForecasts.reduce((sum, f) => sum + f.temperature, 0) / dayForecasts.length);
      const maxTemp = Math.max(...dayForecasts.map(f => f.temperature));
      const minTemp = Math.min(...dayForecasts.map(f => f.temperature));
      
      // Get the most common weather condition
      const conditions = dayForecasts.map(f => f.condition);
      const mostCommonCondition = conditions.sort((a, b) =>
        conditions.filter(v => v === a).length - conditions.filter(v => v === b).length
      ).pop();

      // Get midday forecast for icon
      const middayForecast = dayForecasts.find(f => {
        const hour = f.time.getHours();
        return hour >= 11 && hour <= 14;
      }) || dayForecasts[Math.floor(dayForecasts.length / 2)];

      return {
        date: day.date,
        temperature: avgTemp,
        maxTemp,
        minTemp,
        condition: mostCommonCondition,
        description: middayForecast.description,
        icon: middayForecast.icon,
        isRainy: dayForecasts.some(f => f.precipitation > 0),
        precipitationChance: Math.round((dayForecasts.filter(f => f.precipitation > 0).length / dayForecasts.length) * 100)
      };
    });
  }

  // Helper function to determine if weather is suitable for outdoor activities
  isGoodWeatherForOutdoor(weatherData) {
    const badConditions = ['Rain', 'Thunderstorm', 'Snow', 'Extreme'];
    return !badConditions.includes(weatherData.condition) && weatherData.temperature > 10;
  }

  // Helper function to suggest activities based on weather
  suggestActivitiesByWeather(weatherData) {
    if (weatherData.isRainy) {
      return ['museum', 'shopping_mall', 'restaurant', 'movie_theater', 'art_gallery'];
    }
    
    if (weatherData.temperature > 25) {
      return ['park', 'beach', 'outdoor_activity', 'tourist_attraction', 'zoo'];
    }
    
    if (weatherData.temperature < 10) {
      return ['museum', 'restaurant', 'shopping_mall', 'cafe', 'indoor_activity'];
    }
    
    // Moderate weather
    return ['tourist_attraction', 'park', 'restaurant', 'museum', 'shopping_mall'];
  }
}

module.exports = new WeatherAPI();