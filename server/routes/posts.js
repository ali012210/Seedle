const express = require('express');
const router = express.Router();

// Importing the post controller
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController');

// Routes

// Get all posts
router.get('/', getAllPosts);

// Get a single post by id
router.get('/:id', getPostById);

// Create a new post
router.post('/', createPost);

// Update a post
router.put('/:id', updatePost);

// Delete a post
router.delete('/:id', deletePost);

module.exports = router;
