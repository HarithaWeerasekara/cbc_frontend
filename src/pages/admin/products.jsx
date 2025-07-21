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
        .then((response) => {
          setProducts(response.data);
          setLoaded(true);
        })
        .catch(() => {
          toast.error("Failed to load products");
        });
    }
  }, [loaded]);

  async function deleteProduct(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      return;
    }
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((product) => product.productId !== id));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#fff1f2] px-4 py-6 relative">
      {/* Floating Add Button */}
      <Link
        to="/admin/addProducts"
        className="bg-[#be123c] hover:bg-[#9f1239] text-white p-4 fixed bottom-4 right-4 rounded-full shadow-lg z-10 transition"
        title="Add Product"
      >
        <FaPlus />
      </Link>

      {loaded ? (
        <div className="w-full overflow-x-auto">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.productId}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-4 mb-4">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt="Thumbnail"
                      className="w-16 h-16 object-cover rounded shadow"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">No Image</span>
                  )}
                  <div>
                    <p className="font-semibold text-sm text-[#7f1d1d]">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">ID: {product.productId}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    Price: <span className="text-[#dc2626]">Rs {product.price.toFixed(2)}</span>
                  </p>
                  <p>
                    Labeled: <span className="line-through">Rs {product.labeledPrice.toFixed(2)}</span>
                  </p>
                  <p>Stock: {product.stock}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => deleteProduct(product.productId)}
                    className="text-[#dc2626] hover:text-[#991b1b] text-xl"
                    title="Delete"
                  >
                    <FaRegTrashAlt />
                  </button>
                  <button
                    onClick={() => navigate("/admin/editProduct", { state: product })}
                    className="text-[#2563eb] hover:text-[#1d4ed8] text-xl"
                    title="Edit"
                  >
                    <GrEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
