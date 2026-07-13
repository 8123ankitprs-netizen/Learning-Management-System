const cloudinary = require('../config/cloudinary');

// Let's write a native buffer uploader using a Promise and standard streams.
const uploadToCloudinary = (fileBuffer, folder, resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    // End the stream with the buffer to initiate upload
    uploadStream.end(fileBuffer);
  });
};

module.exports = {
  uploadToCloudinary
};
