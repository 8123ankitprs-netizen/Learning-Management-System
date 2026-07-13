const enrollmentService = require('../services/enrollmentService');

/**
 * Controller: Enroll in Course
 * Route: POST /api/v1/enrollments
 * Access: Private (Student-only)
 */
const enroll = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const enrollment = await enrollmentService.enrollInCourse(req.user._id, courseId);
    res.status(201).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Controller: Get Enrolled Courses
 * Route: GET /api/v1/enrollments
 * Access: Private (Student-only)
 */
const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await enrollmentService.getStudentEnrollments(req.user._id);
    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

/**
 * Controller: Update Lesson Watch Progress
 * Route: PUT /api/v1/enrollments/progress
 * Access: Private (Student-only)
 */
const updateProgress = async (req, res, next) => {
  try {
    const progress = await enrollmentService.updateLessonProgress(req.user._id, req.body);
    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Controller: Get Course Progress details
 * Route: GET /api/v1/enrollments/:id/progress
 * Access: Private (Student-only)
 */
const getProgress = async (req, res, next) => {
  try {
    const progressDetails = await enrollmentService.getCourseProgress(req.user._id, req.params.id);
    res.status(200).json({
      success: true,
      data: progressDetails
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Controller: Cancel Enrollment
 * Route: DELETE /api/v1/enrollments/:id
 * Access: Private (Student-only)
 */
const cancel = async (req, res, next) => {
  try {
    const result = await enrollmentService.cancelEnrollment(req.user._id, req.params.id);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

module.exports = {
  enroll,
  getMyEnrollments,
  updateProgress,
  getProgress,
  cancel
};
