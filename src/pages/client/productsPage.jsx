import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if (!productsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((res) => {
          console.log("Loaded products:", res.data);
          setProductList(res.data);
          setProductsLoaded(true);
        })
        .catch((err) => {
          console.error("Error loading products:", err);
        });
    }
  }, [productsLoaded]);

  return (
    <div className="min-h-screen w-full bg-[#F9F9F9] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#9B3C6C] mb-8">
          Explore Our Products
        </h1>

        {productsLoaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productList.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
