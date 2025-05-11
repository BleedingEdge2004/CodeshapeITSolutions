// src/components/ProductList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "../styles/ProductList.css";

import { useCart } from "../context/cartContext.js";
import { useFavorites } from "../context/favoritesContext.js";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    const { toggleFavorite } = useFavorites();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Error loading products:", err);
            }
        };

        fetchProducts();
    }, []);

    // Check for auth token
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <section className="product-list">
            <h2>Our Products</h2>

            {products.length === 0 ? (
                <p className="no-products-msg">No products available.</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <Link to={`/product/${product._id}`} >
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>₹{product.price}</p>
                            </Link>

                            <div className="product-buttons">
                                <button
                                    onClick={() => {
                                        if (!isLoggedIn) return navigate("/login");
                                        addToCart(product);
                                    }}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => {
                                        if (!isLoggedIn) return navigate("/login");
                                        toggleFavorite(product);
                                    }}
                                >Add To Favorites
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