import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn, FiLogOut, FiUserPlus, FiUser } from "react-icons/fi";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    axios
      .get(import.meta.env.VITE_API_URL + "/user", {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const baseBtn =
    "px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all shadow hover:shadow-md";

  const primaryBtn =
    "bg-gradient-to-r from-[#9D6777] to-[#542C3C] text-white hover:brightness-110";

  if (loading) return null; // prevents UI flicker

  return (
    <div className="flex items-center">
      {!user ? (
        <>
          {/* Desktop */}
          <div className="hidden sm:flex gap-3">
            <Link to="/login" className={`${baseBtn} ${primaryBtn}`}>
              <FiLogIn /> Login
            </Link>
            <Link to="/register" className={`${baseBtn} ${primaryBtn}`}>
              <FiUserPlus /> Register
            </Link>
          </div>

          {/* Mobile */}
          <div className="sm:hidden relative">
            <button
              aria-label="User menu"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2 rounded-full hover:bg-white/10"
            >
              <FiLogIn size={22} />
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg p-3 w-40 z-50">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${baseBtn} ${primaryBtn} w-full justify-center mb-2`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${baseBtn} ${primaryBtn} w-full justify-center`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-[#D4A49C] font-medium flex items-center gap-1">
            <FiUser />
            Hi, {user.name?.split(" ")[0] || "User"}
          </span>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
              navigate("/login");
            }}
            className={`${baseBtn} bg-[#EBEFEE] text-[#542C3C] border border-[#D4A49C] hover:bg-[#D4A49C] hover:text-white`}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
