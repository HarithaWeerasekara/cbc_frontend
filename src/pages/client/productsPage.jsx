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
    <div className="min-h-screen w-full bg-[#ECDCDF] py-6 px-4">
      {productsLoaded ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl">
            {productList.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      )}
    </div>
  );
}
