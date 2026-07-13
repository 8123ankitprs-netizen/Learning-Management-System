const courseService = require('../services/courseService');

/**
 * Controller: Create Course
 * Route: POST /api/v1/courses
 * Access: Private/Instructor/Admin
 */
const createCourse = async (req, res, next) => {
  try {
    const course = await courseService.createCourse(req.body, req.user._id);
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Controller: Get All Courses
 * Route: GET /api/v1/courses
 * Access: Public
 */
const getCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getCourses(req.query);
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

/**
 * Controller: Get Single Course by ID
 * Route: GET /api/v1/courses/:id
 * Access: Public
 */
const getCourse = async (req, res, next) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(404);
    next(error);
  }
};

/**
 * Controller: Update Course
 * Route: PUT /api/v1/courses/:id
 * Access: Private/Instructor/Admin
 */
const updateCourse = async (req, res, next) => {
  try {
    const course = await courseService.updateCourse(
      req.params.id, 
      req.body, 
      req.user._id, 
      req.user.role
    );
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Controller: Delete Course
 * Route: DELETE /api/v1/courses/:id
 * Access: Private/Instructor/Admin
 */
const deleteCourse = async (req, res, next) => {
  try {
    await courseService.deleteCourse(req.params.id, req.user._id, req.user.role);
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Controller: Create Module
 * Route: POST /api/v1/courses/modules
 * Access: Private/Instructor/Admin
 */
const createModule = async (req, res, next) => {
  try {
    const module = await courseService.createModule(req.body, req.user._id, req.user.role);
    res.status(201).json({
      success: true,
      data: module
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Controller: Create Lesson
 * Route: POST /api/v1/courses/lessons
 * Access: Private/Instructor/Admin
 */
const createLesson = async (req, res, next) => {
  try {
    const lesson = await courseService.createLesson(req.body, req.user._id, req.user.role);
    res.status(201).json({
      success: true,
      data: lesson
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  createModule,
  createLesson
};
