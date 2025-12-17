import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects/my").then(res => setProjects(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Client Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">
        Logged in as <b>{user.name}</b> ({user.email})
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(p => (
          <div key={p._id} className="border rounded-xl p-6">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm">{p.description}</p>
            <p className="text-sm">Budget: ₹{p.budget}</p>
            <p className="text-sm mb-2">Status: {p.status}</p>

            {/* OPEN / ASSIGNED */}
            {["Open", "Assigned"].includes(p.status) && (
              <Link
                to={`/client/projects/${p._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
              >
                View Applications
              </Link>
            )}

            {/* SUBMITTED */}
            {p.status === "Submitted" && (
              <div className="mt-3 space-y-2">
                <a
                  href={p.submission?.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline block"
                >
                  View Submitted Work
                </a>

                <button
                  onClick={() =>
                    api.put(`/projects/${p._id}/complete`).then(() =>
                      window.location.reload()
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Approve Work
                </button>
              </div>
            )}

            {/* COMPLETED */}
            {p.status === "Completed" && (
              <p className="text-green-600 font-semibold mt-2">
                ✔ Project Completed
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;
