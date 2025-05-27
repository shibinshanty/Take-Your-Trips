const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { createBooking, getUserBookings,verifyPayment } = require('../controllers/bookingController');

// User must be logged in
router.post('/bookings', verifyToken, createBooking);
router.get('/bookings', verifyToken, getUserBookings);
router.post('/verify-payment',verifyToken,verifyPayment)


module.exports = router;
