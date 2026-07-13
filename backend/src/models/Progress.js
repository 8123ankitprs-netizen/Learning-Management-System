const mongoose = require('mongoose');

/**
 * We separate Progress from Enrollment to allow granular tracking of each lesson.
 * This prevents the Enrollment document from growing infinitely large as courses expand.
 */
const progressSchema = new mongoose.Schema({
  enrollment: {
    type: mongoose.Schema.ObjectId,
    ref: 'Enrollment',
    required: true
  },
  lesson: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lesson',
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  watchedDurationInSeconds: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// A student can only have one progress record per lesson in a specific enrollment
progressSchema.index({ enrollment: 1, lesson: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
