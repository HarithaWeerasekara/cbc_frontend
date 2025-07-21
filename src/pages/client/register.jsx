import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div className="w-full min-h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex flex-col md:flex-row">
      {/* Left side image section (can be used for logo or illustration) */}
      <div className="w-full md:w-1/2 h-40 md:h-auto"></div>

      {/* Right side form section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl shadow-2xl rounded-2xl py-10 px-6 flex flex-col items-center">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] mb-3"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] mb-3"
            type="text"
            placeholder="Last Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] mb-3"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] mb-3"
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] mb-3"
            type="password"
            placeholder="Confirm Password"
          />
          <button
            onClick={handleRegister}
            className="w-full h-[50px] bg-[#fca5a5] border border-[#450a0a] text-[#4c0519] rounded-xl text-center mb-4"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-gray-700 text-center text-sm font-semibold">
            Already have an account? <br />
            <Link
              to="/login"
              className="text-pink-900 hover:text-pink-500 transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
