import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllProjects,
  deleteProject
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect, requireRole("admin"));

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/projects", getAllProjects);
router.delete("/projects/:id", deleteProject);

export default router;
