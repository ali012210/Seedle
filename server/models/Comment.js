const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: false
    }, //Only for top-level comments

    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false }, // For threading comments

    content: { type: String, required: true },

    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

    deleted: { type: Boolean, default: false },

    seeds: { type: Number, default: 0 }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
