const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const { register, getAll, login, getProfile, logout, verificationEmail } = require('../controllers/authController')

router.post('/register', register);
router.get('/users', getAll);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.delete('/logout', authMiddleware, logout);
router.post('/verify-email', verificationEmail);

module.exports = router;

