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
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
    <div className="w-full min-h-screen bg-[#fff1f2] p-4 relative">
      <h1 className="text-xl sm:text-2xl font-bold text-[#be123c] mb-4 text-center">Product management panel</h1>
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
          <table className="min-w-[900px] w-full bg-white text-sm rounded-lg shadow-md">
            <thead className="bg-[#FC979D] text-[#7f1d1d]">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Product ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-right">Labeled Price</th>
                <th className="p-3 text-right">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.productId}
                  className="border-t hover:bg-[#fff0f3] transition"
                >
                  <td className="p-3">
                    {product.images?.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt="Thumbnail"
                        className="w-12 h-12 object-cover rounded shadow"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="p-3">{product.productId}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3 text-right">Rs {typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}</td>
                  <td className="p-3 text-right">Rs {typeof product.labeledPrice === "number" ? product.labeledPrice.toFixed(2) : "N/A"}</td>
                  <td className="p-3 text-right">{product.stock}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={() => deleteProduct(product.productId)}
                        className="text-[#dc2626] hover:text-[#991b1b] transition"
                        title="Delete"
                      >
                        <FaRegTrashAlt />
                      </button>
                      <button
                        onClick={() => navigate("/admin/editProduct", { state: product })}
                        className="text-[#2563eb] hover:text-[#1d4ed8] transition"
                        title="Edit"
                      >
                        <GrEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
