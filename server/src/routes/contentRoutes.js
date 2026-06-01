const express = require('express');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/contentController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Route to create a new post
router.post('/', authenticate, createPost);

// Route to get all posts
router.get('/', getPosts);

// Route to update a post
router.put('/:id', authenticate, updatePost);

// Route to delete a post
router.delete('/:id', authenticate, deletePost);

module.exports = router;