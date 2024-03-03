const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// Route to get all tags
router.get('/', tagController.getAllTags);

// Route to get a specific tag by ID
router.get('/:tagId', tagController.getTagById);

module.exports = router;