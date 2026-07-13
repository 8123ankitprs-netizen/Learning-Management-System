const User = require('../models/User');

/**
 * Service Layer for Authentication
 * Why it exists: As per our production architecture plan, business logic should not live in the controller.
 * The service layer interacts with the database (repository) and returns raw data to the controller.
 */

const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  return user;
};

const loginUser = async (email, password) => {
  // Find user by email and explicitly select the password field (since it is select: false in schema)
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if password matches using our schema method
  const isMatch = await user.matchPassword(password);
  
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUser = async (userId, updateData) => {
  const { name, bio, profileImage, age, gender } = updateData;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  if (name !== undefined) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (profileImage !== undefined) user.profileImage = profileImage;
  if (age !== undefined) user.age = age;
  if (gender !== undefined) user.gender = gender;
  
  await user.save();
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser
};
