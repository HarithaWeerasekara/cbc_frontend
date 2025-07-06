import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import mediaUpload from '../utils/mediaUpload';

export default function AddProductionForm() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [price, setPrice] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  async function handleSubmite() {
    const promisesArray = [];

    for (let i = 0; i < images.length; i++) {
      const promise = mediaUpload(images[i]);
      promisesArray[i] = promise;
    }

    try {
      const result = await Promise.all(promisesArray);

      const altNamesInArray = altNames.split(',');
      const product = {
        productId,
        name,
        altNames: altNamesInArray,
        price,
        labeledPrice,
        description,
        images: result,
        stock
      };
      const token = localStorage.getItem('token');

      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
        headers: {
          "Authorization": "Bearer " + token
        },
      });
      toast.success("Product added successfully");
      navigate("/admin/products");

    } catch (err) {
      console.log(err);
      toast.error("Product adding failed");
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 rounded-lg flex justify-center items-center p-4">
      <div className="w-full max-w-md rounded-lg shadow-lg border border-gray-300 bg-white p-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Add Product</h1>

        <input
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full h-12 border border-gray-300 rounded-md text-center text-gray-900 bg-gray-100 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Product ID"
        />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-12 border border-gray-300 rounded-md text-center text-gray-900 bg-gray-100 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Product Name"
        />

        <input
          value={altNames}
          onChange={(e) => setAltNames(e.target.value)}
          className="w-full h-12 border border-gray-300 rounded-md text-center text-gray-900 bg-gray-100 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Alternative Names"
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full h-12 border border-gray-300 rounded-md text-center text-gray-900 bg-gray-100 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Price"
        />

        <input
          value={labeledPrice}
          onChange={(e) => setLabeledPrice(e.target.value)}
          type="number"
          className="w-full h-12 border border-gray-300 rounded-md text-center text-gray-900 bg-gray-100 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Labeled Price"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-24 border border-gray-300 rounded-md text-gray-900 bg-gray-100 mb-5 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Description"
        />

        <input
          type="file"
          onChange={(e) => setImages(e.target.files)}
          multiple
          className="w-full h-12 border border-gray-300 rounded-md text-gray-900 bg-gray-100 mb-6 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Product images"
        />

        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          className="w-full h-12 border border-gray-300 rounded-md text-center text-gray-900 bg-gray-100 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Stock"
        />

        <div className='w-full flex justify-between items-center gap-4'>
          <Link
            to="/admin/products"
            className="bg-gray-200 text-gray-800 w-1/2 text-center p-3 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </Link>

          <button
            onClick={handleSubmite}
            className='bg-indigo-600 text-white w-1/2 text-center p-3 rounded-md hover:bg-indigo-700 transition'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
