import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Get category name from URL
import axios from "axios";

import "../styles/CategoryProductsPage.css"; // Styling for product grid

const CategoryProductsPage = () => {
    const { name } = useParams(); 
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);

    // Fetch all products from backend once
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to load products:", err);
            }
        };

        fetchProducts();
    }, []);

    // Filter by category on change
    useEffect(() => {
        const match = products.filter(
            (p) => p.category?.name?.toLowerCase().includes(name.toLowerCase())
        );
        setFiltered(match);
    }, [name, products]);

    return (
        <div className="category-products-page">
            <h2>Products in "{name.replace("-", " ")}"</h2>

            {filtered.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div className="category-products-grid">
                    {filtered.map((product) => (
                        <div className="product-card" key={product._id}>
                            <img src={product.image} alt={product.name} />
                            <h4>{product.name}</h4>
                            <p>₹{product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryProductsPage;