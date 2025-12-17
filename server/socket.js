import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Chat from "./models/Chat.js";
import Project from "./models/Project.js";

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  // 🔐 AUTH
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // ✅ JOIN ROOM
    socket.on("joinRoom", async ({ projectId }) => {
      const project = await Project.findById(projectId);
      if (!project || project.status !== "Assigned") return;

      const uid = socket.userId.toString();

      if (
        project.clientId.toString() !== uid &&
        project.approvedFreelancer?.toString() !== uid
      ) {
        return;
      }

      socket.join(projectId);
      console.log(`User ${uid} joined room ${projectId}`);
    });

    // ✅ SEND MESSAGE
    socket.on("sendMessage", async ({ projectId, text }) => {
      if (!text?.trim()) return;

      const chat = await Chat.findOne({ projectId });
      if (!chat) return;

      const message = {
        sender: socket.userId,
        text,
        createdAt: new Date()
      };

      chat.messages.push(message);
      await chat.save();

      io.to(projectId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

export default socketServer;
