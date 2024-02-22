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
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
