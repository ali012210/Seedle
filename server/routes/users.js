const express = require('express');
const router = express.Router();

//Controllers
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Get a single user by id
router.get('/:id', getUserById);

// Create a new user
router.post('/', createUser);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;