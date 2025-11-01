const express = require('express');
const router = express.Router();

// Destinations data storage
let destinations = [];

// GET all destinations
router.get('/', (req, res) => {
  const { category, search } = req.query;
  
  let filteredDestinations = destinations;
  
  if (category && category !== 'all') {
    filteredDestinations = filteredDestinations.filter(
      dest => dest.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (search) {
    filteredDestinations = filteredDestinations.filter(
      dest => 
        dest.name.toLowerCase().includes(search.toLowerCase()) ||
        dest.country.toLowerCase().includes(search.toLowerCase()) ||
        dest.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json(filteredDestinations);
});

// GET single destination
router.get('/:id', (req, res) => {
  const destination = destinations.find(d => d.id === parseInt(req.params.id));
  
  if (!destination) {
    return res.status(404).json({ message: 'Destination not found' });
  }
  
  res.json(destination);
});

// POST create new destination
router.post('/', (req, res) => {
  const newDestination = {
    id: destinations.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  
  destinations.push(newDestination);
  res.status(201).json(newDestination);
});

// PUT update destination
router.put('/:id', (req, res) => {
  const destinationIndex = destinations.findIndex(d => d.id === parseInt(req.params.id));
  
  if (destinationIndex === -1) {
    return res.status(404).json({ message: 'Destination not found' });
  }
  
  destinations[destinationIndex] = {
    ...destinations[destinationIndex],
    ...req.body,
    updatedAt: new Date()
  };
  
  res.json(destinations[destinationIndex]);
});

// DELETE destination
router.delete('/:id', (req, res) => {
  const destinationIndex = destinations.findIndex(d => d.id === parseInt(req.params.id));
  
  if (destinationIndex === -1) {
    return res.status(404).json({ message: 'Destination not found' });
  }
  
  destinations.splice(destinationIndex, 1);
  res.json({ message: 'Destination deleted successfully' });
});

// GET recommendations based on preferences
router.post('/recommendations', (req, res) => {
  const { interests, budget, duration } = req.body;
  
  if (destinations.length === 0) {
    return res.json([]);
  }
  
  // Simple recommendation logic based on interests and budget
  let recommendations = destinations.filter(dest => {
    if (budget === 'budget' && dest.averageCost && dest.averageCost.includes('200-400')) {
      return false;
    }
    if (budget === 'luxury' && dest.averageCost && dest.averageCost.includes('50-150')) {
      return false;
    }
    return true;
  });
  
  // Sort by rating
  recommendations.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  
  // Return top 3 recommendations
  res.json(recommendations.slice(0, 3));
});

module.exports = router;