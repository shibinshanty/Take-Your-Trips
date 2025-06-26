import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BACKEND_URL;


function Home() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
   

    axios.get(`${BASE_URL}/api/destinations`)

      .then(response => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
      });
  }, []);

  const handleBoxClick = (id) => {
    navigate(`/destination/${id}`);
  };

  


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-200 flex flex-col items-center justify-start py-16 px-4">
      <h1 className="text-5xl font-bold text-blue-800 mb-14 drop-shadow-md">
        Welcome to Take Your Trip
      </h1>
       
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
       
        

        {destinations.map((dest) => (
             <div
             key={dest._id} onClick={() => handleBoxClick(dest._id)}  className="cursor-pointer bg-white shadow-2xl rounded-2xl overflow-hidden w-64 transition-transform transform hover:scale-105 hover:shadow-blue-300">

            <img src={`${BASE_URL}/${dest.image}`} alt={dest.name} className="w-full h-44 object-cover" />

               <div className="p-4 text-center space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">{dest.name}</h2>
                   <p className="text-base text-green-600 font-medium">₹{dest.price}</p>
                   <p className="text-blue-600 font-medium underline hover:text-blue-800 transition">View Details</p>
             </div>
      </div>
    ))}
  </div>
</div>
  );
}

export default Home;

