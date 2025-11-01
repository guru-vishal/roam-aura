const express = require('express');
const router = express.Router();

// Itineraries data storage
let itineraries = [];

// GET all itineraries for a user
router.get('/', (req, res) => {
  const { userId } = req.query;
  
  let userItineraries = itineraries;
  
  if (userId) {
    userItineraries = itineraries.filter(itinerary => itinerary.userId === userId);
  }
  
  res.json(userItineraries);
});

// GET single itinerary
router.get('/:id', (req, res) => {
  const itinerary = itineraries.find(i => i.id === parseInt(req.params.id));
  
  if (!itinerary) {
    return res.status(404).json({ message: 'Itinerary not found' });
  }
  
  res.json(itinerary);
});

// POST create new itinerary
router.post('/', (req, res) => {
  const {
    userId,
    destination,
    startDate,
    endDate,
    travelers,
    budget,
    interests
  } = req.body;
  
  // Generate activities based on interests and destination
  const activities = generateActivitiesForDestination(destination, interests);
  
  const newItinerary = {
    id: itineraries.length + 1,
    userId: userId || 'guest',
    destination,
    startDate,
    endDate,
    travelers,
    budget,
    interests,
    activities: activities,
    createdAt: new Date(),
    status: 'active'
  };
  
  itineraries.push(newItinerary);
  res.status(201).json(newItinerary);
});

// PUT update itinerary
router.put('/:id', (req, res) => {
  const itineraryIndex = itineraries.findIndex(i => i.id === parseInt(req.params.id));
  
  if (itineraryIndex === -1) {
    return res.status(404).json({ message: 'Itinerary not found' });
  }
  
  itineraries[itineraryIndex] = {
    ...itineraries[itineraryIndex],
    ...req.body,
    updatedAt: new Date()
  };
  
  res.json(itineraries[itineraryIndex]);
});

// DELETE itinerary
router.delete('/:id', (req, res) => {
  const itineraryIndex = itineraries.findIndex(i => i.id === parseInt(req.params.id));
  
  if (itineraryIndex === -1) {
    return res.status(404).json({ message: 'Itinerary not found' });
  }
  
  itineraries.splice(itineraryIndex, 1);
  res.json({ message: 'Itinerary deleted successfully' });
});

// POST add activity to itinerary
router.post('/:id/activities', (req, res) => {
  const itinerary = itineraries.find(i => i.id === parseInt(req.params.id));
  
  if (!itinerary) {
    return res.status(404).json({ message: 'Itinerary not found' });
  }
  
  const newActivity = {
    id: itinerary.activities.length + 1,
    ...req.body
  };
  
  itinerary.activities.push(newActivity);
  res.status(201).json(newActivity);
});

// DELETE activity from itinerary
router.delete('/:id/activities/:activityId', (req, res) => {
  const itinerary = itineraries.find(i => i.id === parseInt(req.params.id));
  
  if (!itinerary) {
    return res.status(404).json({ message: 'Itinerary not found' });
  }
  
  const activityIndex = itinerary.activities.findIndex(
    a => a.id === parseInt(req.params.activityId)
  );
  
  if (activityIndex === -1) {
    return res.status(404).json({ message: 'Activity not found' });
  }
  
  itinerary.activities.splice(activityIndex, 1);
  res.json({ message: 'Activity deleted successfully' });
});

// Helper function to generate activities based on destination and interests
function generateActivitiesForDestination(destination, interests) {
  // Return basic template activities that can be customized
  return [
    {
      id: 1,
      name: 'City Walking Tour',
      time: '10:00 AM',
      duration: '3 hours',
      type: 'Sightseeing',
      cost: '$20',
      description: 'Explore the city\'s main attractions',
      day: 1
    },
    {
      id: 2,
      name: 'Local Food Experience',
      time: '07:00 PM',
      duration: '2 hours',
      type: 'Food',
      cost: '$40',
      description: 'Taste authentic local cuisine',
      day: 1
    }
  ];
}

module.exports = router;