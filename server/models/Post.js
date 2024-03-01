const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        // URL to an (optional) image associated with the post
        type: String,
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    seeds: {
        type: Number,
        default: 0
    } // Equivalent to likes in a social media context
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;