

const express = require('express');
const router = express.Router();
const {addDestination,getAllDestinations,updateDestination,deleteDestination,publicDestinations,getSingleDestination}=require('../controllers/destinationController')
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

// Admin routes (Protected)
router.post('/admin/destinations', verifyToken, verifyAdmin, upload.single('image'), addDestination);
router.get('/admin/destinations', verifyToken, verifyAdmin,getAllDestinations);
router.put('/admin/destinations/:id', verifyToken, verifyAdmin,updateDestination);
router.delete('/admin/destinations/:id', verifyToken, verifyAdmin,deleteDestination);

// Public route
router.get('/destinations',publicDestinations);
router.get('/destinations/:id',verifyToken, getSingleDestination);
module.exports = router;
