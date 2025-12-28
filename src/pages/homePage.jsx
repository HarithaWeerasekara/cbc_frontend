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

  /* ================= LOAD PRODUCTS FOR HOME ================= */
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

  const trending = products.slice(0, 4);
  const discounted = products.slice(-4);

  return (
    <div className="min-h-screen flex flex-col text-[#4A413C] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <Header />

      <main className="flex-grow">
        <Routes>
          {/* ================= HOME ================= */}
          <Route
            path="/"
            element={
              <>
                {/* ================= HERO ================= */}
                <section className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#000000cc] via-[#3b1d3fbb] to-[#000000cc]" />
                  <div className="relative max-w-7xl mx-auto px-6 py-28 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                      Beauty, Re-Engineered
                    </h1>

                    <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-white/80">
                      Trusted since <strong>2001</strong>.  
                      Natural science, global ingredients, confident results.
                    </p>

                    <div className="mt-10 flex justify-center gap-4">
                      <Link
                        to="/products"
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-[#ff4ecd] to-[#6c63ff] font-semibold shadow-xl hover:scale-105 transition"
                      >
                        Shop Now
                      </Link>

                      <Link
                        to="/contact"
                        className="px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 transition"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </section>

                {/* ================= CONTENT ================= */}
                <section className="bg-gradient-to-b from-[#fdfbff] to-[#f3e8ff] text-[#4A413C]">
                  <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">

                    {/* ===== TRENDING ===== */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#542C3C]">
                        🔥 Trending Products
                      </h2>

                      {loading ? (
                        <div className="flex justify-center mt-10">
                          <Loader />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                          {trending.map((p) => (
                            <ProductCard key={p.productId} product={p} />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ===== DISCOUNT ===== */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#542C3C]">
                        💸 Big Discounts
                      </h2>

                      <p className="text-center text-sm text-[#9D6777] mt-2">
                        Limited-time offers you shouldn’t miss
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                        {discounted.map((p) => (
                          <ProductCard key={p.productId} product={p} />
                        ))}
                      </div>
                    </div>

                    {/* ===== ALL PRODUCTS CTA ===== */}
                    <div className="text-center pt-10">
                      <Link
                        to="/products"
                        className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#542C3C] to-[#9D6777] text-white font-semibold shadow-lg hover:scale-105 transition"
                      >
                        View All Products →
                      </Link>
                    </div>
                  </div>
                </section>
              </>
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
              <div className="py-24 text-center text-white">
                <h1 className="text-3xl font-bold">404</h1>
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
