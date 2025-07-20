import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiLogOut, FiUserPlus, FiUser } from "react-icons/fi";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
      axios
        .get(import.meta.env.VITE_API_URL + "/user", {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        })
        .then((response) => setUser(response.data))
        .catch((err) => {
          console.error("User fetch failed:", err);
          setUser(null);
        });
    }
  }, [token]);

  const buttonStyle =
    "px-2 py-2 rounded-full font-medium transition-all duration-300 shadow hover:shadow-md flex items-center gap-2 text-sm sm:text-base";

  const fullButtonStyle =
    "bg-gradient-to-r from-[#9D6777] to-[#542C3C] text-white hover:brightness-110 px-5 m-1";

  const outlineStyle =
    "bg-gradient-to-r from-[#9D6777] to-[#542C3C] text-white hover:brightness-110 ";

  return (
    <div className="flex justify-center items-center">
      {user == null ? (
        <>
          {/* Desktop view: show both */}
          <div className="hidden sm:flex gap-3 items-center">
            <Link to="/login" className={`${buttonStyle} ${fullButtonStyle}`}>
              <FiLogIn />
              Login
            </Link>
            <Link to="/register" className={`${buttonStyle} ${outlineStyle}`}>
              <FiUserPlus />
              Register
            </Link>
          </div>

          {/* Mobile view: icon toggle */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#D4A49C] p-2 rounded-full hover:bg-[#EBEFEE] px-50"
            >
              <FiLogIn size={22} />
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-3 flex flex-col gap-2 z-50">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${buttonStyle} ${fullButtonStyle} w-full justify-center`}
                >
                  <FiLogIn />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${buttonStyle} ${outlineStyle} w-full justify-center`}
                >
                  <FiUserPlus />
                  Register
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-[#D4A49C] font-semibold flex items-center gap-1">
            <FiUser className="text-[#4A413C]" />
            <span className="hidden sm:inline">Hi</span>
            {user.name || "User"}
          </span>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
              setToken(null);
              window.location.assign("/login");
            }}
            className={`${buttonStyle} bg-[#EBEFEE] text-[#542C3C] border border-[#D4A49C] hover:bg-[#D4A49C] hover:text-white`}
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
