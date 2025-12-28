import { useState, useRef, useEffect } from "react";
import { GrCart } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserData from "./userdata";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click or ESC
  useEffect(() => {
    function handleClose(event) {
      if (
        (event.type === "mousedown" &&
          menuRef.current &&
          !menuRef.current.contains(event.target)) ||
        (event.type === "keydown" && event.key === "Escape")
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClose);
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("keydown", handleClose);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#EEEDE7]/90 backdrop-blur border-b border-[#e4e2dd]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top bar */}
        <div className="flex items-center justify-between relative">
          {/* Cart */}
          <Link
            to="/cart"
            aria-label="View cart"
            className="text-[#462B26] text-2xl hover:text-[#542C3C] transition"
          >
            <GrCart />
          </Link>

          {/* Logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-2xl 
                       font-extrabold tracking-wide text-[#4A413C] select-none"
          >
            CRYSTEL BEAUTY CLEAR
          </Link>

          {/* User area */}
          <div className="flex items-center gap-4">
            {/* Desktop */}
            <div className="hidden md:block">
              <UserData />
            </div>

            {/* Mobile */}
            <div className="relative md:hidden" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-label="User menu"
                className="text-[#542C3C] text-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
              >
                <FiUser />
              </button>

              <div
                className={`absolute right-0 mt-2 w-36 bg-white border border-gray-200 
                            rounded-xl shadow-lg overflow-hidden transition-all duration-200
                            ${
                              menuOpen
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95 pointer-events-none"
                            }`}
              >
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Primary navigation"
          className="mt-4 flex justify-center gap-6 text-[#9D6777] text-sm sm:text-base font-medium"
        >
          {["Home", "Products", "Contact", "Reviews"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative hover:text-[#542C3C] transition
                         after:absolute after:left-0 after:-bottom-1 after:h-[2px] 
                         after:w-0 after:bg-[#542C3C] after:transition-all
                         hover:after:w-full"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
