import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const res = await api.get("/applications/my");
    setApplications(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const withdraw = async (id) => {
    if (!window.confirm("Withdraw this application?")) return;
    await api.delete(`/applications/${id}`);
    load();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {applications.map(a => (
        <div
          key={a._id}
          className="bg-white dark:bg-gray-800 border rounded-xl p-6 shadow"
        >
          <h3 className="text-lg font-bold">
            {a.projectId?.title}
          </h3>

          <p className="mt-2"><b>Bid:</b> ₹{a.bidAmount}</p>
          <p><b>Days:</b> {a.days}</p>

          <p className="mt-1">
            <b>Status:</b>{" "}
            <span className={
              a.status === "Approved"
                ? "text-green-600"
                : a.status === "Rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }>
              {a.status}
            </span>
          </p>

          <div className="mt-4 flex gap-4">
            {a.status === "Pending" && (
              <button
                onClick={() => withdraw(a._id)}
                className="text-red-600 hover:underline"
              >
                Withdraw
              </button>
            )}

            {a.status === "Approved" && (
              <button
                onClick={() => navigate(`/chat/${a.projectId._id}`)}
                className="btn btn-sm btn-primary"
              >
                💬 Chat
              </button>
            )}
          </div>
        </div>
      ))}

      {applications.length === 0 && (
        <p className="text-gray-500">No applications yet.</p>
      )}
    </div>
  );
};

export default MyApplications;
