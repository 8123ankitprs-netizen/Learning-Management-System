const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Course = require('../../models/Course');
const Module = require('../../models/Module');
const Lesson = require('../../models/Lesson');
const Enrollment = require('../../models/Enrollment');
const { protect, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

// Apply protect & authorize('admin') to all routes in this router
router.use(protect);
router.use(authorize('admin'));

// @desc    Get admin dashboard stats
// @route   GET /api/v1/admin/stats
// @access  Private/Admin
router.get('/stats', async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({});
    const activeCourses = await Course.countDocuments({});
    const totalEnrollments = await Enrollment.countDocuments({});
    
    // Calculate total revenue from all student enrollments
    const enrollments = await Enrollment.find({}).populate('course');
    const revenue = enrollments.reduce((sum, e) => {
      if (e.course && typeof e.course.price === 'number') {
        return sum + e.course.price;
      }
      return sum;
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        activeCourses,
        totalEnrollments,
        revenue
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all users list
// @route   GET /api/v1/admin/users
// @access  Private/Admin
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Toggle user active status
// @route   PUT /api/v1/admin/users/:id/toggle-active
// @access  Private/Admin
router.put('/users/:id/toggle-active', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    // Prevent admin from deactivating themselves
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('You cannot deactivate your own admin account');
    }
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Change user system role
// @route   PUT /api/v1/admin/users/:id/role
// @access  Private/Admin
router.put('/users/:id/role', async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['student', 'instructor', 'admin'].includes(role)) {
      res.status(400);
      throw new Error('Invalid role specified');
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('You cannot change your own admin role');
    }
    user.role = role;
    await user.save();
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all courses with details
// @route   GET /api/v1/admin/courses
// @access  Private/Admin
router.get('/courses', async (req, res, next) => {
  try {
    const courses = await Course.find({})
      .populate('category', 'name')
      .populate('instructor', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Toggle course published status
// @route   PUT /api/v1/admin/courses/:id/toggle-publish
// @access  Private/Admin
router.put('/courses/:id/toggle-publish', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }
    course.isPublished = !course.isPublished;
    await course.save();
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a course and all its modules/lessons
// @route   DELETE /api/v1/admin/courses/:id
// @access  Private/Admin
router.delete('/courses/:id', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }
    // Delete associated modules and lessons
    await Module.deleteMany({ course: course._id });
    await course.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Course and associated components deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get system telemetry details
// @route   GET /api/v1/admin/telemetry
// @access  Private/Admin
router.get('/telemetry', async (req, res, next) => {
  try {
    const os = require('os');
    const collections = {
      users: await User.countDocuments({}),
      courses: await Course.countDocuments({}),
      modules: await Module.countDocuments({}),
      lessons: await Lesson.countDocuments({}),
      enrollments: await Enrollment.countDocuments({})
    };
    
    const telemetry = {
      platform: os.platform(),
      architecture: os.arch(),
      cpuCount: os.cpus().length,
      freeMem: Math.round(os.freemem() / (1024 * 1024)) + ' MB',
      totalMem: Math.round(os.totalmem() / (1024 * 1024)) + ' MB',
      nodeVersion: process.version,
      uptime: Math.round(process.uptime()) + ' seconds',
      memoryUsage: process.memoryUsage(),
      dbState: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      collections
    };

    res.status(200).json({
      success: true,
      data: telemetry
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
