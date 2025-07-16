import { Link, Route, Routes } from "react-router-dom";
import { FaBroadcastTower, FaUsers, FaFileInvoiceDollar } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import AdminProductsPage from "./admin/products";
import AddProductionForm from "./addProductForm";
import EditProductionForm from "./admin/editProductForm";
import AdminOrders from "./admin/adminOrders";

export default function AdminPage() {
  return (
    <div className="w-full h-screen bg-[#fef2f2] flex p-4 font-sans">
      {/* Sidebar */}
      <div className="h-full w-[280px] bg-gradient-to-b from-[#be123c] to-[#881337] rounded-2xl text-white p-4 space-y-3 shadow-xl">
        <div>
          <a
            href="http://localhost:5173/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[150px] block group text-center text-sm font-medium rounded-xl flex justify-center items-center bg-[#9f1239] hover:bg-[#881337] transition-all duration-300"
          >
            <span className="group-hover:hidden">Crystal Beauty Dashboard</span>
            <span className="hidden group-hover:flex flex-col items-center text-xs leading-tight">
              Click to <br /> visit front-end
            </span>
          </a>
        </div>

        <Link
          to="/admin/users"
          className="flex items-center p-3 rounded-xl hover:bg-[#881337] transition text-sm font-semibold tracking-wide"
        >
          <FaUsers className="mr-3 text-lg" /> Users
        </Link>

        <Link
          to="/admin/products"
          className="flex items-center p-3 rounded-xl hover:bg-[#881337] transition text-sm font-semibold tracking-wide"
        >
          <AiFillProduct className="mr-3 text-lg" /> Products
        </Link>

        <Link
          to="/admin/orders"
          className="flex items-center p-3 rounded-xl hover:bg-[#881337] transition text-sm font-semibold tracking-wide"
        >
          <FaFileInvoiceDollar className="mr-3 text-lg" /> Orders
        </Link>

        <Link
          to="/admin/live-products"
          className="flex items-center p-3 rounded-xl hover:bg-[#881337] transition text-sm font-semibold tracking-wide"
        >
          <FaBroadcastTower className="mr-3 text-lg" /> Live Products
        </Link>
      </div>

      {/* Main Content */}
      <div className="h-full w-[calc(100vw-300px)] bg-white rounded-2xl shadow-md overflow-auto p-6">
        <Routes>
          <Route
            path="/users"
            element={
              <h1 className="text-[#be123c] font-bold text-2xl tracking-wide">
                Users
              </h1>
            }
          />
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/addProducts" element={<AddProductionForm />} />
          <Route path="/editProduct" element={<EditProductionForm />} />
        </Routes>
      </div>
    </div>
  );
}
