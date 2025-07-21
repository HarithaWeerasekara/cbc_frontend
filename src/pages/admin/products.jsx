import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product`)
        .then((res) => {
          setProducts(res.data);
          setLoaded(true);
        })
        .catch(() => toast.error("Failed to load products"));
    }
  }, [loaded]);

  async function deleteProduct(id) {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login required");

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.productId !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Error deleting product");
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#fff1f2] p-4 relative">
      {/* Floating Add Button */}
      <Link
        to="/admin/addProducts"
        className="fixed bottom-4 right-4 z-20 bg-[#be123c] hover:bg-[#9f1239] text-white p-4 rounded-full shadow-lg transition"
        title="Add Product"
      >
        <FaPlus />
      </Link>

      <h1 className="text-2xl font-bold text-[#be123c] mb-6">Manage Products</h1>

      {loaded ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between transition hover:shadow-lg"
            >
              {/* Image + Info */}
              <div className="flex items-center gap-4 mb-4">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded shadow"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded text-xs text-gray-400">
                    No Image
                  </div>
                )}
                <div>
                  <h2 className="font-semibold text-[#7f1d1d] text-sm">{product.name}</h2>
                  <p className="text-xs text-gray-400">ID: {product.productId}</p>
                </div>
              </div>

              {/* Price + Stock */}
              <div className="text-sm text-gray-700 space-y-1 mb-3">
                <p>
                  Price: <span className="text-[#dc2626]">Rs {product.price.toFixed(2)}</span>
                </p>
                <p>
                  Labeled: <span className="line-through">Rs {product.labeledPrice.toFixed(2)}</span>
                </p>
                <p>Stock: <span className="font-medium">{product.stock}</span></p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-auto pt-2 border-t">
                <button
                  onClick={() => deleteProduct(product.productId)}
                  className="text-[#dc2626] hover:text-[#991b1b] text-lg"
                  title="Delete"
                >
                  <FaRegTrashAlt />
                </button>
                <button
                  onClick={() => navigate("/admin/editProduct", { state: product })}
                  className="text-[#2563eb] hover:text-[#1d4ed8] text-lg"
                  title="Edit"
                >
                  <GrEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
