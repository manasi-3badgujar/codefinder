import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH FUNCTIONS
  ========================== */
  const fetchProjects = async () => {
    const res = await api.get("/admin/projects");
    setProjects(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      if (tab === "projects") await fetchProjects();
      if (tab === "users") await fetchUsers();
      setLoading(false);
    };
    load();
  }, [tab]);

  /* =========================
     ACTIONS
  ========================== */
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await api.delete(`/admin/projects/${id}`);
    fetchProjects();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await api.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-gray-500">
        Loading admin data...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
        {user && (
          <p className="text-sm text-gray-500">
            Logged in as <b>{user.name}</b> ({user.email})
          </p>
        )}
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 rounded transition ${
            tab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          Users
        </button>

        <button
          onClick={() => setTab("projects")}
          className={`px-4 py-2 rounded transition ${
            tab === "projects"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          Projects
        </button>
      </div>

      {/* USERS TAB */}
      {tab === "users" && (
        <div className="grid md:grid-cols-2 gap-4">
          {users.map((u) => {
            const isSelf = u._id === user?._id;

            return (
              <div
                key={u._id}
                className="border rounded-lg p-4 flex justify-between items-center dark:border-gray-700"
              >
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                  <p className="text-xs mt-1">
                    Role: <b>{u.role}</b>
                  </p>
                </div>

                {/* ❌ DO NOT ALLOW SELF DELETE */}
                {!isSelf ? (
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm w-[90px] h-[40px] flex items-center justify-center"
                  >
                    Delete
                  </button>
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    You
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* PROJECTS TAB */}
      {tab === "projects" && (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg p-4 flex justify-between items-start dark:border-gray-700"
            >
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-gray-500 mb-1">
                  Status: <b>{p.status}</b>
                </p>
                <p className="text-sm">
                  Client: {p.clientId?.name || "—"}
                </p>
                {p.approvedFreelancer && (
                  <p className="text-sm">
                    Freelancer: {p.approvedFreelancer.name}
                  </p>
                )}
              </div>

              <button
                onClick={() => deleteProject(p._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm w-[90px] h-[40px] flex items-center justify-center"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
