// src/pages/ProductDetailsPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import styles
import "../styles/ProductDetailsPage.css";

// Import cart and favorites context
import { useCart } from "../context/cartContext.js";
import { useFavorites } from "../context/favoritesContext.js";

const ProductDetailsPage = () => {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);

    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    // Fetch product details on mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products / ${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product details", error);
            }
        };

        fetchProduct();
    }, [id]);

    // If product is not yet loaded
    if (!product) {
        return <div>Loading product details...</div>;
    }

    return (
        <div className="product-details">
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
                <p
                    className={`stock ${product.stock && product.stock > 0 ? "in-stock" : "out-of-stock"
                        }`}
                >
                    {product.stock && product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>

                {/* Add to Cart & Favorites Buttons */}
                <div className="product-action-buttons">
                    <button onClick={() => addToCart(product)}>Add to Cart</button>

                    <button onClick={() => toggleFavorite(product)}>
                        {isFavorite(product) ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;