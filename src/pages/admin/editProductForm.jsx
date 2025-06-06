import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import mediaUpload from '../../utils/mediaUpload';

export default function EditProductionForm() {
    const locationData = useLocation();
    const navigate = useNavigate();

    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [altNames, setAltNames] = useState('');
    const [price, setPrice] = useState('');
    const [labeledPrice, setLabeledPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [stock, setStock] = useState('');

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
                stock
            } = locationData.state;

            setProductId(productId);
            setName(name);
            setAltNames(altNames.join(','));
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
                const uploadPromises = Array.from(images).map(file => mediaUpload(file));
                uploadedImages = await Promise.all(uploadPromises);
            } else {
                uploadedImages = locationData.state.images || [];
            }

            const product = {
                productId,
                name,
                altNames: altNames.split(',').map(str => str.trim()),
                price,
                labeledPrice,
                description,
                images: uploadedImages,
                stock
            };

            const token = localStorage.getItem('token');

            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`, product, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});


            toast.success("Product updated successfully");
            navigate("/admin/products");

        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Product update failed");
        }
    };

    return (
        <div className="w-full h-full bg-[#575656] rounded-lg flex justify-center items-center">
            <div className="w-[400px] h-[600px] rounded-lg shadow-lg bg-[#2c2c2e] flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-[#f5f5f5] m-[10px]">Edit Product</h1>

                <input
                    disabled
                    value={productId}
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px]"
                    placeholder="Product ID"
                />

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px]"
                    placeholder="Product Name"
                />

                <input
                    value={altNames}
                    onChange={(e) => setAltNames(e.target.value)}
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px]"
                    placeholder="Alternative Names"
                />

                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px]"
                    placeholder="Price"
                />

                <input
                    value={labeledPrice}
                    onChange={(e) => setLabeledPrice(e.target.value)}
                    type="number"
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px]"
                    placeholder="Labeled Price"
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-[385px] h-[80px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px]"
                    placeholder="Description"
                />

                <input
                    type="file"
                    onChange={(e) => setImages(Array.from(e.target.files))}
                    multiple
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-[#e5e5e5] m-[8px]"
                />

                <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type="number"
                    className="w-[385px] h-[40px] bg-[#3a3a3c] rounded-xl text-center text-[#e5e5e5] m-[8px]"
                    placeholder="Stock"
                />

                <div className="w-[400px] p-2.5 h-[100px] flex justify-between items-center">
                    <Link
                        to="/admin/products"
                        className="bg-[#4b5563] text-white w-[180px] text-center p-[10px] rounded-lg hover:bg-[#6b7280]"
                    >
                        Cancel
                    </Link>

                    <button
                        onClick={handleSubmit}
                        className="bg-[#2563eb] text-white w-[180px] text-center p-[10px] rounded-lg ml-[10px] hover:bg-[#3b82f6]"
                    >
                        Edit Product
                    </button>
                </div>
            </div>
        </div>
    );
}
