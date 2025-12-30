import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

  /* ======================
     SEND OTP
  ====================== */
  const sendEmail = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    setLoading(true);
    try {
      await axios.post(`${API}/send-otp`, {
        email: email.trim(),
      });

      setEmailSent(true);
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     CHANGE PASSWORD
  ====================== */
  const changePassword = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      return toast.error("OTP is required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/changePW`, {
        email: email.trim(),
        otp: otp.trim(),
        password,
      });

      toast.success(res.data.message || "Password changed successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6f8] px-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg border border-gray-300 bg-white">
        {emailSent ? (
          <>
            <h1 className="text-2xl font-semibold text-center mb-4">
              Reset Password
            </h1>

            <p className="text-sm text-center mb-6 text-gray-600">
              Enter the OTP sent to your email and set a new password.
            </p>

            <form className="flex flex-col gap-4" onSubmit={changePassword}>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              />

              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-pink-700 hover:bg-pink-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 transition"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Remembered your password?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-pink-600 hover:underline"
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-center mb-4">
              Forgot Password
            </h1>

            <p className="text-sm text-center mb-6 text-gray-600">
              Enter your email to receive a one-time password (OTP).
            </p>

            <form className="flex flex-col gap-4" onSubmit={sendEmail}>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-pink-700 hover:bg-pink-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 transition"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
