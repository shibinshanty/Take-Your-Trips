// routes/uploadRoute.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path, // Cloudinary URL
    });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

module.exports = router;
