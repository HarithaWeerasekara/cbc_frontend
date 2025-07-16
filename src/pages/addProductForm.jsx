import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import mediaUpload from "../utils/mediaUpload";

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

  async function handleSubmit() {
    if (!productId || !name || !price || !labeledPrice || !stock) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const uploadPromises = Array.from(images).map((file) => mediaUpload(file));
      const uploadedImages = await Promise.all(uploadPromises);

      const product = {
        productId,
        name,
        altNames: altNames.split(",").map((a) => a.trim()),
        price: parseFloat(price),
        labeledPrice: parseFloat(labeledPrice),
        description,
        images: uploadedImages,
        stock: parseInt(stock),
      };

      const token = localStorage.getItem("token");

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/product`, product, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Product adding failed");
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#fff1f2] p-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white border border-[#fbcfe8] p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-[#be123c] mb-6">Add Product</h1>

        <div className="space-y-4">
          <input
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full h-11 border border-[#f9a8d4] bg-[#fff1f2] text-[#7f1d1d] px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
            placeholder="Product ID"
          />

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 border border-[#f9a8d4] bg-[#fff1f2] text-[#7f1d1d] px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
            placeholder="Product Name"
          />

          <input
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            className="w-full h-11 border border-[#f9a8d4] bg-[#fff1f2] text-[#7f1d1d] px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
            placeholder="Alternative Names (comma separated)"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="w-full h-11 border border-[#f9a8d4] bg-[#fff1f2] text-[#7f1d1d] px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
            placeholder="Price"
          />

          <input
            value={labeledPrice}
            onChange={(e) => setLabeledPrice(e.target.value)}
            type="number"
            className="w-full h-11 border border-[#f9a8d4] bg-[#fff1f2] text-[#7f1d1d] px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
            placeholder="Labeled Price"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 border border-[#f9a8d4] bg-[#fff1f2] text-[#7f1d1d] px-4 py-2 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
            placeholder="Description"
          />

          <input
            type="file"
            onChange={(e) => setImages(Array.from(e.target.files))}
            multiple
            className="w-full h-11 border border-[#f9a8d4] bg-[#fff1f2] text-[#7f1d1d] rounded-md px-3 py-2 text-sm file:bg-[#fbcfe8] file:text-[#9f1239] file:border-0 file:mr-4 file:px-3 file:rounded-md file:py-1 file:cursor-pointer"
          />

          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            className="w-full h-11 border border-[#f9a8d4] bg-[#fff1f2] text-[#7f1d1d] px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
            placeholder="Stock"
          />
        </div>

        <div className="flex justify-between mt-6 gap-4">
          <Link
            to="/admin/products"
            className="bg-[#fecaca] text-[#7f1d1d] px-6 py-2 rounded-md text-sm hover:bg-[#fda4af] transition"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="bg-[#be123c] text-white px-6 py-2 rounded-md text-sm hover:bg-[#9f1239] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
