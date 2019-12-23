const express = require('express');

const commentController = require('../controllers/comment');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

// GET /comments
router.get('/comments', commentController.getComments);

// POST /comment
router.post('/comment', isAuth, commentController.createComment);

// POST /edit-comment
router.post('/edit-comment', isAuth, commentController.updateComment);

// DELETE /delete-comment
router.delete('/delete-comment', isAuth, commentController.deleteComment);


module.exports = router;
