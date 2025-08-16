const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtpAndSaveUser);
router.post('/social-login', userController.socialLogin);

// Use the new function name here
// Corrected route
router.post('/AllUser', userController.addAllUser);

module.exports = router;
