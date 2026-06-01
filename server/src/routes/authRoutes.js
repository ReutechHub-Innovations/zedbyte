const express = require('express');
const { register, login, logout, getMe } = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validators');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);

module.exports = router;
