import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const accessToken = tokenResponse.access_token || tokenResponse.accessToken;
        if (!accessToken) throw new Error("No access token received from Google");

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/google`,
          { accessToken }
        );

        toast.success("Login successfully");
        localStorage.setItem("token", response.data.token);
        const user = response.data.user;
        user.role === "admin" ? navigate("/admin/dashboard") : navigate("/");
      } catch (error) {
        console.error(error);
        toast.error("Google login failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      toast.error("Google authentication failed");
    },
  });

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password }
      );

      toast.success("Login successfully");
      localStorage.setItem("token", response.data.token);
      const user = response.data.user;
      user.role === "admin" ? navigate("/admin/dashboard") : navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[url(/login-bg.jpg)] bg-cover bg-center">
      
      {/* Left side (optional visual or background) */}
      <div className="hidden lg:block lg:w-1/2"></div>

      {/* Right side (login form) */}
      <div className="w-full h-[100px] lg:w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-sm bg-white/30 backdrop-blur-2xl shadow-2xl rounded-2xl px-6 py-8 flex flex-col items-center">
          
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full h-12 bg-[#fef2f2] border border-[#be123c] rounded-xl text-center text-[#7f1d1d] mb-3 placeholder-[#7f1d1d]"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full h-12 bg-[#fef2f2] border border-[#be123c] rounded-xl text-center text-[#7f1d1d] mb-3 placeholder-[#7f1d1d]"
          />

          <button
            onClick={handleLogin}
            className="w-full h-12 bg-[#fda4af] border border-[#be123c] text-[#7f1d1d] rounded-xl font-semibold hover:bg-[#fb7185] transition duration-200 mb-3"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <button
            onClick={() => loginWithGoogle()}
            className="w-full h-12 bg-[#fda4af] border border-[#be123c] text-[#7f1d1d] rounded-xl flex justify-center items-center font-semibold hover:bg-[#fb7185] transition duration-200 mb-4"
            disabled={loading}
          >
            <FaGoogle className="mr-2" />
            {loading ? "Loading..." : "Login with Google"}
          </button>

          <p className="text-[#7f1d1d] text-center text-sm font-semibold">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="text-[#be123c] hover:text-[#fb7185] underline"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
