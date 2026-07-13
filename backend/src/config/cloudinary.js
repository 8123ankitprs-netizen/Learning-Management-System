const cloudinary = require('cloudinary').v2;

/**
 * Configure Cloudinary SDK using credentials from environment variables.
 * Why it exists: Abstracting SDK config ensures our media services can connect instantly.
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
