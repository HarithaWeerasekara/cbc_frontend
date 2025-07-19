import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#521B41] to-[#7E3754] shadow-md sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 relative">
        
        {/* Centered Title */}
        <div className="flex justify-center">
          <h1 className="text-[#FDECEF] text-lg sm:text-2xl font-extrabold tracking-wide text-center">
            CRYSTEL BEAUTY CLEAR.LK
          </h1>
        </div>

        <>
  {/* Desktop: Absolute Positioned Right */}
  <Link
    to="/cart"
    className="hidden md:block absolute top-10 right-20 text-[#FADADD] text-2xl hover:text-white transition "
  >
    <GrCart />
  </Link>

  {/* Mobile: Center Aligned */}
  <div className="block md:hidden absolute top-9 right-10">
    <Link
      to="/cart"
      className="text-[#FADADD] text-2xl hover:text-white transition"
    >
      <GrCart />
    </Link>
  </div>
</>


        {/* Navigation - Always visible below title */}
        <nav className="mt-3 flex flex-wrap justify-center gap-6 text-[#FADADD] text-sm sm:text-base font-medium">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/products" className="hover:text-white transition">Products</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
          <Link to="/reviews" className="hover:text-white transition">Reviews</Link>
          <UserData />
        </nav>
      </div>
    </header>
  );
}
