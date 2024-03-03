const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Create a new comment on a post or a reply to a comment
exports.createComment = async (req, res) => {
    const { author, content, postId, parentCommentId } = req.body;
    try {
        // If attempting to reply to a comment, first check if the parent comment exists and is not deleted
        if (parentCommentId) {
            const parentComment = await Comment.findById(parentCommentId);
            if (!parentComment) {
                return res.status(404).json({ message: 'Parent comment not found' });
            }
            if (parentComment.deleted) {
                return res.status(400).json({ message: 'Cannot reply to a deleted comment' });
            }
        }
        
        // Proceed with creating the new comment or reply
        let newComment = new Comment({
            author,
            content,
            post: postId,
            parentComment: parentCommentId
        });
        
        await newComment.save();

        // If this is a top-level comment, optionally link it to the post
        if (postId && !parentCommentId) {
            await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
        }

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
};


// Get comments for a post
exports.getCommentsForPost = async (req, res) => {
    const {postId} = req.params;
    try {
        const comments = await Comment.find({post: postId, parentComment: { $exists: false }}).populate('author', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    const {commentId} = req.params;
    const {content} = req.body;
    try {
        // Find the comment to check if it is marked as deleted
        const commentToUpdate = await Comment.findById(commentId);
        if (!commentToUpdate) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Prevent updating a deleted comment
        if (commentToUpdate.deleted) {
            return res.status(400).json({ message: 'Cannot update a deleted comment' });
        }

        // Proceed with the update if the comment is not deleted
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {content}, {new: true});
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error: error.message });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    const {commentId} = req.params;
    try {
        // Find the comment to ensure it exists
        const commentToDelete = await Comment.findById(commentId);
        if (!commentToDelete) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Update the comment instead of deleting it
        // Set the content to '[deleted]' and remove the author and any other relevant fields to reflect the deletion

        await Comment.findByIdAndUpdate(commentId, {content: '[deleted]', deleted: true});

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
};

// Seed a comment
exports.seedComment = async (req, res) => {
    const {commentId} = req.params;
    try {
        // Find the comment to check its status
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Prevent seeding a deleted comment
        if (comment.deleted) {
            return res.status(400).json({ message: 'Cannot seed a deleted comment' });
        }

        // Proceed with the seeding if the comment is not deleted
        comment.seeds += 1; // Increment the seed count
        await comment.save();

        res.status(200).json({ message: 'Comment seeded successfully', seeds: comment.seeds });
    } catch (error) {
        res.status(500).json({ message: 'Error adding seed to comment', error: error.message });
    }
};

module.exports = exports;