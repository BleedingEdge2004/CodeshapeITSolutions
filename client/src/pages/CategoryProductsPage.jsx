import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryProductsPage.css";

const CategoryProductsPage = () => {
    const { name } = useParams(); // e.g. "Pain Relief"
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products by category from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/products?category=${ name }`);
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error loading category products:", err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [name]);

    return (
        <div className="category-products-page">
            <h2>Products in "{name}"</h2>

            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div className="category-products-grid">
                    {products.map((product) => (
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