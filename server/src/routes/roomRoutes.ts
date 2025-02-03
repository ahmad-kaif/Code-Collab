import express from "express";
import { createRoom, getRooms, joinRoom } from "../controllers/roomController"; // Removed .js extension

const router = express.Router();

router.post("/create", createRoom);
router.get("/", getRooms);
router.post("/join", joinRoom); // Changed to POST

export default router;
