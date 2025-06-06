import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";



export default function AdminProductsPage(){

    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if (!loaded) {
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
        (response)=>{
            console.log(response.data);    
            setProducts(response.data)
            setLoaded(true)
        }
    )
}
   
        
    }

    ,[loaded]
)

async function deleteProduct(id) {

    const token = localStorage.getItem('token')
    
    if (token==null) {

        toast.error("You are not logged in")
        return;

    }
    
    try { 

        await axios.delete (import.meta.env.VITE_BACKEND_URL+"/api/product/"+id, {

            headers: {
            Authorization: "Bearer "+token

        }

    } 
)

    toast.success("Product deleted successfully")
    setProducts(prev => prev.filter(product => product.productId !== id));
    

}catch (error) {

    console.log(error)

    toast.error("Error deleting product")
    
    return;
}

}

    
    
    return(
        <div className="w-full h-full rounded-lg relative" >
            <Link to={"/admin/addProducts"} className="bg-gray-400 absolute text-white p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-500 hover:text-gray-700 right-5 bottom-5">
            <FaPlus />
            </Link>

            {loaded&&<table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labled Price</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Actions</th>

                    </tr>

                </thead>
                <tbody>
                {
                products.map(
                    (product,index)=>{
                        console.log("mapping"+product.productId)
                        return(
                            <tr key={index} className="border-b-2 border-gray-300 hover:bg-gray-300 cursor-pointer text-center">
                                <td className="p-2">{product.productId}</td>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.labeledPrice}</td>
                                <td className="p-2">{product.stock}</td>
                                <td className="p-2">
                                    <div className="w-full h-full flex justify-center items-center gap-4">
                                    <FaRegTrashAlt onClick={()=>{
                                        deleteProduct(product.productId)
                                    }} className="text-[22px] m-[5px] hover:text-red-600 " /> 
                                    <GrEdit onClick={()=>{
                                        navigate ("/admin/editProduct",{
                                            state:product
                                            
                                        })
                                    }}
                                    className="text-[22px] m-[5px] hover:text-blue-500"/>
                                    </div>
                                </td>
                            </tr> 
                            
                        )
                    }
                )
            }
                </tbody>
            </table>}
            {
                !loaded&&
                <Loader/>

            }

            {
                products.map(
                    (product,index)=>{
                        console.log("mapping"+product.productId)
                        return(
                            <div key={index} className="">
                                
                            </div>
                            
                        )
                    }
                )
            }
        </div>
    )
}