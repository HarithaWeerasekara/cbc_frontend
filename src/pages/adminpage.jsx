import { Link, Route, Routes } from "react-router-dom";
import { FaBroadcastTower, FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa";
import AdminProductsPage from "./admin/products";
import AddProductionForm from "./addProductForm";
import EditProductionForm from "./admin/editProductForm";
import Orders from "./admin/order";



export default function AdminPage() {
  return (
    <div className="w-full h-screen bg-gray-50 flex p-4">
      {/* Sidebar */}
      <div className="h-full w-[300px] bg-blue-900 rounded-lg text-white p-4 space-y-3">
        <Link to="/admin/users" className="flex items-center p-3 hover:bg-blue-700 rounded-md transition">
          <FaUsers className="mr-3" /> Users
        </Link>
        <Link to="/admin/products" className="flex items-center p-3 hover:bg-blue-700 rounded-md transition">
          <AiFillProduct className="mr-3" /> Products
        </Link>
        <Link to="/admin/orders" className="flex items-center p-3 hover:bg-blue-700 rounded-md transition">
          <FaFileInvoiceDollar className="mr-3" /> Orders
        </Link>
        <Link
        to="/admin/live-products"
        className="flex items-center p-3 hover:bg-blue-700 rounded-md transition"
>
        <FaBroadcastTower className="mr-3" /> Live Products
        </Link>
      </div>

      {/* Main Content */}
      <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg shadow-md p-6 overflow-auto">
        <Routes>
          <Route path="/users" element={<h1 className="text-gray-800 font-semibold text-2xl">Users</h1>} />
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/orders" element={<h1 className="text-gray-800 font-semibold text-2xl">Orders</h1>} />
          <Route path="/addProducts" element={<AddProductionForm />} />
          <Route path="/editProduct" element={<EditProductionForm />} />
          <Route path="/orders" element={<Orders />} />

          
        </Routes>
      </div>
    </div>
  );
}
