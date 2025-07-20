import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";
import UserData from "./userdata";

export default function Header() {
  return (
    <header className="bg-gradient-to-r shadow-md sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 bg-[#EBEFEE]">

         {/* Title - flex-grow to center */}
          <h1 className="flex-1 text-[#4A413C] text-lg sm:text-2xl font-extrabold tracking-wide text-center">
            CRYSTEL BEAUTY CLEAR
          </h1>

        <div className="flex items-center justify-between">
          {/* Left spacer hidden on mobile */}
          <div className="w-1/4 hidden md:block" />

         

          {/* Right side - fixed width on mobile */}
          <div className="flex items-center justify-end ">
            <Link to="/cart" className="text-[#D4A49C] text-2xl hover:text-[#542C3C] transition px-4">
              <GrCart />
            </Link>
            <UserData />
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-wrap justify-center gap-6 text-[#9D6777] text-sm sm:text-base font-medium">
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
