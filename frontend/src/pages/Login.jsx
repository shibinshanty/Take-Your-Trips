import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL=import.meta.env.BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    try {
<<<<<<< HEAD
      const response = await axios.post('https://take-your-trips.onrender.com/api/users/login', { email, password });
=======
      const response = await axios.post(`${BASE_URL}/api/users/login`, { email, password });
>>>>>>> f1ce6e9 (Integrated Cloudinary with multer for image uploads and updated frontend routes)
      setMessage(response.data.message || "Login successful!");
      setErrorMessage("");

      localStorage.setItem('token', response.data.token);
      Cookies.set('email', email);

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response?.data?.message || "Invalid credentials");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
