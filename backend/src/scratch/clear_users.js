require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Progress = require('../models/Progress');

const clearData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/skillhub');
    
    // Delete all students and admins
    const userRes = await User.deleteMany({ role: { $in: ['student', 'admin'] } });
    console.log(`Deleted ${userRes.deletedCount} users (students & admins)`);

    // Delete all enrollments and progress
    const enrollRes = await Enrollment.deleteMany({});
    console.log(`Deleted ${enrollRes.deletedCount} enrollments`);

    const progRes = await Progress.deleteMany({});
    console.log(`Deleted ${progRes.deletedCount} progress records`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

clearData();
