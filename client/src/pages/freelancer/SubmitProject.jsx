import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const SubmitProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/projects/${projectId}/submit`, {
        link,
        notes
      });
      alert("Project submitted successfully");
      navigate("/freelancer");
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Project Link"
          className="w-full border p-3 rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />

        <textarea
          placeholder="Notes / Description"
          className="w-full border p-3 rounded"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Work"}
        </button>
      </form>
    </div>
  );
};

export default SubmitProject;