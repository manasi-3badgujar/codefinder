import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProjectChat } from "../controllers/chatController.js";

const router = express.Router();

// GET chat history / create chat
router.get("/:projectId", protect, getProjectChat);

export default router;
