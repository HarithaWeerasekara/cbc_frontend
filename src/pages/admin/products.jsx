import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setLoaded(true);
      });
    }
  }, [loaded]);

  async function deleteProduct(id) {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You are not logged in");
      return;
    }
    try {
      await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((product) => product.productId !== id));
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  }

  return (
    <div className="w-full h-full bg-gray-50 p-4 md:p-6">
      <Link
        to={"/admin/addProducts"}
        className="fixed z-10 bottom-5 right-5 bg-blue-600 text-white p-3 text-2xl rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <FaPlus />
      </Link>

      {loaded ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 border border-gray-300 text-left text-blue-900 font-semibold">Product ID</th>
                <th className="p-3 border border-gray-300 text-left text-blue-900 font-semibold">Name</th>
                <th className="p-3 border border-gray-300 text-right text-blue-900 font-semibold">Price</th>
                <th className="p-3 border border-gray-300 text-right text-blue-900 font-semibold">Labeled Price</th>
                <th className="p-3 border border-gray-300 text-right text-blue-900 font-semibold">Stock</th>
                <th className="p-3 border border-gray-300 text-center text-blue-900 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-blue-50 text-gray-800"
                >
                  <td className="p-3 border border-gray-300 text-sm">{product.productId}</td>
                  <td className="p-3 border border-gray-300 text-sm">{product.name}</td>
                  <td className="p-3 border border-gray-300 text-right text-sm">{product.price.toFixed(2)}</td>
                  <td className="p-3 border border-gray-300 text-right text-sm">{product.labeledPrice.toFixed(2)}</td>
                  <td className="p-3 border border-gray-300 text-right text-sm">{product.stock}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <FaRegTrashAlt
                        onClick={() => deleteProduct(product.productId)}
                        className="text-lg text-red-600 hover:text-red-700 cursor-pointer transition"
                      />
                      <GrEdit
                        onClick={() => navigate("/admin/editProduct", { state: product })}
                        className="text-lg text-blue-600 hover:text-blue-700 cursor-pointer transition"
                      />
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
