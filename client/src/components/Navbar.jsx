import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-gray-900 dark:bg-black text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        LinkLance
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="border px-2 py-1 rounded"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {user && (
          <div className="hidden md:block text-sm text-gray-300 text-right">
            <div className="font-semibold">{user.name}</div>
          </div>
        )}

        {user?.role === "client" && (
          <>
            <Link to="/client">Dashboard</Link>
            <Link to="/client/new">Post Project</Link>
          </>
        )}

        {user?.role === "freelancer" && (
          <Link to="/freelancer">Dashboard</Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded whitespace-nowrap"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
