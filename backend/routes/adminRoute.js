const express = require('express');
const router = express.Router();
const {adminSignup,adminLogin,getAdminProfile,getAdminDashboard} = require('../controllers/adminController');
const {verifyToken,verifyAdmin} = require('../middleware/authMiddleware');
const {getAllBookings}=require('../controllers/adminController')
// Admin Signup
router.post('/signup',adminSignup);

// Admin Login
router.post('/login',adminLogin);

//  Admin Protected Profile Route
router.get('/profile', verifyToken,verifyAdmin,getAdminProfile);

// Admin dashboard Route
router.get('/dashboard', verifyToken,verifyAdmin,getAdminDashboard);

//Admin seen getAllBookings
router.get('/getBookings',verifyToken,verifyAdmin,getAllBookings)

module.exports = router;
