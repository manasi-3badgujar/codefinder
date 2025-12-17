import { useEffect, useState } from "react";
import api from "../../utils/api";
import BidModal from "../../components/BidModal";

const BrowseProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await api.get("/projects/open");
    setProjects(res.data);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white dark:bg-gray-800 border rounded-xl p-6 shadow flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-1">
                {project.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {project.description}
              </p>

              <p className="text-sm">
                <b>Skills:</b>{" "}
                {project.skills?.join(", ")}
              </p>

              <p className="text-sm mt-1">
                <b>Days:</b> {project.duration}
              </p>

              <p className="text-sm mt-1">
                <b>Budget:</b> ₹{project.budget}
              </p>
            </div>

            <button
              onClick={() => setSelectedProject(project)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-max"
            >
              Apply / Bid
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProject && (
        <BidModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default BrowseProjects;
