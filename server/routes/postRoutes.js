const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const isAuthenticated = require('../middleware/isAuthenticated');


// Get all posts
router.get('/', postController.getAllPosts);

// Get a single post by id
router.get('/:postId', postController.getPost);

// Create a new post
router.post('/', isAuthenticated, postController.createPost);

// Update a post
router.put('/:postId', isAuthenticated, postController.updatePost);

// Delete a post
router.delete('/:postId', isAuthenticated, postController.deletePost);

module.exports = router;
