import { Link } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';

export default function AddProductionForm (){
    return(
        <div className="w-full h-full bg-gray-200 rounded-lg flex justify-center items-center">
            <div className="w-[400px] h-[600px] rounded-lg shadow-lg bg-[#00000065]  flex flex-col justify-center items-center">

                <h1 className="text-3xl font-bold text-gray-700 m-[10px]" >ADD PRODUCTS</h1>
            
            <input 
            
            className="w-[385px] h-[40px] bg-[#f5c5c5fb] rounded-xl text-center text-[#000000]  m-[8px]" 
            
            placeholder="Product ID"/>

            <input 
            
            className="w-[385px] h-[40px] bg-[#f5c5c5fb] rounded-xl text-center text-[#000000]   m-[8px]" 
            
            placeholder="Product Name"/>

            <input 
            
            className="w-[385px] h-[40px] bg-[#f5c5c5fb] rounded-xl text-center text-[#000000]   m-[8px]" 
            
            placeholder="Alternative Names"/>

            <input 
            
            className="w-[385px] h-[40px] bg-[#f5c5c5fb] rounded-xl text-center text-[#000000]   m-[8px]" 
             
            placeholder="Price"/>

            <input 
            
            className="w-[385px] h-[40px] bg-[#f5c5c5fb] rounded-xl text-center text-[#000000]  m-[8px]" 
             
            placeholder="Laballed Price"/>

            <textarea 
            
            className="w-[385px] h-[40px] bg-[#f5c5c5fb] rounded-xl text-center text-[#000000]   m-[8px]" 
            
            placeholder="Discription"/>

            {/* stock */}

            <input 
            
            className="w-[385px] h-[40px] bg-[#f5c5c5fb] rounded-xl text-center text-[#000000]   m-[8px]" 
            type="email" 
            placeholder="Stock"/>

<div className='w-[400px] p-2.5 h-[100px] flex justify-between items-center'>


<Link to="/admin/products" className="bg-black text-white w-[180px] text-center p-[10px] rounded-lg hover:bg-red-500">
    Cancel
</Link>

<button className='bg-black text-white w-[180px] text-center p-[10px] rounded-lg ml-[10px] hover:bg-red-500'>Submite</button>


</div>

            
           

            </div>
            
            
        </div>
    )
}