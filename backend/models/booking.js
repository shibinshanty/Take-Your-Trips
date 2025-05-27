const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true,},
  destination: {type: mongoose.Schema.Types.ObjectId,ref: 'Destination',required: true,},
  startDate: {type: Date,required: true,},
  endDate: {type: Date,required: true},
  totalPrice: {type: Number,required: true,},
  status: {type: String,enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],default: 'Pending', },
  paymentStatus: {type: String,enum: ['Pending', 'Paid'],default: 'Pending',},
  razorpayOrderId: {type: String,},
  razorpayPaymentId: {type: String,},
  razorpaySignature: {type: String, },
  bookingDate: {type: Date,default: Date.now,},
});

module.exports = mongoose.model('Booking', bookingSchema);


