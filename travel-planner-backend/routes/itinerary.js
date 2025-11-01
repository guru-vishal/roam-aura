const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const auth = require('../middleware/auth');

// Public routes (no authentication required)
// GET /api/itinerary/share/:shareId - Get shared itinerary (public access)
router.get('/share/:shareId', itineraryController.getSharedItinerary);

// GET /api/itinerary/search/cities - Search cities for autocomplete
router.get('/search/cities', itineraryController.searchCities);

// Protected routes (authentication required)
router.use(auth);

// POST /api/itinerary - Generate new itinerary
router.post('/', itineraryController.generateItinerary);

// GET /api/itinerary - Get user's itineraries
router.get('/', itineraryController.getUserItineraries);

// GET /api/itinerary/:id - Get specific itinerary
router.get('/:id', itineraryController.getItinerary);

// PUT /api/itinerary/:id - Update itinerary
router.put('/:id', itineraryController.updateItinerary);

// DELETE /api/itinerary/:id - Delete itinerary
router.delete('/:id', itineraryController.deleteItinerary);

module.exports = router;