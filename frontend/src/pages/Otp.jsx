import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const BASE_URL=import.meta.env.BACKEND_URL;

const Otp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const otpRef = useRef();
  const navigate = useNavigate();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otpRef.current.value.trim();

    const email = Cookies.get('email');

    if (!email) {
      setErrorMessage('Email not found in cookies. Please register again.');
      return;
    }

    if (enteredOtp.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      const response = await axios.post(

        `${BASE_URL}/api/users/verifyotp`,

        {
          otp: enteredOtp,
          email: email,
        }
      );

      if (response?.data?.message === 'User Registered Successfully!') {
        setMessage(response.data.message);
        setErrorMessage('');

        Cookies.remove('email');

        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setErrorMessage('OTP verification failed.');
        setMessage('');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Verify OTP</h2>
      <form onSubmit={handleOtpSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            ref={otpRef}
            maxLength="6"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        {message && (
          <p className="text-green-600 text-sm mb-4">{message}</p>
        )}

        <button
          type="submit"
           className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default Otp;

