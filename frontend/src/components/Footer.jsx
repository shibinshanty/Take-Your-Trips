import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white py-10 mt-10 shadow-inner border-t border-blue-300">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left px-4">
        
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Take Your Trip</h2>
          <p className="text-sm opacity-80">Explore the world with us. Plan your next journey with comfort and ease.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/privacy" className="hover:text-yellow-300 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-yellow-300 transition">Terms</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm mt-8 opacity-80">
        &copy; {new Date().getFullYear()} Take Your Trip. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;


