// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import AddToCartButton from './addToCartButton.jsx'; // already created
import axios from 'axios';

// This component fetches and displays a list of products with optional filters
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');

    // Fetch products from backend with optional keyword filter
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(
                keyword ?`/api/products ? keyword = ${ keyword }`:`/api/products`
            );
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Fetch products on mount and whenever keyword changes
    useEffect(() => {
        fetchProducts();
    }, [keyword]);

    return (
        <div className="product-list">
            <h2>All Products</h2>

            {/* Input to filter products by keyword (name) */}
            <input
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            {/* Display the product list */}
            <div className="products">
                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p><strong>Price:</strong> ₹{product.price}</p>

                            {/* Use Add to Cart button already created */}
                            <AddToCartButton product={product} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;