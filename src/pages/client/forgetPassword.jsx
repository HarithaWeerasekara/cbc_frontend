import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

  // ======================
  // SEND OTP
  // ======================
  const sendEmail = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    setLoading(true);
    try {
      await axios.post(`${API}/send-otp`, { email });
      setEmailSent(true);
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // CHANGE PASSWORD
  // ======================
  const changePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/changePW`, {
        email,
        otp,
        password,
      });

      toast.success(res.data.message || "Password changed successfully");
      window.location.href = "/login";
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
            <p className="text-sm text-center mb-6">
              Enter the OTP sent to your email and set a new password.
            </p>

            <form className="flex flex-col gap-4" onSubmit={changePassword}>
              <input
                type="text"
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
                className="bg-pink-800 hover:bg-pink-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Remembered your password?{" "}
              <a href="/login" className="text-pink-600 hover:underline">
                Login
              </a>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-center mb-4">
              Forgot Password
            </h1>
            <p className="text-sm text-center mb-6">
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
                className="bg-pink-800 hover:bg-pink-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
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
