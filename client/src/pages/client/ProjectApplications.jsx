import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const ProjectApplications = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approvingId, setApprovingId] = useState(null);

  const fetchApplications = async () => {
    try {
      const res = await api.get(`/applications/project/${projectId}`);
      setApplications(res.data || []);
    } catch (err) {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [projectId]);

  const approveApplication = async (applicationId) => {
    if (!window.confirm("Approve this freelancer?")) return;

    try {
      setApprovingId(applicationId);
      await api.put(`/applications/${applicationId}/approve`);
      await fetchApplications();
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    } finally {
      setApprovingId(null);
    }
  };

  /* ---------- UI STATES ---------- */

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-6 text-gray-500">
        Loading applications…
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-6 text-red-500">
        {error}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-6 text-gray-500">
        No applications yet.
      </div>
    );
  }

  /* ---------- MAIN RENDER ---------- */

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold mb-6">
        Project Applications
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white dark:bg-gray-800 border rounded-xl p-6 shadow"
          >
            <h2 className="text-lg font-bold">
              {app.freelancerId?.name}
            </h2>

            <div className="text-sm mt-2 space-y-1">
              <p><b>Email:</b> {app.freelancerId?.email}</p>
              <p><b>Bid:</b> ₹{app.bidAmount}</p>
              <p><b>Days:</b> {app.days}</p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    app.status === "Approved"
                      ? "text-green-600 font-semibold"
                      : app.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {app.status}
                </span>
              </p>
            </div>

            {app.proposal && (
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {app.proposal}
              </p>
            )}

            {/* ACTIONS */}

            {app.status === "Pending" && (
              <button
                onClick={() => approveApplication(app._id)}
                disabled={approvingId === app._id}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {approvingId === app._id
                  ? "Approving..."
                  : "Approve Freelancer"}
              </button>
            )}

            {app.status === "Approved" && (
              <div className="mt-4 flex items-center gap-4">
                <span className="text-green-600 font-semibold">
                  ✔ Freelancer Approved
                </span>

                {/* ✅ CHAT BUTTON FOR CLIENT */}
                <button
                  onClick={() => navigate(`/chat/${projectId}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                 Chat 💬 
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectApplications;
