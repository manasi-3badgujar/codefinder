import { useState } from "react";
import BrowseProjects from "./BrowseProjects";
import MyApplications from "./MyApplications";
import MyProjects from "./MyProjects";

const FreelancerDashboard = () => {
  const [tab, setTab] = useState("browse");

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold mb-6">Freelancer Dashboard</h1>

      {/* TABS */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setTab("browse")}
          className={`px-4 py-2 rounded ${
            tab === "browse"
              ? "bg-blue-600 text-white"
              : "border"
          }`}
        >
          Browse Projects
        </button>

        <button
          onClick={() => setTab("applications")}
          className={`px-4 py-2 rounded ${
            tab === "applications"
              ? "bg-blue-600 text-white"
              : "border"
          }`}
        >
          My Applications
        </button>

        <button
          onClick={() => setTab("assigned")}
          className={`px-4 py-2 rounded ${
            tab === "assigned"
              ? "bg-blue-600 text-white"
              : "border"
          }`}
        >
          My Assigned Projects
        </button>
      </div>

      {/* CONTENT */}
      {tab === "browse" && <BrowseProjects />}
      {tab === "applications" && <MyApplications />}
      {tab === "assigned" && <MyProjects />}
    </div>
  );
};

export default FreelancerDashboard;
