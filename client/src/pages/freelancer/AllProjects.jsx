import { useEffect, useState } from "react";
import api from "../../utils/api";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [form, setForm] = useState({
    bidAmount: "",
    days: "",
    proposal: ""
  });

  useEffect(() => {
    api.get("/projects/open").then(res => setProjects(res.data));
    api.get("/applications/my").then(res => setApplications(res.data));
  }, []);

  const hasApplied = (projectId) =>
    applications.some(a => a.projectId?._id === projectId);

  const submitBid = async (e) => {
    e.preventDefault();

    await api.post("/applications", {
      projectId: activeProject._id,
      bidAmount: form.bidAmount,
      days: form.days,
      proposal: form.proposal
    });

    const res = await api.get("/applications/my");
    setApplications(res.data);
    setActiveProject(null);
    setForm({ bidAmount: "", days: "", proposal: "" });
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-white dark:bg-gray-800 border rounded-xl p-6 shadow"
          >
            <h3 className="text-lg font-bold">{p.title}</h3>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {p.description}
            </p>

            <div className="text-sm mt-3 space-y-1">
              <p><b>Budget:</b> ₹{p.budget}</p>
              <p><b>Duration:</b> {p.duration} days</p>
              <p>
                <b>Skills:</b>{" "}
                {p.skills?.length ? p.skills.join(", ") : "—"}
              </p>
            </div>

            {!hasApplied(p._id) ? (
              <button
                onClick={() => setActiveProject(p)}
                className="mt-4 btn btn-sm btn-primary"
              >
                Apply / Bid
              </button>
            ) : (
              <span className="inline-block mt-4 text-green-600 font-semibold">
                ✔ Applied
              </span>
            )}
          </div>
        ))}
      </div>

      {/* MODAL (NOT DIALOG BOX) */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <form
            onSubmit={submitBid}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md space-y-4"
          >
            <h3 className="text-lg font-bold">
              Apply for {activeProject.title}
            </h3>

            <input
              type="number"
              required
              placeholder="Your Bid Amount (₹)"
              className="w-full p-3 border rounded dark:bg-gray-700"
              value={form.bidAmount}
              onChange={(e) =>
                setForm({ ...form, bidAmount: e.target.value })
              }
            />

            <input
              type="number"
              required
              placeholder="Estimated Days"
              className="w-full p-3 border rounded dark:bg-gray-700"
              value={form.days}
              onChange={(e) =>
                setForm({ ...form, days: e.target.value })
              }
            />

            <textarea
              rows="4"
              required
              placeholder="Proposal"
              className="w-full p-3 border rounded dark:bg-gray-700"
              value={form.proposal}
              onChange={(e) =>
                setForm({ ...form, proposal: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="btn btn-sm btn-outline"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-sm btn-primary"
              >
                Submit Bid
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AllProjects;
