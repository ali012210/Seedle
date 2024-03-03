const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route to create a new comment or reply to a comment
router.post('/', commentController.createComment);

// Route to get all top-level comments for a post
router.get('/post/:postId', commentController.getCommentsForPost);

// Route to update a specific comment
router.put('/:commentId', commentController.updateComment);

// Route to "delete" (mark as deleted) a specific comment
router.delete('/:commentId', commentController.deleteComment);

// Route to seed (like) a specific comment
router.post('/:commentId/seed', commentController.seedComment);

module.exports = router;