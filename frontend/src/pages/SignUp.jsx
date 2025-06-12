import  { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from "axios";


const SignUp = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState('');

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
  
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }
  
    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 8 characters long, with uppercase, lowercase, number, and a special character.");
      return;
    }
  
    setErrorMessage("");
  
    const formData = { name, email, password };
  
    try {

      const response = await axios.post("https://take-your-trips.onrender.com/api/users/signup", formData);

      setMessage(response.data.message);
      setErrorMessage("");
      Cookies.set('email', formData.email); // make sure cookie is set
      setTimeout(() => {
        navigate('/otp');
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      setMessage('');
    }
  };

  return (
   <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Sign Up</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <input type="text" placeholder="Name" ref={nameRef} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
    <div className="mb-4">
      <input type="email" placeholder="Email" ref={emailRef} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
    <div className="mb-4">
      <input type="password" placeholder="Password" ref={passwordRef} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
    {errorMessage && (
      <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
    )}
    {message && (
      <p className="text-green-600 text-sm mb-4">{message}</p>
    )}
    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200">
      Sign Up
    </button>
  </form>
</div>

  );
};

export default SignUp;
