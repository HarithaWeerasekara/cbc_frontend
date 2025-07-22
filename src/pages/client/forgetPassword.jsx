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

  // Send OTP
  const sendEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/send-otp`,
        { email }
      );

      if (res.data?.otp) {
        setEmailSent(true);
        alert("OTP sent to your email.");
      } else {
        alert("Failed to send OTP.");
      }
    } catch (err) {
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  
  async function changePassword(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/changePW`,
        {
          email: email,
          otp: otp,
          password: password,
        }
      );
      console.log(response.data);
      toast.success("Password changed successfully.");

      location.href = "/login"; // Redirect to login page
      
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please try again.");
      window.location.reload(); // Reload the page to reset state
    } finally {
      setLoading(false);
    }
  }

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
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-pink-800 hover:bg-pink-600 text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
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
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                sendEmail();
              }}
            >
              <input
                type="email"
                placeholder="Email Address"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={loading}
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-pink-800 hover:bg-pink-600 text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
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
