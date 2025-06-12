// middleware/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // config file we create below

// Set up storage in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'take-your-trip', // You can change this to any folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Optional, for format restriction
    transformation: [{ width: 800, height: 600, crop: 'limit' }] // Optional
  },
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only jpg, jpeg, and png files are allowed!'), false);
  }
};

// Multer setup with Cloudinary storage
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

module.exports = upload;

