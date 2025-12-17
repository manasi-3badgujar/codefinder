import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";

const ProjectSubmission = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    api.get(`/projects/${projectId}`).then((res) => {
      setProject(res.data);
    });
  }, [projectId]);

  const complete = async () => {
    if (!window.confirm("Mark project as completed?")) return;
    await api.put(`/projects/${projectId}/complete`);
    alert("Project completed");
    navigate("/client");
  };

  if (!project) return null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Project Submission</h1>

      <a
        href={project.submission.link}
        target="_blank"
        className="text-blue-600 underline"
      >
        View Submission
      </a>

      <p className="mt-3">{project.submission.notes}</p>

      <button
        onClick={complete}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
      >
        Mark as Completed
      </button>
    </div>
  );
};

export default ProjectSubmission;
