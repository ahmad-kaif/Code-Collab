import express from "express";
import cors from "cors";
import { createServer } from "http";
// import { Server } from "socket.io";
import dotenv from "dotenv";
import roomRoutes from "./routes/roomRoutes";
import chatRoutes from "./routes/chatRoutes";
import { connectDB } from "./config/connectDb";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// const server = createServer(app);
// const io = new Server(server, {
//   cors: { origin: "*" }
// });



app.use("/api/rooms", roomRoutes);
app.use("/api/chat", chatRoutes);

// io.on("connection", (socket) => {
//   console.log("User Connected:", socket.id);

//   socket.on("join-room", ({ roomId, user }) => {
//     socket.join(roomId);
//     socket.to(roomId).emit("user-joined", user);
//   });

//   socket.on("send-code", ({ roomId, code }) => {
//     socket.to(roomId).emit("receive-code", code);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected:", socket.id);
//   });
// });

app.listen(5000, () => {
  console.log("Server running on port 5000");
  connectDB();
});
