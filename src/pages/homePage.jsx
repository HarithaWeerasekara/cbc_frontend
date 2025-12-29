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

  const trending = products.slice(0, 4);
  const discounted = products.slice(-4);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0b061a] via-[#2b1640] to-[#12081e] text-white">
      <Header />

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
                      Trusted since <strong>2001</strong>. Natural science,
                      global ingredients, confident results.
                    </p>

                    <div className="mt-12 flex justify-center gap-5">
                      <Link
                      to="/products"
                      className="
                        px-9 py-4
                        rounded-full
                        bg-gradient-to-r from-pink-500 to-purple-600
                        text-white
                        font-semibold
                        shadow-[0_0_30px_rgba(236,72,153,0.4)]
                        hover:scale-110
                        transition-all
                      "
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12 place-items-center sm:place-items-stretch">
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12 place-items-center sm:place-items-stretch">
                        {discounted.map((p) => (
                          <ProductCard key={p.productId} product={p} />
                        ))}
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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
