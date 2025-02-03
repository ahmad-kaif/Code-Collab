import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { createRoom, fetchRooms, joinRoom } from "../api"; // Import API functions

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);

  // Get current theme (assuming you're using Tailwind CSS's dark mode)
  const theme = localStorage.getItem('theme') || 'light'; // Or use a global state/context if you have one
  
  const handleCreateRoom = async () => {
    try {
      setLoading(true);
      if (!user) throw new Error("User not authenticated");

      const response = await createRoom(user.id);
      if (response.success) {
        navigate(`/room/${response.data._id}`);
      } else {
        console.error("Room creation failed:", response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    try {
      setLoading(true);
      if (!roomId.trim()) {
        alert("Room ID is required.");
        return;
      }
      if (!user || !user.id) {
        alert("User not authenticated.");
        return;
      }

      const response = await joinRoom(roomId, user.id);
      if (response.success) {
        navigate(`/room/${roomId}`);
      } else {
        console.error("Joining room failed:", response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchRooms = async () => {
    try {
      const response = await fetchRooms();  // Fetch rooms here
      if(response.success){
        navigate(`/allrooms`);
      }
    } catch (error) {
      console.error("Error in handleFetchRooms:", error);
    }
  };

  return (
    <div className={`h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center`}>
      <h2 className="text-3xl font-semibold">Hello, {user?.fullName} 👋</h2>
      <div className="mt-6 flex flex-col gap-4">
        <Button
          onClick={handleCreateRoom}
          className={`${
            theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 hover:bg-green-500'
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create a Room"}
        </Button>
        <Button
          onClick={handleFetchRooms}
          className={`${
            theme === 'dark' ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-400 hover:bg-sky-500'
          }`}
          disabled={loading}
        >
          {loading ? "Fetching..." : "See All Rooms"}
        </Button>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button
            onClick={handleJoinRoom}
            className={`${
              theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 hover:bg-blue-500'
            }`}
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Room"}
          </Button>
        </div>
      </div>
      <SignOutButton>
        <Button className={`mt-4 ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}>
          Sign Out
        </Button>
      </SignOutButton>
    </div>
  );
};

export default Dashboard;
