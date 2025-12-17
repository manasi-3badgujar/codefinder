import { useState } from "react";
import api from "../utils/api";

const BidModal = ({ project, onClose }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [days, setDays] = useState("");
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);

  const submitBid = async () => {
    try {
      setLoading(true);
      await api.post("/applications", {
        projectId: project._id,
        bidAmount,
        days,
        proposal
      });
      alert("Bid submitted");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Bid failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Apply for {project.title}
        </h2>

        <input
          type="number"
          placeholder="Bid Amount"
          className="w-full border px-3 py-2 rounded mb-3"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="Estimated Days"
          className="w-full border px-3 py-2 rounded mb-3"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <textarea
          placeholder="Proposal"
          className="w-full border px-3 py-2 rounded mb-4"
          rows={4}
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={submitBid}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Bid"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidModal;
