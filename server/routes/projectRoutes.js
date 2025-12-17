import express from "express";
import {
  createProject,
  getMyProjects,
  getAssignedProjects,
  submitProject,
  completeProject,
  getOpenProjects
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =========================
   CLIENT ROUTES
========================= */

router.post(
  "/",
  protect,
  requireRole("client"),
  createProject
);

router.get(
  "/my",
  protect,
  requireRole("client"),
  getMyProjects
);

/* =========================
   FREELANCER ROUTES
========================= */

// ✅ BROWSE PROJECTS (FIX)
router.get(
  "/open",
  protect,
  requireRole("freelancer"),
  getOpenProjects
);

// Assigned projects
router.get(
  "/assigned",
  protect,
  requireRole("freelancer"),
  getAssignedProjects
);

/* =========================
   PROJECT FLOW
========================= */

router.put(
  "/:projectId/submit",
  protect,
  requireRole("freelancer"),
  submitProject
);

router.put(
  "/:projectId/complete",
  protect,
  requireRole("client"),
  completeProject
);

export default router;
