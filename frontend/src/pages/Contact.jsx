import { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://take-your-trips.onrender.com/api/contact', formData);
      setStatus(res.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus(err.response?.data.error || 'Failed to send message.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        required
        rows={5}
        className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Send
      </button>

      {status && (
        <p className="mt-4 text-center text-sm text-green-600">
          {status}
        </p>
      )}
    </form>
  );
}

export default Contact;
