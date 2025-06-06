import { Link, Route, Routes } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa";
import AdminProductsPage from "./admin/products";
import AddProductionForm from "./addProductForm";
import EditProductionForm from "./admin/editProductForm";


export default function AdminPage (){
    return(
        <div className ="w-full h-screen bg-gray-300 flex p-2">
            <div className="h-full w-[300px] bg-gray-400 rounded-lg">

            <Link to="/admin/users" className="flex items-center p-2"><FaUsers className="mr-2" />Users</Link>
            <Link to="/admin/products" className="flex items-center p-2"><AiFillProduct className="mr-2"/>products</Link>
            <Link to="/admin/orders" className="flex items-center p-2"><FaFileInvoiceDollar className="mr-2"/>orders</Link>

            </div>

            <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg">

                <Routes path="/*">

                <Route path="/users" element={<h1>Users</h1>}/>
                <Route path="/products" element={<AdminProductsPage/>}/>
                <Route path="/orders" element={<h1>orders</h1>}/>
                <Route path="/addProducts" element={<AddProductionForm/>}/>
                <Route path="/editProduct" element={<EditProductionForm/>}/>

                </Routes>

            </div>

        </div>
    );
}