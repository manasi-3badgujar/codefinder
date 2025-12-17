import { useEffect, useState } from "react";
import api from "../../utils/api";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects/admin/all").then(res => setProjects(res.data));
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await api.delete(`/projects/${id}`);
    setProjects(projects.filter(p => p._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Projects (Admin)</h2>

      {projects.length === 0 && (
        <p className="text-gray-500">No projects found.</p>
      )}

      {projects.map(p => (
        <div
          key={p._id}
          className="border p-4 mb-3 rounded flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm">Status: {p.status}</p>
            <p className="text-sm">
              Client: {p.clientId?.username || "N/A"}
            </p>
            <p className="text-sm">
              Freelancer: {p.freelancerId?.username || "Not assigned"}
            </p>
          </div>

          <button
            onClick={() => remove(p._id)}
            className="bg-red-600 text-white px-3 h-10 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminProjects;