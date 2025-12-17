import Chat from "../models/Chat.js";
import Project from "../models/Project.js";

/**
 * GET or CREATE chat for a project
 * Allowed when project is Assigned or Submitted
 */
export const getProjectChat = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project || !["Assigned", "Submitted"].includes(project.status)) {
      return res.status(403).json({ message: "Chat not available" });
    }

    const userId = req.user._id.toString();

    if (
      project.clientId.toString() !== userId &&
      project.approvedFreelancer?.toString() !== userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    let chat = await Chat.findOne({ projectId }).populate(
      "messages.sender",
      "name role"
    );

    if (!chat) {
      chat = await Chat.create({
        projectId,
        clientId: project.clientId,
        freelancerId: project.approvedFreelancer,
        messages: []
      });
    }

    res.json({
      messages: chat.messages,
      readOnly: project.status === "Submitted"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Chat fetch failed" });
  }
};
