import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";
import UserData from "./userdata";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#521B41] to-[#7E3754] shadow-md sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-4">
        
        {/* Top bar: title center, cart + user right */}
        <div className="flex items-center justify-between">
          {/* Left spacer (empty to help center title) */}
          <div className="w-1/4 hidden md:block" />

          {/* Centered Title */}
          <h1 className="text-[#FDECEF] text-lg sm:text-2xl font-extrabold tracking-wide text-center flex-1">
            CRYSTEL BEAUTY CLEAR.LK
          </h1>

          {/* Right items: Cart and User */}
          <div className="flex items-center justify-end gap-4 w-1/4">
            <Link to="/cart" className="text-[#FADADD] text-2xl hover:text-white transition">
              <GrCart />
            </Link>
            <UserData />
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="mt-4 flex flex-wrap justify-center gap-6 text-[#FADADD] text-sm sm:text-base font-medium">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/products" className="hover:text-white transition">Products</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
          <Link to="/reviews" className="hover:text-white transition">Reviews</Link>
        </nav>
      </div>
    </header>
  );
}
