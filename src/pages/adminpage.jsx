import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FaBroadcastTower, FaUsers, FaFileInvoiceDollar } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import AdminProductsPage from "./admin/products";
import AddProductionForm from "./addProductForm";
import EditProductionForm from "./admin/editProductForm";
import AdminOrders from "./admin/adminOrders";
import UserManagerPage from "./admin/userManage";


export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { path: "/admin/users", label: "Users", icon: <FaUsers /> },
    { path: "/admin/products", label: "Products", icon: <AiFillProduct /> },
    { path: "/admin/orders", label: "Orders", icon: <FaFileInvoiceDollar /> },
    {
      path: "/admin/live-products",
      label: "Live Products",
      icon: <FaBroadcastTower />,
    },
  ];

  return (

    

    <div className="flex h-screen bg-[#fef2f2] overflow-hidden">
      
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-30 w-64 bg-gradient-to-b from-[#be123c] to-[#881337] text-white h-full flex flex-col p-4 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="mb-6">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-[#9f1239] hover:bg-[#881337] py-6 px-2 rounded-xl text-sm font-semibold group transition-all duration-300"
          >
            <span className="group-hover:hidden">Crystal Beauty Dashboard</span>
            <span className="hidden group-hover:block text-xs leading-tight">
              Click to visit front-end
            </span>
          </a>
        </div>
        

        {/* Sidebar Nav */}
        <nav className="space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center p-3 rounded-xl hover:bg-[#9f1239] transition text-sm font-medium"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3 text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="hidden md:flex inline-flex text-[100px] h-full w-full py-100  items-center justify-center bg-red-200 text-[#881337] font-bold  rounded-t-3xl md:rounded-none shadow-inner ">
          WELCOME ADMIN
        </div>
        {/* Top Bar for Mobile */}
        <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-md">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#881337] text-2xl"
          >
            <FiMenu />
          </button>
          <h1 className="text-xl font-bold text-[#881337]">
            Crystal Admin Panel
          </h1>
          <div></div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white rounded-t-3xl md:rounded-none shadow-inner">
          <Routes>
            <Route path="/users" element={<UserManagerPage />} />
            <Route path="/products" element={<AdminProductsPage />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/addProducts" element={<AddProductionForm />} />
            <Route path="/editProduct" element={<EditProductionForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
