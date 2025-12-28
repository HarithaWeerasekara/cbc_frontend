import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="
        mt-20
        bg-gradient-to-br from-[#fdfbff] via-[#f6e9f3] to-[#eef2ff]
        border-t border-white/40
        backdrop-blur-xl
      "
    >
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">

        {/* Brand */}
        <Link
          to="/"
          className="
            inline-block
            text-lg sm:text-xl font-extrabold tracking-widest
            bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600
            bg-clip-text text-transparent
            hover:opacity-80 transition
          "
        >
          CRYSTEL BEAUTY CLEAR
        </Link>

        {/* Divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto my-4" />

        {/* Copyright */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Crystel Beauty Clear. All rights reserved.
        </p>

        {/* Credit */}
        <p className="mt-2 text-xs text-gray-500">
          Designed & Developed by{" "}
          <span className="font-medium text-gray-700">
            Haritha Weerasekara
          </span>
        </p>
      </div>
    </footer>
  );
}
