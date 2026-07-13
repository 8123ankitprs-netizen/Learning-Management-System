const express = require('express');
const { 
  createCourse, 
  getCourses, 
  getCourse, 
  updateCourse, 
  deleteCourse,
  createModule,
  createLesson
} = require('../../controllers/courseController');
const { protect, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

// Public Explore & Course View
router.route('/')
  .get(getCourses)
  .post(protect, authorize('instructor', 'admin'), createCourse);

router.route('/:id')
  .get(getCourse)
  .put(protect, authorize('instructor', 'admin'), updateCourse)
  .delete(protect, authorize('instructor', 'admin'), deleteCourse);

// Course structure builder endpoints
router.post('/modules', protect, authorize('instructor', 'admin'), createModule);
router.post('/lessons', protect, authorize('instructor', 'admin'), createLesson);

module.exports = router;
