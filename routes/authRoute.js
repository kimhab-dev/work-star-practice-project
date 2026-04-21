const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const { register, getAll, login, getProfile } = require('../controllers/authController')

router.post('/register', register);
router.get('/users', getAll);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile)

module.exports = router;

