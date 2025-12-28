import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_BACKEND_URL + "/api/product";

  /* ================= LOAD ALL PRODUCTS ================= */
  function loadProducts() {
    setLoading(true);
    axios
      .get(API_BASE)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.products;
        setProductList(data || []);
      })
      .catch((err) => {
        console.error("Product load error:", err);
        setProductList([]);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  /* ================= SEARCH ================= */
  function searchProducts() {
    if (!search.trim()) {
      loadProducts();
      return;
    }

    setLoading(true);
    axios
      .get(`${API_BASE}/search/${encodeURIComponent(search)}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.products;
        setProductList(data || []);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setProductList([]);
      })
      .finally(() => setLoading(false));
  }

  return (
    <section className="min-h-screen bg-white/90">
      {/* ================= SEARCH BAR ================= */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchProducts()}
            className="w-full sm:w-80 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9D6777]"
          />

          <div className="flex gap-2">
            <button
              onClick={searchProducts}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#542C3C] to-[#9D6777] text-white font-medium hover:brightness-110 transition"
            >
              Search
            </button>

            <button
              onClick={() => {
                setSearch("");
                loadProducts();
              }}
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader />
          </div>
        ) : productList.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-2">Try a different keyword</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </main>
    </section>
  );
}
