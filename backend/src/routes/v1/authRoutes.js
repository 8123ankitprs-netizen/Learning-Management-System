const express = require('express');
const { register, login, getMe, updateMe, requestOtp, verifyOtp } = require('../../controllers/authController');
const { protect } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);

// These routes use the 'protect' middleware.
router.get('/me', protect, getMe);
router.put('/update', protect, updateMe);

module.exports = router;
