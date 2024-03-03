const Tag = require('../models/Tag');

// Fetch all tags
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find({});
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tags', error: error.message });
    }
};

// Fetch a tag by id
exports.getTagById = async (req, res) => {
    const {tagId} = req.params;
    try {
        const tag = await Tag.findById(tagId);
        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tag', error: error.message });
    }
};