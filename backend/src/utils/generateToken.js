const jwt = require('jsonwebtoken');

/**
 * Utility to generate a JWT token for a user.
 * We include the user ID and role in the payload.
 */
const generateToken = (id, role) => {
  if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'supersecretkey')) {
    throw new Error('FATAL SECURITY ERROR: JWT_SECRET must be configured as a strong custom secret in production environment settings.');
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'supersecretkey', {
    expiresIn: '30d', // Token expires in 30 days
  });
};

module.exports = generateToken;
