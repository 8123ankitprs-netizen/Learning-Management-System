const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');
const Progress = require('./models/Progress');

const MONGO_URI = 'mongodb://localhost:27017/skillhub';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const user = await User.findOne({ email: '8123ankitprs@gmail.com' });
  if (!user) {
    console.log('User not found');
    process.exit(0);
  }
  console.log(`User found: ${user.name} (${user._id})`);

  const enrollments = await Enrollment.find({ student: user._id }).populate('course');
  console.log(`Total Enrollments: ${enrollments.length}`);

  for (const e of enrollments) {
    const completedCount = await Progress.countDocuments({ enrollment: e._id, isCompleted: true });
    console.log(`- Course ID: ${e.course?._id || 'null'}, Title: ${e.course?.title || 'Deleted Course'}, Completed Lessons: ${completedCount}, isCompleted: ${e.isCompleted}`);
  }

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
