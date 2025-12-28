import { Route, Routes, Link } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import Footer from "../components/footer";
import ForgotPassword from "./client/forgetPassword";

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col text-[#4A413C] bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/63/4e/d5/634ed52c8a9c9dfcee81f451bcc8ec0c.jpg')",
      }}
    >
      <Header />

      {/* Soft overlay for eye comfort */}
      <main className="flex-grow bg-white/85 backdrop-blur-sm">
        <Routes>
          {/* ================= HOME ================= */}
          <Route
            path="/"
            element={
              <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-16">
                {/* Hero */}
                <div className="text-center mb-14">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#542C3C] leading-tight">
                    Naturally Beautiful. <br className="hidden sm:block" />
                    Scientifically Trusted.
                  </h1>

                  <p className="mt-6 text-base sm:text-lg md:text-xl text-[#4A413C]/90 max-w-3xl mx-auto">
                    Since <strong>2001</strong>, Crystel Beauty Clear has been delivering
                    safe, effective, and natural beauty solutions trusted across Sri Lanka
                    and beyond.
                  </p>
                </div>

                {/* Trust stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-14">
                  <div className="bg-white/90 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-3xl font-bold text-[#542C3C]">20+</h3>
                    <p className="mt-2 text-sm text-[#9D6777]">
                      Branches Nationwide
                    </p>
                  </div>

                  <div className="bg-white/90 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-3xl font-bold text-[#542C3C]">4+</h3>
                    <p className="mt-2 text-sm text-[#9D6777]">
                      Countries Supplying Ingredients
                    </p>
                  </div>

                  <div className="bg-white/90 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-3xl font-bold text-[#542C3C]">Global</h3>
                    <p className="mt-2 text-sm text-[#9D6777]">
                      Exported Worldwide
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="max-w-4xl mx-auto text-center space-y-6 mb-14">
                  <p className="text-base sm:text-lg">
                    Our ingredients are carefully sourced from{" "}
                    <strong>Japan, France, Thailand, and Korea</strong> — combining
                    global science with local expertise.
                  </p>

                  <p className="text-base sm:text-lg">
                    With branches in{" "}
                    <span className="font-medium text-[#9D6777]">
                      Galle, Jaffna, Kurunegala, Badulla, Ampara, Matara
                    </span>{" "}
                    and more, we proudly serve every corner of Sri Lanka.
                  </p>

                  <p className="italic text-[#9D6777]">
                    “Our mission is to help every individual glow with confidence —
                    naturally and responsibly.”
                  </p>
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#542C3C] to-[#9D6777] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition-all"
                  >
                    Explore Our Products
                  </Link>
                </div>
              </section>
            }
          />

          {/* ================= ROUTES ================= */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/overview/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/forget" element={<ForgotPassword />} />

          {/* ================= 404 ================= */}
          <Route
            path="/*"
            element={
              <div className="py-24 text-center text-[#9D6777]">
                <h1 className="text-2xl font-bold">404</h1>
                <p className="mt-2">Page not found</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
