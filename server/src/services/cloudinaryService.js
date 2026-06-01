const cloudinary = require('cloudinary').v2;
const { CloudinaryConfig } = require('../config/cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: CloudinaryConfig.cloud_name,
  api_key: CloudinaryConfig.api_key,
  api_secret: CloudinaryConfig.api_secret,
});

// Function to upload an image
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result;
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary: ' + error.message);
  }
};

// Function to delete an image
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error('Error deleting image from Cloudinary: ' + error.message);
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};