const express = require('express');
const { 
  enroll, 
  getMyEnrollments, 
  updateProgress, 
  getProgress,
  cancel
} = require('../../controllers/enrollmentController');
const { protect, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

// Securing routes to only authenticated students (and admin if needed)
router.route('/')
  .get(protect, authorize('student', 'admin'), getMyEnrollments)
  .post(protect, authorize('student'), enroll);

router.route('/:id')
  .delete(protect, authorize('student'), cancel);

router.route('/progress')
  .put(protect, authorize('student'), updateProgress);

router.route('/:id/progress')
  .get(protect, authorize('student'), getProgress);

module.exports = router;
