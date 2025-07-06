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
        <div className="w-full h-full bg-gray-100 rounded-lg flex justify-center items-center">
            <div className="w-[400px] h-[600px] rounded-lg shadow-lg bg-white flex flex-col justify-center items-center p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Product</h1>

                <input
                    disabled
                    value={productId}
                    className="w-full h-10 bg-gray-200 rounded-xl text-center text-gray-700 mb-4"
                    placeholder="Product ID"
                />

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 bg-gray-50 rounded-xl text-center text-gray-900 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Product Name"
                />

                <input
                    value={altNames}
                    onChange={(e) => setAltNames(e.target.value)}
                    className="w-full h-10 bg-gray-50 rounded-xl text-center text-gray-900 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Alternative Names"
                />

                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full h-10 bg-gray-50 rounded-xl text-center text-gray-900 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Price"
                />

                <input
                    value={labeledPrice}
                    onChange={(e) => setLabeledPrice(e.target.value)}
                    type="number"
                    className="w-full h-10 bg-gray-50 rounded-xl text-center text-gray-900 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Labeled Price"
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-20 bg-gray-50 rounded-xl text-gray-900 mb-4 border border-gray-300 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Description"
                />

                <input
                    type="file"
                    onChange={(e) => setImages(Array.from(e.target.files))}
                    multiple
                    className="w-full h-10 bg-gray-50 rounded-xl text-gray-700 mb-4 border border-gray-300 px-2"
                />

                <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type="number"
                    className="w-full h-10 bg-gray-50 rounded-xl text-center text-gray-900 mb-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Stock"
                />

                <div className="w-full flex justify-between items-center">
                    <Link
                        to="/admin/products"
                        className="bg-gray-400 text-gray-900 w-[48%] text-center p-3 rounded-lg hover:bg-gray-500 transition"
                    >
                        Cancel
                    </Link>

                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white w-[48%] text-center p-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Edit Product
                    </button>
                </div>
            </div>
        </div>
    );
}
