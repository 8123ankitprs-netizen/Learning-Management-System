const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');
const Category = require('../models/Category');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');
const Progress = require('../models/Progress');

dotenv.config({ path: './.env' });

const clearDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/skillcraft');
    console.log('Connected to MongoDB.');

    await Course.deleteMany({});
    await Category.deleteMany({});
    await Module.deleteMany({});
    await Lesson.deleteMany({});
    await Enrollment.deleteMany({});
    await Progress.deleteMany({});
    console.log('Successfully cleared all course related collections.');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

clearDb();
