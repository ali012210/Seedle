const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    // Additional plant details
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;