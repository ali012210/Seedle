const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/userController');

// Routes

// Get a single profile
router.get('/:userId', userController.getUserProfile);

// Create a new user (signup)
router.post('signup', userController.createUser);

// Update a user profile
router.put('/:userId, userController.updateUserProfile');

// Delete a user
router.delete('/:userId', userController.deleteUser);

module.exports = router;