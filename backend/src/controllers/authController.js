const authService = require('../services/authService');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

/**
 * Controller: Register User
 * Route: POST /api/v1/auth/register
 * Access: Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, age, gender } = req.body;

    let user;
    if (phone) {
      // Phone-based Registration
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        res.status(400);
        throw new Error('Mobile number already registered');
      }

      // Generate dummy email to satisfy unique index constraint on email
      const dummyEmail = `${phone}@skillcraft.com`;
      const emailExists = await User.findOne({ email: dummyEmail });
      if (emailExists) {
        res.status(400);
        throw new Error('An account with this generated email already exists');
      }

      user = await User.create({
        name,
        email: dummyEmail,
        phone,
        age: age ? Number(age) : null,
        gender: gender || null,
        password: 'defaultPassword123',
        role: 'student'
      });
    } else {
      // Standard Email-based Registration
      user = await authService.registerUser(req.body);
    }

    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(400); // Bad request
    next(error); // Pass to centralized error handler
  }
};

/**
 * Controller: Login User
 * Route: POST /api/v1/auth/login
 * Access: Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    const user = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(401); // Unauthorized
    next(error);
  }
};

/**
 * Controller: Get Current Logged In User
 * Route: GET /api/v1/auth/me
 * Access: Private (Requires token)
 */
const getMe = async (req, res, next) => {
  try {
    // req.user is set by the authMiddleware
    const user = await authService.getUserById(req.user._id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(404);
    next(error);
  }
};

/**
 * Controller: Update Current Logged In User Profile
 * Route: PUT /api/v1/auth/update
 * Access: Private (Requires token)
 */
const updateMe = async (req, res, next) => {
  try {
    const { name, bio, profileImage, age, gender } = req.body;
    const updatedUser = await authService.updateUser(req.user._id, { name, bio, profileImage, age, gender });
    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Controller: Request OTP
 * Route: POST /api/v1/auth/request-otp
 * Access: Public
 */
const requestOtp = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    if (!email && !phone) {
      res.status(400);
      throw new Error('Please provide an email or phone number');
    }

    // Check if user is trying to log in as admin via OTP
    if (email === 'admin@skillcraft.com' || phone === 'admin@skillcraft.com') {
      res.status(400);
      throw new Error('Admin must login using password');
    }

    let query = {};
    if (email) query.email = email;
    if (phone) query.phone = phone;

    let user = await User.findOne(query);
    if (!user) {
      if (phone) {
        res.status(404);
        throw new Error('Mobile number not registered. Please sign up first.');
      } else {
        // Auto-create student if not registered yet (only via email)
        const defaultName = email.split('@')[0];
        user = await User.create({
          name: defaultName,
          email,
          password: 'defaultPassword123',
          role: 'student'
        });
      }
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    await user.save();

    console.log(`✉️ OTP for ${email || phone}: ${otp}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp // Return it directly in dev mode response for easy login simulation
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: Verify OTP & Login
 * Route: POST /api/v1/auth/verify-otp
 * Access: Public
 */
const verifyOtp = async (req, res, next) => {
  try {
    const { email, phone, otp } = req.body;
    if ((!email && !phone) || !otp) {
      res.status(400);
      throw new Error('Please provide email/phone and OTP');
    }

    let query = {};
    if (email) query.email = email;
    if (phone) query.phone = phone;

    const user = await User.findOne(query).select('+password');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      res.status(400);
      throw new Error('Invalid or expired OTP');
    }

    // Clear OTP fields
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateMe,
  requestOtp,
  verifyOtp
};
