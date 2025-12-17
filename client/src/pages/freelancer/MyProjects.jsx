import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/projects/assigned").then(res => setProjects(res.data));
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map(p => (
        <div
          key={p._id}
          className="bg-white dark:bg-gray-800 border rounded-xl p-6 shadow"
        >
          <h3 className="text-lg font-bold">{p.title}</h3>
          <p className="mt-1">{p.description}</p>

          <p className="mt-2">
            <b>Status:</b>{" "}
            <span className="text-green-600 font-semibold">
              {p.status}
            </span>
          </p>

          {p.status === "Assigned" && (
            <button
              onClick={() => navigate(`/freelancer/submit/${p._id}`)}
              className="btn btn-sm btn-primary mt-4"
            >
              Submit Project
            </button>
          )}
        </div>
      ))}

      {projects.length === 0 && (
        <p className="text-gray-500">No assigned projects yet.</p>
      )}
    </div>
  );
};

export default MyProjects;
