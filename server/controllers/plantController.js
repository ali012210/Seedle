const e = require('cors');
const Plant = require('../models/Plant');

// Fetch all plants
exports.getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.find({});
        res.status(200).json(plants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plants', error: error.message });
    }
};

// Fetch a plant by id
exports.getPlantById = async (req, res) => {
    const {plantId} = req.params;
    try {
        const plant = await Plant.findById(plantId);
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.status(200).json(plant);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plant', error: error.message });
    }
};