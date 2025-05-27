const razorpay = require('../config/razorPay');

exports.initiatePayment = async (bookingId, amount) => {
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `booking_${bookingId}`,
    };

    const order = await razorpay.orders.create(options);

    return { success: true, order };
  } catch (error) {
    console.error("Error in initiating payment:", error);
    return { success: false, message: "Payment initiation failed", error: error.message };
  }
};


