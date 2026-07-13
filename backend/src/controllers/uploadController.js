const fs = require('fs');
const path = require('path');
const { uploadToCloudinary } = require('../utils/cloudinaryUploader');

// Check if Cloudinary credentials are set to real values (not placeholders)
const isCloudinaryConfigured = () => {
  return process.env.CLOUDINARY_CLOUD_NAME && 
         process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
         process.env.CLOUDINARY_API_KEY &&
         process.env.CLOUDINARY_API_KEY !== 'your_api_key';
};

// Helper to save files locally when Cloudinary is not configured
const saveLocally = async (file, subfolder, req) => {
  const uploadDir = path.join(__dirname, '../../public/uploads', subfolder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  // Create a unique filename
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname || '.jpg')}`;
  const filePath = path.join(uploadDir, fileName);
  
  // Write the file buffer
  await fs.promises.writeFile(filePath, file.buffer);
  
  // Construct dynamic host URL
  const host = req.get('host');
  return `${req.protocol}://${host}/uploads/${subfolder}/${fileName}`;
};

/**
 * Controller: Upload Thumbnail Image
 * Route: POST /api/v1/uploads/thumbnail
 * Access: Private/Instructor/Admin
 */
const uploadThumbnail = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a file');
    }

    let url;
    if (isCloudinaryConfigured()) {
      const result = await uploadToCloudinary(req.file.buffer, 'skillhub/thumbnails', 'image');
      url = result.secure_url;
    } else {
      url = await saveLocally(req.file, 'thumbnails', req);
    }

    res.status(200).json({
      success: true,
      url: url
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

/**
 * Controller: Upload Lesson Video
 * Route: POST /api/v1/uploads/video
 * Access: Private/Instructor/Admin
 */
const uploadLessonVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a file');
    }

    let url;
    let duration = 0;

    if (isCloudinaryConfigured()) {
      const result = await uploadToCloudinary(req.file.buffer, 'skillhub/videos', 'video');
      url = result.secure_url;
      duration = result.duration;
    } else {
      url = await saveLocally(req.file, 'videos', req);
      duration = 180; // Placeholder 3 mins duration for local files
    }

    res.status(200).json({
      success: true,
      url: url,
      duration: duration
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

/**
 * Controller: Upload Avatar Image
 * Route: POST /api/v1/uploads/avatar
 * Access: Private (All logged in users)
 */
const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a file');
    }

    let url;
    if (isCloudinaryConfigured()) {
      const result = await uploadToCloudinary(req.file.buffer, 'skillhub/avatars', 'image');
      url = result.secure_url;
    } else {
      url = await saveLocally(req.file, 'avatars', req);
    }

    res.status(200).json({
      success: true,
      url: url
    });
  } catch (error) {
    res.status(550);
    next(error);
  }
};

module.exports = {
  uploadThumbnail,
  uploadLessonVideo,
  uploadAvatar
};
