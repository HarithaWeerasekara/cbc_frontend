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
    onSuccess: async (res) => {
      try {
        setLoading(true);
        const accessToken = res.access_token || res.accessToken;
        if (!accessToken) {
          throw new Error("No access token received from Google");
        }
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/google`,
          {
            accessToken: accessToken,
          }
        );

        toast.success("Login successfully");
        localStorage.setItem("token", response.data.token);

        const user = response.data.user;
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
        
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
        {
          email,
          password,
        }
      );

      toast.success("Login successfully");
      localStorage.setItem("token", response.data.token);

      const user = response.data.user;
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-2xl shadow-2xl rounded-2xl flex flex-col justify-center items-center bg-white/30">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-[400px] h-[50px] bg-[#fef2f2] border border-[#be123c] rounded-xl text-center text-[#7f1d1d] m-[8px] placeholder-[#7f1d1d]"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-[400px] h-[50px] bg-[#fef2f2] border border-[#be123c] rounded-xl text-center text-[#7f1d1d] m-[8px] placeholder-[#7f1d1d]"
          />
          <button
            onClick={handleLogin}
            className="w-[400px] h-[50px] bg-[#fda4af] border border-[#be123c] text-[#7f1d1d] rounded-xl m-[8px] font-semibold hover:bg-[#fb7185] transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <button
            onClick={() => loginWithGoogle()}
            className="w-[400px] h-[50px] mt-[10px] bg-[#fda4af] border border-[#be123c] text-[#7f1d1d] rounded-xl m-[8px] flex justify-center items-center font-semibold hover:bg-[#fb7185] transition-all duration-200"
            disabled={loading}
          >
            <FaGoogle className="mr-2" />
            {loading ? "Loading..." : "Login with Google"}
          </button>

          <p className="text-[#7f1d1d] text-center m-[8px] text-[15px] font-semibold">
            Don’t have an account yet? <br />
            <Link
              to="/register"
              className="text-[#be123c] hover:text-[#fb7185] cursor-pointer"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
