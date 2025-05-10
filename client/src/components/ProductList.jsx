// src/components/ProductList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

// Import styles
import "../styles/ProductList.css";

// Import cart and favorites context
import { useCart } from "../context/cartContext.js";
import { useFavorites } from "../context/favoritesContext.js";

const ProductList = () => {
    // Holds product list fetched from backend
    const [products, setProducts] = useState([]);

    // Cart context functions
    const { addToCart } = useCart();

    // Favorites context functions
    const { toggleFavorite, isFavorite } = useFavorites();

    // Load all products once on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data); // store in state
            } catch (err) {
                console.error("Error loading products:", err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="product-list">
            <h2>Our Products</h2>

            {/* If no products exist, show fallback message */}
            {products.length === 0 ? (
                <p className="no-products-msg">No products available.</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>₹{product.price}</p>
                            <div className="product-buttons">
                                <button onClick={() => addToCart(product)}>Add to Cart</button>
                                <button onClick={() => toggleFavorite(product)}>
                                    {isFavorite(product._id) ? "Unfavorite" : "Favorite"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductList;