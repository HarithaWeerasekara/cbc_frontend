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
    <header
      className="
        sticky top-0 z-50
        bg-white/70 backdrop-blur-xl
        border-b border-white/30
        shadow-[0_8px_30px_rgba(0,0,0,0.04)]
      "
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* ================= TOP BAR ================= */}
        <div className="flex items-center justify-between relative">
          {/* Cart */}
          <Link
            to="/cart"
            aria-label="View cart"
            className="
              relative text-xl
              text-gray-800
              hover:text-pink-600
              transition
            "
          >
            <GrCart />
            <span
              className="
                absolute -inset-2 rounded-full
                bg-pink-500/10
                opacity-0 hover:opacity-100
                transition
              "
            />
          </Link>

          {/* Logo */}
          <Link
            to="/"
            className="
              absolute left-1/2 -translate-x-1/2
              text-lg sm:text-2xl
              font-extrabold tracking-widest
              bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600
              bg-clip-text text-transparent
              select-none
            "
          >
            CRYSTEL
          </Link>

          {/* User Area */}
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
                className="
                  text-xl text-gray-800
                  hover:text-pink-600
                  transition
                  focus:outline-none
                  focus:ring-2 focus:ring-pink-400
                  rounded-full
                "
              >
                <FiUser />
              </button>

              {/* Dropdown */}
              <div
                className={`
                  absolute right-0 mt-3 w-40
                  rounded-2xl
                  bg-white/90 backdrop-blur-lg
                  border border-white/40
                  shadow-xl
                  transition-all duration-300 origin-top-right
                  ${
                    menuOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
              >
                <Link
                  to="/login"
                  className="
                    block px-4 py-3 text-sm
                    text-gray-800
                    hover:bg-pink-50
                    transition
                  "
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    block px-4 py-3 text-sm
                    text-gray-800
                    hover:bg-pink-50
                    transition
                  "
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav
          aria-label="Primary navigation"
          className="
            mt-5 flex justify-center gap-8
            text-sm sm:text-base font-medium
          "
        >
          {["Home", "Products", "Contact", "Reviews"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="
                relative transition
                text-gray-800
                hover:text-pink-600
                after:absolute after:left-1/2 after:-bottom-2
                after:h-[2px] after:w-0
                after:bg-gradient-to-r after:from-pink-500 after:to-purple-500
                after:transition-all after:duration-300
                after:-translate-x-1/2
                hover:after:w-full
              "
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
