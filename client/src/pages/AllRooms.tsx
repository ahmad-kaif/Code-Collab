import React, { useState, useEffect } from 'react';
import { API_URL } from '@/api';

const AllRooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    // Fetch rooms from the backend (replace with actual fetch logic)
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_URL}/rooms`);
        const data = await response.json();
        if (data.success) {
          setRooms(data.data); // assuming data.data contains an array of rooms
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <h3 className="mb-12 text-3xl font-semibold text-center dark:text-white text-black">Available Rooms</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((room: { _id: string }) => (
          <div
            key={room._id}
            className="rounded-lg overflow-hidden shadow-xl hover:scale-105 transform transition duration-300 bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <div className="p-6">
              <h5 className="text-lg border font-semibold text-center mb-4 dark:text-white text-black">
                Room ID: <span className="text-sm">{room._id}</span>
              </h5>
              <p className="text-center mb-4 text-gray-400 dark:text-gray-400 text-gray-700">
                Join this room to collaborate with other users.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => window.location.href = `/room/${room._id}`}
                  className="bg-blue-500 dark:bg-blue-600 text-white dark:text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
