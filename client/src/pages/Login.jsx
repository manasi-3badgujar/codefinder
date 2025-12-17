import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // keep reference to timeout to avoid overlap
  const timerRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // clear old timers
    if (timerRef.current) clearTimeout(timerRef.current);

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const user = await login(form);

      setSuccess("Login successful! Redirecting...");

      timerRef.current = setTimeout(() => {
        if (user.role === "client") navigate("/client");
        if (user.role === "freelancer") navigate("/freelancer");
        if (user.role === "admin") navigate("/admin");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");

      timerRef.current = setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      // IMPORTANT: loading only affects button state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        {/* ERROR */}
        {error && (
          <div className="mb-3 text-red-600 text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-3 text-green-600 text-sm text-center font-semibold">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded border dark:bg-gray-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded border dark:bg-gray-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
