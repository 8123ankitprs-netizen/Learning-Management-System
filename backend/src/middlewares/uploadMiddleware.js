const multer = require('multer');

// Configure memory storage instead of disk storage.
// This is best practice for production because serverless/paas hosts (Render, Vercel, Heroku) 
// have ephemeral file systems where local files get wiped, and storing files in memory 
// avoids writing heavy files to disk.
const storage = multer.memoryStorage();

// Filter to accept only images
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Filter to accept only videos
const videoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed!'), false);
  }
};

const uploadImage = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const uploadVideo = multer({
  storage: storage,
  fileFilter: videoFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

module.exports = {
  uploadImage,
  uploadVideo
};
