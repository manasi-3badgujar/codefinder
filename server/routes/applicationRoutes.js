import express from "express";
import {
  applyToProject,
  getMyApplications,
  getApplicationsByProject,
  approveApplication,
  cancelApplication
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =========================
   FREELANCER ROUTES
========================= */

// Apply to project
router.post(
  "/",
  protect,
  requireRole("freelancer"),
  applyToProject
);

// My applications
router.get(
  "/my",
  protect,
  requireRole("freelancer"),
  getMyApplications
);

// Cancel application
router.delete(
  "/:id",
  protect,
  requireRole("freelancer"),
  cancelApplication
);

/* =========================
   CLIENT ROUTES
========================= */

// ✅ THIS WAS MISSING (CAUSE OF 404)
router.get(
  "/project/:projectId",
  protect,
  requireRole("client"),
  getApplicationsByProject
);

// Approve application
router.put(
  "/:id/approve",
  protect,
  requireRole("client"),
  approveApplication
);

export default router;