import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all products initially
  useEffect(() => {
    if (!productsLoaded) {
      setLoading(true);
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
        .then((res) => {
          const data = Array.isArray(res.data) ? res.data : res.data.products;
          setProductList(data || []);
        })
        .catch((err) => {
          console.error("Error loading products:", err);
          setProductList([]);
        })
        .finally(() => {
          setLoading(false);
          setProductsLoaded(true);
        });
    }
  }, [productsLoaded]);

  // Search products only on button click
  function searchProducts() {
    setLoading(true);

    const baseUrl = import.meta.env.VITE_BACKEND_URL + "/api/product";
    const fetchUrl = search.trim().length > 0
      ? `${baseUrl}/search/${encodeURIComponent(search)}`
      : `${baseUrl}/`;

    axios.get(fetchUrl)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.products;
        setProductList(data || []);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setProductList([]);
      })
      .finally(() => {
        setLoading(false);
        setProductsLoaded(true);
      });
  }

  return (
    <div className="relative flex flex-col min-h-screen text-[#521B41]">
      {/* Search Bar */}
      <div className="w-full h-[60px] bg-[#F2D3D3] flex justify-center items-center">
        <input
          type="text"
          placeholder="Search"
          value={search}
          className="w-[300px] h-[30px] border-2 border-[#521B41] rounded-md px-2 focus:outline-none focus:border-[#521B41]"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-[#521B41] text-white rounded-md hover:bg-[#3d0f2a] transition-colors"
          onClick={searchProducts}
        >
          Search
        </button>

        <button className="ml-2 px-4 py-2 bg-[#521B41] text-white rounded-md hover:bg-[#3d0f2a] transition-colors"
        onClick={()=>{
          setProductsLoaded(false);
        }} >
          Reset
        </button>
      </div>

      {/* Background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/63/4e/d5/634ed52c8a9c9dfcee81f451bcc8ec0c.jpg')",
        }}
      />

      {/* Product Grid */}
      <main className="flex-grow py-10 px-4 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
