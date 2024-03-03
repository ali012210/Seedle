const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

// Route to get all plants
router.get('/', plantController.getAllPlants);

// Route to get a specific plant
router.get('/:plantId', plantController.getPlantById);

module.exports = router;