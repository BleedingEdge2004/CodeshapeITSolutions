// src/pages/ProductDetailsPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../utils/api.js"

// Import styles
import "../styles/ProductDetailsPage.css";

// Import cart and favorites context
import { useCart } from "../context/cartContext.js";
import { useFavorites } from "../context/favoritesContext.js";

const ProductDetailsPage = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate(); // For redirecting
    const [product, setProduct] = useState(null);

    const { addToCart } = useCart();
    const { toggleFavorite } = useFavorites();
    const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in
    // Fetch product details on mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // FIX: Remove spaces in endpoint
                const response = await axios.get(`${API}/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product details", error);
            }
        };

        fetchProduct();
    }, [id]);

    // Handle Buy Now logic
    const handleBuyNow = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            /**
             * User not logged in → redirect to log in
             */
            navigate("/login");
            return;
        }

        // User is logged in → add to cart and go to cart page
        addToCart(product);
        navigate("/cart");
    };

    // If product is not yet loaded
    if (!product) {
        return <div>Loading product details...</div>;
    }

    return (
        <div className="product-details-page">
            {/* Product Image */}
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>

            {/* Product Information */}
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="category">{product.category?.name || "Uncategorized"}</p>
                <p className="description">{product.description}</p>
                <p className="price">₹{product.price}</p>
                <p className={`stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>

                {/* Action Buttons */}
                <div className="product-action-buttons">
                    <button onClick={() => {
                        if (!isLoggedIn) return navigate("/login");
                        addToCart(product);
                    }}>
                        Add to Cart
                    </button>

                    <button onClick={() => {
                        if (!isLoggedIn) return navigate("/login");
                        toggleFavorite(product);
                    }}>Add To Favorites
                    </button>

                    <button onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;