import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        {
          email,
          firstName,
          lastName,
          password,
          role: "user",
        }
      );

      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[url(/login-bg.jpg)] bg-cover bg-center px-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 border border-white/40">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-20 h-auto" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-pink-900 mb-1">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-700 mb-6">
          Join us and start your journey ✨
        </p>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-12 bg-white/70 border border-pink-300 rounded-xl px-4 text-pink-900 placeholder-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            type="text"
            placeholder="First Name"
          />

          <input
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-12 bg-white/70 border border-pink-300 rounded-xl px-4 text-pink-900 placeholder-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            type="text"
            placeholder="Last Name"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 bg-white/70 border border-pink-300 rounded-xl px-4 text-pink-900 placeholder-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            type="email"
            placeholder="Email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 bg-white/70 border border-pink-300 rounded-xl px-4 text-pink-900 placeholder-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            type="password"
            placeholder="Password"
          />

          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-12 bg-white/70 border border-pink-300 rounded-xl px-4 text-pink-900 placeholder-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full h-12 mt-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Registering..." : "Create Account"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-800 mt-5">
          Already have an account?
          <br />
          <Link
            to="/login"
            className="text-pink-700 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
