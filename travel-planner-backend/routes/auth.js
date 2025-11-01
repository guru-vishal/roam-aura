const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// POST /api/auth/register - Register new user
router.post('/register', authController.register);

// POST /api/auth/login - Login user
router.post('/login', authController.login);

// GET /api/auth/profile - Get user profile (protected)
router.get('/profile', auth, authController.getProfile);

// PUT /api/auth/profile - Update user profile (protected)
router.put('/profile', auth, authController.updateProfile);

// DELETE /api/auth/account - Delete user account (protected)
router.delete('/account', auth, authController.deleteAccount);

module.exports = router;