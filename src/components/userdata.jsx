import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
      axios
        .get(import.meta.env.VITE_API_URL + "/user", {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        })
        .then((response) => {
          console.log("User response:", response.data);
          setUser(response.data);
        })
        .catch((err) => {
          console.error("User fetch failed:", err);
          setUser(null);
        });
    }
  }, [token]);

  const buttonStyle =
    "px-4 py-2 rounded-full font-medium transition-all duration-300 shadow hover:shadow-md";

  return (
    <div className="flex gap-4 items-center justify-center text-sm sm:text-base">
      {user == null ? (
        <>
          <Link
            to="/login"
            className={`${buttonStyle} bg-gradient-to-r from-[#7E3754] to-[#521B41] text-white hover:brightness-110`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`${buttonStyle} border border-[#7E3754] text-[#7E3754] hover:bg-[#7E3754] hover:text-white`}
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <span className="text-[#ECB8CE] font-semibold hidden sm:inline">
            Hi {user.name || "User"}
          </span>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
              setToken(null);
              window.location.assign("/login");
            }}
            className={`${buttonStyle} bg-red-100 text-red-600 hover:bg-red-200`}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
