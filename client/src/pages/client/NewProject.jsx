import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    duration: "",
    skills: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/projects", {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim())
      });
      navigate("/client");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold mb-6">Post a New Project</h1>

      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
      >
        <input
          name="title"
          placeholder="Project Title"
          required
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded dark:bg-gray-700"
        />

        <textarea
          name="description"
          placeholder="Project Description"
          required
          rows="4"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded dark:bg-gray-700"
        />

        <input
          name="budget"
          type="number"
          placeholder="Budget (₹)"
          required
          value={form.budget}
          onChange={handleChange}
          className="w-full p-3 border rounded dark:bg-gray-700"
        />

        <input
          name="duration"
          type="number"
          placeholder="Duration (days)"
          required
          value={form.duration}
          onChange={handleChange}
          className="w-full p-3 border rounded dark:bg-gray-700"
        />

        <input
          name="skills"
          placeholder="Required skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          className="w-full p-3 border rounded dark:bg-gray-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          {loading ? "Posting..." : "Post Project"}
        </button>
      </form>
    </div>
  );
};

export default NewProject;