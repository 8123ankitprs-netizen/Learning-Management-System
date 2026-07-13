const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a course price'],
    default: 0.0
  },
  category: {
    // Referencing a Category collection is best practice for production LMS
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: 'no-photo.jpg'
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5'],
    default: 1
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  // Virtuals ensure that when we convert the document to JSON, virtual fields are included
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals to get modules for a course
courseSchema.virtual('modules', {
  ref: 'Module',
  localField: '_id',
  foreignField: 'course',
  justOne: false
});

module.exports = mongoose.model('Course', courseSchema);
