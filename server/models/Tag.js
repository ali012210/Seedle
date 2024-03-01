const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isPlant: {
        // Distinction between plant and non-plant tags
        type: Boolean,
        default: false
    }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;