import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import mediaUpload from '../utils/mediaUpload';

export default function AddProductionForm (){

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [stock, setStock] = useState("");
    const navigate = useNavigate();

    async function handleSubmite(){

        const promisesArray = []

        for(let i=0; i<images.length; i++){
            const promise = mediaUpload(images[i])
            promisesArray[i]= promise
        }

        try{

        const result = await Promise.all(promisesArray)
        

        const altNamesInArray = altNames.split(',')
        const product = {
            productId: productId,
            name: name,
            altNames : altNamesInArray,
            price: price,
            labeledPrice: labeledPrice,
            description: description,
            images: result,
            stock: stock
        }
        const token = localStorage.getItem('token');
        console.log(token)

        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product", product, {
            headers: {
                "Authorization": "Bearer "+token
            },
        })
        toast.success("Product added successfully")
        navigate("/admin/Products")
                
       
    } catch(error){
            console.log(err)
            toast.error("Product adding failed")
        }
    }


    return(
        <div className="w-full h-full bg-[#575656] rounded-lg flex justify-center items-center">
            <div className="w-[400px] h-[600px] rounded-lg shadow-lg bg-[#2c2c2e] flex flex-col justify-center items-center">

                <h1 className="text-3xl font-bold text-[#f5f5f5] m-[10px]">ADD PRODUCTS</h1>
            
                <input 
                    value={productId}
                    onChange={(e)=>{setProductId(e.target.value)}}
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px] placeholder-gray-400" 
                    placeholder="Product ID"
                />

                <input 
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px] placeholder-gray-400" 
                    placeholder="Product Name"
                />

                <input 
                    value={altNames}
                    onChange={(e)=>{setAltNames(e.target.value)}}
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px] placeholder-gray-400" 
                    placeholder="Alternative Names"
                />

                <input 
                    value={price}
                    onChange={(e)=>{setPrice(e.target.value)}}
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px] placeholder-gray-400" 
                    placeholder="Price"
                />

                <input 
                    value={labeledPrice}
                    onChange={(e)=>{setLabeledPrice(e.target.value)}}
                    type="number"
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px] placeholder-gray-400" 
                    placeholder="Laballed Price"
                    
                />

                <textarea 
                    value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px] placeholder-gray-400" 
                    placeholder="Discription"
                />

                <input
                    type="file"
                    onChange={(e)=>{setImages(e.target.files)}}
                    multiple
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px] placeholder-gray-400" 
                    placeholder="Product images"
                />

                <input 
                    value={stock}
                    onChange={(e)=>{setStock(e.target.value)}}
                    type="number" 
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px] placeholder-gray-400" 
                    placeholder="Stock"
                />

                <div className='w-[400px] p-2.5 h-[100px] flex justify-between items-center'>

                    <Link 
                        to="/admin/products" 
                        className="bg-[#4b5563] text-white w-[180px] text-center p-[10px] rounded-lg hover:bg-[#6b7280]"
                    >
                        Cancel
                    </Link>

                    <button onClick={handleSubmite} className='bg-[#2563eb] text-white w-[180px] text-center p-[10px] rounded-lg ml-[10px] hover:bg-[#3b82f6]'
                    >
                        Submite
                    </button>

                </div>

            </div>
        </div>
    )
}
