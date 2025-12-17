import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔐 Redirect logged-in users to their dashboard
  useEffect(() => {
    if (user?.role) {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* HERO */}
      <section
        className="relative min-h-[85vh] flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('/back.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hire the best freelancers
            <br />
            <span className="text-blue-400">Make your ideas real</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-2xl">
            Post projects, receive bids, collaborate in real-time,
            and get work done efficiently.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>

            <Link to="/login" className="btn-outline bg-white/10">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES / FUNCTIONS */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Platform Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Secure Authentication",
                desc: "JWT-based login with role-based access for clients, freelancers, and admins."
              },
              {
                title: "Project & Bidding System",
                desc: "Clients post projects and freelancers bid once with proposals and pricing."
              },
              {
                title: "Approval Workflow",
                desc: "Clients approve one freelancer — others are automatically rejected."
              },
              {
                title: "Real-time Chat",
                desc: "Instant messaging between client and freelancer using Socket.io."
              },
              {
                title: "Project Submission",
                desc: "Freelancers submit work links and descriptions for client review."
              },
              {
                title: "Admin Control Panel",
                desc: "Admins manage users, projects, and platform moderation."
              }
            ].map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-6 text-center text-sm">
        © {new Date().getFullYear()} LinkLance. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
