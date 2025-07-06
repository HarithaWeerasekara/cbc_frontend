import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#521B41] to-[#7E3754] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Title */}
          <h1 className="text-[#FDECEF] text-xl sm:text-2xl font-extrabold tracking-wide">
            CRYSTEL BEAUTY CLEAR.LK
          </h1>

          {/* Nav Links */}
          <nav className="hidden sm:flex gap-6 text-[#FADADD] text-sm sm:text-base font-medium">
            <Link to="/" className="hover:text-white transition duration-200">Home</Link>
            <Link to="/products" className="hover:text-white transition duration-200">Products</Link>
            <Link to="/contact" className="hover:text-white transition duration-200">Contact</Link>
            <Link to="/reviews" className="hover:text-white transition duration-200">Reviews</Link>
          </nav>

          {/* Cart Icon */}
          <Link to="/cart" className="text-[#FADADD] text-2xl hover:text-white transition duration-200">
            <GrCart />
          </Link>
        </div>

        {/* Mobile nav (visible only on small screens) */}
        <div className="sm:hidden mt-2 flex flex-col items-center gap-3 text-[#FADADD] text-sm font-medium">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/products" className="hover:text-white">Products</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
          <Link to="/reviews" className="hover:text-white">Reviews</Link>
        </div>
      </div>
    </header>
  );
}
