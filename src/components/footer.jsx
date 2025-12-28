import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#542C3C] text-[#F3D6D0]">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <Link
          to="/"
          className="block text-base font-semibold tracking-wide hover:text-white transition"
        >
          CRYSTEL BEAUTY CLEAR
        </Link>

        <p className="mt-3 text-sm text-[#E6B8AE]">
          © {new Date().getFullYear()} Crystel Beauty Clear. All rights reserved.
        </p>

        <p className="mt-2 text-xs text-[#D4A49C]">
          Designed & Developed by{" "}
          <span className="font-medium">Haritha Weerasekara</span>
        </p>
      </div>
    </footer>
  );
}
