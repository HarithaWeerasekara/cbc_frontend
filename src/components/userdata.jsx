import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiShoppingBag, FiUser } from "react-icons/fi";

export default function UserData() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(import.meta.env.VITE_API_URL + "/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  /* ================= NOT LOGGED IN ================= */
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="
            px-4 py-2 rounded-full text-sm font-medium
            border border-pink-500/40 text-pink-600
            hover:bg-pink-50 transition
          "
        >
          Login
        </Link>

        <Link
          to="/register"
          className="
            px-4 py-2 rounded-full text-sm font-semibold
            bg-gradient-to-r from-pink-500 to-purple-500
            text-white shadow-md
            hover:scale-105 hover:brightness-110
            transition
          "
        >
          Sign up
        </Link>
      </div>
    );
  }

  /* ================= LOGGED IN ================= */
  return (
    <div className="flex items-center gap-4">
      {/* Shop Button */}
      <Link
        to="/products"
        className="
          hidden sm:flex items-center gap-2
          px-4 py-2 rounded-full
          bg-white/70 backdrop-blur
          border border-white/40
          text-sm font-medium
          shadow-sm
          hover:shadow-md hover:scale-105
          transition
        "
      >
        <FiShoppingBag className="text-pink-600" />
        Shop
      </Link>

      {/* User pill */}
      <div
        className="
          flex items-center gap-2
          px-4 py-2 rounded-full
          bg-white/70 backdrop-blur
          border border-white/40
          shadow-sm
        "
      >
        <FiUser className="text-pink-600" />

        <span className="text-sm font-medium text-gray-700 max-w-[90px] truncate">
          {user.name || "User"}
        </span>

        <button
          onClick={logout}
          title="Logout"
          className="
            p-1.5 rounded-full
            text-gray-500
            hover:text-red-500 hover:bg-red-50
            transition
          "
        >
          <FiLogOut size={16} />
        </button>
      </div>
    </div>
  );
}
