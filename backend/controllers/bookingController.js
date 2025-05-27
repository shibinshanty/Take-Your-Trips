const Booking = require('../models/booking');
const Destination=require('../models/destination')
const razorpay=require('../config/razorPay')
const crypto=require("crypto")

exports.createBooking = async (req, res) => {
  try {
    const { destinationId, startDate, endDate } = req.body;

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Calculate duration in days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffHours = Math.abs(end - start) / 36e5;

    let totalPrice = destination.price;
    if (diffHours > 24) {
      const extraDays = Math.ceil(diffHours / 24) - 1;
      totalPrice += extraDays * 5000;
    }

    const booking = new Booking({
      user: req.user.id,
      destination: destinationId,
      startDate,
      endDate,
      totalPrice,
      status: "Pending",
    });

    await booking.save();

    // Razorpay Order creation
    const options = {
      amount: totalPrice * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_order_${booking._id}`,
    };

    const order = await razorpay.orders.create(options);

// Save Razorpay order ID in the booking
  booking.razorpayOrderId = order.id;
     await booking.save();

  res.status(201).json({
  success: true,
  message: "Booking created. Proceed to payment.",
  bookingId: booking._id,
  orderId: order.id,
  amount: order.amount,
  currency: order.currency,
  key: process.env.RAZORPAY_KEY_ID,
});

  } catch (err) {
    res.status(500).json({ message: "Booking creation failed", error: err.message });
  }
};



exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Create expected signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature!" });
    }

    // Update booking status
    const booking = await Booking.findOne({ razorpayOrderId: razorpay_order_id });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }
    booking.paymentStatus="Paid"
    booking.status = "Confirmed";
    booking.razorpayPaymentId = razorpay_payment_id;
    await booking.save();

    res.status(200).json({ message: "Payment verified & booking confirmed!" });
  } catch (err) {
    res.status(500).json({ message: "Payment verification failed", error: err.message });
  }
};

   //User confirmed bookings
// User confirmed bookings - fetch all
exports.getUserBookings = async (req, res) => {
  try {
    // Find all bookings for the user with status 'Confirmed', sorted by bookingDate descending
    const bookings = await Booking.find({
      user: req.user.id,
      status: 'Confirmed'
    })
    .populate('destination')
    .sort({ bookingDate: -1 }); // latest first

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No confirmed bookings found' });
    }

    res.status(200).json(bookings); // Return array of bookings
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};


