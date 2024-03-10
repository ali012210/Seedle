const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;