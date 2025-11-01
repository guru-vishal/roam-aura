const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  budget: {
    type: String,
    default: 'Moderate'
  },
  travelers: {
    type: Number,
    default: 1
  },
  interests: [{
    type: String,
    required: true
  }],
  days: [{
    day: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    weather: {
      condition: String,
      temp: Number,
      description: String,
      icon: String
    },
    places: [{
      name: String,
      address: String,
      placeId: String,
      rating: Number,
      types: [String],
      photoReference: String,
      timeOfDay: String // morning, afternoon, evening
    }]
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Itinerary', itinerarySchema);