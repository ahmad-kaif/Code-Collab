import { Request, Response } from "express";
import { Room, IRoom } from "../models/Room";

// ✅ Create a room
export const createRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ success: false, message: "User ID is required" });
      return;
    }

    const newRoom: IRoom = new Room({ users: [userId] });
    await newRoom.save();

    res.status(201).json({ success: true, data: newRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// ✅ Get all rooms
export const getRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// ✅ Join a room
export const joinRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId, userId } = req.body;

    if (!roomId || !userId) {
      res.status(400).json({ success: false, message: "Room ID and User ID are required" });
      return;
    }

    const room = await Room.findById(roomId);
    if (!room) {
      res.status(404).json({ success: false, message: "Room not found" });
      return;
    }

    if (!room.users.includes(userId)) {
      room.users.push(userId);
      await room.save();
    }

    res.status(200).json({ success: true, message: "Joined room successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
