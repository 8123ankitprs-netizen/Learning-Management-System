const express = require('express');
const { uploadThumbnail, uploadLessonVideo, uploadAvatar } = require('../../controllers/uploadController');
const { protect, authorize } = require('../../middlewares/authMiddleware');
const { uploadImage, uploadVideo } = require('../../middlewares/uploadMiddleware');

const router = express.Router();

// Securing media uploads to Instructors and Admins only
router.post('/thumbnail', protect, authorize('instructor', 'admin'), uploadImage.single('image'), uploadThumbnail);
router.post('/video', protect, authorize('instructor', 'admin'), uploadVideo.single('video'), uploadLessonVideo);

// Avatar uploads are available to all authenticated users (students too!)
router.post('/avatar', protect, uploadImage.single('image'), uploadAvatar);

module.exports = router;
