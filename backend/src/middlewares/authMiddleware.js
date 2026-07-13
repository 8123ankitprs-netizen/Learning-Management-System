const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes.
 * Checks for a Bearer token in the authorization header.
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (Bearer <token>)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'supersecretkey')) {
        throw new Error('FATAL SECURITY ERROR: JWT_SECRET must be configured as a strong custom secret in production environment settings.');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');

      // Get user from the token payload (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};

/**
 * Middleware to authorize specific roles.
 * Must be used AFTER the `protect` middleware.
 * Usage: router.route('/').post(protect, authorize('admin', 'instructor'), createCourse)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403); // Forbidden
      return next(new Error(`User role '${req.user.role}' is not authorized to access this route`));
    }
    next();
  };
};

module.exports = { protect, authorize };
