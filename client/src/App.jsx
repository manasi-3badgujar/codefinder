import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ClientDashboard from "./pages/client/ClientDashboard";
import NewProject from "./pages/client/NewProject";
import ProjectApplications from "./pages/client/ProjectApplications";
import ProjectSubmission from "./pages/client/ProjectSubmission";

import FreelancerDashboard from "./pages/freelancer/FreelancerDashboard";
import SubmitProject from "./pages/freelancer/SubmitProject";

import AdminDashboard from "./pages/admin/AdminDashboard";
//import AdminProjects from "./pages/admin/AdminProjects";

import Chat from "./pages/chat/Chat";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* LANDING */}
          <Route path="/" element={<Landing />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* CLIENT */}
          <Route
            path="/client"
            element={
              <ProtectedRoute roles={["client"]}>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/new"
            element={
              <ProtectedRoute roles={["client"]}>
                <NewProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/projects/:id"
            element={
              <ProtectedRoute roles={["client"]}>
                <ProjectApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/submission/:projectId"
            element={
              <ProtectedRoute roles={["client"]}>
                <ProjectSubmission />
              </ProtectedRoute>
            }
          />

          {/* FREELANCER */}
          <Route
            path="/freelancer"
            element={
              <ProtectedRoute roles={["freelancer"]}>
                <FreelancerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/freelancer/submit/:projectId"
            element={
              <ProtectedRoute roles={["freelancer"]}>
                <SubmitProject />
              </ProtectedRoute>
            }
          />

          {/* CHAT */}
          <Route
            path="/chat/:projectId"
            element={
              <ProtectedRoute roles={["client", "freelancer"]}>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />


          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
