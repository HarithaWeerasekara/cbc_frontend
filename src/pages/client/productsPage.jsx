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
          setProductList(res.data);
          setProductsLoaded(true);
        })
        .catch((err) => {
          console.error("Error loading products:", err);
        });
    }
  }, [productsLoaded]);

  return (
    <div className="relative flex flex-col min-h-screen text-[#521B41]">
      {/* Fullscreen blurred background image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/63/4e/d5/634ed52c8a9c9dfcee81f451bcc8ec0c.jpg')",
        }}
      />

      {/* Optional: You can add your Header component here if you have one */}
      {/* <Header /> */}

      {/* Content container, centered, limited width, minimal padding */}
      <main className="flex-grow py-10 px-4 max-w-7xl mx-auto w-full">
        {productsLoaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader />
          </div>
        )}
      </main>

      {/* Optional: Footer component */}
      {/* <Footer /> */}
    </div>
  );
}
