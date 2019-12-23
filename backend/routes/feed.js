const express = require('express');

const feedController = require('../controllers/feed');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post('/post', isAuth, feedController.createPost);

// GET /feed/post
router.get('/post/:id', feedController.getPost);

// POST /feed/edit-post/:id
router.post('/edit-post/:id', isAuth, feedController.updatePost);

// DELETE /feed/delete-post
router.delete('/delete-post', isAuth, feedController.deletePost);

module.exports = router;
