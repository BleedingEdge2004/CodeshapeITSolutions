// src/pages/EditProductPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditProductPage.css";

const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
        category: ""
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Failed to load product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`/api/products/admin/update/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            navigate("/admin/products");
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} className="edit-product-form">
                <input name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
                <input name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
                <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" required />
                <input name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
                <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditProductPage;