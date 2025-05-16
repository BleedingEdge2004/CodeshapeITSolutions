// src/pages/AdminProductPanel.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../utils/api.js";

import ProductList from "../components/ProductList.jsx"; // existing component

const AdminProductPanel = () => {
    const navigate = useNavigate();

    // Handler for editing a product
    const handleEdit = (product) => {
        // Redirect to an edit form page (to be created)
        navigate(`/admin/edit-product/${product._id}`);
    };

    // Handler for deleting a product
    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API}/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload(); // refresh after deletion
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product.");
        }
    };

    return (
        <div className="admin-product-panel">
            <ProductList isAdmin={true} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default AdminProductPanel;