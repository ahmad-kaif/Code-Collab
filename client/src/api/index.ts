export const API_URL = "http://localhost:5000/api"; // Change this in production

// Define Room and API Response types
export interface Room {
  _id: string;
  users: string[];
  createdAt: string;
  updatedAt: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Function to create a room
export const createRoom = async (userId: string): Promise<APIResponse<Room>> => {
  const response = await fetch(`${API_URL}/rooms/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to create room");
  }

  return response.json();
};

// Function to join a room (Only if /rooms/join exists in your backend)
export const joinRoom = async (
  roomId: string,
  userId: string
): Promise<APIResponse<{ message: string }>> => {
  const response = await fetch(`${API_URL}/rooms/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId, userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to join room");
  }

  return response.json();
};

export const fetchRooms = async () => {
  try {
    const response = await fetch(`${API_URL}/rooms`);
    const data = await response.json();

    if (data.success) {
      console.log("Rooms:", data.data); // Logs all rooms
    } else {
      console.error("Failed to fetch rooms:", data.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};