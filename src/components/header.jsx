import { useState, useRef, useEffect } from "react";
import { GrCart } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserData from "./userdata";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-[#EEEDE7D7] text-[#4A413C]">
      <div className="max-w-7xl mx-auto px-4 py-4 bg-[#EEEDE7D7] relative">
        {/* Top section */}
        <div className="flex items-center justify-between relative">
          {/* Left: Cart */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="text-[#462B26] text-2xl hover:text-[#542C3C] transition"
            >
              <GrCart />
            </Link>
          </div>

          {/* Center: Title */}
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-2xl font-extrabold tracking-wide text-[#4A413C] text-center select-none">
            CRYSTEL BEAUTY CLEAR
          </h1>

          {/* Right: Desktop UserData / Mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Show on desktop only */}
            <div className="hidden md:block">
              <UserData />
            </div>

            {/* Show icon + dropdown on mobile */}
            <div className="relative md:hidden" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-[#542C3C] text-2xl focus:outline-none"
                aria-label="User menu"
              >
                <FiUser />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-md z-10">
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-wrap justify-center gap-6 text-[#9D6777] text-sm sm:text-base font-medium select-none">
          <Link to="/" className="hover:text-[#542C3C] transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-[#542C3C] transition">
            Products
          </Link>
          <Link to="/contact" className="hover:text-[#542C3C] transition">
            Contact
          </Link>
          <Link to="/reviews" className="hover:text-[#542C3C] transition">
            Reviews
          </Link>
        </nav>
      </div>
    </header>
  );
}
