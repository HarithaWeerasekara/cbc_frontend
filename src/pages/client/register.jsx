import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
 // ✅ Ensure the path is correct


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
      const response = await axios.post(
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
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      
      {/* Left side: Logo area */}
      <div className="hidden lg:flex lg:w-1/2 h-screen justify-center items-center bg-[#fff7f7]">
        <img
          src={logo}
          alt="Logo"
          className="max-w-[70%] h-auto object-contain"
        />
      </div>

      {/* Right side: Register form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-[url(/login-bg.jpg)] bg-cover bg-center p-4">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl shadow-2xl rounded-2xl py-10 px-6 flex flex-col items-center">

          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-12 bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] mb-3"
            type="text"
            placeholder="First Name"
          />

          <input
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-12 bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] mb-3"
            type="text"
            placeholder="Last Name"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] mb-3"
            type="email"
            placeholder="Email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] mb-3"
            type="password"
            placeholder="Password"
          />

          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-12 bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] mb-3"
            type="password"
            placeholder="Confirm Password"
          />

          <button
            onClick={handleRegister}
            className="w-full h-12 bg-[#fca5a5] border border-[#450a0a] text-[#4c0519] rounded-xl text-center font-semibold hover:bg-[#fb7185] transition mb-4"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-gray-800 text-center text-sm font-semibold">
            Already have an account?
            <br />
            <Link
              to="/login"
              className="text-pink-900 hover:text-pink-500 underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
