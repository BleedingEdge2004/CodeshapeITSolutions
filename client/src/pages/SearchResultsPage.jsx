// src/pages/SearchResultsPage.jsx

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API } from "../utils/api.js"
import "../styles/SearchResultsPage.css"; // Create this CSS file

const SearchResultsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Extract search and category from URL query params
    const search = queryParams.get("search") || "";
    const category = queryParams.get("category") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch filtered products
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(`${API}/products`, {
                    params: {
                        search,
                        category,
                    },
                });
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching search results:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [search, category]);

    return (
        <div className="search-results-page">
            <h2>Search Results</h2>

            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p className="no-results">No products found for your search.</p>
            ) : (
                <div className="search-results-grid">
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

export default SearchResultsPage;