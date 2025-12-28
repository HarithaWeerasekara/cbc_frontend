import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cart";

export default function ProductOverview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const qty = 1;

  useEffect(() => {
    if (!id) navigate("/products");
  }, [id, navigate]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setStatus("loaded");
      })
      .catch(() => {
        toast.error("Product not found");
        setStatus("error");
      });
  }, [id]);

  if (status === "loading") return <Loader />;

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Something went wrong. Please try again.
      </div>
    );
  }

  const hasDiscount =
    product.labeledPrice && product.price < product.labeledPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbff] via-[#f6e9f3] to-[#eef2ff] px-4 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ================= IMAGE ================= */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-4">
          <ImageSlider images={product.images || []} />
        </div>

        {/* ================= INFO ================= */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>

          {product.altNames?.length > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              {product.altNames.join(" • ")}
            </p>
          )}

          {/* Price */}
          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-bold text-gray-900">
              LKR {product.price.toFixed(2)}
            </span>

            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                LKR {product.labeledPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-700 leading-relaxed text-sm sm:text-base">
            {product.description || "No description available."}
          </p>

          {/* Actions (Desktop) */}
          <div className="hidden sm:flex gap-4 mt-10">
            <button
              onClick={async () => {
                await addToCart(product, qty);
                toast.success("Added to cart");
              }}
              className="
                px-8 py-3 rounded-full
                bg-gray-900 text-white
                hover:bg-gray-800
                transition font-semibold
              "
            >
              Add to Cart
            </button>

            <button
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    items: [
                      {
                        productId: product.productId || product._id,
                        name: product.name,
                        price: product.price,
                        labeledPrice: product.labeledPrice,
                        image: product.images?.[0],
                        quantity: qty,
                      },
                    ],
                  },
                })
              }
              className="
                px-8 py-3 rounded-full
                border border-gray-900
                text-gray-900
                hover:bg-gray-900 hover:text-white
                transition font-semibold
              "
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white/90 backdrop-blur-xl border-t border-gray-200 px-4 py-3 flex justify-between items-center z-50">
        <span className="font-bold text-gray-900">
          LKR {product.price.toFixed(2)}
        </span>

        <div className="flex gap-2">
          <button
            onClick={async () => {
              await addToCart(product, qty);
              toast.success("Added to cart");
            }}
            className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm"
          >
            Cart
          </button>

          <button
            onClick={() =>
              navigate("/checkout", {
                state: {
                  items: [
                    {
                      productId: product.productId || product._id,
                      name: product.name,
                      price: product.price,
                      labeledPrice: product.labeledPrice,
                      image: product.images?.[0],
                      quantity: qty,
                    },
                  ],
                },
              })
            }
            className="px-4 py-2 rounded-full border border-gray-900 text-gray-900 text-sm"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
