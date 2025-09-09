const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Existing routes
router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtpAndSaveUser);
router.post('/social-login', userController.socialLogin);
router.post('/AllUser', userController.addAllUser);

// ✅ New route for profile picture upload
router.post('/upload-profile-pic', upload.single('profilePic'), userController.uploadProfilePic);

module.exports = router;
