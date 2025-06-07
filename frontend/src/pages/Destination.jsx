import { useParams,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

function Destination() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`https://take-your-trips.onrender.com/api/destinations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setDestination(res.data);
      })
      .catch((err) => {
        console.error("Error fetching destination details:", err);
      });
  }, [id]);
     
const handleBooking = async () => {
  if (!startDate || !endDate) {
    alert("Please select both start and end dates.");
    return;
  }

  if (endDate < startDate) {
    alert("End date cannot be before start date.");
    return;
  }

  try {
    const token = localStorage.getItem('token');

    // Step 1: Create booking and Razorpay order
    const response = await axios.post(
      "https://take-your-trips.onrender.com/api/bookings",
      {
        destinationId: destination._id,
        startDate,
        endDate
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const { orderId, amount, currency, key } = response.data;

    // Step 2: Open Razorpay checkout
    const options = {
      key: key,
      amount: amount.toString(),
      currency,
      name: "Take Your Trip",
      description: "Booking Payment",
      order_id: orderId,
      handler: async function (response) {
        // Step 3: Send payment details to backend for verification
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        try {
          await axios.post(
            "https://take-your-trips.onrender.com/api/verify-payment",
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          alert(" Payment verified! Booking confirmed.");
          navigate("/dashboard");
        } catch (verifyErr) {
          console.error("Payment verification failed:", verifyErr);
          alert(" Payment successful but verification failed. Contact support.");
        }
      },
      theme: {
        color: "#3399cc"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
   
  } catch (error) {
    console.error("Booking or payment initiation failed:", error.response?.data || error.message);
    alert("Booking failed. Please try again.");
  }
};




 

  if (!destination) return <p className="text-center mt-20">Loading...</p>;

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4 flex flex-col items-center">
    <h1 className="text-5xl font-bold text-blue-800 mb-14 drop-shadow-md">
      Welcome to Take Your Trip
    </h1>

    <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden">
    <img src={`https://take-your-trips.onrender.com${destination.image}`} alt={destination.name} className="w-full h-44 object-cover"/>

      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold text-blue-700">{destination.name}</h1>
        <p className="text-lg text-gray-700">{destination.description}</p>
        <p className="text-2xl text-green-600 font-semibold">₹{destination.price}</p>

        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full md:w-1/2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full md:w-1/2"
            />
          </div>
        </div>

        <button
          onClick={handleBooking}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
);

}

export default Destination;


