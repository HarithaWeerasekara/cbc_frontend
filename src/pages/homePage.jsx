import { Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/header";
import Footer from "../components/footer";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import ForgotPassword from "./client/forgetPassword";
import ProductCard from "../components/product-card";
import Loader from "../components/loader";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  /* ================= LOAD PRODUCTS ================= */
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.products;
        setProducts(data || []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  /* ================= SCROLL SEARCH BAR ================= */
  useEffect(() => {
    const onScroll = () => {
      setShowSearch(window.scrollY > 250);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trending = products.slice(0, 4);
  const discounted = products.slice(-4);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0b061a] via-[#2b1640] to-[#12081e] text-white">
      <Header />

      {/* ================= FLOATING SEARCH ================= */}
      <div
        className={`fixed top-20 left-1/2 z-50 w-[92%] max-w-2xl -translate-x-1/2 transition-all duration-500 ${
          showSearch
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-2xl px-6 py-3 flex items-center gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-white placeholder:text-white/60"
          />
          <span className="text-white/70 text-sm">⌘ K</span>
        </div>
      </div>

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* ================= HERO ================= */}
                <section className="relative overflow-hidden">
                  <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />
                  <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />

                  <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-300 via-white to-purple-300 bg-clip-text text-transparent">
                      Beauty, Re-Engineered
                    </h1>

                    <p className="mt-6 max-w-3xl mx-auto text-lg text-white/80">
                      Trusted since <strong>2001</strong>. Natural science, global
                      ingredients, confident results.
                    </p>

                    <div className="mt-12 flex justify-center gap-5">
                      <Link
                        to="/products"
                        className="px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-semibold shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:scale-110 transition-all"
                      >
                        Shop Now
                      </Link>

                      <Link
                        to="/contact"
                        className="px-9 py-4 rounded-full border border-white/30 backdrop-blur hover:bg-white/10 transition"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </section>

                {/* ================= CONTENT ================= */}
                <section className="bg-gradient-to-b from-[#faf7ff] to-[#f3e8ff] text-[#3b2a3a]">
                  <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">

                    {/* TRENDING */}
                    <div>
                      <h2 className="text-3xl font-bold text-center text-[#542C3C]">
                        🔥 Trending Products
                      </h2>

                      {loading ? (
                        <div className="flex justify-center mt-12">
                          <Loader />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                          {trending.map((p) => (
                            <ProductCard key={p.productId} product={p} />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* DISCOUNT */}
                    <div>
                      <h2 className="text-3xl font-bold text-center text-[#542C3C]">
                        💸 Big Discounts
                      </h2>

                      <p className="text-center text-sm text-[#9D6777] mt-2">
                        Limited-time offers you shouldn’t miss
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                        {discounted.map((p) => (
                          <ProductCard key={p.productId} product={p} />
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="relative rounded-3xl bg-gradient-to-r from-[#542C3C] to-[#9D6777] p-10 text-center shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                      <div className="relative">
                        <h3 className="text-2xl font-bold text-white">
                          Discover Your Perfect Glow ✨
                        </h3>
                        <p className="text-white/80 mt-2">
                          Explore our complete beauty collection
                        </p>

                        <Link
                          to="/products"
                          className="inline-block mt-6 px-12 py-4 rounded-full bg-white text-[#542C3C] font-semibold hover:scale-110 transition"
                        >
                          View All Products →
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            }
          />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/overview/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/forget" element={<ForgotPassword />} />

          <Route
            path="/*"
            element={
              <div className="py-24 text-center text-white">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="mt-2 text-white/70">Page not found</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
