import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cart"; // Make sure this utility exists

export default function ProductOverview() {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!params.id) {
      navigate("/products");
    }
  }, [params.id, navigate]);

  useEffect(() => {
    if (status === "loading" && params.id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${params.id}`)
        .then((res) => {
          setProduct(res.data.product);
          setStatus("loaded");
        })
        .catch(() => {
          toast.error("Product not found");
          setStatus("error");
        });
    }
  }, [status, params.id]);

  if (status === "loading") return <Loader />;

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold text-xl">
        Error loading product. Please try again later.
      </div>
    );
  }

  const qty = 1;

  return (
    <div className="w-full min-h-screen bg-[#F7F7F7] flex flex-col sm:flex-row">
      {/* Image Section */}
      <div className="sm:w-1/2 p-4 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <ImageSlider images={product.images || []} />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="sm:w-1/2 p-6 flex flex-col justify-center text-center sm:text-left min-h-[400px]">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#3D1F25]">
          {product.name || "Unnamed Product"}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 mb-3">
          {(product.altNames || []).join(" | ")}
        </p>

        {/* Price */}
        <div className="mb-6">
          {product.labeledPrice > product.price ? (
            <div className="flex justify-center sm:justify-start items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#4A1E25]">
                LKR {product.price.toFixed(2)}
              </span>
              <span className="text-lg sm:text-xl line-through text-gray-500">
                LKR {product.labeledPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-2xl sm:text-3xl font-bold text-[#4A1E25]">
              LKR {product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mb-8 text-gray-700 text-sm sm:text-base">
          {product.description || "No description available."}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center sm:justify-start gap-4 flex-wrap">
          <button
            className="bg-[#64242F] text-pink-200 px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-[#4A1E25] transition duration-300 font-semibold text-sm sm:text-base"
            onClick={async () => {
              await addToCart(product, 1);
              toast.success("Product added to cart");
            }}
          >
            Add to Cart
          </button>

          <button
            onClick={() => {
              navigate("/checkout", {
                state: {
                  items: [
                    {
                      productId: product.productId || product._id,
                      name: product.name || "",
                      altNames: product.altNames || [],
                      price: product.price || 0,
                      labeledPrice: product.labeledPrice || 0,
                      image: product.images?.[0] || "",
                      quantity: qty,
                    },
                  ],
                },
              });
            }}
            className="bg-[#64242F] text-pink-200 px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-[#4A1E25] transition duration-300 font-semibold text-sm sm:text-base"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
