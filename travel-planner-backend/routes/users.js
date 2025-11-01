const express = require('express');
const router = express.Router();

// Users data storage
let users = [];

// GET user profile
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
});

// PUT update user profile
router.put('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
    updatedAt: new Date()
  };
  
  res.json(users[userIndex]);
});

// POST create new user
router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body,
    stats: {
      countriesVisited: 0,
      tripsPlanned: 0,
      favoritePlaces: 0,
      photosShared: 0
    },
    trips: [],
    achievements: [
      { name: 'Globe Trotter', description: 'Visited 10+ countries', icon: '🌍', unlocked: false },
      { name: 'Adventure Seeker', description: 'Completed 5 adventure activities', icon: '🏔️', unlocked: false },
      { name: 'Culture Enthusiast', description: 'Visited 20+ museums', icon: '🏛️', unlocked: false },
      { name: 'Foodie Explorer', description: 'Tried 50+ local dishes', icon: '🍜', unlocked: false }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// POST add trip to user
router.post('/:id/trips', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const newTrip = {
    id: user.trips.length + 1,
    ...req.body,
    status: 'Planning'
  };
  
  user.trips.push(newTrip);
  user.stats.tripsPlanned += 1;
  user.updatedAt = new Date();
  
  res.status(201).json(newTrip);
});

// PUT update trip
router.put('/:id/trips/:tripId', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const tripIndex = user.trips.findIndex(t => t.id === parseInt(req.params.tripId));
  
  if (tripIndex === -1) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  
  user.trips[tripIndex] = {
    ...user.trips[tripIndex],
    ...req.body
  };
  
  user.updatedAt = new Date();
  
  res.json(user.trips[tripIndex]);
});

// DELETE trip
router.delete('/:id/trips/:tripId', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const tripIndex = user.trips.findIndex(t => t.id === parseInt(req.params.tripId));
  
  if (tripIndex === -1) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  
  user.trips.splice(tripIndex, 1);
  user.updatedAt = new Date();
  
  res.json({ message: 'Trip deleted successfully' });
});

// GET user stats
router.get('/:id/stats', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user.stats);
});

// GET user achievements
router.get('/:id/achievements', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user.achievements);
});

// POST unlock achievement
router.post('/:id/achievements/:achievementName/unlock', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const achievement = user.achievements.find(a => a.name === req.params.achievementName);
  
  if (!achievement) {
    return res.status(404).json({ message: 'Achievement not found' });
  }
  
  achievement.unlocked = true;
  user.updatedAt = new Date();
  
  res.json(achievement);
});

// DELETE user account
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ 
      success: false,
      message: 'User not found' 
    });
  }
  
  users.splice(userIndex, 1);
  
  res.json({ 
    success: true,
    message: 'Account deleted successfully' 
  });
});

module.exports = router;