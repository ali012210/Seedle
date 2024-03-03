const Post = require('../models/Post');

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username').populate('tags');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

// Get a post by id
exports.getPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate('author', 'username').populate('tags');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
};

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { author, title, content, images, tags } = req.body;
        const newPost = new Post({author, title, content, images, tags});
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { title, content, images, tags } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(postId, { title, content, images, tags }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};