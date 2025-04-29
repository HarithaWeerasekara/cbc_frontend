import axios from "axios"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductsPage(){

    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
        (response)=>{
            console.log(response.data);
            setProducts(response.data)
        }
    ).catch(
        (error)=>{
            console.log("Error fetching products", error.response.data);
        }
    )

        
    },
    []
)

    // Fetch products from the backend API
    // using axios and log the response to the console
    
    return(
        <div className="w-full h-full rounded-lg relative" >
            <Link to={"/admin/addProducts"} className="bg-gray-700 absolute text-white p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 right-5 bottom-5">
            <FaPlus />
            </Link>
            <table className="w-full   ">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labled Price</th>
                        <th className="p-2">Stock</th>

                    </tr>

                </thead>
                <tbody>
                {
                products.map(
                    (product,index)=>{
                        console.log("mapping"+product.productId)
                        return(
                            <tr key={index} className="border-b-2 border-gray-300 hover:bg-gray-500 cursor-pointer text-center hover:text-white">
                                <td className="p-2">{product.productId}</td>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.labeledPrice}</td>
                                <td className="p-2">{product.stock}</td>
                            </tr> 
                            
                        )
                    }
                )
            }
                </tbody>
            </table>
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