const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Admin routes
router.get('/users', verifyAdmin, getUsers);
router.post('/users', verifyAdmin, createUser);
router.put('/users/:id', verifyAdmin, updateUser);
router.delete('/users/:id', verifyAdmin, deleteUser);

module.exports = router;