import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');

useEffect(() => {
  async function fetchBookings() {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Full API response:", response.data);

      const fetchedBookings = Array.isArray(response.data)
        ? response.data
        : [response.data]; // ← wrap object into array if it's not already

      setBookings(fetchedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }

  fetchBookings();
}, [token]);



  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  {booking.destination?.name || 'Unknown Destination'}
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>From:</strong> {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>To:</strong> {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Status:</strong> {booking.status}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Payment Status:</strong> {booking.paymentStatus}
                </p>
                <p className="text-gray-800 font-medium mt-2">
                  <strong>Total Price:</strong> ₹{booking.totalPrice}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

