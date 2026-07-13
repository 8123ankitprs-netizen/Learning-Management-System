require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/skillhub');
    const users = await User.find({});
    console.log('--- ALL USERS IN MONGODB ---');
    users.forEach(u => console.log(`- ${u.name} (${u.email}) [Role: ${u.role}]`));
    console.log('Total users:', users.length);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

listUsers();
