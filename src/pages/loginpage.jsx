import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ================= GOOGLE LOGIN ================= */
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const accessToken =
          tokenResponse.access_token || tokenResponse.accessToken;

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/google`,
          { accessToken }
        );

        toast.success("Login successful");
        localStorage.setItem("token", res.data.token);

        res.data.user.role === "admin"
          ? navigate("/admin/dashboard")
          : navigate("/");
      } catch {
        toast.error("Google login failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => toast.error("Google authentication failed"),
  });

  /* ================= NORMAL LOGIN ================= */
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password }
      );

      toast.success("Login successful");
      localStorage.setItem("token", res.data.token);

      res.data.user.role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-[#0b061a] via-[#2b1640] to-[#12081e]
        text-white relative overflow-hidden
      "
    >
      {/* GLOW BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -right-40 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px]" />

      {/* LOGIN CARD */}
      <div
        className="
          relative z-10 w-full max-w-md
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          rounded-3xl shadow-2xl
          px-8 py-10
        "
      >
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-14 object-contain" />
        </div>

        <h1
          className="
            text-3xl font-extrabold text-center mb-2
            bg-gradient-to-r from-pink-300 via-white to-purple-300
            bg-clip-text text-transparent
          "
        >
          Welcome Back
        </h1>

        <p className="text-center text-white/70 text-sm mb-8">
          Sign in to continue your beauty journey
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full h-12 mb-3 rounded-xl text-center
            bg-white/80 text-[#3b2a3a]
            placeholder-[#7a5a6a]
            outline-none focus:ring-2 focus:ring-pink-400
          "
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full h-12 mb-4 rounded-xl text-center
            bg-white/80 text-[#3b2a3a]
            placeholder-[#7a5a6a]
            outline-none focus:ring-2 focus:ring-pink-400
          "
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full h-12 rounded-xl font-semibold mb-3
            bg-gradient-to-r from-pink-500 to-purple-600
            shadow-[0_0_25px_rgba(236,72,153,0.45)]
            hover:scale-105 transition
          "
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* GOOGLE */}
        <button
          onClick={() => loginWithGoogle()}
          disabled={loading}
          className="
            w-full h-12 rounded-xl font-semibold mb-6
            border border-white/30
            bg-white/10 hover:bg-white/20
            flex items-center justify-center gap-2
            transition
          "
        >
          <FaGoogle />
          Login with Google
        </button>

        {/* LINKS */}
        <div className="text-center text-sm text-white/80 space-y-2">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-pink-300 hover:text-pink-400 underline"
            >
              Register
            </Link>
          </p>

          <p>
            <Link
              to="/forget"
              className="text-pink-300 hover:text-pink-400 underline"
            >
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
