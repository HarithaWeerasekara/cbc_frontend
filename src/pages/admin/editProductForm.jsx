import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";

export default function EditProductionForm() {
  const locationData = useLocation();
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [price, setPrice] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (!locationData.state) {
      toast.error("Please select a product to edit");
      navigate("/admin/products");
    } else {
      const {
        productId,
        name,
        altNames,
        price,
        labeledPrice,
        description,
        images,
        stock,
      } = locationData.state;

      setProductId(productId);
      setName(name);
      setAltNames(altNames.join(","));
      setPrice(price);
      setLabeledPrice(labeledPrice);
      setDescription(description);
      setStock(stock);
    }
  }, [locationData, navigate]);

  const handleSubmit = async () => {
    try {
      let uploadedImages = [];

      if (images.length > 0) {
        const uploadPromises = Array.from(images).map((file) =>
          mediaUpload(file)
        );
        uploadedImages = await Promise.all(uploadPromises);
      } else {
        uploadedImages = locationData.state.images || [];
      }

      const product = {
        productId,
        name,
        altNames: altNames.split(",").map((str) => str.trim()),
        price,
        labeledPrice,
        description,
        images: uploadedImages,
        stock,
      };

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Product update failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fff1f2] p-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white border border-[#fbcfe8] p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-[#be123c] mb-6">Edit Product</h1>

        <div className="space-y-4">
          <input
            disabled
            value={productId}
            className="w-full h-11 bg-[#fce7f3] text-[#a21caf] px-4 rounded-md text-sm"
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
