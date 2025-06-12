import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL=import.meta.env.BACKEND_URL;

function Destination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
<<<<<<< HEAD
    if (!token) return navigate('/login');

    axios
      .get(`https://take-your-trips.onrender.com/api/destinations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
=======
    axios.get(`${BASE_URL}/api/destinations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
>>>>>>> f1ce6e9 (Integrated Cloudinary with multer for image uploads and updated frontend routes)
      .then((res) => {
        setDestination(res.data);
      })
      .catch((err) => {
        console.error('Error fetching destination:', err);
        alert('Failed to load destination. Please try again.');
      });
  }, [id, navigate]);

  const handleBooking = async () => {
    if (!startDate || !endDate) return alert('Please select both start and end dates.');
    if (endDate < startDate) return alert('End date cannot be before start date.');

    const token = localStorage.getItem('token');

<<<<<<< HEAD
    try {
      const response = await axios.post(
        'https://take-your-trips.onrender.com/api/bookings',
        { destinationId: destination._id, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
=======
    // Step 1: Create booking and Razorpay order
    const response = await axios.post(
      `${BASE_URL}/api/bookings`,
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
>>>>>>> f1ce6e9 (Integrated Cloudinary with multer for image uploads and updated frontend routes)

      const { orderId, amount, currency, key } = response.data;

      const options = {
        key,
        amount: amount.toString(),
        currency,
        name: 'Take Your Trip',
        description: 'Booking Payment',
        order_id: orderId,
        handler: async (paymentResponse) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;

<<<<<<< HEAD
          try {
            await axios.post(
              'https://take-your-trips.onrender.com/api/verify-payment',
              { razorpay_order_id, razorpay_payment_id, razorpay_signature },
              { headers: { Authorization: `Bearer ${token}` } }
            );
=======
        try {
          await axios.post(
            `${BASE_URL}/api/verify-payment`,
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
>>>>>>> f1ce6e9 (Integrated Cloudinary with multer for image uploads and updated frontend routes)

            alert('Payment verified! Booking confirmed.');
            navigate('/dashboard');
          } catch (err) {
            console.error('Verification failed:', err);
            alert('Payment done, but verification failed. Please contact support.');
          }
        },
        theme: { color: '#3399cc' },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error('Booking error:', error.response?.data || error.message);
      alert('Booking failed. Please try again.');
    }
  };

  if (!destination) return <p className="text-center mt-20 text-xl">Loading...</p>;

  const imageURL = destination.image?.startsWith('/uploads')
    ? `https://take-your-trips.onrender.com${destination.image}`
    : destination.image;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-blue-800 mb-14 drop-shadow-md">
        Welcome to Take Your Trip
      </h1>

<<<<<<< HEAD
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden">
        <img
          src={imageError ? '/fallback.jpg' : imageURL}
          onError={() => setImageError(true)}
          alt={destination.name}
          className="w-full h-60 object-cover"
        />
=======
    <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden">
      <img
        src={`${BASE_URL}/${destination.image}`}
        alt={destination.name}
        className="w-full h-72 object-cover"
      />
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold text-blue-700">{destination.name}</h1>
        <p className="text-lg text-gray-700">{destination.description}</p>
        <p className="text-2xl text-green-600 font-semibold">₹{destination.price}</p>
>>>>>>> f1ce6e9 (Integrated Cloudinary with multer for image uploads and updated frontend routes)

        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-blue-700">{destination.name}</h2>
          <p className="text-lg text-gray-700">{destination.description}</p>
          <p className="text-2xl text-green-600 font-semibold">₹{destination.price}</p>

          <div className="space-y-4">
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


