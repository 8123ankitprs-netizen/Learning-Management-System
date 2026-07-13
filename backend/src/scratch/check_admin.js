require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/skillhub');
    const admin = await User.findOne({ email: 'admin@skillcraft.com' });
    console.log('Admin user in DB:', admin);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkAdmin();
