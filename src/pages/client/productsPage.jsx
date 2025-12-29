import axios from "axios";
import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const API = import.meta.env.VITE_BACKEND_URL + "/api/product";

  /* ================= LOAD PRODUCTS ================= */
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      const data = Array.isArray(res.data) ? res.data : res.data.products;
      setProductList(data || []);
    } catch (err) {
      console.error("Load error:", err);
      setProductList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ================= SEARCH ================= */
  const searchProducts = async () => {
    if (!search.trim()) return loadProducts();

    try {
      setLoading(true);
      const res = await axios.get(
        `${API}/search/${encodeURIComponent(search)}`
      );
      const data = Array.isArray(res.data) ? res.data : res.data.products;
      setProductList(data || []);
    } catch (err) {
      console.error("Search error:", err);
      setProductList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-[#4A413C] bg-gradient-to-br from-[#fdfbff] via-[#f6e9f3] to-[#eef2ff]">

      {/* ================= FIXED SEARCH BAR ================= */}
      <div className="sticky top-[72px] z-30">
        <div className="flex justify-center px-3 sm:px-4 pt-4 sm:pt-6">
          <div
            className="
              w-full max-w-xl
              flex items-center gap-2
              px-4 py-3
              rounded-full
              bg-white/80 backdrop-blur-xl
              border border-white/40
              shadow-lg
              focus-within:shadow-[0_0_0_4px_rgba(236,72,153,0.15)]
            "
          >
            <FiSearch className="text-pink-500 text-lg shrink-0" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchProducts()}
              className="
                flex-1 bg-transparent
                text-sm sm:text-base
                placeholder-gray-400
                focus:outline-none
              "
            />

            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  loadProducts();
                }}
                className="
                  p-2 rounded-full
                  text-gray-400
                  hover:text-pink-500
                  hover:bg-pink-50
                  transition
                "
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader />
          </div>
        ) : productList.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-2">Try another keyword ✨</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center sm:place-items-stretch">
            {productList.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
