import Application from "../models/Application.js";
import Project from "../models/Project.js";

/* ======================================================
   FREELANCER: Apply to project
   POST /api/applications
====================================================== */
export const applyToProject = async (req, res) => {
  try {
    const { projectId, bidAmount, days, proposal } = req.body;

    if (!projectId || !bidAmount || !days) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const alreadyApplied = await Application.findOne({
      projectId,
      freelancerId: req.user._id
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "Already applied to this project" });
    }

    const application = await Application.create({
      projectId,
      freelancerId: req.user._id,
      bidAmount,
      days,
      proposal,
      status: "Pending"
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Application failed" });
  }
};

/* ======================================================
   FREELANCER: My applications
   GET /api/applications/my
====================================================== */
export const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      freelancerId: req.user._id
    })
      .populate("projectId")
      .sort({ createdAt: -1 });

    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

/* ======================================================
   CLIENT: Get applications for a project
   GET /api/applications/project/:projectId
====================================================== */
export const getApplicationsByProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.clientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const applications = await Application.find({
      projectId: project._id
    })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load applications" });
  }
};

/* ======================================================
   CLIENT: Approve application
   PUT /api/applications/:id/approve
====================================================== */
export const approveApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const project = await Project.findById(application.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.clientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Approve selected
    application.status = "Approved";
    await application.save();

    // Reject others
    await Application.updateMany(
      {
        projectId: project._id,
        _id: { $ne: application._id }
      },
      { status: "Rejected" }
    );

    // Update project
    project.status = "Assigned";
    project.approvedFreelancer = application.freelancerId;
    await project.save();

    res.json({ message: "Application approved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Approval failed" });
  }
};

/* ======================================================
   FREELANCER: Cancel application
   DELETE /api/applications/:id
====================================================== */
export const cancelApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.freelancerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (application.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Cannot cancel approved/rejected application" });
    }

    await application.deleteOne();
    res.json({ message: "Application cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cancel failed" });
  }
};
