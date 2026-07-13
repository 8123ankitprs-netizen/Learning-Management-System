const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a lesson title'],
    trim: true,
  },
  module: {
    type: mongoose.Schema.ObjectId,
    ref: 'Module',
    required: true
  },
  videoUrl: {
    type: String,
    required: [true, 'Please provide a video URL']
  },
  durationInSeconds: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    required: true
  },
  isFreePreview: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lesson', lessonSchema);
