import axios from "axios";
import { useEffect, useState } from "react";
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
      const res = await axios.get(`${API}/search/${encodeURIComponent(search)}`);
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
      
      {/* ================= SEARCH BAR ================= */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center">
          <div className="flex items-center gap-2 w-full max-w-xl">
            <input
              type="text"
              placeholder="Search beauty products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchProducts()}
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9D6777]"
            />

            <button
              onClick={searchProducts}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#9D6777] to-[#542C3C] text-white text-sm font-medium hover:brightness-110 transition"
            >
              Search
            </button>

            <button
              onClick={() => {
                setSearch("");
                loadProducts();
              }}
              className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 transition"
            >
              Reset
            </button>
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
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-2">Try another keyword ✨</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
