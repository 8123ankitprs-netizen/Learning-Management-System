const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  age: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', null],
    default: null,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false, // Prevents password from being returned in queries by default
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student',
  },
  profileImage: {
    type: String,
    default: 'default.jpg',
  },
  bio: {
    type: String,
    default: '',
    trim: true,
  },
  // Soft delete flag for maintaining data integrity
  isActive: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpires: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Encrypt password using bcrypt before saving to DB
userSchema.pre('save', async function() {
  // Only hash the password if it was actually modified (or is new)
  if (!this.isModified('password')) {
    return;
  }

  // Generate a salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
