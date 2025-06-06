import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate} from "react-router-dom";
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
          role: "user", // Only users can register through frontend
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
    <div className="w-full bg-red-200 h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-auto py-10 backdrop-blur-2xl shadow-2xl rounded-2xl flex flex-col justify-center items-center">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="w-[400px] h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] m-[8px]"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            className="w-[400px] h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] m-[8px]"
            type="text"
            placeholder="Last Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-[400px] h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] m-[8px]"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-[400px] h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] m-[8px]"
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-[400px] h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] m-[8px]"
            type="password"
            placeholder="Confirm Password"
          />
          <button
            onClick={handleRegister}
            className="w-[400px] h-[50px] bg-[#fca5a5] border border-[#450a0a] text-[#4c0519] rounded-xl text-center m-[8px] cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-gray-600 text-center m-[8px] text-[15px] font-semibold ">
            Already have an account? <br />
            <span className="text-pink-900 cursor-pointer hover:text-pink-400">
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
