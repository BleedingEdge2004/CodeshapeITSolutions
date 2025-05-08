// src/components/ProductList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ProductList.css"; // <-- Import CSS

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Error loading products:", err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="product-list">
            <h2>Our Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <Link
                        to={`/product/${product._id}`}
                        key={product._id}
                        className="product-card"
                    >
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>₹{product.price}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ProductList;