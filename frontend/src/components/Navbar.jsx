import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {FaHome, FaSignInAlt, FaUserPlus,FaTachometerAlt, FaSignOutAlt, FaPhone} from 'react-icons/fa';
import Favicon from "../assets/Favicon.png"

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  },); //  Only run once on mount

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white py-5 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo */}
         <div className="text-3xl font-extrabold flex items-center gap-2 tracking-wide">
          <img src={Favicon} alt="Logo" className="w-10 h-10" />
             <span className="hover:text-yellow-200 transition">Take Your Trip</span>
         </div>


        {/* Navigation Links */}
        <div className="space-x-6 text-lg flex items-center flex-wrap justify-center">
          <Link to="/" className="hover:text-yellow-300 transition flex items-center gap-2">
            <FaHome /> Home
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition flex items-center gap-2">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/signup" className="hover:text-yellow-300 transition flex items-center gap-2">
                <FaUserPlus /> Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-yellow-300 transition flex items-center gap-2">
                <FaTachometerAlt /> Dashboard
              </Link>
              <Link to="/contact" className="hover:text-yellow-300 transition flex items-center gap-2">
                <FaPhone /> Contact
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-yellow-300 transition flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;



