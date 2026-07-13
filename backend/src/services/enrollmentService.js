const Enrollment = require('../models/Enrollment');
const Progress = require('../models/Progress');
const Course = require('../models/Course');

/**
 * Service Layer for Student Enrollments and Course Progress tracking.
 */

const enrollInCourse = async (studentId, courseId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  // Check if student is already enrolled
  const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
  if (existingEnrollment) {
    throw new Error('Already enrolled in this course');
  }

  // Create enrollment mapping (pricePaid matches course price at checkout)
  return await Enrollment.create({
    student: studentId,
    course: courseId,
    pricePaid: course.price
  });
};

const getStudentEnrollments = async (studentId) => {
  const enrollments = await Enrollment.find({ student: studentId })
    .populate({
      path: 'course',
      select: 'title thumbnailUrl price instructor',
      populate: [
        {
          path: 'instructor',
          select: 'name'
        },
        {
          path: 'modules',
          populate: {
            path: 'lessons',
            select: '_id'
          }
        }
      ]
    });

  // Calculate dynamic progress for each enrollment
  const enrollmentsWithProgress = await Promise.all(
    enrollments.map(async (enrollment) => {
      const course = enrollment.course;
      if (!course) return enrollment;

      // Count total lessons in course
      let totalLessons = 0;
      if (course.modules) {
        course.modules.forEach(mod => {
          if (mod.lessons) {
            totalLessons += mod.lessons.length;
          }
        });
      }

      // Count completed lessons for this enrollment
      const completedCount = await Progress.countDocuments({
        enrollment: enrollment._id,
        isCompleted: true
      });

      const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      // Convert Mongoose doc to plain JSON object to attach progressPercent
      const enrollmentObj = enrollment.toJSON();
      enrollmentObj.progressPercent = progressPercent;

      // Auto-update enrollment status to completed if 100%
      if (progressPercent === 100 && !enrollment.isCompleted) {
        enrollment.isCompleted = true;
        await enrollment.save();
        enrollmentObj.isCompleted = true;
      } else if (progressPercent < 100 && enrollment.isCompleted) {
        enrollment.isCompleted = false;
        await enrollment.save();
        enrollmentObj.isCompleted = false;
      }

      return enrollmentObj;
    })
  );

  return enrollmentsWithProgress;
};

const updateLessonProgress = async (studentId, progressData) => {
  const { enrollmentId, lessonId, isCompleted, watchedDuration } = progressData;

  const enrollment = await Enrollment.findOne({ _id: enrollmentId, student: studentId });
  if (!enrollment) {
    throw new Error('Enrollment record not found for this student');
  }

  // Upsert progress object: create if not exists, update watched state if does
  const progress = await Progress.findOneAndUpdate(
    { enrollment: enrollmentId, lesson: lessonId },
    { isCompleted, watchedDurationInSeconds: watchedDuration },
    { new: true, upsert: true, runValidators: true }
  );

  return progress;
};

const getCourseProgress = async (studentId, enrollmentId) => {
  const enrollment = await Enrollment.findOne({ _id: enrollmentId, student: studentId });
  if (!enrollment) {
    throw new Error('Enrollment not found');
  }

  // Fetch all completed lessons for this enrollment
  const completedLessons = await Progress.find({ enrollment: enrollmentId, isCompleted: true });

  return {
    enrollmentId,
    completedLessons: completedLessons.map(p => p.lesson)
  };
};

const cancelEnrollment = async (studentId, enrollmentId) => {
  const enrollment = await Enrollment.findOne({ _id: enrollmentId, student: studentId });
  if (!enrollment) {
    throw new Error('Enrollment record not found');
  }

  // Delete enrollment record
  await Enrollment.deleteOne({ _id: enrollmentId });

  // Delete progress records linked to this enrollment
  await Progress.deleteMany({ enrollment: enrollmentId });

  return { success: true };
};

module.exports = {
  enrollInCourse,
  getStudentEnrollments,
  updateLessonProgress,
  getCourseProgress,
  cancelEnrollment
};
