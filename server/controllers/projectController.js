import Project from "../models/Project.js";

/* ======================================================
   CLIENT: Create project
   POST /api/projects
====================================================== */
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      clientId: req.user._id,
      status: "Open"
    });

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Project creation failed" });
  }
};

/* ======================================================
   CLIENT: My projects
   GET /api/projects/my
====================================================== */
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      clientId: req.user._id
    }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* ======================================================
   FREELANCER: Browse open projects
   GET /api/projects/open
====================================================== */
export const getOpenProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      status: "Open",
      clientId: { $ne: req.user._id }
    })
      .populate("clientId", "name email")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch open projects" });
  }
};

/* ======================================================
   FREELANCER: Assigned projects
   GET /api/projects/assigned
====================================================== */
export const getAssignedProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      approvedFreelancer: req.user._id
    }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assigned projects" });
  }
};

/* ======================================================
   FREELANCER: Submit project
====================================================== */
export const submitProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { link, notes } = req.body;

    const project = await Project.findById(projectId);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    if (project.approvedFreelancer?.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    if (project.status !== "Assigned")
      return res.status(400).json({ message: "Invalid project state" });

    project.submission = {
      link,
      notes,
      submittedAt: new Date()
    };
    project.status = "Submitted";

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Submission failed" });
  }
};

/* ======================================================
   CLIENT: Complete project
====================================================== */
export const completeProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    if (project.clientId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    if (project.status !== "Submitted")
      return res.status(400).json({ message: "Project not submitted yet" });

    project.status = "Completed";
    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Completion failed" });
  }
};
