const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// PUT /auth/signup
router.put('/signup', authController.signup);

// POST /auth/login
router.post('/login', authController.login);

module.exports = router;
